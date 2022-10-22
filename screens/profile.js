import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Pressable, Image, Dimensions, SafeAreaView, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const window = Dimensions.get('window')

const profile_img = require('../assets/img/user_profile_template.png')
const plus_img = require('../assets/img/plus_sign.png')
const set_icon = require('../assets/img/cog.png')
const dm_icon = require('../assets/img/dm_icon_2.png')
const save_icon = require('../assets/img/save_icon_profile.png')

import MemoizedProfileHead from './profileHead.js'

const Content = () => {
    return (
        <View style={styles.content_container}>

        </View>
    )
}

const Interest = ({ cent, interest }) => {
    return (
        <View style={styles.interest_container}>
            <View style={[styles.interest_level, {width: cent}]}/>
            <Text style={styles.interest}>{interest}</Text>
        </View>
    )
}

const Foot = () => {
    return(
        <View style={styles.foot}>

        </View>
    )
}

const Profile_ = ({ navigation }) => {

    const navigate = (i) => {
		navigation.navigate(i, {
            location: 'profile'
        })
	}






    
}


export default function Profile({ navigation }) {

    const contentOpacity = useRef(new Animated.Value(1)).current
    const interestOpacity = useRef(new Animated.Value(0)).current
	
    const [numColumns, setNumColumns] = useState(3)
    const [state, setState] = useState('content')
    const [username, setUsername] = useState()
    const [data, setData] = useState([
        {id: 1, interest: 'comedy', cent: '63%'},
        {id: 2, interest: 'animals', cent: '49%'},
        {id: 3, interest: 'music', cent: '77%'},
        {id: 4, interest: 'art', cent: '20%'},
        {id: 5, interest: 'furrys', cent: '2%'},
        {id: 6, interest: 'politics', cent: '71%'},
        {id: 7, interest: 'memes', cent: '98%'},
        {id: 8, interest: 'rap', cent: '51%'},
        {id: 9, interest: 'shoes', cent: '21%'},
        {id: 10, interest: 'business', cent: '88%'},
        {id: 11, interest: 'startups', cent: '99%'},
    ])

    useEffect(() => {
        AsyncStorage.getItem('user', (err, res) => {
            setUsername(res)
        })
    })

    const navigate = (i) => {
		navigation.navigate(i, {
            location: 'profile'
        })
	}

    const contentPress = () => {
        setState('content')
        setNumColumns(3)

        Animated.parallel([

            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 277,
                useNativeDriver: false
            }),
            Animated.timing(interestOpacity, {
                toValue: 0,
                duration: 277,
                useNativeDriver: false
            })

        ]).start()

    }

    const interestPress = () => {
        setState('interest')
        setNumColumns(1)

        Animated.parallel([

            Animated.timing(contentOpacity, {
                toValue: 0,
                duration: 277,
                useNativeDriver: false
            }),
            Animated.timing(interestOpacity, {
                toValue: 1,
                duration: 277,
                useNativeDriver: false
            })

        ]).start()

    }

    const content = ({ item, index }) => {
		return (<Content/>)
    }

    const interest = ({ item }) => {
        return (<Interest interest={item.interest} cent={item.cent}/>)
    }

    const head = () => {

        
    
    
        return (
            <View style={styles.general_profile_container}>
                <View style={styles.head_container}>
                    <SafeAreaView style={styles.rout_container}>

                        <Text style={styles.rout_text}>rout</Text>
                    </SafeAreaView>
                    
                </View>
                <View style={styles.profile_container}>
                    <View style={styles.set_dm_container}>
                        <Pressable onPress={() => navigate('direct_msg')} style={styles.dm_container}>
                            <Image style={styles.dm} source={dm_icon}/>
                        </Pressable>
                        <Pressable onPress={() => navigate('settings')} style={styles.set_container}>
                            <Image style={styles.set} source={set_icon}/>
                        </Pressable>
                        <Pressable onPress={() => navigate('save')} style={styles.save_container}>
                            <Image style={styles.save} source={save_icon}/>
                        </Pressable>
                    </View>
                    <View style={styles.info_container}>
                        <View style={styles.pic_container}>
                            <Image style={styles.pic} source={profile_img}/>
                        </View>
                        <View style={styles.user_container}>
                            <Text style={styles.user}>schafferluke</Text>
                        </View>
                        <View style={styles.stat_container}>
                            <View style={{flexDirection: 'row'}}>
                                <Pressable onPress={() => navigate('followers')} style={styles.stat}>
                                    <View style={styles.stat_text_container}>
                                        <Text style={styles.stat_text}>followers</Text>
                                    </View>
                                    <View style={styles.stat_num_container}>
                                        <Text style={styles.stat_num}>1.35m</Text>
                                    </View>
                                </Pressable>
                                <View style={{width: window.width / 20}}/>
                                <Pressable onPress={() => navigate('following')} style={styles.stat}>
                                    <View style={styles.stat_text_container}>
                                        <Text style={styles.stat_text}>following</Text>
                                    </View>
                                    <View style={styles.stat_num_container}>
                                        <Text style={styles.stat_num}>5000</Text>
                                    </View>
                                </Pressable>
                            </View>
                            
                        </View>
                        <View style={styles.sep_stat}/>
                        <View style={styles.bio_container}>
                            <Text style={styles.bio}>this is my bio currently. what do you think? I hope you like it considerably.</Text>
                        </View>
                        <View style={[styles.sep_stat, {width: 77}]}/>
                        <View style={styles.button_container}>
                            <Pressable onPress={() => navigate('wallet')} style={styles.button_wallet}>
                                <Text style={styles.button_text}>wallet</Text>
                            </Pressable>
                            <View style={{width: window.width / 11}}/>
                            <Pressable onPress={() => navigate('edit_profile')} style={styles.button_edit}>
                                <Text style={styles.button_text}>edit profile</Text>
                            </Pressable>
                        </View>
                        <View style={styles.tab_container}>
                            <Pressable onPress={() => contentPress()} style={styles.tab_text_container}>
                                <View style={styles.tab_text_center}>
                                    <Animated.View style={[styles.tab_text_outline, {opacity: contentOpacity}]}/>
                                    <Text style={styles.tab_text}>content</Text>
                                </View>
                            </Pressable>
                            <View style={styles.sep_line}/>
                            <Pressable onPress={() => interestPress()} style={styles.tab_text_container}>
                                <View style={styles.tab_text_center}>
                                    <Animated.View style={[styles.tab_text_outline, {opacity: interestOpacity}]}/>
                                    <Text style={styles.tab_text}>interests</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const foot = ({ item }) => {
        return (<Foot/>)
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
            <View style={{width: window.width}}>
                <SafeAreaView style={styles.create_center}>
                    <Pressable onPress={() => navigate('create_post')} style={styles.create_container}>
                        <Image style={styles.create} source={plus_img}/>
                    </Pressable>
                </SafeAreaView>
            
                <FlatList
                    style={styles.list_container}
                    key={numColumns}
                    renderItem={state === 'content' ? content : interest}
                    data={data}
                    numColumns={1}
                    contentContainerStyle={state === 'content' ? {alignItems: 'flex-start'} : {alignItems: 'center'}}
                    ListHeaderComponent={head}
                    ListHeaderComponentStyle={{backgroundColor: '#555555'}}
                    ListFooterComponent={foot}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: '#555555',
    },
    


    create_center: {
        width: window.width / 777,
        borderBottomRightRadius: window.width / 14,
        zIndex: 2,
    },


    create_container: {
        top: 0,
        alignSelf: 'flex-start',
        left: window.width / 21,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 70,
        borderRadius: 50,
        backgroundColor: '#C2C2C2'
    },
    create: {
        width: 33,
        height: 33,
    },

    

    list_container: {
        zIndex: 1,
		position: 'absolute',
		backgroundColor: '#555555',
		width: window.width,
		height: window.height,
    },


    general_profile_container: {
        // flexDirection: 'row',
        width: window.width,
        // height: window.height / 2.08,
        // alignItems: 'center',

    },
    head_container: {
        // backgroundColor: 'white',
        // flexDirection: 'row',
        height: 110,
        width: window.width,
        // top: 0,
        alignItems: 'center'
    },
    rout_container: {
        alignSelf: 'center'
    },
    rout_text: {
        fontFamily: 'Louis',
        fontSize: 40,
        color: '#C2C2C2'
    },
    profile_container: {
        marginTop: 10,
        // height: window.height / 2.8
        width: window.width,
        // justifyContent: 'center',
        alignItems: 'center',

    },
    
    set_dm_container: {
        position: 'absolute',
        // backgroundColor: 'white',
        // height: 170,
        width: 28,
        // marginTop:40,
        top: -40,
        right: window.width / 21,
        alignSelf: 'flex-start',
        // justifyContent: 'flex-end',
    },
    dm_container: {
        // flex: 1,
        // backgroundColor: 'white',
        // top: 0,
        // position: 'absolute',
        justifyContent: 'center',
        width: '100%',
    },
    dm: {
        width: 32,
        height: 24,
        right: window.width / 270
    },
    set_container: {
        marginVertical: 11,
        // backgroundColor: 'blue',
        // flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    set: {
        // backgroundColor: 'purple',
        width: '100%',
        height: 28
    },
    save_container: {
        // backgroundColor: 'purple',
        // flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        width: 20,
        height: 27
    },
    info_container: {
        // top: window.width / 70,
        // marginTop: window.width / 8,
        width: window.width / 1.5,
        // backgroundColor: 'blue'
    },
    user_container: {
        // backgroundColor: 'red',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: window.width / 30,
        marginBottom: window.width / 30
    },
    user: {
        fontFamily: 'Louis',
        fontSize: 24,
        color: '#C2C2C2'
    },
    pic_container: {
        // backgroundColor: 'gray',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pic: {
        height: window.width / 6,
        width: window.width / 6,
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
        backgroundColor: '#616161',
        borderRadius: window.width / 70,
        marginBottom: window.width / 120


    },
    stat_text: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: window.width / 70,
        marginBottom: window.width / 70,
        marginLeft: window.width / 12,
        marginRight: window.width / 12,
    },
    stat_num_container: {
        backgroundColor: '#616161',
        borderRadius: window.width / 70,
    },
    stat_num: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: window.width / 70,
        marginBottom: window.width / 70,
        marginLeft: window.width / 40,
        marginRight: window.width / 40,
    },
    sep_stat: {
        width: '70%',
        height: window.width / 170,
        alignSelf: 'center',
        // marginTop: window.height / 70,
        borderRadius: 50,
        backgroundColor: '#616161'
    },
    bio_container: {
        flex: 1,
        width: '110%',
        paddingVertical: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    bio: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
        textAlign: 'center'
    },
    button_container: {
        flexDirection: 'row',
        marginVertical: 17,

        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_wallet: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
        borderRadius: window.width / 70,
        width: window.width / 2.8

    },
    button_edit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
        borderRadius: window.width / 70,
        width: window.width / 2.8
    },
    button_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        marginVertical: window.width / 70,
        color: '#555555'
        
    },




    tab_container: {
        // position: 'absolute',
        width: window.width,
        height: window.height / 20,
        backgroundColor: '#5F5F5F',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    sep_line: {
        position: 'absolute',
        width: window.width / 170,
        height: '59%',
        backgroundColor: '#717171',
        borderRadius: 50
    },
    tab_text_container: {
        width: window.width / 2,
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab_text_center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab_text_outline: {
        borderRadius: window.width / 70,
        height: window.height / 28,
        width: window.width / 2.2,
        backgroundColor: '#6A6A6A',
    },
    tab_text: {
        position: 'absolute',
        fontFamily: 'Louis',
        // alignSelf: 'center',
        fontSize: 17,
        // marginVertical: window.width / 70,
        // marginHorizontal: window.width / 7,
        color: '#C2C2C2'
    },
    content_container: {
        height: window.height / 4.9,
        width: window.width,
        borderColor: 'black',
        borderWidth: window.width / 470,
        backgroundColor: 'white'
    },
    interest_container: {
        marginTop: window.width / 40,
        height: window.height / 20,
        width: window.width / 1.04,
        backgroundColor: '#424242',
        borderRadius: window.width / 70,
        justifyContent: 'center',
    },
    interest_level: {
        position: 'absolute',
        height: '100%',
        borderBottomLeftRadius: window.width / 70,
        borderTopLeftRadius: window.width / 70,
        backgroundColor: '#C2C2C2'
    },
    interest: {
        left: window.width / 17,
        fontFamily: 'Louis',
        fontSize: 17
    },
    foot: {
        height: window.height / 11
    }
    
})