import { useAuth } from '@clerk/clerk-expo';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const logo = require('../../assets/icons/logo.png');
const profilePic = require('../../assets/images/profile.jpeg');
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const chats = [
        { id: '1', title: 'How to learn React Native?' },
        { id: '2', title: 'Weather forecast for today' },
        { id: '3', title: 'Recipe for chocolate cake' },
        { id: '4', title: 'Travel recommendations' },
    ];
    return (
        <View style={styles.drawerContainer}>
            <View style={styles.header}>
                <Image source={logo} style={{ width: 100, height: 100 }} />
            </View>
            <DrawerContentScrollView
                {...props}
                style={styles.chatsContainer}
                contentContainerStyle={styles.chatsContent}
            >
                <Text style={{ color: '#ADB2B8', fontWeight: 'bold', marginBottom: 10 }}>
                    Chats
                </Text>
                <View style={styles.chatsList}>
                    {chats.map((chat) => (
                        <TouchableOpacity
                            key={chat.id}
                            style={styles.chatItem}
                            onPress={() => {
                                props.navigation.navigate('chats/[id]', {
                                    id: chat.id
                                });
                            }}>
                            <Text style={styles.chatTitle} numberOfLines={1}>
                                {chat.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <View style={styles.profileContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={profilePic}
                            style={styles.profileImage}
                        />
                        <Text style={styles.profileName}>Omar Coding</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, marginBottom: 13 }}>
                            ...
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const DrawerLayout = () => {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect href={'/(auth)/sign-in'} />;
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={CustomDrawerContent}
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        width: 280,
                    },
                    swipeEnabled: true,
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "New Chat",
                        title: "New Chat"
                    }}
                />
                <Drawer.Screen
                    name="chats/[id]"
                    options={{
                        drawerLabel: "Chat Details",
                        title: "Chat Details"
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#1B1B1C',
        paddingVertical: 10,
    },
    header: {
        alignItems: 'flex-start',
    },
    chatsContainer: {
        flex: 1,
    },
    chatsContent: {
        paddingTop: 3,
        paddingHorizontal: 16,
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
    chatTitle: {
        color: 'white',
        fontSize: 14,
        flex: 1,
        fontWeight: 'bold',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ADB2B8',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 16,
        marginRight: 6,
    },
    profileName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
export default DrawerLayout;