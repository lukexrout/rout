import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const portFile = require('../port.json')

export default function Alter({ navigation, route }) {
    const location = route.params.location
    const postList = route.params.postList

    const [imgHeight, setImgHeight] = useState()
    const [imgRatio, setImgRatio] = useState()

    const navigate = (x) => {
        navigation.navigate(x, {
            location: 'create_post'
        })
    }

    useEffect(() => {
        Image.getSize(postList[0], (w, h) => {
            setImgRatio((window.width / 1.1) / w)
            setImgHeight(h)
            console.log(window.height)
        })
    })

    const Upload = async (uri) => {
        const URL = `http://${portFile.HOST}:${portFile.PORT}/upload`

		const imageExt = uri.split('.').pop()

		let image = await fetch(uri)
		image = await image.blob()

		await fetch(URL, {
			method: 'POST',
			body: image,
			headers: {
				Accept: `image/${imageExt}`,
				'Content-Type': `image/${imageExt}`,
			}
		})
		.then((res) => console.log(JSON.parse(JSON.stringify(res))))
		.catch((err) => console.error(err))

        // -------------------------------------------------------------------------------------
        
        // const URL = `http://${portFile.HOST}:${portFile.PORT}/upload`

		// const imageExt = uri.split('.').pop()
		// let image = await fetch(uri)
		// image = await image.blob()
		
		// // const imageFile = new File([image], `rout-image00/photo00.${imageExt}`)

		// await fetch(URL, {
		// 	method: 'PUT',
		// 	body: image,
		// 	headers: {
		// 		Accept: `image/${imageExt}`,
		// 		'Content-Type': `image/${imageExt}`
		// 	}
		// })
		// .then((res) => console.log(JSON.parse(JSON.stringify(res)).status))
		// .catch((err) => console.error(err))
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
                <SafeAreaView style={styles.alter_container}>
                    <Text style={styles.alter}>alter</Text>
                </SafeAreaView>
            </View>

            <View style={styles.post_safe}>
                <View style={styles.post_container}>
                    {imgHeight && <Image style={[styles.post_img, 
                    {height: '100%'}]} 
                    source={{uri: postList[0]}}/>}
                </View>
            </View>
            <Pressable onPress={() => Upload(postList[0])} style={styles.post_btn_container}>
                <Text style={styles.post_btn_text}>post.</Text>
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
        zIndex: 2
        // flexDirection: 'row'
    },
    alter_container: {
        alignSelf: 'center'
    },
    alter: {
        fontFamily: 'Louis',
        fontSize: 30,
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
    post_safe: {
        flex: 1,
        width: window.width / 1.1,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    post_container: {
        overflow: 'hidden',
        width: window.width / 1.1,
        borderRadius: 21,
    },
    post_img: {
        width: '100%',
    },

    post_btn_container: {
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
    post_btn_text: {
        color: '#444444',
        fontFamily: 'Louis',
		fontSize: 28,
        alignSelf: 'center'
    }
    
})