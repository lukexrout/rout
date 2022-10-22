import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Image, Pressable, Dimensions, Keyboard, SafeAreaView, FlatList, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const send_icon = require('../assets/img/send_icon.png')
const go_back_icon = require('../assets/img/go_back_icon.png')

const window = Dimensions.get('window')

const Chat = ({ pack, edit }) => {

    if (edit === true) {
        console.log('nice one dude')
    }


    // everything in front of this

    const [loaded] = useFonts({
		'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
	})
    if (!loaded) {
		return null;
	}

    return (

        
        <View style={[styles.message_container, pack.content.status === 'sender' ? {alignItems: 'flex-end',} : {alignItems: 'flex-start',}]}>
            <View style={[styles.message_bubble, pack.content.status === 'sender' ? {right: window.width / 30, backgroundColor: '#C2C2C2',} : {left: window.width / 30, backgroundColor: '#424242',}]}>
                <Text style={[styles.message_text, pack.content.status === 'sender' ? {color: '#424242',} : {color: '#C2C2C2',}]}>{pack.content.message}</Text>
            </View>
        </View>

    )
}

export default function ActiveChat({ navigation, route }) {

    const scrollRef = useRef()
    const inputRef = useRef()

    const [chat00, setChat00] = useState([
        {id: 17, edit: false, position: 'last', content: {status: 'sender', message: 'Okay cool, we will see you then :)'}}, 
        {id: 16, edit: false, position: null, content: {status: 'sender', message: 'Okay cool, we will see you then :)'}}, 
        {id: 15, edit: false, position: null, content: {status: 'sender', message: 'Okay cool, we will see you then :)'}}, 
        {id: 14, edit: false, position: null, content: {status: 'sender', message: 'Okay cool, we will see you then :)'}}, 
        {id: 13, edit: false, position: null, content: {status: 'sender', message: 'Okay cool, we will see you then :)'}}, 
        {id: 12, edit: false, position: null, content: {status: 'sender', message: 'Okay cool, we will see you then :)'}}, 
        {id: 11, edit: false, position: null, content: {status: 'reciever', message: 'Sounds perfect, and we dont really have allergies that we deal with... atleast that we know of XD'}}, 
        {id: 10, edit: false, position: null, content: {status: 'sender', message: 'Do let me know of the allergies that you and your boo have :)'}}, 
        {id: 8, edit: false, position: null, content: {status: 'reciever', message: 'That is awesome. What will we be having for dinner?'}}, 
        {id: 9, edit: false, position: null, content: {status: 'sender', message: 'The wife is planning some home cooking!'}}, 
        {id: 7, edit: false, position: null, content: {status: 'sender', message: '4:30pm should be perfect... couples game name is tonight :)'}}, 
        {id: 6, edit: false, position: null, content: {status: 'reciever', message: 'What time would you like me to come down?'}}, 
        {id: 5, edit: false, position: null, content: {status: 'reciever', message: 'Will do, no problem'}}, 
        {id: 4, edit: false, position: null, content: {status: 'sender', message: 'I am doing great, thanks for asking... you should come over later for some dinner!'}}, 
        {id: 3, edit: false, position: null, content: {status: 'reciever', message: 'I hope you are doing well!'}}, 
        {id: 2, edit: false, position: null, content: {status: 'reciever', message: 'Hello There'}},
        {id: 1, edit: false, position: null, content: {status: 'sender', message: 'Hello World'}}, 
    ])
    const [chat01, setChat01] = useState([
        {id: 1, edit: false, position: null, content: {status: 'sender', message: 'Hello World'}}, 
        {id: 2, edit: false, position: null, content: {status: 'reciever', message: 'Hello There'}}, 
        {id: 3, edit: false, position: null, content: {status: 'sender', message: 'Are you in my computer science course?'}}, 
        {id: 4, edit: false, position: null, content: {status: 'reciever', message: 'Which one specifically? I am in multiple...'}}, 
        {id: 5, edit: false, position: null, content: {status: 'sender', message: 'I believe the data analytics 201, where right now we are learning to create models about data that has been given to use by the lecturere.'}}, 
        {id: 6, edit: false, position: null, content: {status: 'reciever', message: 'Ah yes, I am in this course... what is up? would you like some help retaining to answers or something?'}}, 
        {id: 7, edit: false, position: null, content: {status: 'sender', message: 'The course materials he has given us dont seem to fit into my understanding lol, I think some gernalization about what is going on would help alot, would you mind?'}}, 
        {id: 8, edit: false, position: null, content: {status: 'reciever', message: 'I would not mind at all... what time would you like to meet up and discuss what kinda of help you would like?'}}, 
        {id: 9, edit: false, position: null, content: {status: 'sender', message: 'I think we can meet after class tomorrow if you are feeling up to it... since you dont know me and all we can sit next to eachother tomorrow if you dont care.'}},
        {id: 10, edit: false, position: 'last', content: {status: 'reciever', message: 'Yeah, that should be perfect... see you then!'}}, 

    
    ])
    const [input, setInput] = useState('')
    const [username, setUsername] = useState(null)

    

	const location = route.params.location
    const user = route.params.user
    
    useEffect(() => {
        AsyncStorage.getItem('discover_user', (err, res) => {
            setUsername(res)
        })

        const show = Keyboard.addListener('keyboardDidShow', () => {
            scrollRef.current.scrollToOffset({ animated: true, offset: 0 });
            }
        );
    
        return () => {
            show.remove();
        };

    }, [])
    
    const goBack = () => {
        navigation.navigate(location, {
            location: 'profile'
        })
    }

    const continuousChat = ({ item }) => {
		return (<Chat edit={item.edit} pack={item}  key={item.id}/>)
	}

    const sendMessage = () => {
        
    }

    const chatHandler = () => {
        
    }

    const Head = () => {

        return(
            <View style={{
            height: window.height / 6, 
            backgroundColor: '#555555', 
            width: window.width}}/>
        )
    }

    const Foot = () => {

        return(
            <View style={{
            height: window.height / 12, 
            backgroundColor: '#555555', 
            width: window.width}}/>
        )
    }


    //// new

    const inputPress = () => {
        inputRef.current.focus()
    }

    

    // everything in front of this

    const [loaded] = useFonts({
		'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
	})
    if (!loaded) {
		return null;
	}

    return (
        <View style={styles.container}>

            <StatusBar style='light' />

            <SafeAreaView style={styles.header_safe_container}>
                <View style={styles.header_container}>
                    <Pressable onPress={() => goBack()} style={styles.back_container}>
                        <Image style={styles.back} source={go_back_icon}/>
                    </Pressable>
                    <View style={styles.username_container}>
                        <Text style={styles.username_text}>{user}</Text>
                    </View>
                </View>
                
            </SafeAreaView>
            <View style={styles.chat_center_container}>
                <KeyboardAvoidingView keyboardVerticalOffset={-55} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.chat_container}>

                    <FlatList
                    ref={scrollRef}
                    // onScroll={() => Keyboard.dismiss()}
                    renderItem={continuousChat}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    inverted={true}             
                    onScrollToTop={() => console.log('hello')}
                    // onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
                    data={chat00}
                    keyboardDismissMode='none'
                    style={styles.chat_list_container}
                    ListHeaderComponent={Foot}
                    ListFooterComponent={Head}
                    />
                    <Pressable onPress={() => inputPress(scrollRef)} style={styles.input_container}>
                        <View style={styles.input_safe}>

                            <TextInput
                            ref={inputRef}
                            // value={userInput}
                            placeholder='message'
                            placeholderTextColor={'#595959'}
                            keyboardAppearance='dark'
                            selectionColor={'#696969'}
                            onChangeText={() => inputRef.current.scrollToOffset({ animated: true, offset: 0 })}
                            // ref={userRef}
                            style={styles.input}
                            multiline={true}
                            // onChangeText={i => setUserInput(i)}
                            />
                        </View>
                        <View style={styles.send_safe}>

                            <Pressable style={styles.send_container}>
                                <Image style={styles.send} source={send_icon} />
                            </Pressable>
                        </View>
                        
                    </Pressable>

                </KeyboardAvoidingView>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: window.height,
        backgroundColor: '#555555',
    },

    header_safe_container: {
        position: 'absolute',
        zIndex: 2,

        
    },
    header_container: {
        // flexDirection: 'row',
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    back_container: {
        position: 'absolute',
        alignSelf: 'flex-start',
        borderRadius: 50,
        height: window.width / 12,
        width: window.width / 12,
        left: window.width / 25,
        shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.3,
        shadowRadius: window.width / 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#424242'
    },
    back: {
        width: 14,
        height: 24,
        right: window.width / 170
    },

    username_container: {
        height: window.width / 10,
        // width: window.width / 4,
        // top: window.width / 20,
        borderRadius: window.width / 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.3,
        shadowRadius: window.width / 70,
        backgroundColor: '#424242'
    },
    username_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        marginLeft: window.width / 40,
        marginRight: window.width / 40,
        color: '#C2C2C2'
    },

    chat_center_container: {
        height: window.height,
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chat_container: {
        height: window.height + window.height / 10,
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chat_list_container: {
        width: window.width,
        height: window.height
    },
    message_container: {
        width: window.width,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    message_bubble: {
        maxWidth: window.width / 1.4,
        marginVertical: window.width / 107,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: window.width / 40
    },
    message_text: {
        fontSize: 17,
        fontFamily: 'Louis',
        marginVertical: window.width / 50,
        marginHorizontal: window.width / 30
    },

    input_container: {
        // position: 'absolute',
        borderRadius: 20,
        width: window.width / 1.1,
        // height: window.height / 27,
        backgroundColor: '#999999',
        bottom: window.height / 14,
        justifyContent: 'center'

    },
    input_safe: {
        paddingTop: 4,
		paddingBottom: 8,
    },
    input: {
        width: window.width / 1.28,
        left: window.width / 30,
        fontFamily: 'Louis',
        fontSize: 17
    },
    send_safe: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    send_container: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        height: 31,
        width: 31,
        borderRadius: 20,
        top: 3,
        right: 3,
        backgroundColor: '#5F5F5F'


    },
    send: {
        height: 19,
        width: 16
    }







})