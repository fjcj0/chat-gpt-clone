import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { Text, View } from 'react-native';
const OrMessage = () => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: 20,
        }}>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'white',
                marginRight: 1,
                borderRadius: 50
            }} />
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: FONT_NAMES.LILITA_ONE,
                paddingHorizontal: 5,
                fontSize: 18,
            }}>Or</Text>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'white',
                marginLeft: 1,
                borderRadius: 50
            }} />
        </View>
    );
}
export default OrMessage;