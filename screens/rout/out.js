import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Keyboard, Animated, Image } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const portFile = require('../../port.json')

const back = require('../../assets/img/go_back_icon.png')

const window = Dimensions.get('window')

export default function Out({ navigation, route }) {
	
    const userRef = useRef()
    const passRef = useRef()
    const usernameRef = useRef()
    const confirmPassRef = useRef()
    const outOpacity = useRef(new Animated.Value(1)).current
    const registerOpacity = useRef(new Animated.Value(0)).current
    const loginOpacity = useRef(new Animated.Value(0)).current
    const errorOpacity = useRef(new Animated.Value(0)).current
    const backAnim = useRef(new Animated.Value(0)).current
    const usernameOpacity = useRef(new Animated.Value(0)).current

    const [state, setState] = useState('out')
    const [outBottom, setOutBottom] = useState(window.width / 3)
    const [userInput, setUserInput] = useState('')
    const [passInput, setPassInput] = useState('')
    const [confirmPassInput, setConfirmPassInput] = useState('')
    const [username, setUsername] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState('')

    const handleRegister = () => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)
        const phoneTest = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(userInput)
        const numberRegex = /\d/.test(passInput)
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/.test(passInput)
        const caseRegex = /[A-Z]/.test(passInput)
        const lengthRegex = /^.{7,}$/.test(passInput)
        const spaceRegex = /\s/.test(passInput)
        const type = emailTest ? 'email' : phoneTest && 'phone'
        if (!userInput || !passInput || !confirmPassInput) {
            setError(`cannot have empty fields.`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        } else if (!emailTest && !phoneTest) {
            setError(`email or phone format incorrect.`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        } else if (confirmPassInput !== passInput) {
            setError(`passwords do not match.`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        } else if (spaceRegex) {
            setError(`password can't contain spaces.`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        } else if (!numberRegex || !symbolRegex || !caseRegex || !lengthRegex) {
            const testObj = {
                numTest: numberRegex,
                symTest: symbolRegex,
                casTest: caseRegex,
                lenTest: lengthRegex
            }
            const testArr = [!testObj.numTest ? ' number' : 0, !testObj.symTest ? ' symbol' : 0, !testObj.casTest ? ' upperCase': 0, !testObj.lenTest ? ' length 7+' : 0]
            const newArr = testArr.filter((i) => i !== 0).join(',')
            setError(`needs: ${newArr}`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        } else {
            setType(type)
            setError('')
            Animated.parallel([
                Animated.timing(usernameOpacity, {
                    toValue: 1,
                    duration: 177,
                    useNativeDriver: false
                }),
                error !== '' && 
                Animated.timing(errorOpacity, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false
                })
            ]).start(() => setState('username'))
        }
    }
    const registerReq = () => {
        let reqObj = {}
        reqObj['username'] = username
        reqObj[type] = type === 'email' ? userInput : userInput.replace(/\D/g, '') // phone number to string of int - 1231231234
        reqObj['password'] = passInput
        fetch(`http://${portFile.HOST}:3000/register/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqObj)
        }).then((res) => res.json())
        .then((res) => {
            if (res.error === 'email' || res.error === 'phone') {
                backPress(usernameOpacity, registerOpacity, 'register')
                if (!error) {
                    setError(`${type} already exists.`)
                    Animated.timing(errorOpacity, {
                        toValue: 1,
                        duration: 177,
                        useNativeDriver: false
                    }).start()
                    return
                }
            } else if (res.error === 'username') {
                if (!error) {
                    setError(`username already exists.`)
                    Animated.timing(errorOpacity, {
                        toValue: 1,
                        duration: 177,
                        useNativeDriver: false
                    }).start()
                    return
                }
            } else {
                setError('')
                setUserInput('')
                setPassInput('')
                setConfirmPassInput('')
                AsyncStorage.setItem('user_id', res.user_id)
                navigation.navigate('bottom_nav')
            }
        })
        .catch((err) => console.error(err))
    }
    const handleLogin = () => {
        console.log(portFile.HOST)
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)
        const phoneTest = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(userInput)
        const type = emailTest ? 'email' : phoneTest && 'phone'
        if (!userInput || !passInput) {
            setError(`cannot have empty fields.`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        } else if (!emailTest && !phoneTest) {
            setError(`email or phone format incorrect.`)
            Animated.timing(errorOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
            return
        }
        setType(type)
        const reqObj = {}
        reqObj[type] = type === 'email' ? userInput : userInput.replace(/\D/g, '')
        reqObj['password'] = passInput
        fetch(`http://${portFile.HOST}:3000/login/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqObj)
        }).then((res) => res.json())
        .then((res) => {
            console.log(res.error)
            if (res.error === 'password') {
                setError(`incorrect password.`)
                Animated.timing(errorOpacity, {
                    toValue: 1,
                    duration: 177,
                    useNativeDriver: false
                }).start()
                return
            } else if (res.error === 'email' || res.error === 'phone') {
                setError(`${res.error} doesn't exist.`)
                Animated.timing(errorOpacity, {
                    toValue: 1,
                    duration: 177,
                    useNativeDriver: false
                }).start()
                return
            } else {
                setError('')
                setUserInput('')
                setPassInput('')
                AsyncStorage.setItem('user_id', res[0])
                navigation.navigate('bottom_nav')
            }
        })
        .catch(err => console.error(err))
        
        
    }
    const backPress = (x, y, z) => {
        if (z !== 'register') {
            setUserInput('')
            setPassInput('')
            setConfirmPassInput('')
        }
        Animated.parallel([
            Animated.timing(x, {
                toValue: 0,
                duration: 77,
                useNativeDriver: false
            }),
            error !== '' && 
            Animated.timing(errorOpacity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false
            }),
            (state !== 'username' && state !== 'username') && 
            Animated.timing(backAnim, {
                toValue: 0,
                duration: 77,
                useNativeDriver: false
            })
        ]).start(() => {
            setState(z)
            {error !== '' && setError('')}
            Animated.timing(y, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
        })
    }
    const selectPress = (x, y) => {
        Animated.timing(outOpacity, {
            toValue: 0,
            duration: 77,
            useNativeDriver: false
        }).start(() => {
            setState(y)
            Animated.parallel([
                Animated.timing(backAnim, {
                    toValue: 2,
                    duration: 177,
                    useNativeDriver: false
                }),
                Animated.timing(x, {
                    toValue: 1,
                    duration: 177,
                    useNativeDriver: false
                })
            ]).start()
        })
    }

    // everything in front of this

    const [loaded] = useFonts({
		Louis: require('../../assets/fonts/Louis_George_Cafe.ttf')
	});
	
	if (!loaded) {
		return null;
	}

    return (
        <View style={styles.container}>
            <SafeAreaView styles={styles.rout_container}>
                <Text style={styles.rout_text}>rout</Text>
            </SafeAreaView>
            <KeyboardAvoidingView 
            style={styles.out_center_container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={-140}>
                <View style={styles.out_container}>
                    <Animated.View style={[styles.back_safe, {opacity: backAnim, zIndex: backAnim}]}>
                        <Pressable style={styles.back_press} onPress={() => backPress(
                        state === 'login' ? loginOpacity : state ==='register' ? registerOpacity : state === 'username' && usernameOpacity, 
                        state === 'login' || state === 'register' ? outOpacity : state === 'username' && registerOpacity,
                        state === 'login' || state === 'register' ? 'out' : state === 'username' && 'register')}>
                            <Image style={styles.back} source={back}/>
                        </Pressable>
                    </Animated.View>
                    {state === 'out' ?
                    <Animated.View style={[styles.conditional_out]}>
                        <View style={styles.welcome_container}>
                            <Text style={styles.welcome_text}>welcome to rout!</Text>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text}>made for <Text style={styles.free}>creators</Text>.</Text>
                            </View>
                        </View>
                        <View style={styles.button_container}>
                            <Pressable onPress={() => selectPress(registerOpacity, 'register')} style={styles.register_button}>
                                <Text style={styles.register_button_text}>register</Text>
                            </Pressable>
                            <View style={{height: window.width / 30}}/>
                            <Pressable onPress={() => selectPress(loginOpacity, 'login')} style={styles.login_button}>
                                <Text style={styles.login_button_text}>login</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                    
                    : state === 'register' ?
                    <Animated.View style={[styles.register_container, {opacity: registerOpacity}]}>
                        <View style={styles.register_head}>
                            
                            <View style={styles.register_text_container}>
                                <Text style={styles.register_text}>register</Text>
                            </View>
                        </View>
                        <View style={styles.register_input_container}>
                            <Pressable onPress={() => userRef.current.focus()} style={styles.register_email_input_press}>
                                <TextInput
                                returnKeyType='next'
                                value={userInput}
                                placeholder='email or phone'
                                placeholderTextColor={'#444444'}
                                keyboardType='email-address'
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={userRef}
                                style={styles.register_email_input}
                                autoCapitalize='none'
                                onChangeText={i => setUserInput(i)}
                                onSubmitEditing={() => passRef.current.focus()}/>
                            </Pressable>
                            <Pressable onPress={() => passRef.current.focus()} style={styles.register_pass_input_press}>
                                <TextInput
                                secureTextEntry={true}
                                returnKeyType='next'
                                value={passInput}
                                placeholder='password'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={passRef}
                                style={styles.register_pass_input}
                                autoCapitalize='none'
                                onChangeText={i => setPassInput(i)}
                                onSubmitEditing={() => confirmPassRef.current.focus()}/>
                            </Pressable>
                            <Pressable onPress={() => confirmPassRef.current.focus()} style={styles.register_pass_confirm_press}>
                                <TextInput
                                secureTextEntry={true}
                                returnKeyType='next'
                                value={confirmPassInput}
                                placeholder='confirm password'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={confirmPassRef}
                                style={styles.register_pass_confirm}
                                autoCapitalize='none'
                                onChangeText={i => setConfirmPassInput(i)}
                                onSubmitEditing={() => handleRegister()}/>
                            </Pressable>
                        </View>
                        <View style={styles.error_container}>
                            <Animated.Text style={[styles.error, {opacity: errorOpacity}]}>{error}</Animated.Text>
                        </View>
                        <Pressable onPress={() => handleRegister()} style={styles.register_submit_press}>
                            <Text style={styles.register_submit_text}>next</Text>
                        </Pressable>
                    </Animated.View>
                     : state === 'login' ?
                    <Animated.View style={[styles.login_container, {opacity: loginOpacity}]}>
                        <View style={styles.login_head}>
                            <View style={styles.login_text_container}>
                                <Text style={styles.login_text}>login</Text>
                            </View>
                        </View>
                        <View style={styles.login_input_container}>
                            <Pressable onPress={() => userRef.current.focus()} style={styles.login_email_input_press}>
                                <TextInput
                                returnKeyType='next'
                                value={userInput}
                                placeholder='email or phone'
                                keyboardType='email-address'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={userRef}
                                style={styles.login_email_input}
                                autoCapitalize='none'
                                onChangeText={i => setUserInput(i)}
                                onSubmitEditing={() => passRef.current.focus()}/>
                            </Pressable>
                            <Pressable onPress={() => passRef.current.focus()} style={styles.login_pass_input_press}>
                                <TextInput
                                secureTextEntry={true}
                                returnKeyType='go'
                                value={passInput}
                                placeholder='password'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={passRef}
                                style={styles.login_pass_input}
                                autoCapitalize='none'
                                onChangeText={i => setPassInput(i)}
                                onSubmitEditing={() => handleLogin()}/>
                            </Pressable>
                        </View>
                        <View style={styles.error_container}>
                            <Animated.Text style={[styles.error, {opacity: errorOpacity}]}>{error}</Animated.Text>
                        </View>
                        <Pressable onPress={() => handleLogin()} style={styles.login_submit_press}>
                            <Text style={styles.login_submit_text}>ok</Text>
                        </Pressable>
                    </Animated.View>
                     : state === 'username' &&
                    <Animated.View style={[styles.username_container, {opacity: usernameOpacity}]}>
                    <View style={styles.username_head}>
                        <View style={styles.username_text_container}>
                            <Text style={styles.username_text}>username</Text>
                        </View>
                    </View>
                    
                    <View style={styles.username_input_container}>
                        <View style={styles.username_title_container}>
                            <Text style={styles.username_title}>rout username.</Text>
                        </View>
                        <Pressable onPress={() => usernameRef.current.focus()} style={styles.username_input_press}>
                            <TextInput
                            secureTextEntry={false}
                            returnKeyType='join'
                            value={username}
                            placeholder='username'
                            placeholderTextColor={'#444444'}
                            keyboardAppearance='dark'
                            selectionColor={'#696969'}
                            ref={usernameRef}
                            style={styles.username_input}
                            autoCapitalize='none'
                            onChangeText={i => setUsername(i)}
                            onSubmitEditing={() => registerReq()}/>
                        </Pressable>
                    </View>
                    <View style={styles.error_container}>
                        <Animated.Text style={[styles.error, {opacity: errorOpacity}]}>{error}</Animated.Text>
                    </View>
                    <Pressable onPress={() => registerReq()} style={styles.username_submit_press}>
                        <Text style={styles.username_submit_text}>join</Text>
                    </Pressable>
                </Animated.View>}
                </View>
                <View style={[styles.terms_container, {}]}>
                    <Text style={styles.terms_text}>inhumanity will not be welcomed.</Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#5F5F5F',
        alignItems: 'center'
    },
    rout_container: {
        top: window.width / 9
    },
    rout_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 10,
        color: '#C2C2C2'
    },
    out_center_container: {
        width: window.width,
        height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: window.width / 4
    },
    out_container: {
        width: 350,
        height: 300,
        borderRadius: 17,
        shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.3,
        shadowRadius: window.width / 70,
        justifyContent: 'center',
        alignItems: 'center',
        // bottom: window.width / 2,
        backgroundColor: '#777777'
    },
    conditional_out: {
        zIndex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    welcome_container: {
        flex: 1,
        // bottom: window.width / 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome_text: {
        fontFamily: 'Louis',
        fontSize: 33,
        color: '#C2C2C2'
    },
    description_container: {
        top: 10
    },
    description_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 24,
        color: '#C2C2C2'
    }, 
    free: {
        color: '#171717'
    },
    back_safe: {
        position: 'absolute',
        height: 70,
        top: 0,
        left: 0,
    },
    back_press: {
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        width: 12,
        height: 21
    },
    
    
    button_container: {
        flex: 1
        // top: window.width / 17
    },  
    register_button: {
        width: window.width / 2,
        height: window.width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: window.width / 50,
        // shadowColor: 'black',
        // shadowOffset: {height: 0},
        // shadowOpacity: 0.7,
        // shadowRadius: 4,
        backgroundColor: '#5F5F5F'
    },
    register_button_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 20,
        color: '#C2C2C2'
    },
    login_button: {
        zIndex: 2,
        width: window.width / 2,
        height: window.width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: window.width / 50,
        // shadowColor: 'black',
        // shadowOffset: {height: 0},
        // shadowOpacity: 0.7,
        // shadowRadius: 4,
        backgroundColor: '#5F5F5F'
    },
    login_button_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 20,
        color: '#C2C2C2'
    },

    login_container: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 17
    },
    login_head: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#5F5F5F'
    },
    
    login_text_container: {
        alignSelf: 'center'
    },
    login_text: {
        fontFamily: 'Louis',
        fontSize: 28,
        color: '#C2C2C2'
    },
    login_input_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_email_input_press: {
        height: 33,
        width: 210,
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A1A1'
    },
    login_email_input: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: 'black'
    },
    login_pass_input_press: {
        height: 33,
        width: 210,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A1A1'
    },
    login_pass_input: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: 'black'
    },
    login_submit_press: {
        height: 44,
        width: '97%',
        marginBottom: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: '#5F5F5F'
    },
    login_submit_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
    },



    register_container: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 17
    },
    register_head: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#5F5F5F'
    },
    register_text_container: {
        alignSelf: 'center'
    },
    register_text: {
        fontFamily: 'Louis',
        fontSize: 28,
        color: '#C2C2C2'
    },
    register_input_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    register_email_input_press: {
        height: 33,
        width: 210,
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A1A1'
    },
    register_email_input: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: 'black'
    },
    register_pass_input_press: {
        height: 33,
        width: 210,
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A1A1'
    },
    register_pass_input: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: 'black'
    },
    register_pass_confirm_press: {
        height: 33,
        width: 210,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A1A1'
    },
    register_pass_confirm: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: 'black'
    },
    register_submit_press: {
        height: 44,
        width: '97%',
        marginBottom: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: '#5F5F5F'
    },
    register_submit_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
    },
    

    username_container: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 17
    },
    username_head: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#5F5F5F'
    },
    
    username_text_container: {
        alignSelf: 'center'
    },
    username_text: {
        fontFamily: 'Louis',
        fontSize: 28,
        color: '#C2C2C2'
    },
    username_input_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username_title_container: {
        marginBottom: 10
    },
    username_title: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
    },
    username_input_press: {
        height: 33,
        width: 210,
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A1A1'
    },
    username_input: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: 'black'
    },
    username_submit_press: {
        height: 44,
        width: '97%',
        marginBottom: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: '#5F5F5F'
    },
    username_submit_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
    },



    error_container: {
        position: 'absolute',
        bottom: 55,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    error: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#b91d25'
    },





    
    terms_container: {
        top: window.height / 47
    },
    terms_text: {
        textAlign: 'center',
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
    },
})