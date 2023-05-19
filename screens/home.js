import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, SafeAreaView, FlatList, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import Content from './content.js'

const img = require('../assets/IMG_0781.jpeg')

const portFile = require('../port.json')

// images
const plus_img = require('../assets/img/plus_sign.png')
const slider_icon = require('../assets/img/slider_icon.png')

const aws = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/353A7670-2B3B-4B7E-91CD-29640662A756_4_5005_c.jpeg'
const aws_2 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/3B7B6670-B919-4C98-A232-9044BA65B022_4_5005_c.jpeg'
const aws_3 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/image_lol.jpeg'
const aws_4 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/new+found.jpeg'

const window = Dimensions.get('window')

const Head = () => {
	return (
		<View style={styles.head_container}>
			<SafeAreaView style={styles.head_text_container}>
				<Text style={styles.head_text}>rout</Text>
			</SafeAreaView>
		</View>
	)
}

function Home({ navigation }) {
	
	const listRef = useRef()

	const [sourceList, setSourceList] = useState([
        {post_id: 1, pos: null, type: 'text', content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
        {post_id: 2, pos: null, type: 'text', content: 'set for launch in exactly 2 months!'}, 
        {post_id: 3, pos: null, type: 'image', uri: img, content: 'set for launch in exactly 2 months!'}, 
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
		// genFeed()
	}, [sourceList])

	// const genFeed = async () => {

	// 	try {
	// 		const response = await fetch(`http://${portFile.HOST}:${portFile.PORT}/download/compressed-file-1675898409284.jpeg`)
	// 		const blob = await response.blob()
	// 		const reader = new FileReader()
	// 		reader.readAsDataURL(blob)
	// 		reader.onloadend = () => {
	// 			const source = reader.result
	// 			// console.log(source)

	// 			const defText = {post_id: null, pos: null, type: null, content: null}
	// 			const defImage = {post_id: null, pos: null, type: null, uri: null, content: null}

	// 			setSourceList((x) => {
	// 				const finImg = defImage
	// 				finImg.post_id = 3
	// 				finImg.type = 'image'
	// 				finImg.uri = source
	// 				finImg.content = 'hello world.'
	// 				x.splice(2, 0, finImg)
	// 				setSourceList(x)
	// 			})
	// 		}

	// 	} catch (err) {
	// 		console.error(err)
	// 	}

	// 	// fetch('http://192.168.1.86:3000/download/compressed_image1675899013051.jpeg')
	// 	// .then(res => res.blob())
	// 	// .then(blob => {
	// 	// 	console.log(blob)
	// 	// })
	// 	// .catch(err => console.error(err))
	// }

	const scrollTo = (y) => {
		listRef.current.scrollToOffset({ animated: true, offset: y })
	}

	const continuousPost = ({ item }) => {
		return (<Content 
			source={item} 
			id={item.id} 
			key={item.id} 
			scrollTo={scrollTo} 
			navigation={navigation}
			location={'home'}
			pos={item.pos}/>)
	}

	const navigate = (i) => {
		navigation.navigate(i, {
            location: 'home'
        })
	}

	//// Put everything in front of this ////

	const [loaded] = useFonts({
		Louis: require('../assets/fonts/Louis_George_Cafe.ttf'),
	});
	
	if (!loaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<StatusBar style='dark'/>
			<View style={styles.post_container}>
				<SafeAreaView style={styles.safe_container}>
					<Pressable onPress={() => navigate('create_post')} style={styles.create_container}>
						<Image style={styles.create} source={plus_img}/>
					</Pressable>
					<Pressable onPress={() => navigate('filter')} style={styles.slider_container}>
						<Image style={styles.slider} source={slider_icon}/>
					</Pressable>
				</SafeAreaView>
				<FlatList 
				ref={listRef}
				style={styles.feed}
				data={sourceList}
				ListHeaderComponent={Head}
				showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
				CellRendererComponent={continuousPost}
				// keyExtractor={(index) => {index.toString(); console.log(index)}}
				/>
			</View>
		</View>
	  );
}


const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#5F5F5F'
	},
	
	safe_container: {
		width: window.width / 777,
		zIndex: 2,
		alignItems: 'center',
		flexDirection: 'row'
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
        shadowRadius: 7,
        borderRadius: 50,
        backgroundColor: '#C2C2C2'
	},
	create: {
		width: 33,
        height: 33,
	},
	slider_container: {
		height: 28,
		width: 28,
		left: window.width - 99 - window.width / 21,
		backgroundColor: '#C2C2C2',
		borderRadius: 7,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
	},
	slider: {
		height: 20,
		width: 20
	},


	head_container: {
		width: window.width,
		height: 140,
		borderBottomColor: '#5F5F5F',
		borderBottomWidth: window.width / 270
	},
	head_text_container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	head_text: {
		fontFamily: 'Louis',
        fontSize: 40,
        color: '#C2C2C2'
	},
	// foot_container: {
	// 	height: 
	// },

	post_container: {
		width: window.width,
	},
	feed: {
		zIndex: 1,
		position: 'absolute',
		backgroundColor: '#5F5F5F',
		height: window.height,
		width: window.width,
	},
	
});

export default Home