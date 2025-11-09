import { useChatContext } from '@/context/ChatContext';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MessageCircle, Trash } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
const Chats = () => {
    const { chats } = useChatContext();
    const { chat, setChat, deleteChat, isDeletingChat } = useChatContext();
    const isNewChatActive = chat == null;
    const isChatActive = (chatId: number | string | null) => {
        if (chat === null || chatId === null) return false;
        return chat.toString() === chatId.toString();
    };
    const handleRemoveChat = async (chatId: string, event: any) => {
        event.stopPropagation();
        await deleteChat(chatId);
    };
    return (
        <View style={styles.chatsSection}>
            <Text style={styles.chatsLabel}>Chats</Text>
            <DrawerContentScrollView
                style={styles.chatsContainer}
                contentContainerStyle={styles.chatsContent}
            >
                <View style={styles.chatsList}>
                    <TouchableOpacity
                        style={[
                            styles.chatItem,
                            isNewChatActive && styles.activeChatItem
                        ]}
                        onPress={() => {
                            setChat(null);
                        }}>
                        <View style={styles.chatItemContent}>
                            <MessageCircle
                                size={20}
                                color={isNewChatActive ? '#1B1B1C' : 'white'}
                                style={{ marginRight: 3 }}
                            />
                            <Text style={[
                                styles.chatTitle,
                                isNewChatActive && styles.activeChatTitle
                            ]}>
                                New Chat
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {chats.map((chatItem: any) => {
                        const active = isChatActive(chatItem.id);
                        const isDeleting = isDeletingChat.status && isDeletingChat.chat === chatItem.id.toString();
                        return (
                            <TouchableOpacity
                                key={chatItem.id}
                                style={[
                                    styles.chatItem,
                                    active && styles.activeChatItem
                                ]}
                                onPress={() => {
                                    setChat(Number(chatItem.id));
                                }}
                                disabled={isDeleting}
                            >
                                <View style={styles.chatItemContent}>
                                    <Text style={[
                                        styles.chatTitle,
                                        active && styles.activeChatTitle,
                                        isDeleting && styles.deletingChatTitle
                                    ]} numberOfLines={1}>
                                        {chatItem.title}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={(event) => handleRemoveChat(chatItem.id.toString(), event)}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <ActivityIndicator
                                                size="small"
                                                color={active ? '#1B1B1C' : '#ADB2B8'}
                                            />
                                        ) : (
                                            <Trash
                                                size={16}
                                                color={active ? '#1B1B1C' : '#ADB2B8'}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </DrawerContentScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    chatsSection: {
        flex: 1,
    },
    chatsLabel: {
        color: '#ADB2B8',
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    chatsContainer: {
        flex: 1,
    },
    chatsContent: {
        paddingTop: 0,
    },
    chatsList: {
        paddingHorizontal: 1,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 4,
        backgroundColor: 'transparent',
    },
    chatItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    chatTitle: {
        color: 'white',
        fontSize: 14,
        flex: 1,
        fontWeight: 'bold',
        marginRight: 8,
    },
    activeChatItem: {
        backgroundColor: 'white',
    },
    activeChatTitle: {
        color: '#1B1B1C',
    },
    deletingChatTitle: {
        opacity: 0.5,
    },
    removeButton: {
        padding: 4,
        borderRadius: 4,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Chats;