import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function ChatScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat {id}</Text>
            <Text style={styles.subtitle}>Chat content will appear here</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151517',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#ADB2B8',
        fontSize: 16,
    },
});