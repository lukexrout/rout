import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, FlatList, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../../assets/img/back.png')

const Setting = ({ navigation, setting, location }) => {

    const navigate = (x) => {
        navigation.navigate(x, {
            location: 'settings'
        })
    }

    return (
        <Pressable onPress={() => navigate(location)} style={styles.setting_container}>
            <Text style={styles.setting_text}>{setting}</Text>
        </Pressable> 
    )
}

export default function Save({ navigation, route }) {
	
    const location = route.params.location
    const logOutOpacity = useRef(new Animated.Value(0)).current

    const [settings, setSettings] = useState([
        {id: 0, setting: 'account', location: 'account'},
        {id: 1, setting: 'notifications', location: 'noti_set'},
        {id: 2, setting: 'interests', location: 'interest_set'},
        {id: 3, setting: 'data', location: 'data'},
        {id: 4, setting: 'feedback', location: 'feedback'}
    ])
    const [outStatus, setOutStatus] = useState(false)

    const navigate = (x) => {
        navigation.navigate(x)
    }
    const setting = ({ item }) => {
        return (<Setting navigation={navigation} setting={item.setting} location={item.location}/>)
    }
    const logOut = (x) => {
        if (x === 'logout') {
            setOutStatus(true)
            Animated.timing(logOutOpacity, {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }).start()
        } else if (x === 'confirm') {
            AsyncStorage.removeItem('user_id')
            AsyncStorage.removeItem('profile')
            navigation.navigate('out')
            Animated.timing(logOutOpacity, {
                toValue: 0,
                duration: 177,
                useNativeDriver: false
            }).start(() => setOutStatus(false))
        } else if (x === 'nope') {
            Animated.timing(logOutOpacity, {
                toValue: 0,
                duration: 177,
                useNativeDriver: false
            }).start(() => setOutStatus(false))
        }
    }

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <View style={styles.head_safe}>
                <SafeAreaView style={styles.back_safe}>
                    <Pressable onPress={() => navigate(location)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.settings_container}>
                    <Text style={styles.settings}>settings</Text>
                </SafeAreaView>
            </View>
            <FlatList
            listKey='settings'
            style={styles.settings_list}
            data={settings}
            renderItem={setting}
            scrollEnabled={false}
            />
            <Pressable onPress={() => logOut('logout')} style={styles.logout_container}>
                <Text style={styles.logout_text}>logout</Text>
            </Pressable>
            {outStatus === true ? 
            <Animated.View style={[styles.logout_popup_safe, {opacity: logOutOpacity}]}>
                <Pressable onPress={() => logOut('nope')} style={styles.logout_popup_background}/>
                <View style={styles.logout_popup}>
                    <View style={styles.logout_title_container}>
                        <Text style={styles.logout_title}>logout.</Text>
                    </View>
                    <View style={styles.logout_button_container}>
                        <Pressable onPress={() => logOut('nope')} style={styles.logout_button}>
                            <Text style={styles.logout_button_text}>nope</Text>
                        </Pressable>
                        <View style={styles.logout_button_sep}/>
                        <Pressable onPress={() => logOut('confirm')} style={styles.logout_button}>
                            <Text style={styles.logout_button_text}>logout</Text>
                        </Pressable>
                        
                    </View>
                </View>
            </Animated.View>
             :
            <View/>
            }
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
    settings_container: {
        alignSelf: 'center'
    },
    settings: {
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

    settings_list: {
        marginTop: 21
    },

    setting_container: {
        height: 55,
        width: window.width / 1.07,
        marginBottom: 7,
        borderRadius: 21,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#777777'
    },
    setting_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        left: 21,
        color: '#C2C2C2'
    },

    logout_container: {
        height: 42,
        width: 100,
        right: 21,
        bottom: 21,
        borderRadius: 17,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555555',
    },
    logout_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#A1A1A1'
    },


    logout_popup_safe: {
        position: 'absolute',
        height: window.height,
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logout_popup_background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.5
    },
    logout_popup: {
        // width: window.width / 1.1,
        borderRadius: 11,
        backgroundColor: '#5F5F5F'
    },
    logout_title_container: {
        marginVertical: 30,
        alignSelf: 'center'
    },
    logout_title: {
        fontFamily: 'Louis',
        fontSize: 28,
        color: '#333333'
    },
    logout_button_container: {
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    logout_button_sep: {
        width: 20
    },
    logout_button: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 7,
        backgroundColor: '#444444'
    },
    logout_button_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#A1A1A1'
    }
    
})