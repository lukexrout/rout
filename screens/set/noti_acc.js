import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated, TextInput } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')
const info = require('../../assets/img/info.png')
const go_to = require('../../assets/img/go_to.png')

export default function NotificationAccounts({ navigation, route }) {
	
    const location = route.params.location
    const base = route.params.base
    
    const toggleOneRight = useRef(new Animated.Value(0)).current
    const toggleOneOpacity = useRef(new Animated.Value(1)).current

    const [settings, setSettings] = useState([
        {id: 0, setting: 'status', settingText: 'posts from accounts', toggleName: 'one', toggleRight: toggleOneRight, toggleOpacity: toggleOneOpacity, status: true},
    ])
    const [accounts, setAccounts] = useState([])

    const navigate = (x, y) => {
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
                    <Pressable onPress={() => navigate(location, base)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.account_container}>
                    <Text style={styles.account}>accounts</Text>
                </SafeAreaView>
            </View>
            <View>
                {settings.map((item) => (
                    <Setting
                    key={item.id}
                    item={item}/>
                ))}
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
    }
    
})