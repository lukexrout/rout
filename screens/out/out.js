import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Keyboard, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const window = Dimensions.get('window')

export default function Out({ navigation, route }) {
	
    const [state, setState] = useState('out')
    const [outBottom, setOutBottom] = useState(window.width / 3)
    const [userInput, setUserInput] = useState('')
    const [passInput, setPassInput] = useState('')

    const userRef = useRef()
    const passRef = useRef()

    const out_opacity = useRef(new Animated.Value(1)).current
    const login_opacity = useRef(new Animated.Value(0)).current
    const register_opacity = useRef(new Animated.Value(0)).current

    const nextPress = () => {
        
        axios.post('http://localhost:3000/login', {username: userInput, password: passInput})
        .then((res) => {
            setUserInput('')
            setPassInput('')
            AsyncStorage.setItem('state', res.data)
            AsyncStorage.setItem('user', userInput)
            navigation.navigate('bottom_nav')
        })
        .catch((err) => {console.error(err)})
    }

    const backPress = () => [

    ]

    const loginPress = () => {

        setState('login')

        Animated.parallel([
            Animated.timing(login_opacity, {
                toValue: 1,
                duration: 117,
                useNativeDriver: false
            }),
            Animated.timing(out_opacity, {
                toValue: 0,
                duration: 117,
                useNativeDriver: false
            })
        ]).start()


    }

    const registerPress = () => {

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
            keyboardVerticalOffset={-100} 
            >
                <View style={styles.out_container}>
                    {state === 'out' ?

                    <Animated.View style={[styles.conditional_out]}>
                        <View style={styles.welcome_container}>
                            <Text style={styles.welcome_text}>welcome to rout!</Text>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text}>the only 'free' social network</Text>
                            </View>
                        </View>
                        <View style={styles.button_container}>
                            <Pressable onPress={() => registerPress()} style={styles.register_container}>
                                <Text style={styles.register_text}>register</Text>
                            </Pressable>
                            <View style={{height: window.width / 30}}/>
                            <Pressable onPress={() => loginPress()} style={styles.login_container}>
                                <Text style={styles.login_text}>login</Text>
                            </Pressable>
                        </View>
                    </Animated.View>

                     : state === 'login' ?

                    <Animated.View style={[styles.conditional_login, {opacity: login_opacity}]}>
                        <View style={styles.login_}>
                            <Text style={styles.login}>login</Text>
                        </View>
                        <View style={styles.login_input_container}>
                            <Pressable onPress={() => userRef.current.focus()} style={styles.login_user}>
                                <TextInput
                                value={userInput}
                                placeholder='username'
                                placeholderTextColor={'#595959'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={userRef}
                                style={styles.login_input}
                                onChangeText={i => setUserInput(i)}
                                />
                            </Pressable>
                            <View style={{height: window.width / 30}}/>
                            <Pressable onPress={(() => passRef.current.focus())} style={styles.login_pass}>
                                <TextInput
                                value={passInput}
                                placeholder='password'
                                placeholderTextColor={'#595959'}
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                ref={passRef}
                                style={styles.login_input}
                                onChangeText={i => setPassInput(i)}
                                />
                            </Pressable>
                        </View>
                        <Pressable onPress={() => nextPress()} style={styles.login_button}>
                            <Text style={styles.login_button_text}>next</Text>
                        </Pressable>
                    </Animated.View>
                    : 
                    <View></View>
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
        height: window.height / 3.4,
        borderRadius: window.width / 17,
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
        bottom: window.width / 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 12,
        color: '#C2C2C2'
    },
    description_container: {
        top: window.width / 30
    },
    description_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 24,
        color: '#C2C2C2'
    }, 
    
    
    button_container: {
        top: window.width / 17
    },  
    register_container: {
        width: window.width / 2,
        height: window.width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: window.width / 50,
        shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
        backgroundColor: '#888888'
    },
    register_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 20,
        color: '#C2C2C2'
    },
    login_container: {
        zIndex: 2,
        width: window.width / 2,
        height: window.width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: window.width / 50,
        shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
        backgroundColor: '#888888'
    },
    login_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 20,
        color: '#C2C2C2'
    },
    conditional_login: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_: {
        bottom: window.width / 20,
    },
    login: {
        fontFamily: 'Louis',
        fontSize: window.width / 12.77,
        color: '#C2C2C2'
    },
    login_input_container: {
        top: window.width / 70
    },  
    login_input: {
      fontSize: window.width / 21,
      fontFamily: 'Louis'
    },
    login_user: {
        backgroundColor: '#888888',
        width: window.width / 1.5,
        height: window.width / 10,
        borderRadius: window.width / 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_pass: {
        backgroundColor: '#888888',
        width: window.width / 1.5,
        height: window.width / 10,
        borderRadius: window.width / 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_button: {
        top: window.width / 14,
        width: window.width / 3,
        height: window.width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: window.width / 70,
        shadowColor: '#333333',
        shadowOffset: {height: 0},
        shadowOpacity: 0.3,
        shadowRadius: window.width / 110,
        backgroundColor: '#888888'
    },
    login_button_text: {
        fontFamily: 'Louis',
        fontSize: window.width / 20,
        color: '#C2C2C2'
    },
    terms_container: {
        top: window.width / 21
    },
    terms_text: {
        textAlign: 'center',
        fontFamily: 'Louis',
        fontSize: window.width / 24,
        color: '#BBBBBB',
        textDecorationLine: 'underline',
        // textDecorationStyle: 'solid'
    },
})