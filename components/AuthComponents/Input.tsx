import { FONT_NAMES } from '@/constants/fonts';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const Input = ({
    label,
    placeholder,
    setValue,
    value,
    secureTextEntry = false
}: {
    label: string;
    placeholder: string;
    setValue: (text: string) => void;
    value: string;
    secureTextEntry?: boolean;
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <View style={styles.containerInput}>
            <Text style={styles.labelStyle}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    placeholder={placeholder}
                    style={styles.inputStyle}
                    placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
                    autoCapitalize='none'
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? (
                            <EyeOff size={20} color="rgba(255, 255, 255, 0.6)" />
                        ) : (
                            <Eye size={20} color="rgba(255, 255, 255, 0.6)" />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
export default Input;
const styles = StyleSheet.create({
    containerInput: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        rowGap: 10,
        paddingHorizontal: 10,
    },
    labelStyle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 13,
        fontFamily: FONT_NAMES.COMIC_NEUE
    },
    inputContainer: {
        width: '100%',
        borderRadius: 60,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        height: 50,
        color: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: FONT_NAMES.COMIC_NEUE
    },
    eyeIcon: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});