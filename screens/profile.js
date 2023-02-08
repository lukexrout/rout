import React, { useEffect, useState, useRef, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Pressable, Image, Dimensions, SafeAreaView, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Content from './content.js'

const window = Dimensions.get('window')

const profile_img = require('../assets/img/user_profile_template.png')
const plus_img = require('../assets/img/plus_sign.png')
const set_icon = require('../assets/img/cog.png')
const dm_icon = require('../assets/img/dm_icon_2.png')
const save_icon = require('../assets/img/save_icon_profile.png')

const aws = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/353A7670-2B3B-4B7E-91CD-29640662A756_4_5005_c.jpeg'
const aws_2 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/3B7B6670-B919-4C98-A232-9044BA65B022_4_5005_c.jpeg'
const aws_3 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/image_lol.jpeg'
const aws_4 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/new+found.jpeg'

const Interest = ({ cent, interest }) => {
    return (
        <View style={styles.interest_container}>
            <View style={[styles.interest_level, {width: cent}]}/>
            <Text style={styles.interest}>{interest}</Text>
        </View>
    )
}

const Head = memo(({ interestOpacity, interestPress, contentOpacity, contentPress, navigate }) => {

    return (
        <View style={styles.general_profile_container}>
            <View style={styles.head_container}>
                <SafeAreaView style={styles.rout_container}>

                    <Text style={styles.rout_text}>rout</Text>
                </SafeAreaView>
                
            </View>
            <View style={styles.profile_container}>
                <View style={styles.set_dm_container}>
                    <Pressable onPress={() => navigate('dm')} style={styles.dm_container}>
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
                        <View style={{width: 55}}/>
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
})

const Foot = () => {
    return(
        <View style={styles.foot}>

        </View>
    )
}

export default function Profile({ navigation }) {

    const contentOpacity = useRef(new Animated.Value(1)).current
    const interestOpacity = useRef(new Animated.Value(0)).current
	
	const listRef = useRef()

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
    const [sourceList, setSourceList] = useState([
		{id: 0, type: 'text', content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
		{id: 1, type: 'image', uri: aws, content: 'hello world!'}, 
		{id: 2, type: 'text', content: 'set for launch in exactly 2 months!'}, 
		{id: 3, type: 'image', uri: aws_2, content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
		{id: 4, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
		{id: 5, type: 'image', uri: aws, content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
		{id: 6, type: 'image', uri: aws_2, content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}
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

    const scrollTo = (y) => {
		listRef.current.scrollToOffset({ animated: true, offset: y })
	}

    const content = ({ item }) => {
		return (<Content 
			source={item} 
			id={item.id} 
			key={item.id} 
			scrollTo={scrollTo} 
			navigation={navigation}
            location={'profile'}
			/>)
    }

    const interest = ({ item }) => {
        return (<Interest interest={item.interest} cent={item.cent}/>)
    }

    const head = () => {
        return (
        <Head 
        navigate={navigate}
        interestOpacity={interestOpacity} 
        interestPress={interestPress} 
        contentOpacity={contentOpacity} 
        contentPress={contentPress}/>
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
                    ref={listRef}
                    style={styles.list_container}
                    key={data}
				    CellRendererComponent={state === 'content' ? content : interest}
                    data={state === 'content' ? sourceList : data}
                    numColumns={1}
                    contentContainerStyle={state === 'content' ? {alignItems: 'flex-start'} : {alignItems: 'center'}}
                    ListHeaderComponent={head}
                    ListHeaderComponentStyle={{backgroundColor: '#5F5F5F'}}
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
		backgroundColor: '#5F5F5F',
		width: window.width,
		height: window.height,
    },
    general_profile_container: {
        width: window.width,
    },
    head_container: {
        height: 110,
        width: window.width,
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
        width: window.width,
        alignItems: 'center',
    },
    set_dm_container: {
        position: 'absolute',
        width: 28,
        top: -40,
        right: window.width / 21,
        alignSelf: 'flex-start',
    },
    dm_container: {
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
        justifyContent: 'center',
        width: '100%',
    },
    set: {
        width: '100%',
        height: 28
    },
    save_container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        width: 20,
        height: 27
    },
    info_container: {
        width: window.width / 1.5,
    },
    user_container: {
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: window.width / 70,
        marginBottom: window.width / 70,
        marginLeft: window.width / 12,
        marginRight: window.width / 12,
    },
    stat_num_container: {
        backgroundColor: '#595959',
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
        borderRadius: 50,
        backgroundColor: '#595959'
    },
    bio_container: {
        flex: 1,
        width: '110%',
        paddingVertical: 10,
        paddingHorizontal: 10,
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
        fontSize: 17,
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
        marginBottom: 7,
        height: window.height / 20,
        width: window.width / 1.04,
        backgroundColor: '#777777',
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
        left: 14,
        fontFamily: 'Louis',
        fontSize: 17
    },
    foot: {
        height: window.height / 11
    }
    
})