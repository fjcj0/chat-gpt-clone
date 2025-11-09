import { PRIMARY_COLOR } from '@/constants/colors';
import { useChatContext } from '@/context/ChatContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
const Input = () => {
    const { setInputMessage, inputMessage, sendMessageToAi, isLoading } = useChatContext();
    const [isFocused, setIsFocused] = useState(false);
    const handleSend = () => {
        if (inputMessage.trim() && !isLoading) {
            console.log('Sending message:', inputMessage);
            sendMessageToAi(inputMessage.trim());
            setInputMessage('');
        }
    };
    const handleAttachment = () => {
        console.log('Attachment pressed');
    };
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.attachmentButton}
                    onPress={handleAttachment}
                    disabled={isLoading}
                >
                    <Ionicons name="attach" size={24} color="#6B7280" />
                </TouchableOpacity>
                <TextInput
                    style={[
                        styles.textInput,
                        isFocused && styles.textInputFocused
                    ]}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Message CanvaUi..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    maxLength={4000}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!isLoading}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        inputMessage && !isLoading ? styles.sendButtonActive : styles.sendButtonInactive
                    ]}
                    onPress={handleSend}
                    disabled={!inputMessage || isLoading}
                >
                    <Ionicons
                        name={isLoading ? "hourglass" : "send"}
                        size={20}
                        color={inputMessage && !isLoading ? "white" : "#9CA3AF"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 56,
    },
    attachmentButton: {
        padding: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        maxHeight: 120,
        paddingHorizontal: 8,
        paddingVertical: 10,
        textAlignVertical: 'center',
    },
    textInputFocused: {
        borderColor: PRIMARY_COLOR,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginBottom: 3
    },
    sendButtonActive: {
        backgroundColor: PRIMARY_COLOR,
    },
    sendButtonInactive: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});
export default Input;