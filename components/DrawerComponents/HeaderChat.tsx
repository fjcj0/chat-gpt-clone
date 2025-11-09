import { LucideList } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
const logo = require('../../assets/icons/logo.png');
const HeaderChat = () => {
    const navigation = useNavigation();
    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20
        }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <LucideList size={20} color={'white'} />
            </TouchableOpacity>
            <Image source={logo} style={{ width: 70, height: 70 }} />
            <Text style={{ color: 'white', opacity: 0.5 }}>v10.2.0</Text>
        </View>
    );
}
export default HeaderChat;