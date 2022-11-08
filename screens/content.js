import React, { useEffect, useState, useRef, useCallback } from 'react';
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
const arrow_up_pressed = require('../assets/img/arrow_up_pressed.png')
const arrow_down = require('../assets/img/arrow_down.png')
const arrow_down_white = require('../assets/img/arrow_down_white.png')
const arrow_down_pressed = require('../assets/img/arrow_down_pressed.png')
const comment_icon_white = require('../assets/img/comment_icon_white.png')
const comment_icon = require('../assets/img/comment_icon.png')
const bookmark_icon = require('../assets/img/bookmark_icon.png')
const bookmark_icon_white = require('../assets/img/bookmark_icon_white.png')
const bookmark_icon_pressed = require('../assets/img/bookmark_icon_filled.png')
const info_icon = require('../assets/img/info_icon.png')
const share_icon = require('../assets/img/share_icon.png')
const share_icon_white = require('../assets/img/share_icon_white.png')
const slider_icon = require('../assets/img/slider_icon.png')
const rerout = require('../assets/img/rerout.png')
const collapse = require('../assets/img/collapse_icon.png')

const vertical_fill = require('../assets/img/vertical_fill.jpeg')
const landscape_image = require('../assets/img/landscape_image.jpeg')

const aws = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/353A7670-2B3B-4B7E-91CD-29640662A756_4_5005_c.jpeg'
const aws_2 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/3B7B6670-B919-4C98-A232-9044BA65B022_4_5005_c.jpeg'
const aws_3 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/image_lol.jpeg'
const aws_4 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/new+found.jpeg'

const window = Dimensions.get('window')

export default function Content ({ navigation, source, id, scrollTo, location }) {

	const postRef = useRef().current
	const collapseRef = useRef(new Animated.Value(0)).current
	const contentOpacity = useRef(new Animated.Value(0)).current
	const infoOpacity = useRef(new Animated.Value(0)).current

	const [imageRatio, setImageRatio] = useState(null)
	const [imageHeight, setImageHeight] = useState(null)
	const [y, setY] = useState()
	const [collapseStatus, setCollapseStatus] = useState(null)
	const [voteStatus, setVoteStatus] = useState(null)
	const [saveStatus, setSaveStatus] = useState(null)
	const [infoStatus, setInfoStatus] = useState(null)
	const [contentHeight, setContentHeight] = useState(null)

	useEffect(() => {

		if (source.type === 'image') {
		Image.getSize(source.uri, (width, height) => {
			setImageRatio(window.width / width)
			setImageHeight(height)
		})}

	}, [])

	const collapsePress = (x) => {

		if (x !== collapseStatus) {
			setCollapseStatus(x)

			Animated.parallel([
				Animated.timing(collapseRef, {
					toValue: 1,
					duration: 177,
					useNativeDriver: false
				}),
				Animated.timing(contentOpacity, {
					toValue: 0,
					duration: 177,
					useNativeDriver: false
				})

			]).start()

		} else {
			setCollapseStatus(null)

			Animated.timing(collapseRef, {
				toValue: 0,
				duration: 77,
				useNativeDriver: false
			}).start()
		}
	}
	const collapseAngle = collapseRef.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"]
	})
	
	const infoPress = (x) => {
		
		if (x !== infoStatus) {
			setInfoStatus(x)
		
			Animated.timing(infoOpacity, {
				toValue: 1,
				duration: 177,
				useNativeDriver: false
			}).start()

		} else {
			

			Animated.timing(infoOpacity, {
				toValue: 0,
				duration: 77,
				useNativeDriver: false
			}).start(() => {
				setInfoStatus(null)
			})

		}

	}

	const votePress = (x) => {
		if (x !== voteStatus) {
			setVoteStatus(x)
		} else {
			setVoteStatus(null)
		}

	}

	const reroutPress = () => {

		navigate('rerout')
        scrollTo(y - window.height / 7)

	}
	
	const commentsPress = () => {
		
		navigate('comments')
        scrollTo(y - window.height / 7)
	

	}

	const savePress = (x) => {

		if (x !== saveStatus) {
			setSaveStatus(x)
		} else {
			setSaveStatus(null)
		}

	}

	const navigate = (x) => {
		navigation.navigate(x, {
			location: location,
			content: source.content
		})
	}

	return (
		<View ref={postRef} onLayout={( event ) => {
			const {x, y, width, height} = event.nativeEvent.layout
			setY(y)
		}}>


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
						<Pressable onPress={() => infoPress(true)} style={styles.text_info_container}>
							
							<View>
								<Image style={styles.text_info} source={info_icon} />
							</View>
						</Pressable>
						
						
					</View>
				</View>
				{infoStatus === true ?
				<Animated.View style={[styles.info_modal_safe, {opacity: infoOpacity}]}>
					<Pressable onPress={() => infoPress(true)} style={styles.info_modal_background}/>
					<View style={styles.info_modal_container}>
						<View style={styles.triangle}/>
						<View style={styles.modal_select_safe}>

							<Pressable onPress={() => console.log('hello world1')} style={[styles.modal_share_container, {}]}>
								<Text style={styles.modal_select}>share</Text>
							</Pressable>
							<View style={styles.modal_sep}/>
							<Pressable onPress={() => console.log('hello world2')} style={[styles.modal_meta_container, {}]}>
								<Text style={styles.modal_select}>metaData</Text>
							</Pressable>
							<View style={styles.modal_sep}/>
							<Pressable onPress={() => console.log('hello world3')} style={[styles.modal_report_container, {}]}>
								<Text style={styles.modal_select}>report.</Text>
							</Pressable>
						</View>
					</View>	
				</Animated.View>
					:
				<View/>
				}
				<View style={styles.text_content_container}>
					<Text style={styles.text_content}>{source.content}</Text>
				</View>
				<View style={styles.text_interact_container}>
					<Pressable onPress={() => votePress('upVote')} style={styles.text_interact_icon}>
						<Text style={styles.text_data}>107k</Text>

						{voteStatus === 'upVote' ?
						<Image style={styles.text_down} source={arrow_up_pressed}/>
						 :
						<Image style={styles.text_up} source={arrow_up_white}/>
						}
					</Pressable>
					<Pressable onPress={() => reroutPress()} style={styles.text_interact_icon}>
						<Text style={styles.text_data}>1.4m</Text>
						<Image style={styles.text_rerout} source={rerout}/>
					</Pressable>
					<Pressable onPress={() => commentsPress()} style={styles.text_interact_icon}>
						<Text style={styles.text_data}>444k</Text>
						<Image style={styles.text_comment} source={comment_icon_white}/>
					</Pressable>
					<Pressable onPress={() => savePress('save')} style={styles.text_interact_icon}>
						<Text style={styles.text_data}>111k</Text>
						{saveStatus === 'save' ?
						<Image style={styles.text_save} source={bookmark_icon_pressed}/>
						 :
						<Image style={styles.text_save} source={bookmark_icon_white}/>
						}
					</Pressable>
					<Pressable onPress={() => votePress('downVote')} style={styles.text_interact_icon}>
						<Text style={styles.text_data}>1777</Text>
						{voteStatus === 'downVote' ?
						<Image style={styles.text_down} source={arrow_down_pressed}/>
						 :
						<Image style={styles.text_down} source={arrow_down_white}/>
						}
					</Pressable>
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
					<Pressable onPress={() => infoPress(true)} style={styles.image_info_container}>
						<Image style={styles.image_info} source={info_icon} />
					</Pressable>
					{infoStatus === true ?
					<Animated.View style={[styles.info_modal_safe, {opacity: infoOpacity}]}>
						<Pressable onPress={() => infoPress(true)} style={styles.info_modal_background}/>
						<View style={styles.info_modal_container}>
							<View style={styles.triangle}/>
							<View style={styles.modal_select_safe}>
								<Pressable onPress={() => console.log('hello world1')} style={[styles.modal_share_container, {}]}>
									<Text style={styles.modal_select}>share</Text>
								</Pressable>
								<View style={styles.modal_sep}/>
								<Pressable onPress={() => console.log('hello world2')} style={[styles.modal_meta_container, {}]}>
									<Text style={styles.modal_select}>metaData</Text>
								</Pressable>
								<View style={styles.modal_sep}/>
								<Pressable onPress={() => console.log('hello world3')} style={[styles.modal_report_container, {}]}>
									<Text style={styles.modal_select}>report.</Text>
								</Pressable>
							</View>
						</View>	
					</Animated.View>
						:
					<View/>
					}
					<View style={styles.image_row}>
						<View style={styles.image_column}>

							<View style={styles.image_top_row}>
								<View style={styles.image_user_image_container}>
									<Image style={styles.image_user_image} source={profile_img}/>
								</View>
								<View style={styles.image_username_container}>
									<Text style={styles.image_username}>schafferluke</Text>
								</View>
								<View style={styles.image_time_container}>
									<Text style={styles.image_time}>1h</Text>
								</View>
							</View>
							<Animated.View style={[styles.image_collapse_container, {transform: [{rotate: collapseAngle}]}]}>
								<Pressable style={styles.image_collapse_press} onPress={() => collapsePress('collapse')}>
									<Image style={styles.image_collapse} source={collapse}/>
								</Pressable>
							</Animated.View>
							{collapseStatus === 'collapse' ?
							<View/>
							 :
							<View onLayout={( event ) => {
								const {x, y, width, height} = event.nativeEvent.layout
								setContentHeight(height)
							}} style={styles.image_content_container}>
								<Text style={styles.image_content}>{source.content}</Text>
							</View>
							}
							<View style={styles.image_interact_container}>
								<Pressable onPress={() => votePress('upVote')} style={styles.image_interact_icon}>
									<Text style={styles.image_data}>1.7m</Text>
									{voteStatus === 'upVote' ?
									<Image style={styles.image_up} source={arrow_up_pressed}/>
									:
									<Image style={styles.image_up} source={arrow_up_white}/>
									}
								</Pressable>
								<Pressable onPress={() => reroutPress()} style={styles.image_interact_icon}>
									<Text style={styles.image_data}>5.7m</Text>
									<Image style={styles.image_rerout} source={rerout}/>
								</Pressable>
								<Pressable onPress={() => commentsPress()} style={styles.image_interact_icon}>
									<Text style={styles.image_data}>107k</Text>
									<Image style={styles.image_comment} source={comment_icon_white}/>
								</Pressable>
								<Pressable onPress={() => savePress('save')} style={styles.image_interact_icon}>
									<Text style={styles.image_data}>47.7k</Text>
									{saveStatus === 'save' ?
									<Image style={styles.image_save} source={bookmark_icon_pressed}/>
									:
									<Image style={styles.image_save} source={bookmark_icon_white}/>
									}
								</Pressable>
								<Pressable onPress={() => votePress('downVote')} style={styles.image_interact_icon}>
									<Text style={styles.image_data}>4747</Text>
									{voteStatus === 'downVote' ?
									<Image style={styles.text_down} source={arrow_down_pressed}/>
									:
									<Image style={styles.image_down} source={arrow_down_white}/>
									}
								</Pressable>
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
			
		</View>
	)
}

const styles = StyleSheet.create({
    text_container: {
        width: window.width,
		zIndex: 2,
		backgroundColor: '#555555'
	},
	text_row: {
		flexDirection: 'row'
	},
	text_column: {
		flex: 1
	},
	text_top_container: {
		zIndex: 2
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
		zIndex: 1
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
		marginBottom: 14
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
		marginBottom: 4
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
		width: 13,
		height: 17,
	},
	text_down: {
		width: 16,
		height: 17
	},







	image_container: {

		overflow: 'hidden',
		zIndex: 2
	},
	image: {
        width: window.width
	},
	image_overlay_container: {
		position: 'absolute',
		height: '100%',
		width: '100%'
	},
	image_info_container: {
		zIndex: 2,
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
		marginBottom: 12
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
		marginLeft: window.width / 40
	},
	image_username: {
		fontFamily: 'Louis',
		fontSize: 18,
		color: '#C2C2C2'
	},
	image_time_container: {
		height: 42,
		marginLeft: window.width / 40,
		justifyContent: 'center'
	},
	image_time: {
		fontFamily: 'Louis',
		fontSize: 16,

		color: '#A1A1A1'
	},
	image_collapse_container: {
		position: 'absolute',
		height: 42,
		right: window.width / 28,
		justifyContent: 'center',
		alignSelf: 'flex-end',
		opacity: 0.7
	},
	image_collapse_press: {
		height: 28,
		width: 42,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image_collapse: {
		height: 9,
		width: 18
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
	},
	image_interact_container: {
		height: window.height / 26,
		width: window.width,
		flexDirection: 'row',
		marginBottom: 14
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
		marginBottom: 4
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
		width: 13,
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

	info_modal_safe: {
		zIndex: 2,
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
	info_modal_container: {
		position: 'absolute',
		right: window.width / 12,
		top: 20,
		width: 210,
		height: 110,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderWidth: 2,
		borderColor: '#444444',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
		backgroundColor: '#222222',
	},
	triangle: {

		transform: [{rotate: '45deg'}],
		height: 14,
		width: 14,
		top: 1,
		left: 9,
		alignSelf: 'flex-end',
		
		borderTopRightRadius: 5,
		borderTopWidth: 2,
		borderRightWidth: 2,
		borderColor: '#444444',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 4,
		backgroundColor: '#222222'
	},
	info_modal_background: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		// backgroundColor: 'blue'
	},
	modal_sep: {
		width: '88%',
		height: 1,
		backgroundColor: '#333333',
		borderRadius: 50,
		alignSelf: 'center'
	},
	modal_select_safe: {
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
	modal_share_container: {
		backgroundColor: '#222222',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		borderTopLeftRadius: 10
	},
	modal_meta_container: {
		backgroundColor: '#222222',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		borderTopLeftRadius: 10
	},
	modal_report_container: {
		backgroundColor: '#222222',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	modal_select: {
		fontFamily: 'Louis',
		fontSize: 15,
		color: '#C2C2C2'
	},
})