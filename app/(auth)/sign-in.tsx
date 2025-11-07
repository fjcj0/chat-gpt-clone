import ButtonAuth from '@/components/AuthComponents/ButtonAuth';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import Input from '@/components/AuthComponents/Input';
import LinkAuth from '@/components/AuthComponents/LinkAuth';
import OrMessage from '@/components/AuthComponents/OrMessage';
import StrategeyButton from '@/components/AuthComponents/StrategeyButton';
import { useSignIn } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
const applogo = require('../../assets/icons/apple-logo.png');
const google = require('../../assets/icons/google.png');
export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const onSignInPress = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/(drawer)');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    };
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
            >
                <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                    <View style={styles.content}>
                        <HeaderAuth title='Sign In To Your Account' />
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
                        <ButtonAuth handleClick={onSignInPress} isLoading={isLoading} />
                        <OrMessage />
                        <StrategeyButton Strategy='Apple' StrategyIcon={applogo} oAuthStrategy='oauth_apple' />
                        <StrategeyButton Strategy='Google' StrategyIcon={google} oAuthStrategy='oauth_google' />
                        <LinkAuth text='Dont you have an account? ' title='Sign Up' href={'/(auth)/sign-up'} />
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