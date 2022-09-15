import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, Image, TextInput, KeyboardAvoidingView, FlatList, Keyboard, SafeAreaView, KeyboardAvoidingViewComponent } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Websocket = require('ws')
const window = Dimensions.get('window')
const go_back_icon = require('../assets/img/go_back_icon.png')
const profile_img = require('../assets/img/user_profile_template.png')

const url = 'ws://localhost:8080'

// const connection = new Websocket(url)
// const read = Readline.createInterface(process.stdin, process.stdout)
// let user = {user_one: '', user_two: ''}

const Chat = ({ source, navigation, route, user, time }) => {


    

    const navToChat = () => {
        navigation.navigate('active_chat', {
            location: 'direct_msg',
            user: '@jacob_77'
        })
        
        
    }

    

    return (
    <SafeAreaView style={styles.user_message_button_container}>
        <Pressable onPress={navToChat} style={styles.user_message_button}>
            <View style={styles.user_message_row}>
                <Image source={profile_img} style={styles.user_message_profile_image}/>
                <View style={styles.user_message_text_container}>
                    <Text style={styles.user_message_username}>{source.username}</Text>
                    <Text style={styles.user_message_sample_message}>{source.message}</Text>
                </View>
                <Text style={styles.user_message_time_text}>{time}</Text>
            </View>

        </Pressable>
        <View style={styles.user_message_gap}/>
    </SafeAreaView>)
}


export default function Direct_Msg({ navigation, route }) {
	
    const [chatDirectory, setChatDirectory] = useState([
        {id: 1, time: '3h', username: '@jacob_77', message: 'okay cool, we will see you then :)'}, 
        {id: 2, time: '20s', username: '@ashley', message: 'Yeah, that should be perfect...'}
    ]) 

    const location = route.params.location
    
    const goBack = () => {
        
        if (location === '_user') {

            navigation.navigate('discover_nav', {
                screen: location,
                params: {
    
                    location: 'discover'
                }
            })

        } else if (location === 'profile') {
            navigation.navigate(location)
        }
    }
    

    const multiChat = ({ item }) => {


        return (<Chat route={route} navigation={navigation} user={item.username} source={item} time={item.time} key={item.id} />)
    }

    useEffect(() => {
        
    //     connection.onopen = () => {

    //         read.question('what is your username? ', (input) => {
    //             const message = {type: 'init', username: input}
    //             user.user_one = input
    //             connection.send(JSON.stringify(message))
    //             // console.log(user)
    //             read.question('Who do you want to send to? ', (input) => {
    //                 user.user_two = input
    //                 console.log(user)
    //             })
    //         })
    
    //         read.on('line', (input) => {
    //             const message = {type: 'message', 
    //             room_id: 12345, 
    //             input: input, 
    //             user_one: user.user_one, 
    //             user_two: user.user_two
    //             }
    //             connection.send(JSON.stringify(message))
    //         })
    //     }
    
    //     connection.onerror = (err) => {
    //         console.error(err)
    //     }
    
    //     connection.onmessage = (i) => {
    //         console.log(i.data)
    //     }
    }, [])
    

    const [loaded] = useFonts({
		'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
		// 'LinLibertime': require('../assets/fonts/LinLibertime.ttf')
	})
    if (!loaded) {
		return null;
	}



    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.go_back_title_row}>
                <Pressable onPress={goBack} style={styles.go_back_icon_container}>
                        <Image source={go_back_icon} style={styles.go_back_icon}/>
                </Pressable>
                <Text style={styles.message_title}>Messages</Text>
            </SafeAreaView>
            
            <FlatList 
            style={{width: window.width}}
            data={chatDirectory}
            renderItem={multiChat}
            />

            {/* <Bottom_Nav/> */}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#555555'
    },
    
    go_back_title_row: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        marginBottom: window.width / 30
        // marginBottom: window.height - window.height / 15
    },
    message_title: {
        // position: 'absolute',
        // top: window.height / 17,,
        color: '#222222',
        fontFamily: 'Louis',
        fontSize: window.width / 15
    },
    go_back_icon_container: {
        // zIndex: 2,
        position: 'absolute',
        left: window.width  / 25,
        top: window.height / 18,
        width: window.width / 13,
        height: window.width / 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    go_back_icon: {
        position: 'absolute',
        width: window.width / 27,
        height: window.width / 15
    },


    user_message_button_container: {
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center',
        // top: window.width / 25
    },
    user_message_gap: {
        height: window.width / 60
    },
    user_message_button: {
        // position: 'absolute',
        width: window.width / 1.03,
        height: window.width / 5,
        // top: window.width / 50,
        justifyContent: 'center',
        borderRadius: window.width / 30,
        backgroundColor: '#424242'
    },
    user_message_row: {
        flexDirection: 'row',
        left: window.width / 50
    },
    user_message_profile_image: {
        width: window.width / 7,
        height: window.width / 7,
        borderRadius: 50,
        
    },
    user_message_text_container: {
        left: window.width / 70

    },
    user_message_username: {
        fontSize: window.width / 20,
        color: '#C2C2C2',
        fontFamily: 'Louis',
    },
    user_message_sample_message: {
        color: '#909090',
        fontFamily: 'Louis',
        top: window.width / 40,
        left: window.width / 100,
        width: window.width / 1.43,
        fontSize: window.width / 22,

    },
    user_message_time_text: {
        color: '#171717',
        // left: window.width / 5
    },






    
})