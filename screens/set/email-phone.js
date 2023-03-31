import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, TextInput, Animated} from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const portFile = require('../../port.json')

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')

export default function EmailPhone({ navigation, route }) {
    
    const errorAnim = useRef(new Animated.Value(0)).current
	
    const location = route.params.location

    const [navEmail, setNavEmail] = useState()
    const [navPhone, setNavPhone] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [focusState, setFocusState] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        AsyncStorage.getItem('profile', (err, rawRes) => {
            const res = JSON.parse(rawRes)
            const e = res[3]
            var p = res[4]
            setNavEmail(e)
            setEmail(e)
            if (p) {
                p = p.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3")
            }
            setNavPhone(p)
            setPhone(p)
        })
    }, [])
    const navigate = (x) => {
        if (email !== navEmail || phone !== navPhone) {
            if (!testInput()) return
            const endPoint = email !== navEmail ? 'email' : 'phone'
            const value = email !== navEmail ? email : phone.replace(/\D/g, '')
            AsyncStorage.getItem('user_id', (err, asyncRes) => {
                fetch(`http://${portFile.HOST}:3000/profile_change/${endPoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'user_id': asyncRes,
                        'value': value
                    })
                }).then(res => res.json())
                .then(async res => {
                    if (res.error) {
                        console.error(res.error)
                    } else {
                        await AsyncStorage.getItem('profile', (err, rawRes) => {
                            let res = JSON.parse(rawRes)
                            {focusState && (focusState === 'email'? res[3] = email : res[4] = phone.replace(/\D/g, ''))}
                            AsyncStorage.setItem('profile', JSON.stringify(res))
                        })
                    }
                })
                .catch(err => console.error(err))
            })
        }
        navigation.navigate(x, {
            location: 'settings'
        })
        setNavPhone(undefined)
        setPhone(undefined)
        setNavEmail(undefined)
        setEmail(undefined)
    }
    const testInput = () => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const phoneTest = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(phone)
        if (!emailTest || !phoneTest) {
            const handleError = !emailTest ? 'email' : 'phone'
            setError(`${handleError} format incorrect.`)
            Animated.timing(errorAnim, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return false
        } else {
            return true
        }
    }

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../../assets/fonts/Louis_George_Cafe.ttf')
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
                <SafeAreaView style={styles.email_phone_container}>
                    <Text style={styles.email_phone}>email & phone</Text>
                </SafeAreaView>
            </View>
            <View style={styles.email_safe}>
                <View style={styles.email_title_container}>
                    <Text style={styles.email_title}>email</Text>
                </View>
                <View style={styles.email_container}>
                    <Pressable style={styles.email_press}>
                        <TextInput 
                        style={styles.email}
                        value={email}
                        returnKeyType='done'
                        keyboardType='email-address'
                        placeholder='add email'
                        placeholderTextColor={'#444444'}
                        selectionColor={'#696969'}
                        keyboardAppearance='dark'
                        onFocus={() => setFocusState('email')}
                        onChangeText={i => setEmail(i)}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.phone_safe}>
                <View style={styles.phone_title_container}>
                    <Text style={styles.phone_title}>phone</Text>
                </View>
                <View style={styles.phone_container}>
                    <Pressable style={styles.phone_press}>
                        <TextInput 
                        style={styles.phone}
                        value={phone}
                        returnKeyType='done'
                        keyboardType='numbers-and-punctuation'
                        placeholder='add phone'
                        placeholderTextColor={'#444444'}
                        selectionColor={'#696969'}
                        keyboardAppearance='dark'
                        onFocus={() => setFocusState('phone')}
                        onChangeText={(i) => setPhone(i)}/>
                    </Pressable>
                </View>
            </View>
            {error &&
            <Animated.View style={[styles.error_container, {opacity: errorAnim}]}>
                <Text style={styles.error}>{error}</Text>
            </Animated.View>}
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
        marginBottom: 21
    },
    email_phone_container: {
        alignSelf: 'center'
    },
    email_phone: {
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
    email_safe: {
    },
    email_title_container: {
        width: '95%',
        marginBottom: 7,
        borderRadius: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    email_title: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2',
        paddingVertical: 11
    },
    email_container: {
        width: '95%',
        marginBottom: 7,
        borderRadius: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    email_press: {
        overflow: 'hidden',
        width: '97%',
        borderRadius: 7,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#888888'
    },
    email: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
        width: '97%',
        paddingTop: 7,
        paddingBottom: 7,
        alignSelf: 'center',
    },
    phone_safe: {

    },
    phone_title_container: {
        width: '95%',
        marginBottom: 7,
        borderRadius: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    phone_title: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2',
        paddingVertical: 11
    },
    phone_container: {
        width: '95%',
        marginBottom: 7,
        borderRadius: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    phone_press: {
        overflow: 'hidden',
        width: '97%',
        borderRadius: 7,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#888888'
    },
    phone: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
        width: '97%',
        paddingTop: 7,
        paddingBottom: 7,
        alignSelf: 'center',
    },
    error_container: {
        alignSelf: 'center'
    },
    error: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#b91d25'
    }
})