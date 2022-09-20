import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, SafeAreaView, FlatList, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

// data
const file = require('../../rout/user.json')

// images
const plus_img = require('../assets/img/plus_sign.png')
const profile_img = require('../assets/img/user_profile_template.png')
const arrow_up = require('../assets/img/arrow_up.png')
const arrow_up_white = require('../assets/img/arrow_up_white.png')
const arrow_down = require('../assets/img/arrow_down.png')
const arrow_down_white = require('../assets/img/arrow_down_white.png')
const comment_icon_white = require('../assets/img/comment_icon_white.png')
const comment_icon = require('../assets/img/comment_icon.png')
const bookmark_icon = require('../assets/img/bookmark_icon.png')
const bookmark_icon_white = require('../assets/img/bookmark_icon_white.png')
const info_icon = require('../assets/img/info_icon.png')
const share_icon = require('../assets/img/share_icon.png')
const share_icon_white = require('../assets/img/share_icon_white.png')
const slider_icon = require('../assets/img/slider_icon.png')
const rerout = require('../assets/img/rerout.png')

const vertical_fill = require('../assets/img/vertical_fill.jpeg')
const landscape_image = require('../assets/img/landscape_image.jpeg')

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
const Foot = () => {
	return (
		<View style={styles.foot_container}>
		</View>
	)
}

const Content = ({ source, id }) => {

	const commentsHeight = useRef(new Animated.Value(0)).current

	const [imageRatio, setImageRatio] = useState(null)
	const [imageHeight, setImageHeight] = useState(null)
	const [commentsStatus, setCommentsStatus] = useState(false)

	useEffect(() => {

		if (source.type === 'image') {
		Image.getSize(source.uri, (width, height) => {
			setImageRatio(window.width / width)
			setImageHeight(height)
			// console.log(height, width)
		})}

	}, [])


	const commentsPress = () => {

		if (commentsStatus === false) {
			setCommentsStatus(true)
			Animated.timing(commentsHeight, {
				toValue: window.height / 2.8,
				duration: 222,
				useNativeDriver: false
			}).start()
		} else if (commentsStatus === true) {
			setCommentsStatus(false)
			Animated.timing(commentsHeight, {
				toValue: 0,
				duration: 222,
				useNativeDriver: false
			}).start()
		}

	}


	return (
		<View>


			{source.type === 'text' ?
			<View style={styles.text_container}>
				<View style={styles.text_top_container}>
					<View style={styles.text_top_row}>
						<View style={styles.text_user_image_container}>
							<Image style={styles.text_user_image} source={profile_img} />
						</View>
						<View style={styles.text_username_container}>
							<Text style={styles.text_username}>schafferluke</Text>
						</View>
					</View>
					<View style={styles.text_end_container}>
						<View style={styles.text_time_container}>
							<Text style={styles.text_time}>1h</Text>
						</View>
						<View style={styles.text_info_container}>
							
							<View>
								<Image style={styles.text_info} source={info_icon} />
							</View>
						</View>
					</View>
				</View>
				<View style={styles.text_content_container}>
					<Text style={styles.text_content}>{source.content}</Text>
				</View>
				<View style={styles.text_interact_container}>
					<View style={styles.text_interact_icon}>
						<Text style={styles.text_data}>107k</Text>
						<Image style={styles.text_up} source={arrow_up_white}/>
					</View>
					<View style={styles.text_interact_icon}>
						<Text style={styles.text_data}>1.4m</Text>
						<Image style={styles.text_rerout} source={rerout}/>
					</View>
					<Pressable onPress={() => commentsPress()} style={styles.text_interact_icon}>
						<Text style={styles.text_data}>444k</Text>
						<Image style={styles.text_comment} source={comment_icon_white}/>
					</Pressable>
					<View style={styles.text_interact_icon}>
						<Text style={styles.text_data}>111k</Text>
						<Image style={styles.text_save} source={bookmark_icon_white}/>
					</View>
					<View style={styles.text_interact_icon}>
						<Text style={styles.text_data}>1777</Text>
						<Image style={styles.text_down} source={arrow_down_white}/>
					</View>
				</View>
			</View>	
			 :			
			<View style={styles.image_container}>
				<View style={styles.image}>
					<Image
					source={{uri: source.uri}}
					resizeMode='stretch'
					style={
						{height: imageHeight * imageRatio}
					}/>
				</View>
				<View style={styles.image_overlay_container}>
					<View style={styles.image_info_container}>
						<Image style={styles.image_info} source={info_icon} />
					</View>
					<View style={styles.image_row}>
						<View style={styles.image_column}>

							<View style={styles.image_top_row}>
								<View style={styles.image_user_image_container}>
									<Image style={styles.image_user_image} source={profile_img}/>
								</View>
								<View style={styles.image_username_container}>
									<Text style={styles.image_username}>schafferluke</Text>
								</View>
							</View>
							<View style={styles.image_content_container}>
								<Text style={styles.image_content}>{source.content}</Text>
							</View>
							<View style={styles.image_interact_container}>
								<View style={styles.image_interact_icon}>
									<Text style={styles.image_data}>1.7m</Text>
									<Image style={styles.image_up} source={arrow_up_white}/>
								</View>
								<View style={styles.image_interact_icon}>
									<Text style={styles.image_data}>5.7m</Text>
									<Image style={styles.image_rerout} source={rerout}/>
								</View>
								<Pressable onPress={() => commentsPress()} style={styles.image_interact_icon}>
									<Text style={styles.image_data}>107k</Text>
									<Image style={styles.image_comment} source={comment_icon_white}/>
								</Pressable>
								<View style={styles.image_interact_icon}>
									<Text style={styles.image_data}>47.7k</Text>
									<Image style={styles.image_save} source={bookmark_icon_white}/>
								</View>
								<View style={styles.image_interact_icon}>
									<Text style={styles.image_data}>4747</Text>
									<Image style={styles.image_down} source={arrow_down_white}/>
								</View>
							</View>
						</View>
						<View style={styles.darken_container}>
							<LinearGradient
								style={styles.darken}
								colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.4)', 'transparent']} 
								start={{x: 1, y: 1}} 
								end={{x: 1, y: 0}}
							/>
						</View>
					</View>
				</View>
			</View>
			}



			<Animated.View style={[styles.comments_container, {height: commentsHeight}]}>

			</Animated.View>



		</View>
	)
}

function Home({ navigation }) {
	
	const [sourceList, setSourceList] = useState([
		{id: 0, type: 'text', content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
		{id: 1, type: 'image', uri: aws, content: 'hello world!'}, 
		{id: 7, type: 'text', content: 'set for launch in exactly one million years!'}, 
		{id: 2, type: 'image', uri: aws_2, content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
		{id: 8, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
		{id: 3, type: 'image', uri: aws, content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
		{id: 345334, type: 'image', uri: aws_2, content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}
	])

	const continuousPost = ({ item }) => {
		return (<Content source={item} id={item.id} key={item.id}/>)
	}

	const plus_press = () => {
		navigation.navigate('create_post', {
			location: 'home'
		})
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
					<Pressable style={styles.slider_container}>
						<Image style={styles.slider} source={slider_icon}/>
					</Pressable>
				</SafeAreaView>
				
				<FlatList 
				style={styles.feed}
				data={sourceList}
				ListHeaderComponent={Head}
				ListFooterComponent={Foot}
				showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
				renderItem={continuousPost}
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
		backgroundColor: '#555555'
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
        shadowRadius: window.width / 70,
        borderRadius: 50,
        backgroundColor: '#C2C2C2'
	},
	create: {
		width: 33,
        height: 33,
	},
	slider_container: {
		height: 33,
		width: 33,
		left: window.width - 99 - window.width / 21,
		backgroundColor: '#C2C2C2',
		borderRadius: 7,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 170,
	},
	slider: {
		height: 22,
		width: 22
	},


	head_container: {
		width: window.width,
		height: window.height / 8,
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
	foot_container: {
		height: window.width / 2.8
	},

	post_container: {
		width: window.width,
	},
	feed: {
		position: 'absolute',
		backgroundColor: '#555555',
		width: window.width,
		height: window.height,
	},



	

	text_container: {

	},
	text_row: {
		flexDirection: 'row'
	},
	text_column: {
		flex: 1
	},
	text_top_container: {

	},
	text_top_row: {
		flexDirection: 'row',
		alignItems: 'center',
		height: window.width / 7
	},
	text_user_image_container: {
		marginLeft: window.width / 40
	},
	text_user_image: {
		height: 42,
		width: 42,
		borderRadius: 50
	},
	text_username_container: {
		left: window.width / 40
	},
	text_username: {
		fontFamily: 'Louis',
		fontSize: 18,
		color: '#C2C2C2'
	},
	text_end_container: {
		position: 'absolute',
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	text_time_container: {
		height: window.width / 7,
		right: window.width / 70,
		justifyContent: 'center'
	},
	text_time: {
		fontFamily: 'Louis',
		fontSize: 16,
		color: '#A1A1A1'
	},
	text_info_container: {
		height: window.width / 7,
		width: window.width / 14,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text_info: {
		height: 24,
		width: 5
	},
	text_content_container: {

	},
	text_content: {
		fontFamily: 'Louis',
		fontSize: 15,
		color: '#C2C2C2',
		paddingLeft: 17,
		paddingRight: 14,
		paddingBottom: 11,
		paddingTop: 4
	},
	text_interact_container: {
		height: window.height / 26,
		flexDirection: 'row',
		marginBottom: window.height / 77
	},
	text_interact_icon: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text_data: {
		fontFamily: 'Louis',
		fontSize: window.width / 36,
		color: '#A1A1A1',
		marginBottom: window.height / 170
	},
	text_up: {
		width: 16,
		height: 17
	},
	text_rerout: {
		width: 21,
		height: 17
	},
	text_comment: {
		width: 22,
		height: 17
	},
	text_save: {
		width: 14,
		height: 17,
	},
	text_down: {
		width: 16,
		height: 17
	},







	image_container: {
		overflow: 'hidden'
	},
	image: {

	},
	image_overlay_container: {
		position: 'absolute',
		height: '100%',
		width: '100%'
	},
	image_info_container: {
		position: 'absolute',
		height: window.width / 7,
		width: window.width / 14,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	image_info: {
		height: 24,
		width: 5
	},
	
	image_row: {
		position: 'absolute',
		flexDirection: 'row',
		height: '100%'
	},
	image_column: {
		zIndex: 1,
		position: 'absolute',
		alignSelf: 'flex-end'
	},
	image_top_row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image_user_image_container: {
		marginLeft: window.width / 40
	},
	image_user_image: {
		height: 42,
		width: 42,
		borderRadius: 50
	},
	image_username_container: {
		left: window.width / 40
	},
	image_username: {
		fontFamily: 'Louis',
		fontSize: 18,
		color: '#C2C2C2'
	},
	image_content_container: {
		width: window.width
	},
	image_content: {
		fontFamily: 'Louis',
		fontSize: 15,
		color: '#C2C2C2',
		paddingLeft: 17,
		paddingRight: 14,
		paddingBottom: 12,
		paddingTop: 12
	},
	image_interact_container: {
		height: window.height / 26,
		width: window.width,
		flexDirection: 'row',
		marginBottom: window.height / 77
	},
	image_interact_icon: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image_data: {
		fontFamily: 'Louis',
		fontSize: window.width / 36,
		color: '#C2C2C2',
		marginBottom: window.height / 170
	},
	image_up: {
		width: 16,
		height: 17
	},
	image_rerout: {
		width: 21,
		height: 17
	},
	image_comment: {
		width: 22,
		height: 17
	},
	image_save: {
		width: 14,
		height: 17,
	},
	image_down: {
		width: 16,
		height: 17
	},
	darken_container: {
		zIndex: 0,
		top: 1,
		alignSelf: 'flex-end',
	},
	darken: {
		height: '50%',
		width: window.width
	},



	comments_container: {
		width: window.width,
		backgroundColor: '#717171'
	}
	
});

export default Home