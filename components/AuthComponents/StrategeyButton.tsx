import { BUTTON_COLOR } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageProps, Text, TouchableOpacity } from 'react-native';
type OAuthStrategyProps = 'oauth_google' | 'oauth_apple';
const StrategyButton = ({
    Strategy,
    StrategyIcon,
    oAuthStrategy
}: {
    Strategy: string;
    StrategyIcon: ImageProps;
    oAuthStrategy: OAuthStrategyProps;
}) => {
    const { startSSOFlow } = useSSO();
    const router = useRouter();
    const onPress = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: oAuthStrategy
            });
            if (setActive && createdSessionId) {
                await setActive({ session: createdSessionId });
                router.replace('/(drawer)');
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    }
    return (
        <TouchableOpacity
            style={{
                width: '95%',
                height: 60,
                alignSelf: 'center',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                columnGap: 8,
                backgroundColor: BUTTON_COLOR
            }}
            onPress={onPress} // Added missing onPress
        >
            <Image
                source={StrategyIcon}
                style={{
                    width: 20,
                    height: 20
                }}
            />
            <Text style={{
                fontFamily: FONT_NAMES.KANCHENJUNGA,
                color: 'white'
            }}>
                Sign In Using {Strategy}
            </Text>
        </TouchableOpacity>
    );
}
export default StrategyButton;