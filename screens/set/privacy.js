import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')
const info = require('../../assets/img/info.png')

export default function Privacy({ navigation, route }) {
	
    const location = route.params.location
    
    const toggleOneRight = useRef(new Animated.Value(20)).current

    const toggleOneOpacity = useRef(new Animated.Value(0)).current

    const [monetizeSettings, setMonetizeSettings] = useState({
        'one': {
            status: false,
            setting: 'private'
        }
    })

    const navigate = (x) => {
        navigation.navigate(x, {
            location: 'profile'
        })
    }

    const handleToggle = (x, y) => {
        const toggleObj = {
            'one': [toggleOneRight, toggleOneOpacity],
        }
        if (monetizeSettings[x].status === false) {
            Animated.parallel([
                Animated.timing(toggleObj[x][0], {
                    toValue: 0,
                    duration: 177,
                    useNativeDriver: false
                }),
                Animated.timing(toggleObj[x][1], {
                    toValue: 1,
                    duration: 177,
                    useNativeDriver: false
                })
            ]).start()
            var newObj = monetizeSettings
            newObj[x].status = true
        } else {
            Animated.parallel([
                Animated.timing(toggleObj[x][0], {
                    toValue: 20,
                    duration: 177,
                    useNativeDriver: false
                }),
                Animated.timing(toggleObj[x][1], {
                    toValue: 0,
                    duration: 177,
                    useNativeDriver: false
                })
            ]).start()
            var newObj = monetizeSettings
            newObj[x].status = false
        }
            
        
        setMonetizeSettings(newObj)
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
                <SafeAreaView style={styles.privacy_container}>
                    <Text style={styles.privacy}>privacy</Text>
                </SafeAreaView>
            </View>

            <View style={styles.privacy_toggle_container}>
                <View style={styles.privacy_toggle_text_container}>
                    <Text style={styles.privacy_toggle_text}>private?</Text>
                </View>
                <View style={styles.privacy_toggle_end_container}>
                    <Pressable style={styles.info_container}>
                        <Image source={info} style={styles.info}/>
                    </Pressable>
                    <Pressable onPress={() => handleToggle('one')} style={styles.toggle_safe}>
                        <Animated.View style={[styles.toggle_background, {opacity: toggleOneOpacity}]}/>
                        <View style={styles.toggle_container}>
                            <Animated.View style={[styles.toggle, {right: toggleOneRight}]}/>
                        </View>
                    </Pressable>
                </View>
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
    privacy_container: {
        alignSelf: 'center'
    },
    privacy: {
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


    
    privacy_toggle_container: {
        width: '95%',
        marginTop: 21,
        marginBottom: 10,
        borderRadius: 11,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#888888'
    },
    privacy_toggle_text_container: {
        paddingTop: 17,
        paddingLeft: 10,
        paddingBottom: 17,
        // backgroundColor: 'blue'
    },
    privacy_toggle_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2' 
    },
    privacy_toggle_end_container: {
        position: 'absolute',
        height: '100%',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },







    toggle_safe: {
        height: 25,
        width: 45,
        marginRight: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5F5F5F'
    },
    toggle_container: {
        height: 21,
        width: 41,
        borderRadius: 50
    },
    toggle_background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 50,
        backgroundColor: '#3fa9f5'
    },
    toggle: {
        position: 'absolute',
        height: 21,
        width: 21,
        borderRadius: 50,
        backgroundColor: '#C2C2C2',
        shadowColor: '#222222',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    info_container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    info: {
        height: 17,
        width: 17,
    }
    
})