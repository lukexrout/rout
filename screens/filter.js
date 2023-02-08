import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, TextInput, FlatList } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const plus = require('../assets/img/plus.png')
const star = require('../assets/img/star.png')
const star_filled = require('../assets/img/star_filled.png')
const info = require('../assets/img/info.png')

const InterestHead = () => {
    return(<View style={styles.interest_head}/>)
}

const Interest = ({ interest, description }) => {

    const [starStatus, setStarStatus] = useState(false)

    const starPress = () => {
        const status = starStatus === false ? true : false
        setStarStatus(status)
    }

    return (
        <View style={styles.interest_container}>
            <View style={styles.interest_info}>
                <View style={styles.interest_title_container}>
                    <Text style={styles.interest_title}>{interest}</Text>
                </View>
                <View style={styles.interest_description_container}>
                    <Text style={styles.interest_description}>{description}</Text>
                </View>
            </View>
            <View style={styles.interest_button_container}>
                <Pressable onPress={() => console.log('info')} style={styles.info_container}>
                    <Image style={styles.info} source={info}/>
                </Pressable>
                {starStatus === false ? 
                <Pressable onPress={() => starPress()} style={styles.star_container}>
                    <Image style={styles.star} source={star}/>
                </Pressable>
                 :
                <Pressable onPress={() => starPress()} style={styles.star_container}>
                    <Image style={styles.star} source={star_filled}/>
                </Pressable>}
            </View>
        </View>
    )
}

export default function Filter({ navigation, route }) {
	
    const listRef = useRef()
	const searchRef = useRef().current

    const [interests, setInterests] = useState([
        {id: 0, interest: 'startup0', description: 'description'},
        {id: 1, interest: 'startup1', description: 'description'},
        {id: 2, interest: 'startup2', description: 'description'},
        {id: 3, interest: 'startup3', description: 'description'},
        {id: 4, interest: 'startup4', description: 'description'},
        {id: 5, interest: 'startup5', description: 'description'},
        {id: 6, interest: 'startup6', description: 'description'},
    ])

    const location = route.params.location

    const navigate = (x) => {
        navigation.navigate(x)
    }

    const interestHead = () => {
        return(<InterestHead/>)
    }

    const interest = ({ item }) => {
        return(<Interest interest={item.interest} description={item.description} key={item.id}/>)
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
                <SafeAreaView style={styles.filter_safe}>
                    <View style={styles.filter_container}>

                        <Text style={styles.filter}>filter</Text>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.plus_safe}>
                    {/* <Pressable onPress={() => navigate(location)} style={styles.back_press}> */}
                    <Pressable style={styles.plus_press}>
                        <Image style={styles.plus} source={plus}/>
                    </Pressable>
                </SafeAreaView>
            </View>
            <View style={styles.search_container}>
                <Pressable onPress={() => searchRef.focus()} style={styles.search_press}>
                    <TextInput
                    ref={searchRef}
                    // value={search}
                    placeholder='search filters'
                    placeholderTextColor={'#595959'}
                    selectionColor={'#696969'}
                    keyboardAppearance='dark'
                    // onChangeText={i => initialLoad(i)}
                    style={styles.search}
                    />
                </Pressable>
            </View>
            <View style={styles.select_container}>
                <FlatList
                ref={listRef}
                style={styles.interest_list}
                data={interests}
                ListHeaderComponent={interestHead}
                // ListFooterComponent={CommentFoot}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                CellRendererComponent={interest}
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
        // flexDirection: 'row'
        marginBottom: 4,
    },
    filter_safe: {

        
        alignSelf: 'center'
    },
    filter_container: {
      height: 40,
      justifyContent: 'center',  
    },
    filter: {
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
    plus_safe: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    plus_press: {
        height: 40,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'        
    },
    plus: {
        height: 24,
        width: 24,
    },
    search_container: {
        marginTop: 10,
    },
    search_press: {
        alignSelf: 'center',
		backgroundColor: '#C2C2C2',
		height: 38,
		width: window.width / 1.1,
		justifyContent: 'center',
		borderRadius: window.width / 70,
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 70,
    },
    search: {
        left: window.width / 40,
		fontFamily: 'Louis',
		fontSize: 17
    },
    select_container: {
        overflow: 'hidden',
        flex: 1,
        width: window.width / 1.1,
        marginTop: 14,
        marginBottom: 20,
        borderRadius: 21,
        alignSelf: 'center',
        backgroundColor: 'gray'
    },
    interest_list: {

    },
    interest_head: {
        height: 10
    },
    interest_container: {
        height: 49,
        width: '95%',
        marginBottom: 10,
        borderRadius: 11,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#999999'
    },
    interest_info: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    interest_title_container: {

    },
    interest_title: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#333333'
    },
    interest_description_container: {

    },
    interest_description: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#444444'
    },
    interest_button_container: {
        position: 'absolute',
        height: '100%',
        // width: 77,
        right: 0,
        flexDirection: 'row',
        alignSelf: 'center',
        // backgroundColor: 'white'
    },
    star_container: {
        flex: 1,
        height: '100%',
        width: 50,
        // paddingRight: 7,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white'
    },
    star: {
        height: 21,
		width: 21
    },
    info_container: {
        flex: 1,
        height: '100%',
        width: 50,
        paddingLeft: 20,

        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue'
    },
    info: {
        height: 21,
		width: 21
    },
})