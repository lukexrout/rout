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

    // const handleURL = async () => {

	// 	const obj = {
	// 		username: "schaffer_luke"
	// 	}

	// 	const response = await fetch('https://804qbtsf9h.execute-api.us-east-1.amazonaws.com/rout_data/upload-url', {
	// 		method: 'POST',
	// 		body: JSON.stringify(obj)
	// 	})
	
	// 	const json = await response.json();

	// 	return json
	// }

    const handleUpload = async () => {
		const URL = 'http://192.168.1.86:3000/upload'

		const imageExt = uri.split('.').pop()

		let image = await fetch(uri)
		image = await image.blob()

		await fetch(URL, {
			method: 'PUT',
			body: image,
			headers: {
				Accept: `image/${imageExt}`,
				'Content-Type': `image/${imageExt}`,
			}
		})
		.then((res) => console.log(JSON.parse(JSON.stringify(res))))
		.catch((err) => console.error(err))
	}

    const location = route.params.location

    const navigate = (loc) => {
        navigation.navigate(loc, {
            location: location
        }) 
    }

    const findInterest = ({ item }) => {
        return (<Find interest={item.interest} key={item.id}/>)
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
                    <Pressable style={styles.focus_container}/>
                    <View style={styles.caption_row}>
                        <Pressable onLayout={( event ) => {
                            const {x, y, width, height} = event.nativeEvent.layout
                            // console.log(height)
                        }} 
                        onPress={() => inputRef.current.focus()} style={styles.caption_container}>
                            {/* still needs fixing when reaching text end */}
                            <TextInput
                            // onEndEditing={}
                            ref={inputRef}
                            placeholderTextColor={'#999999'}
                            placeholder='being thruthful?'
                            keyboardAppearance='dark'
                            selectionColor={'#696969'}
                            style={styles.caption}
                            multiline={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            // onContentSizeChange={() => inputScroll()}
                            // value={userInput}
                            // onChangeText={i => setUserInput(i)}
                            />
                        </Pressable>
                        <Pressable onPress={() => navigate('create_post')} style={styles.preview_container}>
                            <Image style={styles.preview} source={{uri: uri}}/>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.interest_container}>
                <View style={styles.find_safe}>
                    <View style={styles.find_overflow}>
                        <Pressable style={styles.apply_container}>
                            <Text style={styles.apply_text}>apply interests</Text>
                        </Pressable>
                        <View style={styles.find_container}>
                            <Pressable style={styles.search_container}>
                                <TextInput
                                ref={searchRef}
                                placeholderTextColor={'#999999'}
                                placeholder='search'
                                keyboardAppearance='dark'
                                selectionColor={'#696969'}
                                style={styles.search}
                                // value={userInput}
                                // onChangeText={i => setUserInput(i)}
                                />
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
            
            <Pressable onPress={() => handleUpload()} style={styles.rout_press}>
                <Text style={styles.rout_text}>rout</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#5F5F5F',
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
        left: window.width / 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        width: 14,
        height: 24,
        // right: window.width / 170
    },
    head_container: {
        // height: window.width / 9,
        marginBottom: 14,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute'
        // backgroundColor: 'white'
        // top: 0
    },
    head: {
        // position: 'absolute',
        fontFamily: 'Louis',
        fontSize: 35,
        color: '#C2C2C2'
    },

    boost_container: {
        // zIndex: 2,
        // position: 'absolute',
        width: window.width / 1.1,
        minHeight: 120,
        maxHeight: 280,
        backgroundColor: '#777777',
        // marginTop: window.width / 20,
        // top: window.width / 7,
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.4,
        shadowRadius: window.width / 110,
    },
    leave_container: {
        height: window.width / 12,
        width: '101%',
        justifyContent: 'center',
        backgroundColor: '#919191',
        // borderTopLeftRadius: window.width / 40,
        // borderTopRightRadius: window.width / 40

    },
    caption_overflow: {
        height: 200,
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden'
    },
    leave_text: {
        alignSelf: 'center',
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: 20,
    },
    
    caption_row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    caption_container: {
        zIndex: 2,
        flex: 1,
        
    },
    caption: {
        flex: 1,
        fontFamily: 'Louis',
        fontSize: 19,
        paddingLeft: 11,
        paddingBottom: 7
        
    },
    preview_container: {
        height: '100%',
        paddingRight: 10,
        paddingLeft: 4,
    },
    preview: {
        height: 50,
        width: 50,
        top: 10,
        borderRadius: 7
    },






    interest_container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },


    find_safe: {
        // overflow: 'hidden',
        // position: 'absolute',
        width: window.width / 1.1,
        // height: 470,
        marginTop: 10,
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    find_overflow: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        borderRadius: 14,
        overflow: 'hidden'
    },
    apply_container: {
        height: window.width / 11,
        width: '101%',
        justifyContent: 'center',
        backgroundColor: '#919191',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    apply_text: {
        // left: window.width / 40,
        alignSelf: 'center',
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: 20
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
        fontSize: 18
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
        borderRadius: 14,
        backgroundColor: '#919191'
    },
    interest_text: {
        left: window.width / 40,
        fontFamily: 'Louis',
        color: '#C2C2C2',
        fontSize: 18
    },









    rout_press: {
        // position: 'absolute',
        marginBottom: window.width / 14,
        height: 55,
        width: window.width  / 1.1,
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        borderBottomRightRadius: 21,
        borderBottomLeftRadius: 21,
        backgroundColor: '#888888',
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
        fontSize: 35
    }

})