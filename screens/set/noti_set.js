import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const portFile = require('../../port.json')

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')
const info = require('../../assets/img/info.png')
const go_to = require('../../assets/img/go_to.png')

export default function NotificationSet({ navigation, route }) {
	
    const location = route.params.location
    
    const toggleOneRight = useRef(new Animated.Value(0)).current
    const toggleOneOpacity = useRef(new Animated.Value(1)).current
    const toggleTwoRight = useRef(new Animated.Value(0)).current
    const toggleTwoOpacity = useRef(new Animated.Value(1)).current
    const toggleThreeRight = useRef(new Animated.Value(0)).current
    const toggleThreeOpacity = useRef(new Animated.Value(1)).current
    const toggleFourRight = useRef(new Animated.Value(0)).current
    const toggleFourOpacity = useRef(new Animated.Value(1)).current

    const [settings, setSettings] = useState([
        {id: 0, setting: 'followers', settingText: 'followers', toggleName: 'one', toggleRight: toggleOneRight, toggleOpacity: toggleOneOpacity, status: true},
        {id: 1, setting: 'likes', settingText: 'likes', toggleName: 'two', toggleRight: toggleTwoRight, toggleOpacity: toggleTwoOpacity, status: true},
        {id: 2, setting: 'rerouts', settingText: 'rerouts', toggleName: 'three', toggleRight: toggleThreeRight, toggleOpacity: toggleThreeOpacity, status: true},
        {id: 3, setting: 'message', settingText: 'messages', toggleName: 'four', toggleRight: toggleFourRight, toggleOpacity: toggleFourOpacity, status: true}
    ])
    const [updateStatus, setUpdateStatus] = useState([])

    // still need to refactor the copied the code from the account page

    useEffect(() => {
        AsyncStorage.getItem('profile', (err, rawRes) => {
            const res = JSON.parse(rawRes)
            const privateToggle = res[6][0]['privacy']['private']
            if (privateToggle) {
                Animated.parallel([
                    Animated.timing(toggleOneRight, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: false
                    }),
                    Animated.timing(toggleOneOpacity, {
                        toValue: 1,
                        duration: 0,
                        useNativeDriver: false
                    })
                ]).start()
            }
            const settingsArr = settings
            settingsArr[0].status = privateToggle
            settingsArr[1].status = privateToggle
        })
    }, [])
    const navigate = (x, y, z) => {
        if (updateStatus === []) {
            AsyncStorage.getItem('user_id', (err, asyncRes) => {
                fetch(`http://${portFile.HOST}:${portFile.PORT}/setting`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'user_id': asyncRes,
                        'setting': 'privacy-private'
                    })
                }).then(res => res.json())
                .then(async res => {
                    if (res.error) {
                        console.error(res.error)
                    } else {
                        await AsyncStorage.getItem('profile', (err, rawRes) => {
                            let res = JSON.parse(rawRes)
                            res[6][0]['privacy']['private'] = settings[1].status
                            AsyncStorage.setItem('profile', JSON.stringify(res))
                        })
                        setUpdateStatus(false)
                    }
                })
                .catch(err => console.error(err))
            })
        }
        navigation.navigate(x, {
            location: y
        })
    }
    const handleToggle = (x, y) => {
        const toggleObj = {
            'one': [toggleOneRight, toggleOneOpacity],
            'two': [toggleTwoRight, toggleTwoOpacity],
            'three': [toggleThreeRight, toggleThreeOpacity],
            'four': [toggleFourRight, toggleFourOpacity],
        }
        if (settings[y].status === false) {
            var newObj = settings
            newObj[y].status = true
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
        } else {
            var newObj = settings
            newObj[y].status = false
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
        }
        setSettings(newObj)
    }

    const Setting = ({ item }) => {
        return (
            <View style={styles.setting_toggle_container}>
                <View style={styles.setting_toggle_text_container}>
                    <Text style={styles.setting_toggle_text}>{item.settingText}</Text>
                </View>
                <View style={styles.setting_toggle_end_container}>
                    <Pressable style={styles.info_container}>
                        <Image source={info} style={styles.info}/>
                    </Pressable>
                    <Pressable onPress={() => handleToggle(item.toggleName, item.id)} style={styles.toggle_press}>
                        <View style={styles.toggle_safe}>
                            <Animated.View style={[styles.toggle_background, {opacity: item.toggleOpacity}]}/>
                            <View style={styles.toggle_container}>
                                <Animated.View style={[styles.toggle, {right: item.toggleRight}]}/>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        )
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
                    <Pressable onPress={() => {
                        const path =  'notifications-'
                        navigate(location, 'profile', )
                    }} style={styles.back_press}> 
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.account_container}>
                    <Text style={styles.account}>notifications</Text>
                </SafeAreaView>
            </View>
            <View>
                {settings.map((item) => (
                    <Setting
                    key={item.id}
                    item={item}/>
                ))}
            </View>
            <View style={styles.setting_toggle_container}>
                <View style={styles.setting_toggle_text_container}>
                    <Text style={styles.setting_toggle_text}>accounts.</Text>
                </View>
                <View style={styles.setting_go_to_end_container}>
                    <Pressable onPress={() => navigate('noti_acc', 'noti_set')} style={styles.setting_go_to_container}>
                        <Image source={go_to} style={styles.setting_go_to}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.setting_toggle_container}>
                <View style={styles.setting_toggle_text_container}>
                    <Text style={styles.setting_toggle_text}>standards.</Text>
                </View>
                <View style={styles.setting_go_to_end_container}>
                    <Pressable onPress={() => navigate('standards', 'noti_set')} style={styles.setting_go_to_container}>
                        <Image source={go_to} style={styles.setting_go_to}/>
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
        marginBottom: 21
    },
    account_container: {
        alignSelf: 'center'
    },
    account: {
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
    },
    back: {
        width: 12,
        height: 21
    },


    
    setting_toggle_container: {
        width: '95%',
        marginTop: 0,
        marginBottom: 7,
        borderRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'

    },
    setting_toggle_text_container: {
        paddingTop: 17,
        paddingLeft: 10,
        paddingBottom: 17,
    },
    setting_toggle_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2' 
    },
    setting_toggle_end_container: {
        position: 'absolute',
        height: '100%',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toggle_press: {
        height: '100%',
        justifyContent: 'center',
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
    },
    setting_go_to_end_container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        right: 0,
    },
    setting_go_to_container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor: 'white'
    },
    setting_go_to: {
        height: 17,
        width: 9,
        right: 20,
    }
    
})