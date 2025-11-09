import { ChatContextProps } from '@/global';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { socket } from '@/utils/scoket';
axios.defaults.withCredentials = true;
const ChatContext = createContext<ChatContextProps | undefined>(undefined);
export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingChats, setIsFetchingChats] = useState(false);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);
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
    useEffect(() => {
        if (user?.id) {
            fetchChats();
        }
    }, [user?.id]);
    const fetchMessages = async (chat_id: number | null) => {
        setIsFetchingMessages(true);
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/chat/messages/${chat_id}/${user?.id}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsFetchingMessages(false);
        }
    }
    const sendMessageToAi = async (chat_id: number | null) => {

    }
    return (
        <ChatContext.Provider value={{
            chats,
            setChats,
            messages,
            setMessages,
            setInputMessage,
            inputMessage,
            isLoading,
            setIsLoading,
            isFetchingChats,
            setIsFetchingChats,
            isFetchingMessages,
            setIsFetchingMessages,
            sendMessageToAi,
            fetchMessages
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