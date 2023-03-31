import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Animated, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const portFile = require('../port.json')

const window = Dimensions.get('window')

const back = require('../assets/img/back.png')
const profile_img = require('../assets/img/user_profile_template.png')

export default function EditProfile({ navigation, route }) {
	
    const usernameRef = useRef()
    const bioRef = useRef()
    const doneAnim = useRef(new Animated.Value(0)).current

    const location = route.params.location
    const nav_username = route.params.username
    const nav_bio = route.params.bio
    const follower_cnt = route.params.follower_cnt
    const following_cnt = route.params.following_cnt

    const [username, setUsername] = useState(nav_username)
    const [bio, setBio] = useState(nav_bio)
    const [doneStatus, setDoneStatus] = useState(false)
    const [focusState, setFocusState] = useState()

    const navigate = (x) => {
        if (username !== nav_username || bio !==nav_bio) {
            const endPoint = username !== nav_username ? 'username' : 'bio'
            const value = username !== nav_username ? username : bio
            AsyncStorage.getItem('user_id', (err, asyncRes) => {
                fetch(`http://${portFile.HOST}:3000/profile_change/${endPoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'user_id': asyncRes,
                        'value': value
                    })
                }).then(res => res.json())
                .then(async res => {
                    if (res.error) {
                        console.error(res.error)
                    } else {
                        await AsyncStorage.getItem('profile', (err, rawRes) => {
                            let asyncRes = JSON.parse(rawRes)
                            {focusState && (focusState === 'bio' && focusState ? asyncRes[2] = bio : asyncRes[1] = username)}
                            console.log(asyncRes)
                            AsyncStorage.setItem('profile', JSON.stringify(asyncRes))
                        })
                    }
                })
                .then(() => {
                    navigation.navigate(x, {
                        status: true
                    })
                })
                .catch(err => console.error(err))
            })
        } else {
            navigation.navigate(x)
        }
    }

    const toggleInput = (x, y) => {
        y !== undefined && setFocusState(y)
        x === false && focusState === 'bio' ? bioRef.current.blur() : focusState === 'username' && usernameRef.current.blur()
        console.log(y)
        console.log(x)
        x === true && setDoneStatus(true)
        Animated.timing(doneAnim, {
            toValue: x === true ? 1 : 0,
            duration: 177,
            useNativeDriver: false
        }).start(() => {{
            x === false && 
            setDoneStatus(false)
        }})
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
            <View style={styles.head_safe}>
                <SafeAreaView style={styles.back_safe}>
                    <Pressable onPress={() => navigate(location)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.edit_container}>
                    <Text style={styles.edit}>edit</Text>
                </SafeAreaView>
            </View>
            <View style={styles.profile_container}>
                <View style={styles.info_container}>
                    <View style={styles.pic_container}>
                        <Image style={styles.pic} source={profile_img}/>
                    </View>
                    <View style={styles.user_container}>
                        <TextInput 
                        ref={usernameRef}
                        style={styles.user}
                        returnKeyType='done'
                        value={username}
                        onFocus={() => {toggleInput(true, 'username')}}
                        placeholder='username'
                        placeholderTextColor={'#444444'}
                        selectionColor={'#696969'}
                        keyboardAppearance='dark'
                        onSubmitEditing={() => toggleInput(false)}
                        onChangeText={(i) => setUsername(i)}/>
                    </View>
                    <View style={styles.stat_container}>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable style={styles.stat}>
                                <View style={styles.stat_text_container}>
                                    <Text style={styles.stat_text}>followers</Text>
                                </View>
                                <View style={styles.stat_num_container}>
                                    <Text style={styles.stat_num}>{follower_cnt}</Text>
                                </View>
                            </Pressable>
                            <View style={{width: window.width / 20}}/>
                            <Pressable style={styles.stat}>
                                <View style={styles.stat_text_container}>
                                    <Text style={styles.stat_text}>following</Text>
                                </View>
                                <View style={styles.stat_num_container}>
                                    <Text style={styles.stat_num}>{following_cnt}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.sep_stat}/>
                    <View style={styles.bio_container}>
                        <TextInput 
                        ref={bioRef}
                        style={styles.bio}
                        multiline={true}
                        value={bio}
                        onFocus={() => {toggleInput(true, 'bio')}}
                        placeholder='enter your bio!'
                        placeholderTextColor={'#444444'}
                        selectionColor={'#696969'}
                        keyboardAppearance='dark'
                        onChangeText={(i) => setBio(i)}/>
                    </View>
                    <View style={[styles.sep_stat, {width: 77}]}/>
                </View>
                <View style={styles.profile_buttons_filler_container}>
                    <View style={styles.profile_button_filler_container}>
                        <View style={styles.profile_button_filler}/>
                    </View>
                    <View style={styles.profile_button_filler_sep}/>
                    <View style={styles.profile_button_filler_container}>
                        <View style={styles.profile_button_filler}/>
                    </View>
                </View>
                <View style={styles.profile_tab_filler_container}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.profile_tab_filler}/>
                    </View>
                    <View style={styles.profile_tab_sep}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.profile_tab_filler}/>
                    </View>
                </View>
            </View>

            {doneStatus &&
            <KeyboardAvoidingView 
            style={styles.done_safe}
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={0}>
                <Animated.View style={{opacity: doneAnim}}>
                    <Pressable onPress={() => toggleInput(false)} style={styles.done_press}>
                        <Text style={styles.done}>done</Text>
                    </Pressable>
                </Animated.View>
            </KeyboardAvoidingView>}

            <View style={styles.filler_container}>
                <View style={styles.filler_text_post}>
                    <View style={styles.filler_text_post_profile}>
                        <View style={styles.filler_text_post_profile_img}/>
                        <View style={styles.filler_text_post_profile_user}/>
                    </View>
                    <View style={styles.filler_text_post_text_container}>

                        <View style={[styles.filler_text_post_text, {
                            borderTopLeftRadius: 7,
                            borderTopRightRadius: 7,
                            borderBottomRightRadius: 7,
                            
                        }]}/>
                        <View style={[styles.filler_text_post_text, {
                            width: 222,
                            borderBottomRightRadius: 7,
                            borderBottomLeftRadius: 7,
                        }]}/>
                    </View>
                    <View style={styles.filler_text_post_buttons_container}>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                    </View>
                </View>
                <View style={styles.filler_text_post}>
                    <View style={styles.filler_text_post_profile}>
                        <View style={styles.filler_text_post_profile_img}/>
                        <View style={styles.filler_text_post_profile_user}/>
                    </View>
                    <View style={styles.filler_text_post_text_container}>

                        <View style={[styles.filler_text_post_text, {
                            borderTopLeftRadius: 7,
                            borderTopRightRadius: 7,
                        }]}/>
                        <View style={[styles.filler_text_post_text, {
                        }]}/>
                        <View style={[styles.filler_text_post_text, {
                            borderBottomRightRadius: 7,
                            
                        }]}/>
                        <View style={[styles.filler_text_post_text, {
                            width: 222,
                            borderBottomRightRadius: 7,
                            borderBottomLeftRadius: 7,
                        }]}/>
                    </View>
                    <View style={styles.filler_text_post_buttons_container}>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                    </View>
                </View>
                <View style={styles.filler_text_post}>
                    <View style={styles.filler_text_post_profile}>
                        <View style={styles.filler_text_post_profile_img}/>
                        <View style={styles.filler_text_post_profile_user}/>
                    </View>
                    <View style={styles.filler_text_post_text_container}>

                        <View style={[styles.filler_text_post_text, {
                            borderTopLeftRadius: 7,
                            borderTopRightRadius: 7,
                            borderBottomRightRadius: 7,
                            borderBottomLeftRadius: 7,
                            
                        }]}/>
                    </View>
                    <View style={styles.filler_text_post_buttons_container}>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                        <View style={styles.filler_text_post_button_container}>
                            <View style={styles.filler_text_post_button}/>
                        </View>
                    </View>
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
        // flexDirection: 'row'
    },
    edit_container: {
        alignSelf: 'center'
    },
    edit: {
        fontFamily: 'Louis',
        fontSize: 35,
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
    

    profile_container: {
        // flex: 1,
        // justifyContent: 'center',
        marginTop: 10,
        width: window.width,
        alignItems: 'center',

    },
    
    info_container: {
        width: 300,
        // marginBottom: window.height / 4,
        // backgroundColor: '#777777',
        paddingVertical: 10,
        borderRadius: 21,
        
        // paddingLeft: 100,
        // paddingRight: 100
    },
    user_container: {
        alignSelf: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginVertical: 14,
        borderRadius: 10,
        backgroundColor: '#777777',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    user: {
        fontFamily: 'Louis',
        fontSize: 24,
        color: '#C2C2C2',
    },
    pic_container: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    pic: {
        height: 70,
        width: 70,
        borderRadius: 50
    },
    stat_container: {
        width: '100%',
        marginBottom: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat_text_container: {
        backgroundColor: '#595959',
        borderRadius: window.width / 70,
        marginBottom: window.width / 120


    },
    stat_text: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 20,
        marginRight: 20,
    },
    stat_num_container: {
        backgroundColor: '#595959',
        borderRadius: window.width / 70,
    },
    stat_num: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
        marginRight: 10,
    },
    sep_stat: {
        width: '70%',
        height: window.width / 170,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#595959'
    },
    bio_container: {
        width: '110%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    bio: {
        width: '95%',
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
        textAlign: 'center'
    },  
    done_safe: {
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end'
    },
    done_press: {
        right: 10,
        bottom: 10,
        borderRadius: 10,
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    done: {
        fontFamily: 'Louis',
        fontSize: 20,
        color: '#444444',
        paddingVertical: 7,
        paddingHorizontal: 20
    },
    profile_buttons_filler_container: {
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    profile_button_filler_sep: {
        width: 49
    },
    profile_button_filler_container: {
        justifyContent: 'center',
    },
    profile_button_filler: {
        height: 33,
        width: 144,
        borderRadius: 7,
        backgroundColor: '#555555'
    },
    profile_tab_filler_container: {
        height: 44,
        width: 400,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile_tab_filler: {
        height: 33,
        width: 180,
        borderRadius: 7,
        backgroundColor: '#555555'
    },
    profile_tab_sep: {
        // flex: 1,
        height: '70%',
        width: 2,
        backgroundColor: '#555555'
    },

    filler_container: {
        flex: 1,
        overflow: 'hidden',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        width: '100%',
    },
    filler_text_post: {
        // height: 144,
        // flex: 1,
        width: '100%',
        backgroundColor: '#555555'
    },
    filler_text_post_profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    filler_text_post_profile_img: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#5F5F5F'
    },
    filler_text_post_profile_user: {
        height: 25,
        width: 100,
        marginLeft: 10,
        borderRadius: 7,
        backgroundColor: '#5F5F5F'
    },
    filler_text_post_text_container: {
        marginTop: 10,

    },
    filler_text_post_text: {
        height: 21,
        width: 400,
        marginLeft: 10,
        backgroundColor: '#5F5F5F'
    },
    filler_text_post_buttons_container: {
        // height: 60,
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        // backgroundColor: 'white'
    },
    filler_text_post_button_container: {
        // height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    filler_text_post_button: {
        height: 25,
        width: 25,
        borderRadius: 7,
        backgroundColor: '#5F5F5F'
    }

})