import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import * as MediaLibrary from 'expo-media-library';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const alert = require('../assets/img/alert.png')

const Media = ({ uri }) => {
    return (
        <View style={styles.media_container}>
            <Image style={styles.media} source={{uri: uri}}/>
        </View>
    )
}

export default function Pick({ navigation, route }) {
	
    const [status, setStatus] = useState()
    const [data, setData] = useState()
    const [count, setCount] = useState(40)
    const [momentum, setMomentum] = useState(false)

    const location = route.params.location

    const goback = (x) => {
        navigation.navigate(x, {
            location: 'home'
        })
    }

    const navigate = (x) => {
        navigation.navigate(x, {
            location: 'pick'
        })
    }

    const end = () => {
        setMomentum(false)
        setCount(i => i + 40)
    }

    useEffect(() => {

        const fetchData = async () => {

            const { status } = await MediaLibrary.requestPermissionsAsync()
            if (status !== 'granted') {
                setStatus(false)
            } else {
                setStatus(true)
                let media = await MediaLibrary.getAssetsAsync({first: count})
    
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

        fetchData()

        
    })

    const media = ({ item }) => {
        return(<Media uri={item.uri}/>)
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
                <SafeAreaView style={styles.select_container}>
                    <Pressable style={styles.select_press}>
                        <Text style={styles.select}>select</Text>
                    </Pressable>
                </SafeAreaView>
            </View>
            <View style={styles.gall_container}>
                {status === true ?
                <FlatList
                style={styles.gall_list}
                renderItem={media}
                data={data}
                numColumns={4}
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
    select_container: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    select_press: {
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue'
    },
    select: {
        fontFamily: 'Louis',
        fontSize: 20,
        color: '#888888'
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
        marginVertical: 20,
        borderRadius: 21,
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    gall_list: {

    },
    media_container: {
        width: '25%'
    },
    media: {
        width: '100%',
        height: 140
    }
    
})