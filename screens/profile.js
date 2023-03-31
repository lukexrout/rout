import React, { useEffect, useState, useRef, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Pressable, Image, Dimensions, SafeAreaView, FlatList, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Content from './content.js'

const window = Dimensions.get('window')

const portFile = require('../port.json')

const profile_img = require('../assets/img/user_profile_template.png')
const plus_img = require('../assets/img/plus_sign.png')
const set_icon = require('../assets/img/cog.png')
const dm_icon = require('../assets/img/dm_icon_2.png')
const save_icon = require('../assets/img/save_icon_profile.png')

const Interest = ({ cent, interest, pos }) => {
    return (
        <View>

        <View style={styles.interest_container}>
            <View style={[styles.interest_level, {width: cent}]}/>
            <Text style={styles.interest}>{interest}</Text>
        </View>
        {pos === 'last' ? <View style={{height: 77}}/> : <View/>}
        </View>
    )
}

const Head = memo(({ username, bio, follower_cnt, following_cnt, interestOpacity, postOpacity, changeList, navigate }) => {

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
                        <Text style={styles.user}>{username}</Text>
                    </View>
                    <View style={styles.stat_container}>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => navigate('followers')} style={styles.stat}>
                                <View style={styles.stat_text_container}>
                                    <Text style={styles.stat_text}>followers</Text>
                                </View>
                                <View style={styles.stat_num_container}>
                                    <Text style={styles.stat_num}>{follower_cnt}</Text>
                                </View>
                            </Pressable>
                            <View style={{width: 21}}/>
                            <Pressable onPress={() => navigate('following')} style={styles.stat}>
                                <View style={styles.stat_text_container}>
                                    <Text style={styles.stat_text}>following</Text>
                                </View>
                                <View style={styles.stat_num_container}>
                                    <Text style={styles.stat_num}>{following_cnt}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    {bio !== '' &&
                    <View>
                        <View style={styles.sep_stat}/>
                        <View style={styles.bio_container}>
                            <Text style={styles.bio}>{bio}</Text>
                        </View>
                        <View style={[styles.sep_stat, {width: 77}]}/>
                    </View>}
                    <View style={styles.button_container}>
                        <Pressable onPress={() => navigate('wallet')} style={styles.button_wallet}>
                            <Text style={styles.button_text}>wallet</Text>
                        </Pressable>
                        <View style={{width: 55}}/>
                        <Pressable onPress={() => navigate('edit_profile')} style={styles.button_edit}>
                            <Text style={styles.button_text}>edit profile</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.tab_container}>
                    <Pressable onPress={() => changeList('posts', 'interests')} style={styles.tab_button_container}>
                        <View style={styles.tab_button_text_container}>
                            <Text style={styles.tab_button_text}>posts</Text>
                        </View>
                        <Animated.View style={[styles.tab_button_background, {opacity: postOpacity}]}/>
                    </Pressable>
                    <View style={styles.tab_sep_line}/>
                    <Pressable onPress={() => changeList('interests', 'posts')} style={styles.tab_button_container}>
                        <View style={styles.tab_button_text_container}>
                            <Text style={styles.tab_button_text}>interests</Text>
                        </View>
                        <Animated.View style={[styles.tab_button_background, {opacity: interestOpacity}]}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
})

export default function Profile({ navigation, route }) {

    const postOpacity = useRef(new Animated.Value(1)).current
    const interestOpacity = useRef(new Animated.Value(0)).current
	
	const listRef = useRef()

	const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useState('posts')
    const [asyncStatus, setAsyncStatus] = useState(false)
    const [username, setUsername] = useState()
    const [follower_cnt, setFollower_cnt] = useState()
    const [following_cnt, setFollowing_cnt] = useState()
    const [bio, setBio] = useState()
    const [user_id, setUser_id] = useState()
    const [postHeight, setPostHeight] = useState()
    const [interestHeight, setInterestHeight] = useState()
    const [data, setData] = useState([
        {interest_id: 1, pos: null, interest: 'comedy', cent: '63%'},
        {interest_id: 2, pos: null, interest: 'animals', cent: '49%'},
        {interest_id: 3, pos: null, interest: 'music', cent: '77%'},
        {interest_id: 4, pos: null, interest: 'art', cent: '20%'},
        {interest_id: 5, pos: null, interest: 'furrys', cent: '2%'},
        {interest_id: 6, pos: null, interest: 'politics', cent: '71%'},
        {interest_id: 7, pos: null, interest: 'memes', cent: '98%'},
        {interest_id: 8, pos: null, interest: 'rap', cent: '51%'},
        {interest_id: 9, pos: null, interest: 'shoes', cent: '21%'},
        {interest_id: 10, pos: null, interest: 'business', cent: '88%'},
        {interest_id: 11, pos: 'last', interest: 'startups', cent: '99%'},
    ])
    const [sourceList, setSourceList] = useState([
        {post_id: 1, pos: null, type: 'text', content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
        {post_id: 2, pos: null, type: 'text', content: 'set for launch in exactly 2 months!'}, 
        {post_id: 3, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 4, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 5, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 6, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 7, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 8, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 9, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 10, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 11, pos: 'last', type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
	])

    useEffect(() => {
        AsyncStorage.getItem('user_id', (err, res) => {
            setUser_id(res)
        })
        if (!asyncStatus || route.params) {
            AsyncStorage.getItem('profile', (err, rawRes) => {
                setAsyncStatus(true)
                if (rawRes === null || rawRes === undefined) {
                    reqProfile()
                } else {
                    const res = JSON.parse(rawRes)
                    console.log(`asyncRes: ${res}`)
                    const currentTime = new Date()
                    const hourMili = 60 * 60 * 1000 // hour
                    const dif = currentTime.getTime() - new Date(res[0]).getTime()
                    const comp = dif >= hourMili
                    if (comp) {
                        reqProfile()
                        return
                    } else {
                        setProfile(res.slice(-res.length + 1))
                    }
                }
            })
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 444); // delay
    
        return () => clearTimeout(timer);
    }, [asyncStatus, user_id, route])

    const setProfile = (res) => {
        // console.log(res)
        setUsername(res[0])
        setBio(res[1])
        const res_follower_cnt = res[4][0]['follower_cnt']
        const finalFollower_cnt = res_follower_cnt < 9999 ? res_follower_cnt : 
        res_follower_cnt > 9999 && res_follower_cnt < 999999 ? Math.floor(res_follower_cnt / 100) / 10 + 'k' :
        res_follower_cnt > 999999 && Math.floor(res_follower_cnt / 100000) / 10 + 'm'
        setFollower_cnt(finalFollower_cnt)
        setFollowing_cnt(res[4][0]['following_cnt'])
    }

    const reqProfile = () => {
        // console.log(user_id)
        fetch(`http://${portFile.HOST}:3000/profile/self`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': user_id
            })
        }).then(res => res.json())
        .then(res => {
            // console.log(`serverRes: ${res}`)
            if (!res.error) {

                setProfile(res)
                res.unshift(new Date())
                AsyncStorage.setItem('profile', JSON.stringify(res))
                //// AsyncStorage.setItem('profile', null)
            }
        })
        .catch(err => console.error(err))
    }

    const editProfileObj = {
        location: 'profile',
        username: username,
        bio: bio,
        follower_cnt: follower_cnt,
        following_cnt: following_cnt
    }
    const walletObj = {
        location: 'profile',
    }

    const navigate = (i) => {
		navigation.navigate(i, i === 'edit_profile' ? editProfileObj : walletObj)
	}

    const changeList = (x, y) => {
        const changeObj = {
            'posts': postOpacity,
            'interests': interestOpacity
        }
        
        Animated.parallel([
            Animated.timing(changeObj[x], {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }),
            Animated.timing(changeObj[y], {
                toValue: 0,
                duration: 177,
                useNativeDriver: false
            }),
        ]).start()
        setState(x)
    }

    const scrollTo = (y) => {
        const headHeight = 484
		listRef.current.scrollTo({ animated: true, y: y + headHeight})
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
                <ScrollView
                ref={listRef} 
                style={{position: 'absolute', height: window.height}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
				removeClippedSubviews={true}>
                    <Head
                    username={username}
                    bio={bio}
                    follower_cnt={follower_cnt}
                    following_cnt={following_cnt}
                    navigate={navigate}
                    changeList={changeList} 
                    interestOpacity={interestOpacity} 
                    postOpacity={postOpacity}/>
                    {isLoading ? 
                    <View style={{marginTop: 111}}>
					    <ActivityIndicator size="large" color="#C2C2C2"/>
				    </View>
                     :
                    <View 
                    style={[styles.list_container, 
                    state === 'posts' ? {height: postHeight} : {height: interestHeight}]}>
                        <Animated.View 
                        style={[styles.posts_container, 
                        state === 'posts' ? {zIndex: 1, opacity: postOpacity} : {zIndex: 0, opacity: postOpacity}]}
                        onLayout={( event ) => {
                        const {x, y, width, height} = event.nativeEvent.layout
                        setPostHeight(height)}}>
                            {sourceList.map((item) => (
                                <Content 
                                source={item} 
                                id={item.id}
                                key={item.post_id} 
                                scrollTo={scrollTo} 
                                navigation={navigation}
                                location={'profile'}
                                pos={item.pos}/>
                            ))}
                        </Animated.View>
                        <Animated.View 
                        style={[styles.interests_container, 
                        state === 'interests' ? {zIndex: 1, opacity: interestOpacity} : {zIndex: 0, opacity: interestOpacity}]}
                        onLayout={( event ) => {
                        const {x, y, width, height} = event.nativeEvent.layout
                        setInterestHeight(height)}}>
                            {data.map((item) => (
                                <Interest 
                                key={item.interest_id}
                                interest={item.interest} 
                                cent={item.cent}
                                pos={item.pos}/>
                            ))}
                        </Animated.View>
                    </View>
                    }
                </ScrollView>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        backgroundColor: '#5F5F5F',
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
        backgroundColor: '#5F5F5F'
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
        right: 2
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
        width: 300,
    },
    user_container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        // backgroundColor: 'white'
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
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat_text_container: {
        backgroundColor: '#595959',
        borderRadius: 7,
        marginBottom: 4
    },
    stat_text: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 40,
        marginRight: 40,
    },
    stat_num_container: {
        backgroundColor: '#595959',
        borderRadius: 7,
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
        height: 2,
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
        borderRadius: 7,
        width: 144
    },
    button_edit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
        borderRadius: 7,
        width: 144
    },
    button_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        marginVertical: 7,
        color: '#555555'
    },
    tab_container: {
        height: 44,
        width: 400,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab_button_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab_sep_line: {
        width: 2,
        height: '70%',
        borderRadius: 50,
        backgroundColor: '#555555'
    },
    tab_button_text_container: {
        zIndex: 1,
        alignItems: 'center'
    },
    tab_button_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2'
    },
    tab_button_background: {
        zIndex: 0,
        position: 'absolute',
        height: 33,
        width: 180,
        borderRadius: 7,
        backgroundColor: '#555555'
    },
    list_container: {

    },
    list_footer: {
    },
    posts_container: {
        position: 'absolute'
    },
    interests_container: {
        position: 'absolute',
        alignSelf: 'center'
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
    }
})