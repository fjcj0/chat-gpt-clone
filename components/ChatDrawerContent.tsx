import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const logo = require('@/assets/icons/logo.png');
const profilePic = require('@/assets/images/profile.jpeg');

interface Chat {
    id: string;
    title: string;
    lastMessage?: string;
    timestamp?: string;
    unread?: boolean;
}

const ChatDrawerContent = (props: DrawerContentComponentProps) => {
    const chats: Chat[] = [
        {
            id: '1',
            title: 'How to learn React Native?',
            lastMessage: 'I can help you with that...',
            timestamp: '2h ago',
            unread: true
        },
        {
            id: '2',
            title: 'Weather forecast for today',
            lastMessage: 'It will be sunny all day',
            timestamp: '1d ago',
            unread: false
        },
        {
            id: '3',
            title: 'Recipe for chocolate cake',
            lastMessage: 'Here is the recipe...',
            timestamp: '3d ago',
            unread: false
        },
        {
            id: '4',
            title: 'Travel recommendations',
            lastMessage: 'You should visit Japan!',
            timestamp: '1w ago',
            unread: true
        },
    ];

    const handleChatPress = (chatId: string) => {
        console.log('Selected chat:', chatId);
        // Navigate to chat screen or update main content
        // You can use navigation here: props.navigation.navigate('Chat', { chatId });
    };

    const handleNewChat = () => {
        console.log('Start new chat');
        // Logic to start new chat
    };

    return (
        <View style={styles.drawerContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
                    <Text style={styles.newChatText}>+ New Chat</Text>
                </TouchableOpacity>
            </View>

            {/* Chats List */}
            <DrawerContentScrollView
                {...props}
                style={styles.chatsContainer}
                contentContainerStyle={styles.chatsContent}
            >
                <Text style={styles.chatsTitle}>Recent Chats</Text>

                <View style={styles.chatsList}>
                    {chats.map((chat) => (
                        <TouchableOpacity
                            key={chat.id}
                            style={[
                                styles.chatItem,
                                chat.unread && styles.unreadChatItem
                            ]}
                            onPress={() => handleChatPress(chat.id)}
                        >
                            <View style={styles.chatContent}>
                                <View style={styles.chatHeader}>
                                    <Text
                                        style={[
                                            styles.chatTitle,
                                            chat.unread && styles.unreadChatTitle
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {chat.title}
                                    </Text>
                                    <Text style={styles.chatTimestamp}>
                                        {chat.timestamp}
                                    </Text>
                                </View>
                                <Text
                                    style={styles.chatLastMessage}
                                    numberOfLines={1}
                                >
                                    {chat.lastMessage}
                                </Text>
                            </View>
                            {chat.unread && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadBadgeText}>•</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </DrawerContentScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileInfo}>
                        <Image
                            source={profilePic}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileText}>
                            <Text style={styles.profileName}>Omar Coding</Text>
                            <Text style={styles.profileStatus}>Online</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuButtonText}>⋯</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#181818',
    },
    header: {
        padding: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2D2D2D',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 40,
        height: 40,
    },
    newChatButton: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    newChatText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    chatsContainer: {
        flex: 1,
    },
    chatsContent: {
        paddingTop: 10,
    },
    chatsTitle: {
        color: '#ADB2B8',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    chatsList: {
        paddingHorizontal: 15,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginVertical: 4,
        backgroundColor: '#1F1F1F',
    },
    unreadChatItem: {
        backgroundColor: '#2A2A2A',
    },
    chatContent: {
        flex: 1,
        marginRight: 8,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    unreadChatTitle: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    chatTimestamp: {
        color: '#6B7280',
        fontSize: 11,
    },
    chatLastMessage: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    unreadBadge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2563EB',
    },
    unreadBadgeText: {
        color: '#2563EB',
        fontSize: 16,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#2D2D2D',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    profileText: {
        flex: 1,
    },
    profileName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileStatus: {
        color: '#10B981',
        fontSize: 12,
    },
    menuButton: {
        padding: 4,
    },
    menuButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChatDrawerContent;