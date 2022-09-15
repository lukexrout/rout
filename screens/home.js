import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, SafeAreaView, FlatList } from 'react-native';
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
	const [imageRatio, setImageRatio] = useState(null)
	const [imageHeight, setImageHeight] = useState(null)

	useEffect(() => {

		if (source.type === 'image') {
		Image.getSize(source.uri, (width, height) => {
			setImageRatio(window.width / width)
			setImageHeight(height)
			// console.log(height, width)
		})}

	}, [])

	return (
		<View>
			{source.type === 'text' ?
				
			<View style={styles.text_post_container}>
				<View style={styles.text_post_image_text}>
					<View style={styles.text_post_image_container}>
						<Image style={styles.text_post_profile_image} source={profile_img}/>
					</View>
					<View style={styles.text_post_user_text_container}>
						<View style={styles.text_post_user_time_container}>
							<View style={styles.text_post_username_container}>
								<Text style={styles.text_post_username}>@schaffer_luke</Text>
							</View>
							<Text style={styles.text_post_time}>10s</Text>
						</View>
						<View style={styles.text_post_text_container}>
							<Text style={styles.text_post_text}>{source.content}</Text>
						</View>
					</View>
					<View style={styles.text_post_info_container}>
						<Image source={info_icon} style={styles.text_post_info}/>
					</View>
				</View>
				<View style={styles.text_post_buttons_container}>
					<View style={styles.text_post_buttons_color}>
						<View style={{alignItems: 'center'}}>
							<Text style={styles.text_post_data}>1.3m</Text>
							<Image source={arrow_up_white} style={styles.arrow}/>
						</View>
						<View style={styles.text_gap}/>
						<Image source={rerout} style={styles.rerout}/>
						<View style={styles.text_gap}/>
						<View style={{alignItems: 'center'}}>
							<Text style={styles.text_post_data}>300k</Text>
							<Image source={comment_icon_white} style={styles.comment_icon}/>
						</View>
						<View style={styles.text_gap}/>
						<Image source={bookmark_icon_white} style={styles.bookmark_icon}/>
						<View style={styles.text_gap}/>
						<View style={{alignItems: 'center'}}>
							<Image source={arrow_down_white} style={styles.arrow}/>
							<Text style={styles.text_post_data}>1.1m</Text>
						</View>
					</View>
				</View>

			</View> :
			<View style={{overflow: 'hidden'}}>
				<Image source={{uri: source.uri}}  resizeMode='stretch' style={[styles.image_image_post, {height: imageHeight * imageRatio}]} />
				
				<View style={styles.image_info_icon_container}>
					<View style={styles.image_info_icon_color}/>
					<Image source={info_icon} style={styles.image_info_icon}/>
				</View>
				<View style={{position: 'absolute', height: '100%', 
				width: '100%',
				justifyContent: 'flex-end', 
				bottom: window.width / 5.8, 
				left: window.width / 40,
				zIndex: 1,
				}}>
					
					<View style={{flexDirection: 'row', zIndex: 1}}>
						<Image source={profile_img} style={{width: window.width / 7, 
						height: window.width / 7, borderRadius: 50, overflow: 'hidden' }}/>
						<View style={{zIndex: 1}}>
								<Text style={{fontFamily: 'Louis', 
								fontSize: window.width / 20, 
								color: '#C2C2C2',
								zIndex: 2, 
								left: window.width / 70
								}}>@jacob_77</Text>
							
							<View style={{
								// height: window.width / 5.5,
								maxWidth: window.width / 1.3,
								marginBottom: window.width / 70,
								marginTop: window.width / 70,
								marginLeft: window.width / 70,
								paddingRight: window.width / 30,
								// opacity: 0.,
								zIndex: 1,
								borderRadius: window.width / 30
							}}>
								
								<Text style={{
									fontFamily: 'Louis',
									fontSize: window.width / 24,
									color: '#D7D7D7',
									zIndex: 3,
									marginBottom: window.width / 30,
									marginRight: window.width / 20,
									opacity: 1,
									top: window.width / 70,
									left: window.width / 40
								}}>
									hi there !!
								</Text>
							</View>
						</View>
						
					</View>
				</View>
				<View style={styles.image_buttons}>
					<View style={styles.image_buttons_container}>
						<View style={styles.image_buttons_color}/>
						<View style={{alignItems: 'center'}}>
						<Text style={{color: '#C2C2C2', 
						fontFamily: 'Louis', 
						textAlign: 'center', 
						position: 'absolute', 
						width: window.width / 10, 
						bottom: window.width / 14, 
						fontSize: window.width / 28
						}}>1.3m</Text>
					<Image source={arrow_up_white} style={styles.arrow}/>
					</View>
					<View style={styles.text_gap}/>
					<Image source={rerout} style={styles.rerout}/>
					<View style={styles.text_gap}/>
					<View style={{alignItems: 'center'}}>
					<Text style={{color: '#C2C2C2', 
					textAlign: 'center', 
					position: 'absolute', 
					fontFamily: 'Louis', 
					fontSize: window.width / 28, 
					width: window.width / 10, 
					bottom: window.width / 14
					}}>300k</Text>
					<Image source={comment_icon_white} style={styles.comment_icon}/>
					</View>
					<View style={styles.text_gap}/>
					<Image source={bookmark_icon_white} style={styles.bookmark_icon}/>
					<View style={styles.text_gap}/>
					<View style={{alignItems: 'center'}}>
					
					<Image source={arrow_down_white} style={styles.arrow}/>
					<Text style={{color: '#C2C2C2', 
					fontFamily: 'Louis', 
					fontSize: window.width / 28, 
					textAlign: 'center', 
					position: 'absolute', 
					width: window.width / 10, 
					bottom: window.width / 14
					}}>1.1m</Text>
					</View>
					</View>
					<LinearGradient
				colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.4)', 'transparent']} 
				style={{width: window.width, height: window.height / 2.3, position: 'absolute', zIndex: 0}}
				start={{x: 1, y: 1}} 
				end={{x: 1, y: 0}}
				/>
				</View>
				
			</View>}
		</View>
)}

function Home({ navigation }) {
	
	const [sourceList, setSourceList] = useState([
		{id: 0, type: 'text', content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
		{id: 1, type: 'image', uri: aws}, 
		{id: 7, type: 'text', content: 'set for launch in exactly one million years!'}, 
		{id: 2, type: 'image', uri: aws_2}, 
		{id: 8, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
		{id: 3, type: 'image', uri: aws}, 
		{id: 345334, type: 'image', uri: aws_2}
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
        width: window.width / 6.5,
        height: window.width / 6.5,
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
		width: window.width / 12,
        height: window.width / 12,
	},
	slider_container: {
		// position: 'absolute',
		height: window.width / 12,
		width: window.width / 12,
		left: window.width - window.width / 4 - window.width / 21,
		backgroundColor: '#C2C2C2',
		borderRadius: window.width / 49,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: window.width / 170,
	},
	slider: {
		height: window.width / 17,
		width: window.width / 17,
	},


	head_container: {
		width: window.width,
		height: window.width / 3.4,
		borderBottomColor: '#777777',
		borderBottomWidth: window.width / 170
	},
	head_text_container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	head_text: {
		fontFamily: 'Louis',
        fontSize: window.width / 10,
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
	text_post_container: {
		width: '100%',
		backgroundColor: '#555555',
		justifyContent: 'flex-end',
		alignSelf: 'flex-start'
	},
	text_post_image_text: {
		flexDirection: 'row',
		top: window.width / 40
	},
	text_post_image_container: {
		alignItems: 'center',
		left: window.width / 40,
	},
	text_post_profile_image: {
		width: window.width / 7,
		height: window.width / 7,
		borderRadius: 50
	},
	text_post_user_text_container: {
		flexDirection: 'column',
		left: window.width / 20,
	},
	text_post_user_time_container: {
		flexDirection: 'row'
	},
	text_post_username_container: {
		height: window.width / 17,
		overflow: 'hidden',
		flexDirection: 'row'
	},
	text_post_username: {
		fontFamily: 'Louis',
		color: '#C2C2C2',
		
		fontSize: window.width / 20
	},
	text_post_time: {
		fontFamily: 'Louis',
        color: '#a1a1a1',
		fontSize: window.width / 21,
		top: window.width / 200,
		textAlign: 'center',
		left: window.width / 30,
		width: window.width / 13
		
	},
	text_post_text_container: {
		justifyContent: 'center',
		alignSelf: 'flex-start',
		marginBottom: window.width / 13,
		top: window.width / 50,
		borderRadius: window.width / 30
	},
	text_post_text: {
		color: '#C2C2C2',
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'Louis',
		fontSize: window.width / 24,
		left: window.width / 150,
		width: window.width / 1.45,
	},
	text_post_info_container: {
		position: 'absolute',
		left: window.width - window.width / 5,
		width: window.width / 6,
		height: window.width / 6,
		top: window.width / 45,
		alignItems: 'center'
	},
	text_post_info: {
		position: 'absolute',
		width: window.width / 13,
		height: window.width / 55,
	},
	text_post_buttons_container: {
		marginTop: window.width / 12,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		bottom: window.width / 30,
		justifyContent: 'center',
	},
	text_post_buttons_color: {
		backgroundColor: '#696969',
		flexDirection: 'row',
		borderRadius: window.width / 30,
		width: window.width / 1.4,
		justifyContent: 'center',
		alignItems: 'center',
		height: window.width / 12

	},
	text_post_data: {
		fontFamily: 'Louis',
		textAlign: 'center',
		position: 'absolute',
		color: '#C2C2C2',
		width: window.width / 10,
		bottom: window.width / 14,
		fontSize: window.width / 28
	},
	text_gap: {
		width: window.width / 11
	},	
	arrow: {
		width: 20,
		height: 21,
	},
	comment_icon: {
		width: 27,
		height: 21,
	},
	bookmark_icon: {
		width: 17,
		left: window.width / 170,
		height: 21
	},
	rerout: {
		width: 26,
		height: 21,
	},
	image_post: {

		// justifyContent: 'flex-start'
		// alignSelf: 'center',
		// width: window.width,
		// height: window.height / 5,
		// backgroundColor: 'blue'
	},
	image_image_post: {
		// flex: 1,
		width: window.width,
		// alignSelf: 'center',
		// position: 'absolute'
		// resizeMode: 'contain'
		// bottom: 100,
		// height: imagehHeight,
		// aspectRatio: 1
		// resizeMode: 'contain'
		// width: 600
		// height: window.height / 1.2,
		// position: 'absolute'
	},

	// image_rating: {
	// 	position: 'absolute',
	// 	width: window.width / 5.5,
	// 	height: window.width / 5,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	// backgroundColor: '#707070',
	// 	// borderRadius: window.width / 30,
	// 	left: window.width / 25,
	// 	// opacity: .8,
	// 	top: window.width / 25
	// },
	// image_rating_color: {
	// 	// backgroundColor: '#606060',
	// 	backgroundColor: 'white',
	// 	width: window.width / 5.5,
	// 	height: window.width / 5,
	// 	position: 'absolute',
	// 	borderRadius: window.width / 30,
	// 	opacity: .3
	// },
	// image_rating_text: {
	// 	fontFamily: 'Louis',
	// 	fontSize: window.width / 24
	// },
	// image_rating_line: {
	// 	width: window.width / 7,
	// 	height: window.width / 190,
	// 	marginTop: window.width / 50,
	// 	marginBottom: window.width / 50,
	// 	// backgroundColor: '#585858',
	// 	backgroundColor: '#FFFFFF',
	// 	// borderWidth: window.width / 420,
	// 	borderRadius: 50,
	// 	opacity: .2
	// },

	image_info_icon_container: {
		top: window.width / 25,
		// backgroundColor: '#383838',
		width: window.width / 7,
		height: window.width / 12,
		// opacity: .8,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		left: window.width - window.width / 5.8,
		position: 'absolute'
	},
	image_info_icon_color: {
		backgroundColor: 'white',
		// backgroundColor: '#707070',
		width: window.width / 8,
		height: window.width / 14,
		position: 'absolute',
		borderRadius: 50,
		opacity: .1,
	},
	image_info_icon: {
		width: window.width / 13,
		height: window.width / 55,
		// opacity: 1,
		// left: window.width / 3.5,
		// top: window.width / 39
		position: 'absolute'
	},	
	image_buttons: {
		position: 'absolute',
		flexDirection: 'row',
		width: '100%',
		// height: '100%',
		// top: window.width / 15,
		alignItems: 'center',
		bottom: window.width / 30,
		// left: window.width / 3.5
		justifyContent: 'center',
		// overflow: 'hidden'
	},
	image_buttons_color: {
		// backgroundColor: '#EAEAEA',
		backgroundColor: '#555555',
		height: window.width / 12,
		width: window.width / 1.4,
		position: 'absolute',
		shadowColor: 'black',
		shadowOffset: {height: 0},
		shadowOpacity: 100,
		shadowRadius: window.width / 30,
		borderRadius: window.width / 30,
		opacity: .7,

	},
	image_buttons_data_shadow: {
		// backgroundColor: '#EAEAEA',
		backgroundColor: '#555555',
		height: window.width / 12,
		width: window.width / 1.4,
		position: 'absolute',
		shadowColor: 'black',
		shadowOffset: {height: -window.width / 20},
		shadowOpacity: 1,
		shadowRadius: window.width / 100,
		borderRadius: window.width / 30,
		opacity: .4,
		// bottom: window.width / 17,
		zIndex: 0

	},
	image_buttons_container: {
		// backgroundColor: '#383838',
		flexDirection: 'row',
		zIndex: 1,
		// borderRadius: window.width / 30,
		width: window.width / 1.45,
		justifyContent: 'center',
		alignItems: 'center',
		// opacity: 0.9,
		height: window.width / 9,
		// shadowOffset: {height: 0},
		// shadowOpacity: 1,
		// shadowRadius: 2,
		// shadowColor: 'black',
	},
	image_gap: {
		width: window.width / 16

	}
});

export default Home