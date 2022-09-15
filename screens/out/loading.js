import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')

export default function Out({ navigation, route }) {
	
    const [loaded] = useFonts({
        'Louis': require('../../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loading_text}>rout</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 10,
        color: '#C2C2C2',
        bottom: window.width / 2
    }
})