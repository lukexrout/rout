import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const portFile = require('../../port.json')

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')
const info = require('../../assets/img/info.png')
const go_to = require('../../assets/img/go_to.png')

export default function Privacy({ navigation, route }) {
	
    const location = route.params.location
    
    const toggleOneRight = useRef(new Animated.Value(20)).current
    const toggleOneOpacity = useRef(new Animated.Value(0)).current

    const [settings, setSettings] = useState([
        {id: 0, setting: 'private', settingText: 'private?', toggleName: 'one_same', toggleRight: toggleOneRight, toggleOpacity: toggleOneOpacity, status: false},
        {id: 1, setting: 'private', settingText: 'private?', toggleName: 'one', toggleRight: toggleOneRight, toggleOpacity: toggleOneOpacity, status: false},
    ])
    const [blockList, setBlockList] = useState()

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
    const navigate = (x, y) => {
        if (settings[0].status !== settings[1].status) {
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
                    <Pressable onPress={() => navigate(location, 'profile')} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.account_container}>
                    <Text style={styles.account}>account</Text>
                </SafeAreaView>
            </View>
            <View>
                <View style={styles.setting_toggle_container}>
                    <View style={styles.setting_toggle_text_container}>
                        <Text style={styles.setting_toggle_text}>private.</Text>
                    </View>
                    <View style={styles.setting_toggle_end_container}>
                        <Pressable style={styles.info_container}>
                            <Image source={info} style={styles.info}/>
                        </Pressable>
                        <Pressable onPress={() => handleToggle('one', 1)} style={styles.toggle_press}>
                            <View style={styles.toggle_safe}>
                                <Animated.View style={[styles.toggle_background, {opacity: toggleOneOpacity}]}/>
                                <View style={styles.toggle_container}>
                                    <Animated.View style={[styles.toggle, {right: toggleOneRight}]}/>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.setting_toggle_container}>
                    <View style={styles.setting_toggle_text_container}>
                        <Text style={styles.setting_toggle_text}>email & phone.</Text>
                    </View>
                    <View style={styles.setting_go_to_end_container}>
                        <Pressable onPress={() => navigate('email-phone', 'account')} style={styles.setting_go_to_container}>
                            <Image source={go_to} style={styles.setting_go_to}/>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.setting_toggle_container}>
                    <View style={styles.setting_toggle_text_container}>
                        <Text style={styles.setting_toggle_text}>password.</Text>
                    </View>
                    <View style={styles.setting_go_to_end_container}>
                        <Pressable onPress={() => navigate('password', 'account')} style={styles.setting_go_to_container}>
                            <Image source={go_to} style={styles.setting_go_to}/>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.accounts_list_title_container}>
                <Text style={styles.accounts_list_title}>block list.</Text>
            </View>
            <View style={styles.accounts_list_container}>
                <View style={styles.accounts_list_search_container}>
                    <TextInput
                    returnKeyType='done'
                    style={styles.accounts_list_search}
                    // value={'actual email'}
                    placeholder='search'
                    placeholderTextColor={'#595959'}
                    selectionColor={'#696969'}
                    keyboardAppearance='dark'/>
                </View>
                    {blockList === undefined &&
                    <View style={styles.block_list_alert_container}>
                        <Text style={styles.block_list_alert}>no one has been blocked :D</Text>
                        <Text style={[styles.block_list_alert, {top: 17}]}>yet.</Text>
                    </View>}
                    
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
    },
    accounts_list_title_container: {
        width: '95%',
        borderRadius: 14,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    accounts_list_title: {
        fontFamily: 'Louis',
        fontSize: 19,
        color: '#C2C2C2',
        marginVertical: 10
    },
    accounts_list_container: {
        flex: 1,
        width: '95%',
        marginTop: 7,
        marginBottom: 21,
        borderRadius: 17,
        alignSelf: 'center',
        backgroundColor: '#888888'
    },
    accounts_list_search_container: {
        zIndex: 1,
        position: 'absolute',
        overflow: 'hidden',
        width: '95%',
        top: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#C2C2C2'
    },
    accounts_list_search: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#444444',
        width: '97%',
        paddingTop: 7,
        paddingBottom: 7,
        alignSelf: 'center',
    },
    block_list_alert_container: {
        zIndex: 0,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    block_list_alert: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#c2c2c2',
    }
    
})