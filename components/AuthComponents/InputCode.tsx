import { BUTTON_COLOR } from '@/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
const InputCode = ({
    setValue,
    value,
}: {
    setValue: (text: string) => void,
    value: string,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View style={styles.inputWrapper}>
            {isFocused ? (

                <View style={styles.inputInnerContainer}>

                    <TextInput
                        onChangeText={setValue}
                        value={value}
                        style={styles.inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                    />
                </View>
            ) : (
                <View style={[styles.inputInnerContainer, styles.defaultBorder]}>
                    <TextInput
                        onChangeText={setValue}
                        value={value}
                        style={styles.inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                    />
                </View>
            )}
        </View>
    );
}
export default InputCode;
const styles = StyleSheet.create({
    inputWrapper: {
        position: 'relative',
        width: 45,
        height: 45,
    },
    gradientBorder: {
        borderRadius: 15,
        padding: 1,
        width: '100%',
        height: '100%',
    },
    inputInnerContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultBorder: {
        borderWidth: 1,
    },
    inputStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
        backgroundColor: BUTTON_COLOR,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 0,
    },
});