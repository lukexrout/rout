import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, Image, TextInput, KeyboardAvoidingView, FlatList, Keyboard, SafeAreaView, KeyboardAvoidingViewComponent } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Websocket = require('ws')
const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
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
            </View>
            <View style={styles.user_message_time_text_container}>

                <Text style={styles.user_message_time_text}>{time}</Text>
            </View>

        </Pressable>
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
            <View style={styles.go_back_title_row}>
                    <SafeAreaView style={styles.go_back_icon_container}>
                <Pressable onPress={goBack} style={styles.go_back_icon_press}>
                        
                        <Image source={back} style={styles.back}/>
                </Pressable>
                    </SafeAreaView>
                <SafeAreaView style={styles.message_container}>

                    <Text style={styles.message_title}>messages</Text>
                </SafeAreaView>
            </View>
            
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
        // justifyContent: 'center',
        alignItems: 'center',
        width: window.width,
        zIndex: 2,
        marginBottom: window.height / 40
    },
    message_container: {

    },
    message_title: {
        fontFamily: 'Louis',
        fontSize: 32,
        color: '#C2C2C2'
    },
    go_back_icon_container: {
        position: 'absolute',      
        alignSelf: 'flex-start',
        flexDirection: 'row',
        left: window.width / 30,
        // backgroundColor: 'blue',
        height: '100%'
    },
    go_back_icon_press: {
        width: 28,
        height: 28,
        // backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    
    back: {
        width: 12,
        height: 21
    },


    user_message_button_container: {
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7
    },
    user_message_button: {
        width: window.width / 1.04,
        height: window.height / 14,
        justifyContent: 'center',
        borderRadius: window.width / 30,
        backgroundColor: '#717171'
    },
    user_message_row: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        left: window.width / 50
    },
    user_message_profile_image: {
        width: 42,
        height: 42,
        borderRadius: 50,
        
    },
    user_message_text_container: {
        left: window.width / 70

    },
    user_message_username: {
        fontSize: 17,
        color: '#C2C2C2',
        fontFamily: 'Louis',
    },
    user_message_sample_message: {
        color: '#171717',
        fontFamily: 'Louis',
        top: 3,
        left: window.width / 100,
        width: window.width / 1.43,
        fontSize: 16,

    },
    user_message_time_text_container: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 7,
        right: 7
    },
    user_message_time_text: {
        color: '#171717',
    },






    
})