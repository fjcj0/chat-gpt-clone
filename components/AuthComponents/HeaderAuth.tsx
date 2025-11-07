import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { Image, Text, View } from 'react-native';
const logoImage = require('../../assets/icons/logo.png');
const HeaderAuth = ({ title }: { title: string }) => {
    return (
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', rowGap: 10 }}>
            <Image source={logoImage} style={{ width: 200, height: 120 }} resizeMode='contain' />
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 20, fontFamily: FONT_NAMES.LILITA_ONE }}>{title}</Text>
            <Text style={{ color: 'white', opacity: 0.5, fontWeight: '200', maxWidth: '65%', textAlign: 'center', fontFamily: FONT_NAMES.JOSEFIN_SANS }}>
                Access your account to manage settings explore features
            </Text>
        </View>
    );
}
export default HeaderAuth;