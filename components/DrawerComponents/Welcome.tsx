import { PRIMARY_COLOR } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { ImageIcon } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
const Welcome = () => {
    const benefits = [
        {
            title: 'Create Image In Your Mind',
            icon: ImageIcon,
            color: '#FF6B6B'
        },
        {
            title: 'Code Assistance',
            icon: 'code',
            color: '#4ECDC4'
        },
        {
            title: 'Creative Writing',
            icon: 'create',
            color: '#FFD166'
        },
        {
            title: 'Problem Solving',
            icon: 'bulb',
            color: '#6A0572'
        },
        {
            title: 'Learning Support',
            icon: 'school',
            color: '#118AB2'
        }
    ];
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>
                    Hey Dev, <Text style={{ color: 'white' }}>ask me anything in your mind i'm here to help</Text>
                </Text>
                <View style={styles.benefitsContainer}>
                    {benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                            {benefit.icon === ImageIcon ? (
                                <benefit.icon size={28} color={benefit.color} />
                            ) : (
                                <Ionicons name={benefit.icon as any} size={28} color={benefit.color} />
                            )}
                            <Text style={styles.benefitText}>
                                {benefit.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.inputWrapper}>
                <Input />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingVertical: 20,
        gap: 15,
        paddingBottom: 100,
    },
    title: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        fontSize: 25,
        textAlign: 'center',
        fontFamily: FONT_NAMES.LILITA_ONE
    },
    benefitsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 15,
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'center'
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '45%',
        minWidth: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    benefitText: {
        color: 'white',
        fontSize: 14,
        flex: 1,
        fontFamily: FONT_NAMES.LILITA_ONE,
        flexWrap: 'wrap'
    },
    inputWrapper: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    }
});
export default Welcome;