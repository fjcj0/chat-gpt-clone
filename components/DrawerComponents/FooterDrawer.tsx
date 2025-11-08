import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const FooterDrawer = () => {
    const { user } = useUser();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [profileName, setProfileName] = useState('Omar Coding');
    const [newName, setNewName] = useState('');
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const handleEditName = () => {
        setIsMenuVisible(false);
        setNewName(profileName);
        setIsEditModalVisible(true);
    };
    const saveNewName = () => {
        if (newName.trim()) {
            setProfileName(newName.trim());
            setIsEditModalVisible(false);
            setNewName('');
        }
    };
    const handleLogout = () => {
        setIsMenuVisible(false);
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive' }
            ]
        );
    };
    const handleDeleteAccount = () => {
        setIsMenuVisible(false);
        Alert.alert(
            'Delete Account',
            'This action cannot be undone. Are you sure you want to delete your account?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Account deletion confirmed');
                    }
                }
            ]
        );
    };
    return (
        <View style={styles.footer}>
            <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                    <View>
                        <Image
                            source={{ uri: user?.imageUrl }}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.profileName}>{!user?.firstName}</Text>
                </View>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Text style={styles.menuDots}>...</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={isMenuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsMenuVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={handleEditName}
                        >
                            <Text style={styles.menuItemText}>Enter Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={handleLogout}
                        >
                            <Text style={styles.menuItemText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, styles.deleteItem]}
                            onPress={handleDeleteAccount}
                        >
                            <Text style={[styles.menuItemText, styles.deleteText]}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal
                visible={isEditModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.editModalContainer}>
                    <View style={styles.editModalContent}>
                        <Text style={styles.editModalTitle}>Edit Name</Text>
                        <TextInput
                            style={styles.nameInput}
                            value={newName}
                            onChangeText={setNewName}
                            placeholder="Enter new name"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.editModalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setIsEditModalVisible(false);
                                    setNewName('');
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={saveNewName}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    menuContainer: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    deleteItem: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    deleteText: {
        color: 'red',
    },
    editModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editModalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 12,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    editModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    nameInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    editModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
export default FooterDrawer;