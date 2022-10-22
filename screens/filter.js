import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, TextInput } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')

export default function Filter({ navigation, route }) {
	
	const searchRef = useRef().current



    const location = route.params.location

    const navigate = (x) => {
        navigation.navigate(x)
    }

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
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
                <SafeAreaView style={styles.filter_container}>
                    <Text style={styles.filter}>filter</Text>
                </SafeAreaView>
            </View>
            <View style={styles.search_container}>
                <Pressable onPress={() => searchRef.focus()} style={styles.search_press}>
                    <TextInput
                    ref={searchRef}
                    // value={search}
                    placeholder='search filters'
                    placeholderTextColor={'#595959'}
                    selectionColor={'#696969'}
                    keyboardAppearance='dark'
                    // onChangeText={i => initialLoad(i)}
                    style={styles.search}
                    />
                </Pressable>
            </View>
            <View style={styles.select_container}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#555555'
    },
    head_safe: {
        // flexDirection: 'row'
    },
    filter_container: {
        alignSelf: 'center'
    },
    filter: {
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
    },
    search_container: {
        marginTop: 10,
    },
    search_press: {
        alignSelf: 'center',
		backgroundColor: '#C2C2C2',
		height: 38,
		width: window.width / 1.1,
		justifyContent: 'center',
		borderRadius: window.width / 70,
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 70,
    },
    search: {
        left: window.width / 40,
		fontFamily: 'Louis',
		fontSize: 17
    },
    select_container: {
        flex: 1,
        width: window.width / 1.1,
        marginTop: 14,
        marginBottom: 20,
        borderRadius: 21,
        alignSelf: 'center',
        backgroundColor: 'gray'
    }
    
})