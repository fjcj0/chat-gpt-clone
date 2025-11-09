import HeaderChat from '@/components/DrawerComponents/HeaderChat';
import Input from '@/components/DrawerComponents/Input';
import Welcome from '@/components/DrawerComponents/Welcome';
import Loader from '@/components/Loader';
import { useChatContext } from '@/context/ChatContext';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, FlatList, Text, Image, ActivityIndicator } from 'react-native';
const logoAi = require('../../assets/icons/logo.png');
export default function ChatScreen() {
    const { user } = useUser();
    const { chat, messages, fetchMessages, isFetchingMessages, isLoading } = useChatContext();
    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
        if (chat !== null) {
            fetchMessages(chat);
        }
    }, [chat, fetchMessages]);
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);
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
    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <View style={styles.aiProfileContainer}>
                <Image
                    source={logoAi}
                    style={styles.aiImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.loadingContent}>
                <ActivityIndicator size='large' color="#3B82F6" style={styles.loadingSpinner} />
                <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
        </View>
    );
    if (isFetchingMessages) {
        return (
            <Loader />
        );
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
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                            contentContainerStyle={styles.messagesList}
                            inverted={false}
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            ListFooterComponent={isLoading ? renderLoadingIndicator : null}
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
        paddingBottom: 100
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
        width: 100,
        height: 100,
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
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 4,
        gap: 8,
        justifyContent: 'flex-start',
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#374151',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        maxWidth: '70%',
    },
    loadingSpinner: {
        marginRight: 8,
    },
    loadingText: {
        color: '#D1D5DB',
        fontSize: 17,
    },
    fullScreenLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151517',
    },
    fullScreenLogo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    fullScreenLoaderText: {
        color: '#9CA3AF',
        fontSize: 16,
        marginTop: 16,
    },
});