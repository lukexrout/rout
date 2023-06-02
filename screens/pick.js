import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import * as MediaLibrary from 'expo-media-library';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const alert = require('../assets/img/alert.png')
const check = require('../assets/img/check.png')

const Media = ({ uri, postList, setPostList }) => {
    const [tapped, setTapped] = useState()

    useEffect(() => {}, [postList])

    /////////////////////// trying to add multipost feature
    const addPost = (uri, x) => {
        console.log('uri: ' + uri)
        setTapped(x)
        {x === true ?
        setPostList((arr) => [...arr, uri])
         :
        postList.length === 0 || postList.length === 1 ?
        setPostList([])
         :
        setPostList((arr) => arr.filter(v => v !== uri))
        }
    }

    return (
        <Pressable onPress={() => {!tapped ? addPost(uri, true) : addPost(uri, undefined)}} style={styles.media_container}>
            {!tapped && <View style={styles.media_overlay}/>}
            <Image style={styles.media} source={{uri: uri}}/>
            <View style={[styles.select_circle, tapped && {backgroundColor: '#C2C2C2'}]}>
                {tapped && <Image style={styles.select_circle_check} source={check}/>}
            </View>
        </Pressable>
    )
}

export default function Pick({ navigation, route }) {
    const [status, setStatus] = useState()
    const [data, setData] = useState()
    const [count, setCount] = useState(40)
    const [momentum, setMomentum] = useState(false)
    const [postList, setPostList] = useState([])

    const location = route.params.location

    const goback = (x) => {
        navigation.navigate(x, {
            location: 'home'
        })
    }
    
    const next = (x) => {
        navigation.navigate(x, {
            location: 'pick',
            postList: postList
        })
    }
    
    useEffect(() => {
        fetchData()
    })
    
    const end = () => {
        setMomentum(false)
        setCount(i => i + 40)
    }
    
    const fetchData = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync()
        if (status !== 'granted') {
            setStatus(false)
        } else {
            setStatus(true)
            let media = await MediaLibrary.getAssetsAsync({first: count, sortBy: 'creationTime'})
            const media_arr = []
            for (let i = 0; i < media.assets.length; i++) {
                media_arr.push({
                    id: i + 1,
                    uri: media.assets[i].uri
                })
            }
            if (!media.cancelled) {
                setData(media_arr)
            }
        }
    }

    const media = ({ item }) => {
        return(<Media uri={item.uri} postList={postList} setPostList={setPostList}/>)
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
                    <Pressable onPress={() => goback(location)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.pick_container}>
                    <Text style={styles.pick}>pick</Text>
                </SafeAreaView>
            </View>
            <View style={styles.gall_container}>
                {status === true ?
                <FlatList
                style={styles.gall_list}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                disableVirtualization={true}
                removeClippedSubviews={true}
                renderItem={media}
                data={data}
                numColumns={3}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollBegin={() => setMomentum(true)}
				onEndReached={momentum === true ? end() : null}
				onEndReachedThreshold={21}
                />
                 :
                <Pressable onPress={() => Linking.openSettings()} style={styles.alert_safe}>
                    <View style={styles.alert_image_container}>
                        <Image source={alert} style={styles.alert_image}/>
                    </View>
                    <View style={styles.alert_text_container}>
                        <Text style={styles.alert_text}>cameraroll permissions needed.</Text>
                        <Text style={styles.alert_text}>click here to allow.</Text>
                    </View>
                </Pressable>
                }
            </View>
            <Pressable onPress={() => next('alter')} style={styles.rout_sub_container}>
                <Text style={styles.rout_sub_text}>next</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#555555'
    },
    head_safe: {
        // flexDirection: 'row'
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
    pick_container: {
        alignSelf: 'center'
    },
    pick: {
        fontFamily: 'Louis',
        fontSize: 30,
        color: '#C2C2C2'
    },
    alert_safe: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert_image_container: {

    },
    alert_image: {
        height: 170,
        width: 170
    },
    alert_text_container: {
        marginTop: 11,
    },
    alert_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#444444',
        textAlign: 'center',
        marginBottom: 7,
    },
    gall_container: {
        overflow: 'hidden',
        flex: 1,
        width: window.width / 1.1,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 21,
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    gall_list: {

    },
    media_container: {
        flex: 1,
        height: 170
    },
    media_overlay: {
        zIndex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.5,
        backgroundColor: 'black'
    },
    media: {
        height: '100%',
        width: '100%',
    },
    select_circle: {
        zIndex: 2,
        position: 'absolute',
        height: 20,
        width: 20,
        bottom: 10,
        right: 10,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#C2C2C2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    select_circle_filled: {
        zIndex: 1,
        height: '100%',
        width: '100%',
        borderRadius: 50,
        backgroundColor: '#C2C2C2'
    },
    select_circle_check: {
        height: 8,
        width: 11,
    },
    rout_sub_container: {
        height: 49,
        width: window.width / 1.1,
        marginBottom: 21,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#C2C2C2',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    rout_sub_text: {
        color: '#444444',
        fontFamily: 'Louis',
		fontSize: 28,
        alignSelf: 'center'
    }
})