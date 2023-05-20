import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, FlatList, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'; 

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const image = require('../assets/img/user_profile_template.png')

const Head = () => {

    const searchRef = useRef()

    const [search, setSearch] = useState()

    return (
        <View style={styles.list_head_container}>
            <View>
                <SafeAreaView/>
            </View>
            <View style={{height: 40}}/>
            <View style={styles.user_search_container}>
                <Pressable onPress={() => searchRef.focus} style={styles.user_search_press}>
                    <TextInput
                    style={styles.user_search_input}
                    ref={searchRef}
                    value={search}
                    placeholder='search'
                    placeholderTextColor={'#595959'}
                    selectionColor={'#696969'}
                    keyboardAppearance='dark'
                    // onChangeText={i => initialLoad(i)}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const User = ({ user, follower, following }) => {
    return (
        <View style={styles.user_container}>
            <View style={styles.start_container}>
                <View style={styles.user_image_container}>
                    <Image style={styles.user_image} source={image}/>
                </View>
                <View style={styles.user_text_container}>
                    <Text style={styles.user_text}>{user}</Text>
                </View>



            </View>
            <View style={styles.user_stats_safe}>
                <View style={styles.user_stats_safe2}>
                    <View  style={styles.user_stats_container}>
                        <View style={styles.stats_followers_num_container}>
                            <Text style={styles.stats_followers_num}>{follower}</Text>
                        </View>
                        <View style={styles.sep}/>
                        <View style={styles.stats_following_num_container}>
                            <Text style={styles.stats_following_num}>{following}</Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default function Followers({ navigation, route }) {
	
    const [data, setData] = useState([
        {id: 0, user: 'elon musk', follower: '200', following: '777'},
        {id: 1, user: 'zuck', follower: '400', following: '777'},
        {id: 2, user: 'bgates', follower: '1.3m', following: '777'},
        {id: 3, user: 'lexfridman', follower: '150k', following: '777'},
        {id: 4, user: 'yeet', follower: '732k', following: '777'},
        {id: 5, user: 'drake', follower: '711k', following: '777'},
        {id: 6, user: 'elon musk', follower: '45.3m', following: '777'},
        {id: 7, user: 'zuck', follower: '11', following: '777'},
        {id: 8, user: 'bgates', follower: '300k', following: '777'},
        {id: 9, user: 'lexfridman', follower: '240K', following: '777'},
        {id: 10, user: 'yeet', follower: '1200', following: '777'},
        {id: 11, user: 'drake', follower: '600K', following: '777'},
        {id: 12, user: 'elon musk', follower: '777', following: '777'},
        {id: 13, user: 'zuck', follower: '777', following: '345'},
        {id: 14, user: 'bgates', follower: '777', following: '800k'},
        {id: 15, user: 'lexfridman', follower: '777', following: '300k'},
        {id: 16, user: 'yeet', follower: '777', following: '9643'},
        {id: 17, user: 'drake', follower: '777', following: '22k'},
        {id: 18, user: 'elon musk', follower: '777', following: '80k'},
        {id: 19, user: 'zuck', follower: '777', following: '36k'},
        {id: 20, user: 'bgates', follower: '777', following: '120m'},
        {id: 21, user: 'lexfridman', follower: '777', following: '85.6m'},
        {id: 22, user: 'yeet', follower: '777', following: '12.5m'},
        {id: 23, user: 'drake', follower: '777', following: '210K'},
    ])

    const location = route.params.location

    const navigate = (x) => {
        navigation.navigate(x)
    }

    const head = () => {
        return (<Head />)
    }

    const user = ({ item }) => {
        return (<User user={item.user} follower={item.follower} following={item.following}/>)
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
            <SafeAreaView/>
            <View style={styles.head_safe}>
                <SafeAreaView style={styles.back_safe}>
                    <Pressable onPress={() => navigate(location)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.followers_container}>
                    <Text style={styles.followers}>followers</Text>
                </SafeAreaView>
            </View>
            

            <View style={styles.list_container}>
                <FlatList
                    data={data}
                    renderItem={user}
                    ListHeaderComponent={head}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
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
        zIndex: 2,
        // flex: 1,
        width: window.width / 1.07,
        borderRadius: 17,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#616161',
        shadowColor: '#444444',
        shadowOffset: {height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    followers_container: {
        alignSelf: 'center',
    },
    followers: {
        padding: 7,
        fontFamily: 'Louis',
        fontSize: 30,
        color: '#C2C2C2'
    },
    back_safe: {
        position: 'absolute'
    },
    back_press: {
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back: {
        width: 12,
        height: 21
    },
    list_container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    list_head_container: {
        height: 155
    },
    user_search_container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    user_search_press: {
        flex: 1,
        maxHeight: 40,
        width: window.width / 1.07,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 7,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#C2C2C2'
        
    },
    user_search_input: {
        left: 10,
        fontSize: 17,
        fontFamily: 'Louis',
    },
    user_container: {
        height: 55,
        width: window.width / 1.1,
        marginBottom: 4,
        borderRadius: 14,
        flexDirection: 'row',
        alignSelf: 'center',
        // alignItems: 'center',
        backgroundColor: '#717171'
    },
    start_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    user_image_container: {
        marginLeft: 10
    },
    user_image: {
        height: 42,
        width: 42,
        borderRadius: 50
    },
    user_text_container: {
        left: 10
    },
    user_text: { 
        fontFamily: 'Louis',
        fontSize: 14,
        color: '#222222'
    },
    user_stats_safe: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    user_stats_safe2: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: '#444444'
    }, 
    user_stats_container: {
        flexDirection: 'row',
        right: 10,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: '#888888'
    },
    stats_followers_num_container: {
        paddingVertical: 7,
        paddingHorizontal: 14,
    },
    stats_followers_num: {
        fontFamily: 'Louis',
        fontSize: 14,
        color: '#222222'
    },
    sep: {
        height: '71%',
        width: 1.5,
        backgroundColor: '#444444'
    },
    stats_following_num_container: {
        paddingVertical: 7,
        paddingHorizontal: 14,
    },
    stats_following_num: {
        fontFamily: 'Louis',
        fontSize: 14,
        color: '#222222'
    }
    
})