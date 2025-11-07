import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
export default function NewChatScreen() {
    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
            <View style={styles.container}>

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
        justifyContent: 'space-between',
        backgroundColor: '#151517',
    },
});