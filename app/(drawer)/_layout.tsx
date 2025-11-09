import Chats from '@/components/DrawerComponents/Chats';
import FooterDrawer from '@/components/DrawerComponents/FooterDrawer';
import HeaderDrawer from '@/components/DrawerComponents/HeaderDrawer';
import { ChatProvider } from '@/context/ChatContext';
import { useAuth } from '@clerk/clerk-expo';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <View style={styles.drawerContainer}>
            <HeaderDrawer />
            <Chats />
            <FooterDrawer />
        </View>
    );
}
const DrawerLayout = () => {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect href={'/(auth)/sign-in'} />;
    }
    return (
        <ChatProvider>
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
        </ChatProvider>

    );
}
const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#1B1B1C',
        paddingVertical: 10,
    },
});
export default DrawerLayout;