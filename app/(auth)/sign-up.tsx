import ButtonAuth from '@/components/AuthComponents/ButtonAuth';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import Input from '@/components/AuthComponents/Input';
import LinkAuth from '@/components/AuthComponents/LinkAuth';
import OrMessage from '@/components/AuthComponents/OrMessage';
import StrategeyButton from '@/components/AuthComponents/StrategeyButton';
import { useSignUp } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import VerifyEmailScreen from './verify-email.tsx';
const applogo = require('../../assets/icons/apple-logo.png');
const google = require('../../assets/icons/google.png');
export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const onSignUpPress = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        try {
            await signUp.create({
                emailAddress,
                password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    };
    if (pendingVerification) {
        return (
            <VerifyEmailScreen
                email={emailAddress}
                setPendingVerification={setPendingVerification}
            />
        );
    }
    return (
        <LinearGradient
            colors={['black', '#3d1e79']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.1, y: 1.8 }}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                    <View style={styles.content}>
                        <HeaderAuth title='Create Your Account' />
                        <Input
                            label='Name'
                            placeholder='Enter your name....'
                            value={name}
                            setValue={setName}
                            secureTextEntry={false}
                        />
                        <Input
                            label='Email'
                            placeholder='Enter your email....'
                            value={emailAddress}
                            setValue={setEmailAddress}
                            secureTextEntry={false}
                        />
                        <Input
                            label='Password'
                            placeholder='Enter your password....'
                            value={password}
                            setValue={setPassword}
                            secureTextEntry={true}
                        />
                        <ButtonAuth
                            handleClick={onSignUpPress}
                            isLoading={isLoading}
                        />
                        <OrMessage />
                        <StrategeyButton Strategy='Apple' StrategyIcon={applogo} oAuthStrategy='oauth_apple' />
                        <StrategeyButton Strategy='Google' StrategyIcon={google} oAuthStrategy='oauth_google' />
                        <LinkAuth
                            text='Already have an account? '
                            title='Sign In'
                            href={'/(auth)/sign-in'}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
        gap: 20,
    },
});