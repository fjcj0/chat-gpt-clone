import HeaderChat from '@/components/DrawerComponents/HeaderChat';
import Input from '@/components/DrawerComponents/Input';
import Loader from '@/components/Loader';
import { PRIMARY_COLOR } from '@/constants/colors';
import { useChatContext } from '@/context/ChatContext';
import { useUser } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
const aiLogo = require('../../../assets/icons/logo.png');
export default function ChatScreen() {
    const { user } = useUser();
    const { id } = useLocalSearchParams();
    const { messages, isFetchingMessages, fetchMessages } = useChatContext();
    useEffect(() => {
        fetchMessages(id);
    }, [id]);
    if (isFetchingMessages) {
        return <Loader />;
    }
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    return (
        <View style={styles.container}>
            <HeaderChat />
            <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((message: any) => {
                    const isUser = message.role === 'user';
                    return (
                        <View
                            key={message.id}
                            style={[
                                styles.messageWrapper,
                                isUser ? styles.userWrapper : styles.aiWrapper
                            ]}
                        >
                            {!isUser && (
                                <Image
                                    source={aiLogo}
                                    style={styles.aiAvatar}
                                    defaultSource={aiLogo}
                                />
                            )}
                            <View style={[
                                styles.messageContent,
                                isUser ? styles.userContent : styles.aiContent
                            ]}>
                                <View
                                    style={[
                                        styles.messageBubble,
                                        isUser ? styles.userMessage : styles.aiMessage
                                    ]}
                                >
                                    <Text style={[
                                        styles.messageText,
                                        isUser ? styles.userMessageText : styles.aiMessageText
                                    ]}>
                                        {message.content}
                                    </Text>
                                    <Text style={[
                                        styles.timestamp,
                                        isUser ? styles.userTimestamp : styles.aiTimestamp
                                    ]}>
                                        {formatTime(message.created_at)}
                                    </Text>
                                </View>
                            </View>
                            {isUser && (
                                <Image
                                    source={{ uri: user?.imageUrl }}
                                    style={styles.userAvatar}
                                />
                            )}
                        </View>
                    );
                })}
            </ScrollView>
            <View style={{ marginBottom: 45 }}>
                <Input />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151517'
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    messagesContent: {
        paddingVertical: 16,
        gap: 16,
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '100%',
    },
    userWrapper: {
        justifyContent: 'flex-end',
    },
    aiWrapper: {
        justifyContent: 'flex-start',
    },
    messageContent: {
        maxWidth: '60%',
        marginHorizontal: 8,
    },
    userContent: {
        alignItems: 'flex-end',
    },
    aiContent: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
    },
    userMessage: {
        backgroundColor: PRIMARY_COLOR,
        borderBottomRightRadius: 4,
    },
    aiMessage: {
        backgroundColor: '#2A2A2D',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#FFFFFF',
    },
    aiMessageText: {
        color: '#E0E0E0',
    },
    timestamp: {
        fontSize: 10,
        marginTop: 6,
        alignSelf: 'flex-end',
    },
    userTimestamp: {
        color: '#CCCCCC',
    },
    aiTimestamp: {
        color: '#999999',
    },
    aiAvatar: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});