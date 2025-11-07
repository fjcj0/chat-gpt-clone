import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
const DrawerLayout = () => {
    const { isSignedIn } = useAuth()
    if (!isSignedIn) {
        return <Redirect href={'/(auth)/sign-in'} />
    }
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
export default DrawerLayout