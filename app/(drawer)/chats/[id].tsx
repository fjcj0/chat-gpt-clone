import HeaderChat from '@/components/DrawerComponents/HeaderChat';
import Input from '@/components/DrawerComponents/Input';
import { PRIMARY_COLOR } from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
const aiLogo = require('../../../assets/icons/logo.png');
const profilePicture = require('../../../assets/images/profile.jpeg');
export default function ChatScreen() {
    const { id } = useLocalSearchParams();
    const messages = [
        { id: 1, text: "Hello! How can I assist you today?", isUser: false, timestamp: "10:00 AM" },
        { id: 2, text: "Hi, I need help with my project.", isUser: true, timestamp: "10:01 AM" },
        { id: 3, text: "Sure, I'd be happy to help! What kind of project are you working on?", isUser: false, timestamp: "10:02 AM" },
        { id: 4, text: "It's a React Native app for task management.", isUser: true, timestamp: "10:03 AM" },
        { id: 5, text: "That sounds interesting! What specific challenges are you facing?", isUser: false, timestamp: "10:04 AM" },
        { id: 6, text: "I'm having trouble with state management.", isUser: true, timestamp: "10:05 AM" },
        { id: 7, text: "I can help with that! Are you using any state management library like Redux or Context API?", isUser: false, timestamp: "10:06 AM" },
        { id: 8, text: "I'm using Context API but getting some performance issues.", isUser: true, timestamp: "10:07 AM" },
        { id: 9, text: "For complex state management, you might consider using Redux Toolkit or Zustand. They offer better performance optimization.", isUser: false, timestamp: "10:08 AM" },
        { id: 10, text: "Thanks! Can you recommend which one would be better for a medium-sized app?", isUser: true, timestamp: "10:09 AM" },
        { id: 11, text: "For medium-sized apps, Redux Toolkit is a great choice with its built-in best practices and reduced boilerplate.", isUser: false, timestamp: "10:10 AM" },
    ];
    return (
        <View style={styles.container}>
            <HeaderChat />
            <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageWrapper,
                            message.isUser ? styles.userWrapper : styles.aiWrapper
                        ]}
                    >
                        {!message.isUser && (
                            <Image
                                source={aiLogo}
                                style={styles.aiAvatar}
                                defaultSource={aiLogo}
                            />
                        )}
                        <View style={[
                            styles.messageContent,
                            message.isUser ? styles.userContent : styles.aiContent
                        ]}>
                            <View
                                style={[
                                    styles.messageBubble,
                                    message.isUser ? styles.userMessage : styles.aiMessage
                                ]}
                            >
                                <Text style={[
                                    styles.messageText,
                                    message.isUser ? styles.userMessageText : styles.aiMessageText
                                ]}>
                                    {message.text}
                                </Text>
                                <Text style={[
                                    styles.timestamp,
                                    message.isUser ? styles.userTimestamp : styles.aiTimestamp
                                ]}>
                                    {message.timestamp}
                                </Text>
                            </View>
                        </View>
                        {message.isUser && (
                            <Image
                                source={profilePicture}
                                style={styles.userAvatar}
                                defaultSource={profilePicture}
                            />
                        )}
                    </View>
                ))}
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