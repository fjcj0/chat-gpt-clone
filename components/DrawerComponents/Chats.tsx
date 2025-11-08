import { useChatContext } from '@/context/ChatContext';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { MessageCircle, Trash } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface ChatsProps {
    navigation: DrawerContentComponentProps['navigation'];
}
const Chats = ({ navigation }: ChatsProps) => {
    const { chats } = useChatContext();
    const router = useRouter();
    const pathname = usePathname();
    const isNewChatActive = pathname === '/(drawer)' || pathname === '/';
    const isChatActive = (chatId: string) => pathname === `/chats/${chatId}`;
    const handleRemoveChat = (chatId: string, event: any) => {
        event.stopPropagation();
        console.log('Remove chat:', chatId);
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
                            router.replace('/(drawer)');
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
                    {chats.map((chat: any) => {
                        const active = isChatActive(chat.id);
                        return (
                            <TouchableOpacity
                                key={chat.id}
                                style={[
                                    styles.chatItem,
                                    active && styles.activeChatItem
                                ]}
                                onPress={() => {
                                    navigation.navigate('chats/[id]', {
                                        id: chat.id
                                    });
                                }}>
                                <View style={styles.chatItemContent}>
                                    <Text style={[
                                        styles.chatTitle,
                                        active && styles.activeChatTitle
                                    ]} numberOfLines={1}>
                                        {chat.title}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={(event) => handleRemoveChat(chat.id, event)}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Trash
                                            size={16}
                                            color={active ? '#1B1B1C' : '#ADB2B8'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </DrawerContentScrollView>
        </View>
    );
}
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
    removeButton: {
        padding: 4,
        borderRadius: 4,
    },
});
export default Chats;