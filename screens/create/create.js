import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, TextInput, FlatList } from 'react-native';
import { useFonts } from 'expo-font';

const aws = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/353A7670-2B3B-4B7E-91CD-29640662A756_4_5005_c.jpeg'

const go_back_icon = require('../../assets/img/go_back_icon.png')
const drop_down = require('../../assets/img/drop_down_arrow.png')
const magnify = require('../../assets/img/look_glass_light.png')

const window = Dimensions.get('window')

const FindHead = () => {
    return (<View style={styles.find_head}/>)
}
const FindFoot = () => {
    return (<View style={styles.find_foot}/>)
}

const Find = ({ interest }) => {


    return (
        <View style={styles.interest}>
            <Text style={styles.interest_text}>{interest}</Text>
        </View>
    )
}

export default function Create({ navigation, route }) {
	
    const inputRef = useRef()
    const searchRef = useRef()

    const [uri, setUri] = useState()
    const [find, setFind] = useState([
        {id: 1, interest: 'comedy'},
        {id: 2, interest: 'nature'},
        {id: 3, interest: 'software'},
        {id: 4, interest: 'startups'},
        {id: 5, interest: 'memes'},
        {id: 6, interest: 'politics'},
        {id: 7, interest: 'politics'},
        {id: 8, interest: 'politics'},
        {id: 9, interest: 'politics'},
        {id: 10, interest: 'politics'},
        {id: 11, interest: 'politics'},
        {id: 12, interest: 'politics'},
        {id: 13, interest: 'politics'},
        {id: 14, interest: 'politics'},
        {id: 15, interest: 'politics'},
        {id: 16, interest: 'politics'},
        {id: 17, interest: 'politics'},
        {id: 18, interest: 'politics'},
        {id: 19, interest: 'politics'},
        {id: 20, interest: 'politics'},
    ])

    useEffect(() => {

        setUri(route.params.uri)

    })

    // const handleUpload = async () => {

	// 	const URL = await handleURL()

	// 	const imageExt = imagePreview.split('.').pop()

	// 	let image = await fetch(imagePreview)
	// 	image = await image.blob()

	// 	await fetch(URL, {
	// 		method: 'PUT',
	// 		body: image,
	// 		headers: {
	// 			Accept: `image/${imageExt}`,
	// 			'Content-Type': `image/${imageExt}`
	// 		}
	// 	})
	// 	.then((res) => console.log(JSON.parse(JSON.stringify(res)).status))
	// 	.catch((err) => console.error(err))

	// }

    const location = route.params.location

    const navigate = (loc) => {
        navigation.navigate(loc, {
            location: location
        }) 
    }

    const findInterest = ({ item }) => {


        return (
            <Find interest={item.interest} key={item.id}/>
        )
    }

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header_safe}>
                <SafeAreaView style={styles.back_safe}>
                    <Pressable style={styles.back_container} onPress={() => navigate('create_post')}>
                        <Image style={styles.back} source={go_back_icon}/>
                    </Pressable>
                </SafeAreaView>
                <View style={styles.head_container}>
                    <Text style={styles.head}>boost</Text>
                </View>
            </SafeAreaView>
            <View style={styles.boost_container}>
                <View style={styles.caption_overflow}>

                    <View style={styles.leave_container}>
                        <Text style={styles.leave_text}>leave a caption</Text>
                    </View>
                    <View style={styles.caption_row}>

                        <Pressable onPress={() => inputRef.current.focus()} style={styles.caption_container}>
                            <TextInput
                            ref={inputRef}
                            placeholderTextColor={'#595959'}
                            placeholder='caption'
                            keyboardAppearance='dark'
                            selectionColor={'#696969'}
                            style={styles.caption}
                            // value={userInput}
                            // onChangeText={i => setUserInput(i)}
                            />
                        </Pressable>
                        <View style={styles.preview_container}>
                            <Image style={styles.preview} source={{uri: uri}}/>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.interest_container}>
                <View style={styles.find_safe}>
                    <View style={styles.find_overflow}>

                        <Pressable style={styles.find_collapse}>
                            <Text style={styles.find_text}>apply interests</Text>
                            
                        </Pressable>
                        <View style={styles.find_container}>
                            <Pressable style={styles.search_container}>
                                <TextInput
                                ref={searchRef}
                                placeholderTextColor={'#595959'}
                                placeholder='search'
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                style={styles.search}
                                // value={userInput}
                                // onChangeText={i => setUserInput(i)}
                                />
                                {/* <View style={styles.magnify_container}>
                                    <Image style={styles.magnify} source={magnify}/>
                                </View> */}
                                

                            </Pressable>
                            <View style={styles.find_interest}>

                                <FlatList
                                data={find}
                                ListHeaderComponent={FindHead}
                                ListFooterComponent={FindFoot}
                                renderItem={findInterest}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                
            </View>
            
            <Pressable style={styles.rout_press}>
                <Text style={styles.rout_text}>rout</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#555555',
        alignItems: 'center'
    },
    header_safe: {
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    back_safe: {
        alignSelf: 'flex-start'
    },
    back_container: {
        position: 'absolute',
        height: window.width / 9,
        width: window.width / 14,
        left: window.width / 14,
        // top: window.width / 70,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    back: {
        height: window.width / 17,
        width: window.width / 29,
        right: window.width / 170
    },
    head_container: {
        height: window.width / 9,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute'
        // backgroundColor: 'white'
        // top: 0
    },
    head: {
        // position: 'absolute',
        fontFamily: 'Louis',
        fontSize: window.width / 10,
        color: '#C2C2C2'
    },

    boost_container: {
        // zIndex: 2,
        // position: 'absolute',
        width: window.width / 1.1,
        height: window.width / 2.8,
        backgroundColor: '#777777',
        marginTop: window.width / 20,
        // top: window.width / 7,
        borderRadius: window.width / 40,
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.4,
        shadowRadius: window.width / 110,
    },
    leave_container: {
        height: window.width / 12,
        width: '101%',
        justifyContent: 'center',
        backgroundColor: '#494949',
        // borderTopLeftRadius: window.width / 40,
        // borderTopRightRadius: window.width / 40

    },
    caption_overflow: {
        height: '100%',
        width: '100%',
        borderRadius: window.width / 45,
        overflow: 'hidden'
    },
    leave_text: {
        alignSelf: 'center',
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: window.width / 22
    },
    caption_row: {
        flexDirection: 'row',
        width: '100%',
        height: '75%'
        // backgroundColor: 'white'
    },
    caption_container: {
        zIndex: 2,
        height: '100%',
        width: '85%',
        borderBottomLeftRadius: window.width / 17,
        // backgroundColor: 'white'
    },
    caption: {
        top: window.width / 70,
        left: window.width / 30,
        fontFamily: 'Louis',
        fontSize: window.width / 22
    },
    preview_container: {
        position: 'absolute',
        height: window.width / 10,
        width: '100%',
        // backgroundColor: 'white'
    },
    preview: {
        alignSelf: 'flex-end',
        height: window.width / 10,
        width: window.width / 10,
        top: window.width / 70,
        right: window.width / 70,
        borderRadius: window.width / 70
    },






    interest_container: {
        alignItems: 'center',
    },


    find_safe: {
        // overflow: 'hidden',
        position: 'absolute',
        width: window.width / 1.1,
        height: window.width + window.width / 4.8,
        marginTop: window.width / 17,
        borderRadius: window.width / 40,
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 70,
    },
    find_overflow: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        borderRadius: window.width / 49,
        overflow: 'hidden'
    },
    find_collapse: {
        height: window.width / 11,
        width: '101%',
        justifyContent: 'center',
        backgroundColor: '#494949',
        borderTopLeftRadius: window.width / 40,
        borderTopRightRadius: window.width / 40
    },
    find_text: {
        // left: window.width / 40,
        alignSelf: 'center',
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: window.width / 22
    },
    drop_down_container: {
        alignSelf: 'flex-end',
        position: 'absolute',
        right: window.width / 40
    },
    drop_down: {
        height: window.width / 30,
        width: window.width / 17
    },
    find_container: {

    },
    search_container: {
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        top: window.width / 50,
        height: window.width / 12,
        width: '95%',
        justifyContent: 'center',
        borderRadius: window.width / 70,
        backgroundColor: '#C2C2C2',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.4,
        shadowRadius: window.width / 110,
    },
    search: {
        left: window.width / 40,
        fontFamily: 'Louis',
        fontSize: window.width / 25
    },
    magnify_container: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: window.width / 70
    },
    magnify: {
        height: window.width / 19,
        width: window.width / 20
    },
    find_interest: {
        height: '97%',
        width: '100%',
        bottom: window.width / 170,
        borderBottomLeftRadius: window.width / 70,
        borderBottomRightRadius: window.width / 70,
    },
    find_head: {
        height: window.height / 18
    },
    find_foot: {
        height: window.height / 80
    },
    interest: {
        height: window.width / 7.9,
        width: window.width / 1.1 - window.width / 50,
        marginTop: window.width / 70,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: window.width / 70,
        backgroundColor: '#494949'
    },
    interest_text: {
        left: window.width / 40,
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: window.width / 22
    },









    rout_press: {
        position: 'absolute',
        bottom: window.width / 14,
        height: window.width / 7,
        width: window.width  / 1.1,
        borderTopLeftRadius: window.width / 40,
        borderTopRightRadius: window.width / 40,
        borderBottomRightRadius: window.width / 17,
        borderBottomLeftRadius: window.width / 17,
        backgroundColor: '#777777',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 70,
    },
    rout_text: {
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: window.width / 12
    }

})