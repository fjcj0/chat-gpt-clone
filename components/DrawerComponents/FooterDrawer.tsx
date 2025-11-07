import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const profilePic = require('../../assets/images/profile.jpeg');
const FooterDrawer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                    <TouchableOpacity>
                        <Image
                            source={profilePic}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.profileName}>Omar Coding</Text>
                </View>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuDots}>...</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    footer: {
        padding: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 16,
        marginRight: 6,
    },
    profileName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuDots: {
        color: 'white',
        fontSize: 20,
        marginBottom: 13
    },
});
export default FooterDrawer;