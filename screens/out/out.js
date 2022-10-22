import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Keyboard, Animated, Image } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const back = require('../../assets/img/go_back_icon.png')

const window = Dimensions.get('window')

export default function Out({ navigation, route }) {
	
    const [state, setState] = useState('out')
    const [outBottom, setOutBottom] = useState(window.width / 3)
    const [userInput, setUserInput] = useState('')
    const [passInput, setPassInput] = useState('')

    const userRef = useRef()
    const passRef = useRef()

    const outOpacity = useRef(new Animated.Value(1)).current
    const registerOpacity = useRef(new Animated.Value(0)).current
    const loginOpacity = useRef(new Animated.Value(0)).current
    const register_opacity = useRef(new Animated.Value(0)).current

    const nextPress = () => {
        
        axios.post('http://192.168.1.86:3000/login', {username: userInput, password: passInput})
        .then((res) => {
            setUserInput('')
            setPassInput('')
            AsyncStorage.setItem('state', res.data)
            AsyncStorage.setItem('user', userInput)
            navigation.navigate('bottom_nav')
        })
        .catch((err) => {console.error(err)})
    }

    const backPress = (x) => {


        Animated.timing(x, {
            toValue: 0,
            duration: 77,
            useNativeDriver: false
        }).start(() => {
            setState('out')

            Animated.timing(outOpacity, {
                toValue: 1,
                duration: 170,
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

            Animated.timing(x, {
                toValue: 1,
                duration: 170,
                useNativeDriver: false
            }).start()

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
            keyboardVerticalOffset={-200} 
            >
                <View style={styles.out_container}>
                    {state === 'out' ?

                    <Animated.View style={[styles.conditional_out]}>
                        <View style={styles.welcome_container}>
                            <Text style={styles.welcome_text}>welcome to rout!</Text>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text}>the <Text style={styles.free}>free</Text> social network</Text>
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

                     : state === 'login' ?

                    <Animated.View style={[styles.login_container, {opacity: loginOpacity}]}>
                        

                        <View style={styles.login_head}>
                            <Pressable style={styles.back_press} onPress={() => backPress(loginOpacity)}>
                                <Image style={styles.back} source={back}/>
                            </Pressable>
                            <View style={styles.login_text_container}>
                                <Text style={styles.login_text}>login</Text>
                            </View>
                        </View>
                        <View style={styles.login_input_container}>
                            <Pressable onPress={() => userRef.current.focus()} style={styles.login_email_input_press}>
                                <TextInput
                                value={userInput}
                                placeholder='email or username'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={userRef}
                                style={styles.login_email_input}
                                autoCapitalize='none'
                                onChangeText={i => setUserInput(i)}
                                />
                            </Pressable>
                            <Pressable onPress={() => passRef.current.focus()} style={styles.login_pass_input_press}>
                                <TextInput
                                value={passInput}
                                placeholder='password'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={passRef}
                                style={styles.login_pass_input}
                                autoCapitalize='none'
                                onChangeText={i => setPassInput(i)}
                                />
                            </Pressable>
                        </View>
                        <Pressable onPress={() => nextPress()} style={styles.login_submit_press}>
                            <Text style={styles.login_submit_text}>submit</Text>
                        </Pressable>
                    </Animated.View>
                     : state === 'register' ?
                     <Animated.View style={[styles.register_container, {opacity: registerOpacity}]}>
                        

                        <View style={styles.register_head}>
                            <Pressable style={styles.back_press} onPress={() => backPress(registerOpacity)}>
                                <Image style={styles.back} source={back}/>
                            </Pressable>
                            <View style={styles.register_text_container}>
                                <Text style={styles.register_text}>register</Text>
                            </View>
                        </View>
                        <View style={styles.register_input_container}>
                            <Pressable onPress={() => userRef.current.focus()} style={styles.register_email_input_press}>
                                <TextInput
                                value={userInput}
                                placeholder='email or phone'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={userRef}
                                style={styles.register_email_input}
                                autoCapitalize='none'
                                onChangeText={i => setUserInput(i)}
                                />
                            </Pressable>
                            <Pressable onPress={() => passRef.current.focus()} style={styles.register_pass_input_press}>
                                <TextInput
                                value={passInput}
                                placeholder='password'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={passRef}
                                style={styles.register_pass_input}
                                autoCapitalize='none'
                                onChangeText={i => setPassInput(i)}
                                />
                            </Pressable>
                            <Pressable onPress={() => passRef.current.focus()} style={styles.register_pass_confirm_press}>
                                <TextInput
                                value={passInput}
                                placeholder='confirm password'
                                placeholderTextColor={'#444444'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={passRef}
                                style={styles.register_pass_confirm}
                                autoCapitalize='none'
                                onChangeText={i => setConfirmInput(i)}
                                />
                            </Pressable>
                        </View>
                        <Pressable onPress={() => nextPress()} style={styles.register_submit_press}>
                            <Text style={styles.register_submit_text}>submit</Text>
                        </Pressable>
                    </Animated.View>
                     :
                    <View/>
                    }

                </View>
                <View style={[styles.terms_container, {}]}>
                    <Text style={styles.terms_text}>inhumanity will not be tolerated.</Text>
                </View>
            </KeyboardAvoidingView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#555555',
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
        width: window.width / 1.2,
        height: window.height / 2.8,
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
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#555555'
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
        backgroundColor: '#555555'
    },
    login_button_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 20,
        color: '#C2C2C2'
    },

    login_container: {
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
    back_press: {
        position: 'absolute',
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        width: 14,
        height: 24,
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
        backgroundColor: '#555555'
    },
    login_submit_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
    },



    register_container: {
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
    back_press: {
        position: 'absolute',
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        width: 14,
        height: 24,
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
        backgroundColor: '#555555'
    },
    register_submit_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
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