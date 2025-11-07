import { PRIMARY_COLOR } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
const LinkAuth = ({ text, title, href }: {
    text: string,
    title: string,
    href: any,
}) => {
    const router = useRouter();
    return (
        <View style={{ marginTop: 20, alignSelf: 'center', flexDirection: 'row', columnGap: 2 }}>
            <Text style={{ color: 'white', fontFamily: FONT_NAMES.KANCHENJUNGA }}>{text}</Text>
            <TouchableOpacity onPress={() => {
                router.replace(href);
            }}>
                <Text style={{ color: PRIMARY_COLOR, fontFamily: FONT_NAMES.KANCHENJUNGA }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}
export default LinkAuth;