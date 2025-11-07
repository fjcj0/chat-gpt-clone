import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
const logo = require('../../assets/icons/logo.png');
const HeaderDrawer = () => {
    return (
        <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
    },
    logo: {
        width: 100,
        height: 100
    },
});
export default HeaderDrawer;