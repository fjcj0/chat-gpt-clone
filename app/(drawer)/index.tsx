import HeaderChat from '@/components/DrawerComponents/HeaderChat';
import Welcome from '@/components/DrawerComponents/Welcome';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
export default function NewChatScreen() {
    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
            <View style={styles.container}>
                <HeaderChat />
                <Welcome />
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
});