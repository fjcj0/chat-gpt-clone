import { PRIMARY_COLOR } from '@/constants/colors';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151517'
    },
});
export default Loader;