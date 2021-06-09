import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';

const Header = () => (
    <View style={styles.headerContainer}>
        <Image source={require('assets/images/main/header.png')} style={styles.headerImage} />
    </View>
);

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        // flex:1,
        alignItems: 'center',
        backgroundColor: '#FFF',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.30)',
                shadowOffset: {height: 2, width: 0},
                shadowOpacity: 1,
                shadowRadius: 2
            },
            android: {
                elevation: 2
            }
        })
    },
    headerImage: {
        position: 'relative',
        top: 30,
        width: 60,
        height: 60
    }
});