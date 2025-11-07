import { PRIMARY_COLOR } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const ButtonAuth = ({ handleClick, isLoading }: {
    handleClick: () => Promise<void>,
    isLoading: boolean
}) => {
    return (
        <TouchableOpacity onPress={handleClick}
            style={{ width: '95%', height: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: PRIMARY_COLOR, borderRadius: 100, paddingHorizontal: 15, alignSelf: 'center', opacity: isLoading ? 0.5 : 1 }}>
            <Text style={{ color: 'white', fontWeight: 900, fontFamily: FONT_NAMES.COMIC_NEUE }}>{isLoading ? 'Loading...' : 'Get Started'} </Text>
        </TouchableOpacity>
    );
}
export default ButtonAuth;