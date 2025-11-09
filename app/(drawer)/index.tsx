import HeaderChat from '@/components/DrawerComponents/HeaderChat';
import Input from '@/components/DrawerComponents/Input';
import Welcome from '@/components/DrawerComponents/Welcome';
import Loader from '@/components/Loader';
import { useChatContext } from '@/context/ChatContext';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, FlatList, Text, Image } from 'react-native';
const logoAi = require('../../assets/icons/logo.png');
export default function ChatScreen() {
    const { user } = useUser();
    const { chat, messages, fetchMessages, isFetchingMessages } = useChatContext();
    useEffect(() => {
        if (chat !== null) {
            fetchMessages(chat);
        }
    }, [chat, fetchMessages]);
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const renderMessage = ({ item }: { item: any }) => (
        <View style={[
            styles.messageContainer,
            item.role === 'user' ? styles.userContainer : styles.aiContainer
        ]}>
            {item.role === 'assistant' && (
                <View style={styles.aiProfileContainer}>
                    <Image
                        source={logoAi}
                        style={styles.aiImage}
                        resizeMode="contain"
                    />
                </View>
            )}
            <View style={[
                styles.messageBubble,
                item.role === 'user' ? styles.userMessage : styles.aiMessage
            ]}>
                <Text style={styles.messageText}>{item.content}</Text>
                <Text style={[
                    styles.timestamp,
                    item.role === 'user' ? styles.userTimestamp : styles.aiTimestamp
                ]}>
                    {formatTime(item.created_at || new Date().toISOString())}
                </Text>
            </View>
            {item.role === 'user' && user?.imageUrl && (
                <View style={styles.userProfileContainer}>
                    <Image
                        source={{ uri: user.imageUrl }}
                        style={styles.userImage}
                        resizeMode="cover"
                    />
                </View>
            )}
        </View>
    );
    if (isFetchingMessages) {
        return <Loader />;
    }
    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
            <View style={styles.container}>
                <HeaderChat />
                {chat === null ? (
                    <Welcome />
                ) : (
                    <View style={styles.messagesContainer}>
                        <FlatList
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                            contentContainerStyle={styles.messagesList}
                            inverted={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
                <View style={styles.inputWrapper}>
                    <Input />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#151517',
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    messagesList: {
        paddingVertical: 16,
        gap: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 4,
        gap: 8,
    },
    userContainer: {
        justifyContent: 'flex-end',
    },
    aiContainer: {
        justifyContent: 'flex-start',
    },
    aiProfileContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aiImage: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    userProfileContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 4,
    },
    userImage: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 12,
        borderRadius: 16,
        position: 'relative',
    },
    userMessage: {
        backgroundColor: '#3B82F6',
        borderBottomRightRadius: 4,
    },
    aiMessage: {
        backgroundColor: '#374151',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 16,
    },
    timestamp: {
        fontSize: 10,
        opacity: 0.7,
        position: 'absolute',
        bottom: 6,
    },
    userTimestamp: {
        color: '#E5E7EB',
        right: 12,
    },
    aiTimestamp: {
        color: '#D1D5DB',
        left: 12,
    },
    inputWrapper: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    }
});