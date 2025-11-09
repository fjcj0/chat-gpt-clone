import { Chat, ChatContextProps, Message } from '@/global';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useContext, createContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { socket } from '../utils/socket';
axios.defaults.withCredentials = true;
const ChatContext = createContext<ChatContextProps | undefined>(undefined);
export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();
    const [chats, setChats] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingChats, setIsFetchingChats] = useState(false);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);
    const [chat, setChat] = useState<number | null>(null);
    const [isDeletingChat, setIsDeletingChat] = useState<{
        chat: string | null;
        status: boolean;
    }>({
        chat: null,
        status: false,
    });
    const fetchChats = async () => {
        setIsFetchingChats(true);
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/chat/${user?.id}`);
            setChats(response.data.chats);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsFetchingChats(false);
        }
    };
    const deleteChat = async (chat_id: string) => {
        setIsDeletingChat({
            chat: chat_id,
            status: true,
        });
        try {
            await axios.delete(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/chat/${chat_id}/${user?.id}`);
            await fetchChats();
            if (chat?.toString() === chat_id) {
                setChat(null);
                setMessages([]);
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsDeletingChat({
                chat: null,
                status: false
            });
        }
    }
    const fetchMessages = useCallback(async (chat_id: number | null) => {
        if (!chat_id) {
            setMessages([]);
            return;
        }
        setIsFetchingMessages(true);
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/chat/messages/${chat_id}/${user?.id}`);
            const sortedMessages = response.data.messages.sort((a: Message, b: Message) =>
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            setMessages(sortedMessages);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsFetchingMessages(false);
        }
    }, [user?.id]);
    const sendMessageToAi = async (content: string, image?: string) => {
        if (!user?.id) {
            console.error('User must be logged in');
            return;
        }
        setIsLoading(true);
        const chatIdToSend = chat ? Number(chat) : null;
        console.log('Sending message with chatId:', chatIdToSend, 'Type:', typeof chatIdToSend);
        socket.emit('sendMessageToAi', {
            chatId: chatIdToSend,
            content: content,
            clerkId: user.id,
            image: image || null
        });
    };
    useEffect(() => {
        if (!user?.id) return;
        socket.on('receive', (data: { chat?: Chat; userMessage: Message }) => {
            if (data.chat) {
                setChat(data.chat.id);
                setChats(prev => [data.chat!, ...prev]);
                setMessages([data.userMessage]);
            } else {
                setMessages(prev => [...prev, data.userMessage]);
            }
        });
        socket.on('aiResponse', (data: { message: Message; chatId: number; type?: string; error?: boolean }) => {
            setMessages(prev => [...prev, data.message]);
            setIsLoading(false);
            fetchChats();
        });
        socket.on('error', (error: { error: string }) => {
            console.log('Socket error:', error);
            setIsLoading(false);
        });
        return () => {
            socket.off('receive');
            socket.off('aiResponse');
            socket.off('error');
        };
    }, [user?.id]);
    useEffect(() => {
        if (user?.id) {
            fetchChats();
        }
    }, [user?.id]);
    return (
        <ChatContext.Provider value={{
            chats,
            setChats,
            messages,
            setMessages,
            inputMessage,
            setInputMessage,
            isLoading,
            setIsLoading,
            isFetchingChats,
            setIsFetchingChats,
            isFetchingMessages,
            setIsFetchingMessages,
            sendMessageToAi,
            fetchMessages,
            chat,
            setChat,
            deleteChat,
            setIsDeletingChat,
            isDeletingChat,
            fetchChats
        }}>
            {children}
        </ChatContext.Provider>
    );
}
export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (context === undefined) throw new Error('useChatContext must be initialized within ChatProvider!');
    return context;
}