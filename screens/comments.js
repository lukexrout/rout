import React, { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

const window = Dimensions.get('window')

const profile_img = require('../assets/img/user_profile_template.png')
const arrow_up_white = require('../assets/img/arrow_up_white.png')
const arrow_up_pressed = require('../assets/img/arrow_up_pressed.png')
const arrow_down_white = require('../assets/img/arrow_down_white.png')
const arrow_down_pressed = require('../assets/img/arrow_down_pressed.png')
const info_icon = require('../assets/img/info_icon.png')
const send_icon = require('../assets/img/send_icon.png')

const CommentsClose = ({ navigation, route }) => {

    const location = route.params.location

	const click = () => {
        navigation.navigate(location)
    }

	return (
		<View style={styles.comment_head}>
			<View style={styles.comment_close_safe}>
				<Pressable onPress={() => click()} style={styles.comment_close_press}>
					<Text style={styles.comment_close}>close</Text>
				</Pressable>
			</View>
		</View>
	)
}


const PostComment = ({ postComment, postCaption }) => {

	return (
        <View style={[styles.comment_post_content_container]}>
            <SafeAreaView style={styles.comment_title_container}>
                <Text style={styles.comment_title}>comments</Text>
            </SafeAreaView>
            <View style={styles.comment_container}>
            <View style={styles.comment_profile_container}>
                <View style={styles.comment_profile_username_row}>
                    <Image style={styles.comment_profile} source={profile_img}/>
                    <View style={styles.comment_username_container}>
                        <Text style={styles.comment_username}>@schafferluke</Text>
                    </View>
                </View>
                <View style={styles.comment_end_container}>
                        <View style={[styles.comment_time_container, {right: window.width / 28}]}>
                            <Text style={styles.comment_time}>20h</Text>
                        </View>
                </View>
                <View style={[styles.comment_content_container, {left: window.width / 70,marginBottom: window.height / 70, marginTop: window.height / 170}]}>
                    <Text style={styles.comment_content}>{postCaption}</Text>
                </View>
            </View>
        </View>
            <View style={styles.comment_sep}/>
        </View>
	)
}
const CommentFoot = () => {

	return (
		<View style={styles.comment_foot}>
		</View>
	)
}

const Comment = memo(({ comment, reply_count, scrollTo, setExpanded, id }) => {

    const commentMinHeight = useRef(new Animated.Value(0)).current

	const [voteStatus, setVoteStatus] = useState(null)
	const [expand, setExpand] = useState(false)
	const [y, setY] = useState()
	const [loaded, setLoaded] = useState(false)

	const votePress = (x) => {
		if (x !== voteStatus) {
			setVoteStatus(x)
		} else {
			setVoteStatus(null)
		}

	}

	const expandPress = () => {
		if (expand === false) {
			Animated.parallel([
				Animated.timing(commentMinHeight, {
					toValue: 400,
					duration: 177,
					useNativeDriver: false
				}),
			]).start(() => {
			scrollTo(y - window.height / 9)
			})
			setExpand(true)
		} else {
			Animated.parallel([
				Animated.timing(commentMinHeight, {
					toValue: 0,
					duration: 177,
					useNativeDriver: false
				}),
			]).start()
			setExpand(false)
		}
	}

	return (
		<Animated.View style={[styles.comment_safe, {minHeight: commentMinHeight}]}
		onLayout={( event ) => {
			const {x, y, width, height} = event.nativeEvent.layout
			setY(y)}}>
			<View
			style={[styles.comment_container, reply_count > 0 && reply_count < 2 && expand === false ? {marginBottom: 10} : reply_count > 1 && expand === false ? {marginBottom: 16} : {}]}>
				<View style={styles.comment_profile_container}>
					<View style={styles.comment_profile_username_row}>
						<Image style={styles.comment_profile} source={profile_img}/>
						<View style={styles.comment_username_container}>
							<Text style={styles.comment_username}>@schafferluke</Text>
						</View>
					</View>
					<View style={styles.comment_end_container}>
							<View style={styles.comment_time_container}>
								<Text style={styles.comment_time}>20h</Text>
							</View>
							<View style={styles.comment_info_container}>
								<Image style={styles.comment_info} source={info_icon}/>
							</View>
					</View>
					<View style={styles.comment_content_container}>
						<Text style={styles.comment_content}>{comment}</Text>
					</View>
					<View style={styles.comment_interact_container}>
						<Pressable onPress={() => votePress('upVote')} style={styles.comment_left_interact_container}>
							<Text style={styles.comment_data}>444k</Text>
							{voteStatus === 'upVote' ?
							<Image style={styles.comment_up} source={arrow_up_pressed}/>
							:
							<Image style={styles.comment_up} source={arrow_up_white}/>
							}
						</Pressable>
						<Pressable style={styles.comment_middle_left_interact_container}>
							<Text style={[styles.comment_data, {opacity: 0}]}>0</Text>
							<Text style={styles.comment_reply}>reply</Text>
						</Pressable>
						<Pressable onPress={() => expandPress()} style={styles.comment_middle_right_interact_container}>
							<Text style={[styles.comment_data, {opacity: 0}]}>0</Text>
							<Text style={styles.comment_reply}>replies</Text>
						</Pressable>
						<Pressable onPress={() => votePress('downVote')} style={styles.comment_right_interact_container}>
							<Text style={styles.comment_data}>444k</Text>
							{voteStatus === 'downVote' ?
							<Image style={styles.comment_down} source={arrow_down_pressed}/>
							:
							<Image style={styles.comment_down} source={arrow_down_white}/>
							}
						</Pressable>
					</View>
				</View>
			</View>
			{reply_count > 0 && expand !== true ?
			<View style={styles.reply_outline_safe}>
				{reply_count > 1 ? <View style={styles.reply_outline_container}/> : <View/>}
				<View style={[styles.reply_outline_container_two, reply_count > 1 ? {bottom: -21} : {}]}/>
			</View>
			: <View/>}
		</Animated.View>
	)
})

export default function Comments({ navigation, route }) {
	
	const postCaption = route.params.content

	const commentInputRef = useRef()
	const listRef = useRef()

    const [comments, setComments] = useState([
		{id: 1, comment: 'hello world', reply_count: 0},
		{id: 2, comment: 'hello world', reply_count: 0},
		{id: 3, comment: 'hello world', reply_count: 1},
		{id: 4, comment: 'hello world', reply_count: 4},
		{id: 5, comment: 'hello world', reply_count: 0},
		{id: 6, comment: 'hello world', reply_count: 0},
		{id: 7, comment: 'hello world', reply_count: 0},
		{id: 8, comment: 'hello world', reply_count: 0},
		{id: 9, comment: 'hello world', reply_count: 0},
		{id: 10, comment: 'hello world', reply_count: 0},
		{id: 11, comment: 'hello world', reply_count: 0},
		{id: 12, comment: 'hello world', reply_count: 0},
		{id: 13, comment: 'hello world', reply_count: 0},
	])

    const post_comment = ({ item }) => {
		return(<PostComment navigation={navigation} postCaption={postCaption}/>)
	}

	const comment = ({ item }) => {
		return (<Comment comment={item.comment} reply_count={item.reply_count} scrollTo={scrollTo} id={item.id} key={item.id}/>)
	}

	// const comment = ({ item }) => {
	// 	return useMemo(() => (<Comment comment={item.comment} reply_count={item.reply_count} scrollTo={scrollTo} id={item.id} key={item.id}/>), [item])
	// }

	// const commentMemo = useCallback(({ item }) => (
	// 	<Comment comment={item.comment} reply_count={item.reply_count} scrollTo={scrollTo} setExpanded={setExpanded} id={item.id} key={item.id}/>
	// ), [expanded, setExpanded])

	// const commentListMemo = useMemo(() => (
	// 	<FlatList
	// 	ref={listRef}
	// 	style={styles.comments_list}
	// 	data={comments}
	// 	ListHeaderComponent={post_comment}
	// 	ListFooterComponent={CommentFoot}
	// 	showsVerticalScrollIndicator={false}
	// 	showsHorizontalScrollIndicator={false}
	// 	CellRendererComponent={commentMemo}
	// 	/>
	// ), [commentMemo])

	const scrollTo = (y) => {
		listRef.current.scrollToOffset({ animated: true, offset: y })
	}

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <View style={[styles.comments_safe, {zIndex: 2, opacity: 1}]}>
            <View style={styles.comments_background}/>
            <View style={styles.comments_container}>
                <SafeAreaView style={styles.comments_head_container}>
                    <CommentsClose navigation={navigation} route={route}/>
                </SafeAreaView>
                <FlatList
                ref={listRef}
                style={styles.comments_list}
                data={comments}
                ListHeaderComponent={post_comment}
                ListFooterComponent={CommentFoot}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                CellRendererComponent={comment}
                />
				{/* {commentListMemo} */}
				
            </View>
			<KeyboardAvoidingView keyboardVerticalOffset={7} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.comment_input_container}>
				<Pressable onPress={() => commentInputRef.current.focus()} style={styles.comment_input_press}>
					<View style={styles.comment_input_safe}>

						<TextInput
						ref={commentInputRef}
						placeholder='comment'
						placeholderTextColor={'#595959'}
						keyboardAppearance='dark'
						selectionColor={'#696969'}
						multiline={true}
						// onChangeText={() => listRef.current.scrollToOffset({ animated: true, offsetY: 0 })}
						style={styles.comment_input}
						/>

					</View>
					<View style={styles.send_safe}>
						<Pressable onPress={() => console.log('hello world!')} style={styles.send_container}>
							<Image style={styles.send} source={send_icon}/>
						</Pressable>
					</View>
					
				</Pressable>
			</KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    comments_safe: {
		
		position: 'absolute',
		height: window.height,
		width: window.width,
		flexDirection: 'row',
		justifyContent: 'center',
		
	},
	comments_background: {
        position: 'absolute',
		height: window.height,
		width: window.width,
		backgroundColor: '#5F5F5F'
	},
	comments_container: {
		overflow: 'hidden',	
		// position: 'absolute',
		width: window.width / 1.04,
		height: window.height,
		// justifyContent: 'center',
		alignItems: 'center',
        borderTopLeftRadius: 21,
		borderTopRightRadius: 21,
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 28,

		
	},
	comments_list: {
        position: 'absolute',
		height: window.height,
		width: '100.1%',
		
	},
    comments_head_container: {
        zIndex: 2,
        alignSelf: 'flex-start',
    },
	comment_head: {
		height: '100%',
		width: '100%',
		backgroundColor: 'blue'
	},
	comment_foot: {
        height: window.height / 14
	},
	comment_post_content_container: {


	},
	comment_sep: {
		height: 3,
		width: '90%',
		alignSelf: 'center',
		marginBottom: window.height / 170,
		borderRadius: 50,
		backgroundColor: '#494949'
	},
	comment_title_container: {
		height: window.height / 10,
        marginBottom: 17,
		alignItems: 'center',
		justifyContent: 'center',
	},
	comment_title: {
		fontFamily: 'Louis',
        fontSize: 28,
        color: '#C2C2C2'
	},
	
	
	comment_close_safe: {
		position: 'absolute',
		alignSelf: 'center',
		top: 4,
		left: 10,
	},
	comment_close_press: {
		backgroundColor: '#5F5F5F',
		borderRadius: 11,
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
	},
	comment_close: {
		fontFamily: 'Louis',
        fontSize: 19,
        color: '#999999',
		// top: 1,
		left: 2,
		paddingVertical: window.width / 70,
		paddingLeft: window.width / 40,
		paddingRight: window.width / 30
	},
	comment_safe: {
	},
	reply_outline_safe: {
		bottom: 33
	},
	reply_outline_container: {
		position: 'absolute',
		zIndex: 1,
		height: 40,
		width: '93%',
		bottom: -25,
		borderBottomLeftRadius: 21,
		borderBottomRightRadius: 21,
		alignSelf: 'center',
		backgroundColor: '#717171',
		shadowColor: '#333333',
        shadowOffset: {height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
	},
	reply_outline_container_two: {
		position: 'absolute',
		zIndex: 2,
		height: 40,
		width: '95%',
		bottom: -27,
		borderBottomLeftRadius: 21,
		borderBottomRightRadius: 21,
		alignSelf: 'center',
		backgroundColor: '#717171',
		shadowColor: '#333333',
        shadowOffset: {height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
	},
	comment_container: {
		zIndex: 3,
		width: '97%',
		borderRadius: 21,
		marginBottom: 7,
		alignSelf: 'center',
		// alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#717171',
		shadowColor: '#333333',
				shadowOffset: {height: 0},
				shadowOpacity: 1,
				shadowRadius: 4,
	},
	
	comment_profile_container: {

    },
	comment_profile_username_row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 7,
		height: window.height / 19
	},
	comment_profile: {
		height: 36,
		width: 36,
		borderRadius: 50
	},
	comment_username_container: {
		left: window.width / 70
	},
	comment_username: {
		fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2'
	},
	comment_end_container: {
		position: 'absolute',
		flexDirection: 'row',
		height: window.height / 19,
		width: '23%',
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'flex-end'
		// backgroundColor: 'blue'
	},
	comment_time_container: {

	},
	comment_time: {
		fontFamily: 'Louis',
        fontSize: 14,
        color: '#B1B1B1'
	},
	comment_info_container: {
		height: '100%',
		width: '40%',
		borderTopRightRadius: window.width / 28,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'white'
	},
	comment_info: {
		height: 24,
		width: 5
	},
	comment_content_container: {
		marginBottom: 2,
		marginLeft: 11,
		marginRight: 11
	},
	comment_content: {
		fontFamily: 'Louis',
        fontSize: 16,
        color: '#171717'
	},
	comment_interact_container: {
		flexDirection: 'row',
		height: window.height / 21,
		marginBottom: 4
	},
	comment_data: {
		fontFamily: 'Louis',
        fontSize: 12,
        color: '#A7A7A7',
		marginBottom: 4
	},
	comment_left_interact_container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: window.width / 28,
	},
	comment_up: {
		width: 16,
		height: 17
	},
	comment_middle_left_interact_container: {
		flex: 1,
		// width: window.width / 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	comment_middle_right_interact_container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	comment_reply: {
		fontFamily: 'Louis',
        fontSize: 16,
        color: '#C2C2C2'
	},
	comment_right_interact_container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomRightRadius: window.width / 28
	},
	comment_down: {
		width: 16,
		height: 17
	},
	comment_input_container: {
		position: 'absolute',
		alignSelf: 'flex-end',
		bottom: window.height / 33
		// bottom: 0
	},
	comment_input_press: {
		flexDirection: 'row',
		alignItems: 'center',
        // height: 35,
        width: window.width / 1.1,
		borderRadius: 20,
        backgroundColor: '#999999',
		shadowColor: 'black',
        shadowOffset: {height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 7,
	},
	comment_input_safe: {
		paddingTop: 4,
		paddingBottom: 8,
	},
	comment_input: {
		left: window.width / 30,
		width: window.width / 1.28,
        fontFamily: 'Louis',
        fontSize: 17,
		
	},
	send_safe: {
		// backgroundColor: 'white',
		alignItems: 'flex-start',
		position: 'absolute',
		height: '100%',
		width: '100%'
	},
	send_container: {
		// position: 'absolute',
        // alignSelf: 'flex-end',
        alignItems: 'center',
		alignSelf: 'flex-end',
        justifyContent: 'center',
        height: 31,
        width: 31,
        borderRadius: 50,
        top: 3,
        right: 3,
        backgroundColor: '#5F5F5F'
	},
	send: {
		height: 21,
        width: 16
	}
})