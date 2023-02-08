import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')

export default function Password({ navigation, route }) {
	
    const location = route.params.location

    const navigate = (x) => {
        navigation.navigate(x, {
            location: 'profile'
        })
    }

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.head_safe}>
                <SafeAreaView style={styles.back_safe}>
                    <Pressable onPress={() => navigate(location)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.password_container}>
                    <Text style={styles.password}>password</Text>
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#5F5F5F'
    },
    head_safe: {
        // flexDirection: 'row'
    },
    password_container: {
        alignSelf: 'center'
    },
    password: {
        fontFamily: 'Louis',
        fontSize: 30,
        color: '#C2C2C2'
    },
    back_safe: {
        position: 'absolute'
    },
    back_press: {
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue'
    },
    back: {
        width: 12,
        height: 21
    }
    
})