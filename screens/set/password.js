import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, TextInput, EventSubscriptionVendor } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const portFile = require('../../port.json')

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')

export default function Password({ navigation, route }) {
	
    const location = route.params.location

    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    // infinite loop changing password

    const navigate = (x) => {
        if (password) {
            passChange(x)
        } else {
            navigation.navigate(x, {
                location: 'settings'
            })
        }
    }

    // need to finish regex implementation

    const passChange = (x) => {
        const numberRegex = /\d/
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/
        const caseRegex = /[A-Z]/
        const lengthRegex = /^.{7,}$/
        const spaceRegex = /\s/
        if (!password || !confirm) {
            setError('fields cannot be empty.')
            return
        } else if (password !== confirm) {
            setError('passwords must match.')
            return
        } else if (spaceRegex.test(password)) {
            setError('no spaces.')
            return
        } else if (!numberRegex.test(password) || !symbolRegex.test(password) || !caseRegex.test(password) || !lengthRegex.test(password)) {
            const testObj = {
                numTest: numberRegex.test(password),
                symTest: symbolRegex.test(password),
                casTest: caseRegex.test(password),
                lenTest: lengthRegex.test(password)
            }
            const testArr = [!testObj.numTest ? 'number ' : 0, !testObj.symTest ? ' symbol ' : 0, !testObj.casTest ? ' upperCase ': 0, !testObj.lenTest ? ' length 7+' : 0]
            const newArr = testArr.filter((i) => i !== 0).join('-')
            setError(`needs one: ${newArr}`)
            return
        }
        console.log('test')
        AsyncStorage.getItem('user_id', (err, asyncRes) => {
            fetch(`http://${portFile.HOST}:${portFile.PORT}/profile_change/password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user_id': asyncRes,
                    'value': password
                })
            }).then(res => res.json())
            .then(async res => {
                if (res.error) {
                    console.error(res.error)
                } else {
                    console.log(res)
                    setPassword('')
                    setConfirm('')
                    setError('')
                    setSuccess('password changed!!')
                }
            })
            .then(() => {
                setTimeout(() => {
                    navigation.navigate(x, {
                        location: 'settings'
                    })
                }, 777)
            })
            .catch(err => console.error(err))
        })
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
                <SafeAreaView style={styles.password_container}>
                    <Text style={styles.password}>password</Text>
                </SafeAreaView>
            </View>
            <View style={styles.password_chg_safe}>
                <View style={styles.password_chg_container}>
                    <Pressable style={styles.password_chg_press}>
                        <TextInput 
                        style={styles.password_chg}
                        autoCapitalize='none'
                        autoCorrect="off"
                        value={password}
                        secureTextEntry={true}
                        placeholder='change password'
                        placeholderTextColor={'#444444'}
                        selectionColor={'#696969'}
                        keyboardAppearance='dark'
                        onChangeText={i => {
                            setPassword(i)
                            !i ? setError('') : (i.length > 0 && success) && setSuccess('')
                        }}/>
                    </Pressable>
                </View>
                {(password || confirm) &&
                <View>
                    <View style={styles.password_chg_container}>
                        <Pressable style={styles.password_chg_press}>
                            <TextInput 
                            style={styles.password_chg}
                            autoCapitalize='none'
                            autoCorrect="off"
                            secureTextEntry={true}
                            value={confirm}
                            placeholder='confirm password'
                            placeholderTextColor={'#444444'}
                            selectionColor={'#696969'}
                            keyboardAppearance='dark'
                            onChangeText={i => {
                                setConfirm(i)
                                !i && setError('')
                            }}/>
                        </Pressable>
                    </View>
                    <Pressable onPress={() => passChange()} style={styles.password_chg_confirm_container}>
                        <Text style={styles.password_chg_confirm_text}>set password.</Text>
                    </Pressable>
                    <View style={styles.error_container}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                </View>}
                <View style={styles.susccess_container}>
                    <Text style={styles.success}>{success}</Text>
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
        marginBottom: 21
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
    },
    password_chg_safe: {
        marginBottom: 20,
    },
    password_chg_container: {
        width: '95%',
        marginTop: 0,
        marginBottom: 7,
        borderRadius: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    password_chg_press: {
        overflow: 'hidden',
        width: '97%',
        borderRadius: 7,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#888888'
    },
    password_chg: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
        width: '97%',
        paddingTop: 7,
        paddingBottom: 7,
        alignSelf: 'center',
    },
    password_chg_confirm_container: {
        width: '95%',
        height: 42,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777',
        shadowColor: '#222222',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    password_chg_confirm_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#444444',
    },
    error_container: {
        marginTop: 10,
        alignSelf: 'center'
    },
    error: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#b91d25'
    },
    susccess_container: {
        alignSelf: 'center'
    },
    success: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#3fa9f5'
    },
})