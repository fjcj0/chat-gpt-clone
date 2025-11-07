import SafeScreen from '@/components/SafeScreen';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { fonts } from '../fonts';
const logo = require('../assets/icons/logo.png');
function ClerkLoadedWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', rowGap: 8, backgroundColor: 'black' }}>
        <Image source={logo} style={{ width: 125, height: 125 }} />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }
  return <>{children}</>;
}
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fonts);
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Loading fonts...</Text>
      </View>
    );
  }
  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading fonts: {fontError.message}</Text>
      </View>
    );
  }
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoadedWrapper>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </ClerkLoadedWrapper>
    </ClerkProvider>
  );
}