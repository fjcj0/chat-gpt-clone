export interface Message {
    id: number;
    content: string;
    role: 'user' | 'assistant';
    chat_id: number;
    created_at: string;
    image: string | null;
}
export interface Chat {
    id: number;
    title: string;
    clerk_id: string;
    created_at: string;
}
export interface ChatContextProps {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    inputMessage: string;
    setInputMessage: (message: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isFetchingChats: boolean;
    setIsFetchingChats: (fetching: boolean) => void;
    isFetchingMessages: boolean;
    setIsFetchingMessages: (fetching: boolean) => void;
    sendMessageToAi: (content: string, image?: string) => Promise<void>;
    fetchMessages: (chat_id: number | null) => Promise<void>;
    chat: number | null;
    setChat: (chat: number | null) => void;
    isDeletingChat: any,
    setIsDeletingChat: any,
    deleteChat: (chat_id: string) => Promise<void>;
    fetchChats: any;
}