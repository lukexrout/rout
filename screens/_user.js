import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Button, View, Pressable, Image, Dimensions, SafeAreaView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useFonts } from 'expo-font';
// import Bottom_Nav from '../components/bottom_nav';

const window = Dimensions.get('window')

const go_back_icon = require('../assets/img/go_back_icon.png')
const profile_img = require('../assets/img/user_profile_template.png')
const info_icon = require('../assets/img/info_icon.png')

export default function Profile({ navigation, route }) {
	
    // var username = 'schaffer_luke'
    

    const location = route.params.location
    const [username, setUsername] = useState(null)
    const [followColor, setFollowColor] = useState('#333333')
    const [followText, setFollowText] = useState('#C2C2C2')
    const [relation, setRelation] = useState(false)

    const followOpacity = useRef(new Animated.Value(1)).current
    const followedOpacity = useRef(new Animated.Value(0)).current

    const getUser  = (i) => {
        AsyncStorage.getItem('discover_user', (err, res) => {
            setUsername(res)
            i(res)
        })
    }

    useEffect(() => {
        
        

        getUser((i) => {

            axios.post('http://localhost:3000/follow_check', { self: 'user04', _user: i })
            .then((res) => {


                if (res.data === true) {
                
                    setRelation(true)
                    setFollowColor('#A9A9A9')
                    setFollowText('#333333')
    
                    Animated.parallel([
                        Animated.timing(followOpacity, {
                            toValue: 0,
                            duration: 77,
                            useNativeDriver: false
                        }),
                        Animated.timing(followedOpacity, {
                            toValue: 1,
                            duration: 77,
                            useNativeDriver: false
                        })
                    ]).start()  
    
                }    


            })
            .catch((err) => console.error(err.message))

        })
            

        

    }, [AsyncStorage, setUsername, console])

    const goBack = () => {
        navigation.navigate(location)
    }

    const followPress = () => {

        if (relation === false) {

            setFollowColor('#A9A9A9')
            setFollowText('#333333')

            Animated.parallel([
                Animated.timing(followOpacity, {
                    toValue: 0,
                    duration: 70,
                    useNativeDriver: false
                }),
                Animated.timing(followedOpacity, {
                    toValue: 1,
                    duration: 144,
                    useNativeDriver: false
                })
            ]).start()

            const follow = axios.post('http://localhost:3000/follow', { self: 'user04', user: username})

            setRelation(true)

        } else if (relation === true) {

            setFollowColor('#333333')
            setFollowText('#C2C2C2')

            Animated.parallel([
                Animated.timing(followOpacity, {
                    toValue: 1,
                    duration: 144,
                    useNativeDriver: false
                }),
                Animated.timing(followedOpacity, {
                    toValue: 0,
                    duration: 70,
                    useNativeDriver: false
                })
            ]).start()

            const unfollow = axios.post('http://localhost:3000/unfollow', { self: 'user04', user: username})

            setRelation(false)

        }
    }

    // if (username.length >= 17) {
    //     username = 'err'
    // }
    // console.log(username)

    const [loaded] = useFonts({
        'Louis': require('../assets/fonts/Louis_George_Cafe.ttf')
    })

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
                
            <SafeAreaView style={styles.profile_container}>
                




            <View style={styles.postButton_container0}>
                <Pressable style={styles.info_icon_container}>
                    <Image style={styles.info_icon} source={info_icon}/>
                </Pressable>
                <Pressable onPress={goBack} style={styles.back_icon_container}>
                    <Image style={styles.back_icon} source={go_back_icon}/>
                </Pressable>
            </View>




                    
                <SafeAreaView style={styles.user_stat}>
                    <Text style={styles.truth_title}>rout</Text>
                    <SafeAreaView style={{height: window.width / 5.5}}/>    
                    <View style={styles.user_stat2}>
                        <Image 
                        source={profile_img} 
                        style={styles.profile_img}/>
                        <View style={styles.stats}>
                            <View style={{alignItems: 'center', bottom: window.height / 40}}>
                                <View style={{}}>
                                    <Text style={styles.username}>{username}</Text>
                                </View>
                            <View style={{flexDirection: 'row'}}>
                            <Pressable style={styles.followers} onPress={() => navigation.navigate('following')}>
                                    <Text style={styles.stats1_text}>followers</Text>
                                    <View style={styles.follow_line}/>
                                    <Text style={styles.stats2_text}>120</Text>
                            </Pressable>
                            <View style={styles.stats_middle}/>
                            <Pressable style={styles.following} onPress={() => navigation.navigate('followers')} > 
                                    <Text style={styles.stats1_text}>following</Text>
                                    <View style={styles.follow_line}/>
                                    <Text style={styles.stats2_text}>70</Text>
                            </Pressable>
                            </View>
                            </View>
                        </View>
                    </View>
                <SafeAreaView style={styles.profile_btns} >
                    <SafeAreaView style={{height: window.width / 5.3}}/>
                    <View style={styles.profile_btns2}>
                    <Pressable onPress={followPress} style={[styles.follow_btn, {backgroundColor: followColor}]}>
                        <Animated.Text style={[styles.follow_text, {color: followText, opacity: followOpacity}]}>follow</Animated.Text>
                        <Animated.Text style={[styles.follow_text, {color: followText, opacity: followedOpacity}]}>following</Animated.Text>
                    </Pressable>
                    <View style={styles.btns_middle}/>
                    <Pressable onPress={() => navigation.navigate('direct_msg', {user: username, location: '_user'})} style={styles.message_btn}>
                    {/* <Pressable onPress={() => {console.log(navigation.getState())}} style={styles.message_btn}> */}
                        <Text style={styles.message_text}>message</Text>
                    </Pressable>
                    </View>
                </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>
            {/* <Bottom_Nav/> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#555555',
    },
    truth_title_container: {
        position: 'absolute',
        top: 0,
        // zIndex: 1,
        backgroundColor: 'black',
        // height: window.height / 12,
        // bottom: window.height - window.width / ,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: window.width
    },
    truth_title: {
        // zIndex: 1,
        // position: 'absolute',
        // top: window.height / 20 - 10,
        fontSize: window.width / 12,
        bottom: window.width / 4.5,
        fontFamily: 'Louis',
        color: '#C2C2C2',
        textAlign: 'center'
    },
    back_icon_container: {
        zIndex: 2,
        position: 'absolute',
        right: window.width / 2 - window.width / 10,
        top: window.width / 40
    },
    back_icon: {
        width: window.width / 27,
        height: window.width / 15,
    },
    info_icon_container: {
        position: 'absolute',
        // transform: [{rotate: '90deg'}],
        left: window.width / 2 - window.width / 7,
        top: window.width / 25
    },
    info_icon: {
        width: window.width / 13,
		height: window.width / 55,
    },
    dot_icon_container: {
        zIndex: 3
    },
    postButton_container0: {
        // position: 'absolute',
        zIndex: 3,
        // width: window.width / 2,
        // height: window.width / 6,
        // justifyContent: 'flex-end',
        // overflow: 'hidden',
        // justifySelf: 'flex-start'
        // display: 'flex-start'
        // top: window.height / 23,
        // top: 0,
        // left: window.width / 30
    },  
    postButton_container: {
        position: 'absolute',
        zIndex: 2,
        width: window.width / 6,
        height: window.width / 3,
        // overflow: 'hidden',
        // justifySelf: 'flex-start'
        // display: 'flex-start'
        // top: window.height / 23,
        // top: -window.height / 150,
        right: window.width / 2 - window.width / 5.2,
        borderRadius: 50
    },  
    postButton: {
        zIndex: 3,
		position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
		// top: window.height / 22,
		// right: window.width / 1.25,
		width: window.width / 6,
        height: window.width / 6,
        backgroundColor: "#ffffff",
		borderRadius: 50,
		backgroundColor: '#828282',
		overflow: 'hidden'
	},
    postButton_shadow: {
        // zIndex: 3,
        // position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 50,
        width: window.width / 6,
        height: window.width / 6,
        // top: window.height / 20,
        // top: -window.width / 11.5,
        // right: window.width / 1.25,
        // left: window.width / 30,
        shadowOpacity: 1,
        shadowColor: '#252525',
        shadowRadius: 3,
        shadowOffset: {height: 0}
    },
	postButton_grad: {
        // zIndex: 1,
        position: 'absolute',
		left: -window.width / 10,
		width: window.width / 2,
		height: '100%'
	},
	plus_sign: {
        zIndex: 1,
        // position: 'absolute',
        height: window.width / 13,
		width: window.width / 13,
        // left: window.width / 10.5,
		// overflow: 'hidden'
	},
    profile_container: {
        width: '100%',
        height: window.height / 2.95,
        // top: 0,
        // bottom: window.height / 15,
        // position: 'absolute',
        backgroundColor: '#424242',
        alignItems: 'center',
        // justifyContent: 'flex-start'
    },
    user_stat: {
        // overflow: 'hidden',
        // flexDirection: 'row',
        // position: 'absolute',
        // height: window.height / 10,
        // top: window.height / 100,
        top: window.width / 4.5,
        zIndex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // height: 10,
        // left: 50,
        // bottom: window.height / 10,
        // zIndex: 3
        
    },
    user_stat2: {
        bottom: window.width / 3.3,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
    },
    profile_container02: {
        // position: 'absolute',
        // top: window.height / 20 - 100,
        // top: 0,
        // alignItems: 'center',
        // bottom: window.height / 4,
        // backgroundColor: 'white',
        // width: 10,
        // height: 10,
        zIndex: 3
    },
    gear_dm_container: {
        // backgroundColor: 'black',
        position: 'absolute',
        // width: window.width / 2,
        height: window.height / 16,
        // backgroundColor: 'black',
        // bottom: window.height / 3.2,
        top: -window.height / 21,
        left: window.width / 2 - window.width / 7,
        justifyContent: 'flex-end',
    },
    dm_icon: {
        position: 'absolute',
        width: window.width / 12,
        height: window.width / 16,
        // left: window.width / 2 - 50,
        // top: window.height / 250
    },
    gear_icon: {
        position: 'absolute',
        width: window.width / 12,
        height: window.width / 11,
        // left: window.width / 2 - 50,
        top: window.height / 20,
    },
    profile_img: {
        // position: 'absolute',
        height: window.width / 5,
        width: window.width / 5,
        right: window.width / 20,
        borderRadius: 50,
        // top: window.height / 6
    },
    username_container: {
        // position: 'absolute', 
        // // bottom: window.width / 8,
        // // top: -window.height / 25,
        // bottom: window.height / 20,
        width: window.width / 2,
        position: 'absolute',
        // height: window.height / 5,
        // top: wi,
        // top: -window.width / 9,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // height: window.height / 500,
        // height: window.height / 15,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // justifyContent: 'center'
        // textAlign: 'center'
    },
    username: {
        // position: 'absolute',
        fontSize: window.width / 16,
        // textAlignVertical: 'top',
        // height: window.height/ 10,
        // right:  window.width / 70,
        bottom: window.height / 250,

        fontFamily: 'Louis',
        color: '#C2C2C2',
        // marginBottom: window.width / 40
    },
    username2: {
        // bottom: window.width / 8,2
        // flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    stats: {
        flexDirection: 'row',
        top: window.height / 50,
        // left: 0,
        // width: 
    },
    follow_line: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        width: '105%',
        marginBottom: window.width / 100,
        marginTop: window.width / 100
        // top: window.width / 60,
        // bottom: window.width / 60

    },
    followers: {
        // marginBottom: window.width / 60,
        // bottom: window.height / 20,
        alignItems: 'center',
        // height: 100,
        // width: '100%',
        // backgroundColor: 'black'
    },
    stats_middle: {
        width: window.width / 20
    },
    following: {
        alignItems: 'center'
    },
    stats1_text: {
        // position: 'absolute',
        // marginBottom: window.height / 100,
        // marginTop: window.width / 15,
        fontSize: window.width / 19,
        // width: 100,
        fontFamily: 'Louis',
        color: 'black',
        // width: 100

    },
    stats2_text: {
        // position: 'absolute',
        // marginBottom: window.height / 100,
        // marginTop: window.height / 100,
        fontSize: window.width / 21,
        // width: 100,
        fontFamily: 'Louis',
        color: 'black',
        // width: 100

    },  
    profile_btns: {
        position: 'absolute',
        top: window.height / 9.7,
        // zIndex: 2,
        // top: 0,
        // flexDirection: 'row',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',s
        // height: 300,
        // backgroundColor: 'black'
        
    },
    profile_btns2: {
        // position: 'absolute',
        // top: 0,
        // zIndex: 2,
        // bottom: -window.height / 15,
        bottom: window.width / 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems: 'flex-end',
        // backgroundColor: 'black'
        
    },

    btns_middle: {
        width: window.width / 21
    },
    follow_btn: {
        // overflow: 'hidden',
        borderRadius: window.width / 30,
        alignItems: 'center',
        width: window.width / 2.4,
        height: window.width / 12,
        justifyContent: 'center',
        // alignItems: 'center',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {height: 0},
        shadowColor: 'black'
    },
    notification_pop: {
        zIndex: 1,
        position: 'absolute',
        // overflow: 'hidden',
        width: window.width / 33,
        height: window.width / 33,
        left: -5,
        top: -4,
        borderRadius: 50,
        backgroundColor: '#D1D1D1',
        shadowColor: '#424242',
        shadowOffset: {height: 0},
        shadowOpacity: 1,
        shadowRadius: 2
        
    },
    notification_pop_gradient: {
        // width: 30,
        // height: '100%',
        // borderRadius: 50,
        // shadowColor: 'black',
        // shadowOpacity: 1,
        // shadowRadius: 20
        // right: 35
    },
    message_btn: {
        // position: 'absolute',
        // overflow: 'hidden',
        borderRadius: window.width / 30,
        // alignItems: 'center',
		backgroundColor: '#333333',
        width: window.width / 2.4,
        height: window.width / 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {height: 0},
        shadowColor: 'black'
    },
    follow_text: {
        fontSize: window.width / 17,
        // top: 1,        
        fontFamily: 'Louis',
        position: 'absolute'
    },
    message_text: {
        fontSize: window.width / 17,
        fontFamily: 'Louis',
        bottom: window.width / 170,
        // left: 2,
        // top: 1,
        color: '#C2C2C2'
    }
})