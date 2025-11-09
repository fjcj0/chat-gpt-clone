import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
const FooterDrawer = () => {
    const { user } = useUser();
    return (
        <View style={styles.footer}>
            <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                    <Image
                        source={{ uri: user?.imageUrl }}
                        style={styles.profileImage}
                    />
                </View>
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
});
export default FooterDrawer;