import ButtonAuth from '@/components/AuthComponents/ButtonAuth';
import InputCode from '@/components/AuthComponents/InputCode';
import { useSignUp } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const FONT_NAMES = {
    POPPINS: 'Poppins',
};
interface VerifyEmailScreenProps {
    email: string;
    setPendingVerification: (value: boolean) => void;
}
const VerifyEmailScreen = ({ email, setPendingVerification }: VerifyEmailScreenProps) => {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 1) {
            newCode[index] = numericText;
            setCode(newCode);
            if (numericText !== '' && index < 5) {

            }
        }
    }
    const onVerifyPress = async () => {
        if (!isLoaded) return;
        setIsLoadingVerify(true);
        try {
            const current_code = code.join('');
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: current_code
            });
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/(drawer)');
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoadingVerify(false);
        }
    }
    const handleBackToSignUp = () => {
        setPendingVerification(false);
    }
    return (
        <LinearGradient
            colors={['black', '#3d1e79']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.1, y: 1.8 }}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyBoardAvoidingContainer}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <Text style={styles.title}>Verification Code</Text>
                    <Text style={styles.subtitle}>
                        Enter Verification Code sent to {email}
                    </Text>
                    <View style={styles.inputCodeContainer}>
                        {code.map((digit, index) => (
                            <InputCode
                                key={index}
                                setValue={(text) => handleCodeChange(text, index)}
                                value={digit}
                            />
                        ))}
                    </View>
                    <View style={styles.containerButton}>
                        <ButtonAuth
                            handleClick={onVerifyPress}
                            isLoading={isLoadingVerify}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackToSignUp}
                    >
                        <ArrowLeft size={20} color={'white'} />
                        <Text style={styles.backText}>Back to sign up page</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
export default VerifyEmailScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyBoardAvoidingContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: FONT_NAMES.POPPINS
    },
    subtitle: {
        color: 'white',
        textAlign: 'center',
        opacity: 0.5,
        fontSize: 13.5,
        fontFamily: FONT_NAMES.POPPINS,
        marginVertical: 10
    },
    containerButton: {
        marginTop: 18,
        width: '100%',
        paddingHorizontal: 40
    },
    inputCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 12,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    backButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
        columnGap: 5
    },
    backText: {
        color: 'white'
    }
});