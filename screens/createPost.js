import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import { Camera, CameraType } from 'expo-camera'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, Text, View, SafeAreaView, Pressable, FlatList, TextInput, KeyboardAvoidingView, Keyboard, Animated } from 'react-native';
import mime from 'mime'
import axios from 'axios'

const back = require('../assets/img/back.png')
const arrow = require('../assets/img/arrow-up.png')
const profile_img = require('../assets/img/user_profile_template.png')
const send_icon = require('../assets/img/post_arrow_up.png')
const x = require('../assets/img/x.png')
const lightniing_bolt = require('../assets/img/lightning_bolt_icon.png')
const lightniing_bolt_filled = require('../assets/img/lightning_bolt_icon_filled.png')
const change_icon = require('../assets/img/change_camera_icon.png')
const x_icon = require('../assets/img/preview_x_icon.png')
const edit_icon = require('../assets/img/preview_edit_icon.png')
const white_arrow = require('../assets/img/white_post_arrow.png')
const pick = require('../assets/img/pick.png')
const vertical_fill = require('../assets/img/vertical_fill.jpeg')

const window = Dimensions.get('window')

const Library = ({ item }) => (
	<View >
		<Image 
		source={{ uri: item }}
		style={styles.media}/>
	</View>
)

export default function CreatePost({ navigation, route }) {
	
	const typeSelectionAnimation = useRef(new Animated.Value(0)).current
	const imageTypeAnimation = useRef(new Animated.Value(window.width / 23)).current
	const textTypeAnimation = useRef(new Animated.Value(window.width / 17)).current
	const videoTypeAnimation = useRef(new Animated.Value(window.width / 23)).current

    const [media, setMedia] = useState([])
	const [flashIcon, setFlashIcon] = useState(lightniing_bolt)
	const [show, setShow] = useState(false)
	const [styleSide, setStyleSide] = useState('middle')
	const [postType, setPostType] = useState('text')
	const [keyboardShown, setKeyboardShown] = useState(window.width / 1.45)
	const [type, setType] = useState(CameraType.front)
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
	const [cameraStatus, setCameraStatus] = useState('front')
	const [flashStatus, setFlashStatus] = useState('off')
	const [imagePreview, setImagePreview] = useState(null)
	const [uploadURL, setUploadURL] = useState(null)
	const [previewRatio, setPreviewRatio] = useState(null)
	const [previewWidth, setPreviewWidth] = useState(null)
	const [previewIndex, setPreviewIndex] = useState(1)

	const photoRef = useRef()

	const location = route.params.location

	const goBack = () => {
		navigation.navigate(location)
	}

	const navigate = (x) => {
		navigation.navigate(x)
	}

	const media_grid = ({ item }) => {
		return (<Library item={item.src}/>)
	}

	useEffect(() => {
		
		// const { status } = await MediaLibrary.requestPermissionsAsync()
		// if (status !== 'granted') {
		// 	alert('Camera Roll Permissions Needed.')
		// }

		// let media = await MediaLibrary.getAssetsAsync()

		// const media_arr = []

		// for (let i = 0; i < media.assets.length; i++) {
		// 	media_arr.push({
		// 		id: i + 1,
		// 		src: media.assets[i].uri
		// 	})
		// }

		

		// if (!media.cancelled) {
		// 	setMedia(media_arr)
		// 	setShow(true)
		// }

		const keyShown = Keyboard.addListener('keyboardWillShow', () => {
			setKeyboardShown(window.width / 1.13)
		})
		const keyHidden = Keyboard.addListener('keyboardWillHide', () => {
			setKeyboardShown(window.width / 1.25)
		})

		return () => {
			keyShown.remove()
			keyHidden.remove()
		}	
	}, [])
	
	const closeMedia = () => {
		setMedia([])
		setShow(false)
		setImagePreview(null)
		setPreviewIndex(0)
	}

	const change_camera = () => {
		if (cameraStatus === 'back') {
			setType(CameraType.front)
			setCameraStatus('front')
		} else if (cameraStatus === 'front') {
			setType(CameraType.back)
			setCameraStatus('back')
		}
	}

	const toggle_flash = () => {
		if (flashStatus === 'off') {
			setFlash(Camera.Constants.FlashMode.torch)
			setFlashIcon(lightniing_bolt_filled)
			setFlashStatus('on')
		} else if (flashStatus === 'on') {
			setFlash(Camera.Constants.FlashMode.off)
			setFlashIcon(lightniing_bolt)
			setFlashStatus('off')
		}
	}

	const handlePreview = async () => {

		let photo = await photoRef.current.takePictureAsync({ skipProcessing: true })

		if (cameraStatus === 'front') {

			await manip(photo.uri)

		} else {

			setImagePreview(photo.uri)
		}

		setPreviewIndex(2)

		Image.getSize(photo.uri, (width, height) => {
			setPreviewRatio((window.height / 1.25) / height)
			setPreviewWidth(width)
		})

	}

	const manip = async (uri) => {
		
		const newUri = await manipulateAsync(
			uri,
			[{flip: FlipType.Horizontal}]
		)

		setImagePreview(newUri.uri)

	}

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

	// const handleUpload = async () => {

	// 	const URL = await handleURL()

	// 	const imageExt = imagePreview.split('.').pop()

	// 	let image = await fetch(imagePreview)
	// 	image = await image.blob()
		
	// 	// const imageFile = new File([image], `rout-image00/photo00.${imageExt}`)

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

	const handleUpload = async () => {

		navigation.navigate('create', {
			location: location,
			uri: imagePreview
		})

	}

	const selectPostType = async (i) => {
		if (i === 'image') {
			setPostType('image')

			// const permission = async () => {

			if (styleSide === 'middle') {
				setStyleSide('left')
				Animated.parallel([

					Animated.timing(typeSelectionAnimation, {
						toValue: window.width / 8,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(imageTypeAnimation, {
						toValue: window.width / 17,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(textTypeAnimation, {
						toValue: window.width / 23,
						duration: 100,
						useNativeDriver: false
					})
				]).start()
			} else if (styleSide === 'right') {
				setStyleSide('left')
				Animated.parallel([
					Animated.timing(typeSelectionAnimation, {
						toValue: window.width / 8,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(videoTypeAnimation, {
						toValue: window.width / 23,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(imageTypeAnimation, {
						toValue: window.width / 17,
						duration: 100,
						useNativeDriver: false
					})

				]).start()
			} else if (styleSide === 'left') {
				return
			}
			const { status } = await Camera.requestCameraPermissionsAsync()
			if (status !== 'granted') {
				alert('Camera Roll Permissions Needed.')
			}
		} else if (i === 'text') {
			setPostType('text')
			if (styleSide === 'left') {
				Animated.parallel([
					Animated.timing(typeSelectionAnimation, {
					toValue: 0,
					duration: 100,
					useNativeDriver: false
					}),
					Animated.timing(imageTypeAnimation, {
						toValue: window.width / 23,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(textTypeAnimation, {
						toValue: window.width / 17,
						duration: 100,
						useNativeDriver: false
					})
				]).start()
				setStyleSide('middle')
			} else if (styleSide === 'right') {
				Animated.parallel([
					Animated.timing(typeSelectionAnimation, {
					toValue: 0,
					duration: 100,
					useNativeDriver: false
					}),
					Animated.timing(videoTypeAnimation, {
						toValue: window.width / 23,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(textTypeAnimation, {
						toValue: window.width / 17,
						duration: 100,
						useNativeDriver: false
					})
				]).start()
				setStyleSide('middle')
			} else if (styleSide === 'middle') {
				return
			}
		} else if (i === 'video') {
			setPostType('video')
			if (styleSide === 'middle') {
				setStyleSide('right')
				Animated.parallel([

					Animated.timing(typeSelectionAnimation, {
						toValue: -window.width / 8,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(videoTypeAnimation, {
						toValue: window.width / 17,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(textTypeAnimation, {
						toValue: window.width / 23,
						duration: 100,
						useNativeDriver: false
					})
				]).start()
			} else if (styleSide === 'left') {
				setStyleSide('right')
				Animated.parallel([
					Animated.timing(typeSelectionAnimation, {
						toValue: -window.width / 8,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(imageTypeAnimation, {
						toValue: window.width / 23,
						duration: 100,
						useNativeDriver: false
					}),
					Animated.timing(videoTypeAnimation, {
						toValue: window.width / 17,
						duration: 100,
						useNativeDriver: false
					})

				]).start()
			} else if (styleSide === 'right') {
				return
			}
			const { status } = await Camera.requestCameraPermissionsAsync()
			if (status !== 'granted') {
				alert('Camera Roll Permissions Needed.')
			}
		}
	}

	//// Put everything in front of this ////

	const [loaded] = useFonts({
        'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
        'LinLibertime': require('../assets/fonts/LinLibertime.ttf')
    })

    if (!loaded) {
        return null;
    }

	//// End of this condition ////

    return (
        <View style={styles.container} >
			{!show ?
			<SafeAreaView style={styles.media_scroll} >
				{/* <View style={styles.arrow_up}>
					<Image style={styles.arrow} source={arrow} />
				</View> */}
				<FlatList 
				numColumns={5}
				data={media}
				renderItem={media_grid}
				columnWrapperStyle={styles.media_container}
				/>
			</SafeAreaView>
			: <View/>}
			<SafeAreaView style={styles.type_selection}>
				<SafeAreaView style={styles.back_icon_safeArea}>
					<Pressable onPress={goBack} style={styles.back_icon_container}>
						<Image source={back} style={styles.back_icon}/>
					</Pressable>
				</SafeAreaView>
				<Animated.View style={[styles.type_selection_animation_container, {left: typeSelectionAnimation}]}>
					<Pressable onPress={() => selectPostType('image')} style={[styles.type_selection_text_line]}>
						<Animated.Text style={[styles.type_selection_text, {fontSize: imageTypeAnimation}]}>image</Animated.Text>
						<View style={styles.type_selection_underline}/>
					</Pressable>
					<View style={styles.type_selection_gap}/>
					<Pressable onPress={() => selectPostType('text')} style={styles.type_selection_text_line}>
						<Animated.Text style={[styles.type_selection_text, {fontSize: textTypeAnimation}]}>text</Animated.Text>
						<View style={styles.type_selection_underline}/>
					</Pressable>
					<View style={styles.type_selection_gap}/>
					<Pressable onPress={() => selectPostType('video')} style={styles.type_selection_text_line}>
						<Animated.Text style={[styles.type_selection_text, {fontSize: videoTypeAnimation}]}>video</Animated.Text>
						<View style={styles.type_selection_underline}/>
					</Pressable>
				</Animated.View>
			</SafeAreaView>
			{postType === 'text' ?
			<View style={styles.text_post_container}>
				<SafeAreaView style={styles.post_input_container}>
					<View style={styles.post_input_profile_container}>
						<Image style={styles.post_input_profile_image} source={profile_img}/>
						<View style={styles.post_input_username_container}>
							<Text style={styles.post_input_username}>@username</Text>
							<TextInput 
							placeholder='Encouraging Others?'
							placeholderTextColor='#222222' 
							style={styles.post_input}
							selectionColor='#717171'
							keyboardAppearance='dark'
							multiline={true}
							keyboardType='twitter'
							blurOnSubmit={true}
							autoFocus={true}
							/>
						</View>
					</View>
				</SafeAreaView>
				<KeyboardAvoidingView keyboardVerticalOffset={-20} behavior='position' style={styles.post_button_container}>
					<View style={[styles.post_button_row_container, ]}>
						<Pressable style={styles.post_button_post_container}>
							<Text style={styles.post_button_post_text}>rout</Text>
							<View style={{width: window.width / 50}}/>
							<Image style={styles.post_button_post_icon} source={send_icon}/>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</View>
			 : postType === 'image' ? 
				<View style={[styles.type_image_camera_container, {zIndex: previewIndex}]}>
					<Camera ref={photoRef} style={styles.type_image_camera} flashMode={flash} type={type}>
						<SafeAreaView style={styles.imgae_interact_container}>
							<SafeAreaView>
							<Pressable onPress={() => navigate('pick')} style={styles.image_pick_press}>
									<Image style={styles.image_pick} source={pick}/>
							</Pressable>
							</SafeAreaView>
							<View style={styles.type_image_button_container}>
								
								<Pressable  onPress={handlePreview} style={styles.type_image_button_outer}>
									{/* <View style={styles.type_image_button_inner}/> */}
								</Pressable>
								<Pressable onPress={toggle_flash} style={styles.lightniing_bolt_icon_container}>
									<View style={styles.lightniing_bolt_icon_background}/>
									<Image style={styles.lightniing_bolt_icon} source={flashIcon}/>
								</Pressable>
								<Pressable onPress={change_camera} style={styles.chagne_icon_container}>
									<View style={styles.change_icon_background}/>
									<Image style={styles.change_icon} source={change_icon}/>
								</Pressable>
							</View>
						</SafeAreaView>
						{ imagePreview !== null ? 
							<View style={{zIndex: previewIndex}}>
									
								<View style={styles.image_prev_outline}/>
								<View style={styles.image_prev_container}>
			
									<SafeAreaView style={styles.image_prev_top}/>


									<Image style={styles.image_prev} source={{uri: imagePreview}}/>

									

								</View>
								<SafeAreaView style={styles.preview_interact}>
									<SafeAreaView style={styles.back_safe}>

										<Pressable onPress={() => closeMedia()} style={styles.back_container}>
											<Image style={styles.back} source={x}/>
										</Pressable>
									</SafeAreaView>


									<Pressable onPress={handleUpload} style={styles.image_rout_press}>
										<Text style={styles.image_rout_text}>rout</Text>
									</Pressable>
								</SafeAreaView>
								
								
							</View>
							// <View style={styles.type_image_preview_container}>
							// 	<View style={styles.type_image_preview_background}/>
							// 	<View style={styles.type_image_preview_button_container}>
							// 		<View style={styles.type_image_preview_image_container}>


							// 			<View style={styles.type_image_preview_x_icon_container}>
							// 				<Pressable onPress={() => setImagePreview(null)} style={styles.type_image_preview_x_icon_press}>
							// 					<View style={styles.type_image_preview_x_icon_background}/>

							// 					<View style={styles.type_image_preview_x_icon_image_container} >
							// 						<Image source={x_icon} style={styles.type_image_preview_x_icon_image}/>
							// 					</View>
							// 				</Pressable>
							// 			</View>

							// 			<View style={styles.type_image_preview_save_container}>
							// 				<Pressable style={styles.type_image_preview_save_press}>
							// 					<View style={styles.type_image_preview_save_background} />

							// 					<View style={styles.type_image_preview_save_text_container}>
							// 						<Text style={styles.type_image_preview_save_text}>save</Text>
							// 					</View>
							// 				</Pressable>
							// 			</View>

							// 			<View style={styles.type_image_preview_edit_icon_container}>
							// 				<Pressable style={styles.type_image_preview_x_icon_press}>
							// 					<View style={styles.type_image_preview_edit_icon_background}/>

							// 					<View style={styles.type_image_preview_edit_icon_image_container} >
							// 						<Image source={edit_icon} style={styles.type_image_preview_edit_icon_image}/>
							// 					</View>
							// 				</Pressable>
							// 			</View>
										

							// 			<View style={styles.type_image_preview_rout_container}> 
							// 				<Pressable onPress={handleUpload} style={styles.type_image_preview_rout_press}>

							// 					<View style={styles.type_image_preview_rout_background}/>
											
							// 					<View style={styles.type_image_preview_rout_row}>
							// 						<Text style={styles.type_image_preview_rout_text}>rout</Text>
							// 						<View style={{width: window.width / 40}}/>
							// 						<Image style={styles.type_image_preview_white_arrow} source={white_arrow} />
							// 					</View>
							// 				</Pressable>
							// 			</View>
							// 			<Image style={[styles.type_image_preview_image, 
							// 				cameraStatus === 'front' ? 
							// 				{height: window.height / 1.2, transform: [{ scaleX: -1 }]}
							// 				 : {height: window.height / 1.2}]} source={{ uri: imagePreview }}/>
							// 		</View>
							// 	</View>
								
							// </View>
						 : <View/>}
						
					</Camera>
				</View>
			 : postType === 'video' ? 
			 <View style={styles.type_image_camera_container}>
			 <Camera 
			ref={photoRef} 
			style={styles.type_image_camera} 
			flashMode={flash} 
			type={type}
			focusDepth={0.7}
			>
						{ imagePreview !== null ? 

							<View style={styles.type_image_preview_container}>
								<View style={styles.type_image_preview_background}/>
								<View style={styles.type_image_preview_button_container}>
									<View style={styles.type_image_preview_image_container}>


										<View style={styles.type_image_preview_x_icon_container}>
											<Pressable onPress={() => setImagePreview(null)} style={styles.type_image_preview_x_icon_press}>
												<View style={styles.type_image_preview_x_icon_background}/>

												<View style={styles.type_image_preview_x_icon_image_container} >
													<Image source={x_icon} style={styles.type_image_preview_x_icon_image}/>
												</View>
											</Pressable>
										</View>

										<View style={styles.type_image_preview_save_container}>
											<Pressable style={styles.type_image_preview_save_press}>
												<View style={styles.type_image_preview_save_background} />

												<View style={styles.type_image_preview_save_text_container}>
													<Text style={styles.type_image_preview_save_text}>save</Text>
												</View>
											</Pressable>
										</View>

										<View style={styles.type_image_preview_edit_icon_container}>
											<Pressable style={styles.type_image_preview_x_icon_press}>
												<View style={styles.type_image_preview_edit_icon_background}/>

												<View style={styles.type_image_preview_edit_icon_image_container} >
													<Image source={edit_icon} style={styles.type_image_preview_edit_icon_image}/>
												</View>
											</Pressable>
										</View>
										

										<View style={styles.type_image_preview_rout_container}> 
											<Pressable onPress={handleUpload} style={styles.type_image_preview_rout_press}>

												<View style={styles.type_image_preview_rout_background}/>
											
												<View style={styles.type_image_preview_rout_row}>
													<Text style={styles.type_image_preview_rout_text}>rout</Text>
													<View style={{width: window.width / 40}}/>
													<Image style={styles.type_image_preview_white_arrow} source={white_arrow} />
												</View>
											</Pressable>
										</View>
										<Image style={[styles.type_image_preview_image, 
											cameraStatus === 'front' ? 
											{height: window.height / 1.2, transform: [{ scaleX: -1 }]}
											 : {height: window.height / 1.2}]} source={{ uri: imagePreview }}/>
									</View>
								</View>
								
							</View>
						 : <View/>}
						<SafeAreaView>
							<View style={styles.type_image_button_container}>
								<Pressable  onPress={handlePreview} style={styles.type_image_button_outer}>
									{/* <View style={styles.type_image_button_inner}/> */}
								</Pressable>
								<Pressable onPress={toggle_flash} style={styles.lightniing_bolt_icon_container}>
									<View style={styles.lightniing_bolt_icon_background}/>
									<Image style={styles.lightniing_bolt_icon} source={flashIcon}/>
								</Pressable>
								<Pressable onPress={change_camera} style={styles.chagne_icon_container}>
									<View style={styles.change_icon_background}/>
									<Image style={styles.change_icon} source={change_icon}/>
								</Pressable>
							</View>
						</SafeAreaView>
					</Camera>
		 </View>
			 : <View/>}
		</View>
    )
}



const styles = StyleSheet.create({
    container: {
		height: '100%',
		width: window.width,
		backgroundColor: '#555555'
	},


	back_icon_safeArea: {
		zIndex: 2,
		right: window.width / 4.5
	},
	back_icon_container: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		height: window.width / 12,
		width: window.width / 10,
	},
	back_icon: {
		width: 12,
        height: 21
	},
	type_selection: {
		flexDirection: 'row',
		width: window.width,
		zIndex: 2,
		position: 'absolute',
		justifyContent: 'center',

	},
	type_selection_animation_container: {
		flexDirection: 'row',
		justifyContent: 'center',
		zIndex: 2,
		width: window.width / 2,
		height: window.width / 12
	},
	type_selection_gap: {
		width: window.width / 30
	},
	type_selection_text_line: {
		justifyContent: 'center',
		height: '100%',
		alignSelf: 'flex-start'
	},
	type_selection_text: {
		fontFamily: 'Louis',
		color: '#C2C2C2'
	},
	type_selection_underline: {
		alignSelf: 'center',
		top: window.width / 150,
		width: '100%',
		height: window.width / 150,
		backgroundColor: '#222222',
		borderRadius: 50,
	},
	text_post_container: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: '100%'
	},
	post_input_profile_container: {
		flexDirection: 'row',
		top: window.width / 7,
	},
	post_input_profile_image: {
		borderRadius: 50,
		width: window.width / 7,
		height: window.width / 7,
	},
	post_input_username_container: {
		left: window.width / 50,
	},
	post_input_username: {
		fontFamily: 'Louis',
		fontSize: window.width / 17,
		color: '#C2C2C2',
		bottom: window.width / 200
	},
	post_input: {
		width: window.width / 1.35,
		left: window.width / 100,
		fontSize: window.width / 20,
		top: window.width / 200,
		color: '#C2C2C2',
	},
	post_button_container: {
		alignSelf: 'flex-end',
		position: 'absolute',
	},
	post_button_row_container: {
		alignItems: 'center',
		flexDirection: 'row',
		bottom: 30,

	},
	post_button_post_container: {
		width: window.width / 4,
		height: window.width / 13,
		borderRadius: window.width / 10,
		backgroundColor: '#717171',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		left: window.width / 2.9
	},
	post_button_post_icon: {
		width: window.width / 24,
        height: window.width / 28
	},
	post_button_post_text: {
		fontFamily: 'Louis',
		fontSize: window.width / 22
	},
	type_image_camera_container: {
		position: 'absolute',

	},
	type_image_camera: {
		height: window.height,
		width: window.width
	},





	



	

	type_image_preview_container: {
		zIndex: 1,
		width: window.width,
		justifyContent: 'center',
		alignItems: 'center',
		top: window.height / 8.5,
		
	},
	type_image_preview_image_container: {
		shadowOffset: {height: 0},
		shadowColor: '#333333',
		shadowOpacity: 1,
		shadowRadius: window.width / 100,
	},
	type_image_preview_image: {
		zIndex: 2,
		borderRadius: window.width / 25,
		width: window.width / 1.1
	},
	type_image_preview_button_container: {
		height: window.width / 1.2,
		width: window.width / 1.1
	},



	type_image_preview_x_icon_container: {
		top: window.height / 2,
		left: window.width / 45,
		position: 'absolute',
		zIndex: 5,
		width: window.width  / 12,
		height: window.width  / 12,
		alignItems: 'center',
		justifyContent: 'center'

	},
	type_image_preview_x_icon_press: {
		zIndex: 5,
		width: window.width / 12,
		height: window.width / 12,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute'
	},
	type_image_preview_x_icon_background: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.6,
		width: window.width / 12,
		height: window.width / 12,
		borderRadius: window.width / 40
	},
	type_image_preview_x_icon_image_container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width / 12,
		height: window.width / 12
	},
	type_image_preview_x_icon_image: {
		width: window.width / 21,
		height: window.width / 21
	},


	type_image_preview_edit_icon_container: {
		top: window.width / 45,
		left: window.width / 1.1 - window.width / 45 - window.width / 12,
		position: 'absolute',
		zIndex: 5,
		width: window.width  / 12,
		height: window.width  / 12,
		alignItems: 'center',
		justifyContent: 'center'

	},
	type_image_preview_edit_icon_press: {
		zIndex: 5,
		width: window.width / 12,
		height: window.width / 12,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute'
	},
	type_image_preview_edit_icon_background: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.6,
		width: window.width / 12,
		height: window.width / 12,
		borderRadius: window.width / 40
	},
	type_image_preview_edit_icon_image_container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width / 12,
		height: window.width / 12
	},
	type_image_preview_edit_icon_image: {
		width: window.width / 25,
		height: window.width / 17
	},



	type_image_preview_save_container: {
		top: window.width / 45,
		position: 'absolute',
		zIndex: 4,
		width: window.width  / 1.1,
		height: window.width  / 12,
		alignItems: 'center',
		justifyContent: 'center'
	},	
	type_image_preview_save_press: {
		zIndex: 4,
		width: window.width / 3,
		height: window.width / 12,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute'
	},
	type_image_preview_save_background: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.6,
		width: window.width / 3,
		height: window.width / 12,
		borderRadius: window.width / 40
	},
	type_image_preview_save_text_container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width / 3,
		height: window.width / 12,
	},
	type_image_preview_save_text: {
		fontSize: window.width / 17,
		fontFamily: 'Louis',
		color: '#C2C2C2',
		bottom: window.width / 200
	},

	
	type_image_preview_rout_container: {
		

		
		top: window.height / 1.2 - window.width / 10 - window.width / 45, 
		position: 'absolute',
		zIndex: 4,
		width: window.width / 1.1,
		height: window.width / 10,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	type_image_preview_rout_press: {
		zIndex: 4,
		width: window.width / 1.1,
		height: window.width / 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	type_image_preview_rout_background: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.6,
		width: window.width / 1.1 - window.width / 45 - window.width / 45,
		height: '100%',
		borderTopLeftRadius: window.width / 70,
		borderTopRightRadius: window.width / 70,
		borderBottomRightRadius: window.width / 30,
		borderBottomLeftRadius: window.width / 30,
	},
	
	type_image_preview_rout_row: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		flexDirection: 'row',

	},
	type_image_preview_rout_text: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: window.width / 17
	},
	type_image_preview_white_arrow: {
		width: window.width / 21,
        height: window.width / 25
	},
	type_image_preview_background: {
		position: 'absolute',
		width: window.width,
		height: window.height + window.height / 2,
		backgroundColor: '#555555',
	},















////////////











	imgae_interact_container: {
		flexDirection: 'row',
		height: '100%',
		width: '100%',
		position: 'absolute'
	},
	type_image_button_container: {
		position: 'absolute',
		flexDirection: 'row',
		width: window.width,
		bottom: 40,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	image_pick_press: {
		position: 'absolute',
		// backgroundColor: 'blue', 
		height: 40,
		width: 40,
		top: window.height / 17,
		justifyContent: 'center',
		alignItems: 'center',
		left: window.width / 28
	},
	image_pick: {
		height: 31,
		width: 28
	},
	lightniing_bolt_icon_container: {
		left: window.width / 5,
		position: 'absolute',
		width: window.width / 9,
		height: window.width / 9,
		justifyContent: 'center',
		alignItems: 'center',
	},
	lightniing_bolt_icon_background: {
		position: 'absolute',
		backgroundColor: 'white',
		opacity: .07,
		width: 33,
		height: 40,
		borderRadius: window.width / 25
	},
	lightniing_bolt_icon: {
		width: 14,
		height: 21
	},
	chagne_icon_container: {
		right: window.width / 4.6,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	change_icon_background: {
		backgroundColor: 'white',
		opacity: 0.07,
		width: 40,
		height: 40,
		position: 'absolute',
		borderRadius: window.width / 25
	},
	change_icon: {
		width: 21,
		height: 21
	},
	type_image_button_outer: {
		width: 100,
		height: 100,
		borderColor: '#C2C2C2',
		borderWidth: 4,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},

	///////




	
	image_prev_container: {
		position: 'absolute',
		zIndex: 4,
		flexDirection: 'row',
		height: window.height,
		width: window.width,
		borderRadius: 21,
		backgroundColor: 'black'

	},
	image_prev_outline: {
		zIndex: 4,
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	image_prev_safe: {
		// height: '100%',
		width: '100%',
	},
	image_prev: {
		height: '100%',
		width: '100%',
		
	},
	preview_interact: {
		zIndex: 5,
		position: 'absolute',
		height: window.height,
		width: window.width
	},
	back_safe: {
		left: 20,
	},
	back_container: {
		position: 'absolute',
		height:	33,
		width: 33,
		
		justifyContent: 'center',
		alignItems: 'center',
	},
	back: {
		width: 22,
        height: 22
	},
	image_rout_press: {
		position: 'absolute',
		width: '95%',
		// right: 20,
		bottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: '#777777',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.4,
        shadowRadius: window.width / 110,
	},
	image_rout_text: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: 28,
		paddingVertical: 10,
		paddingHorizontal: 10,

	},





	///////////




	type_image_button_inner: {
		width: window.width / 4.7,
		height: window.width / 4.7,
		backgroundColor: '#717171',
		borderRadius: 100,
	},
	open_library: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
		top: 40,
		borderRadius: 10,
		width: 150,
		height: 50
    },
	close_library: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
		top: 40,
		borderRadius: 10,
		left: window.width - 150,
		width: 150,
		height: 50
	},
	arrow_up: {
		position: 'absolute',
		backgroundColor: 'black',
		width: '100%',
		height: 50,
		bottom: (window.height / 3)- 5,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	arrow: {
		height: 20,
		width: 33
	},
	media_scroll: {
		position: 'absolute',
		height: window.height / 3,
		top: window.height - (window.height / 3),
		backgroundColor: 'black',
		
	},
	media: {
		width: window.width / 5,
		height: 130,
	}
})