import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Keyboard, Pressable, Dimensions, Animated, SafeAreaView, Image, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import Content from './content.js';
const portFile = require('../port.json')

const profile_img = require('../assets/img/user_profile_template.png')

const window = Dimensions.get('window')

const Result = ({ navigation, item }) => {

	const resultsOpacity = useRef(new Animated.Value(0)).current

	const profilePress = () => {
		navigation.navigate('_user', {
			location: 'discover'
		})
		AsyncStorage.setItem('discover_user', username)
	}
	useEffect(() => {
		Animated.timing(resultsOpacity, {
			toValue: 1,
			duration: 700,
			useNativeDriver: false
		}).start()
	}, [resultsOpacity])
	return (
		<Animated.View style={[styles.result_container, {opacity: resultsOpacity}]}>
			<Pressable onPress={profilePress} style={styles.result_press}>
				<View style={styles.result_row}>
					<View style={styles.result_image_container}>
						<Image style={styles.result_image} source={profile_img}/>
					</View>
					<View style={styles.result_username_container}>
						<Text style={styles.result_username}>{item[0]}</Text>
					</View>
				</View>
				<View style={styles.result_end_container}>
					<View style={styles.result_date_container}>
						<Text style={styles.result_date}>{item[1]}</Text>
					</View>
					<View style={styles.result_stat_container}>
						<View style={styles.result_stat_text_container}>
							<Text style={styles.result_stat_text}>{item[2]}</Text>
						</View>
						<View style={styles.result_stat_sep}/>
						<View style={styles.result_stat_text_container}>
							<Text style={styles.result_stat_text}>{item[3]}</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</Animated.View>
	)
}
const Hash = ({ hash }) => {
	return (
		<View style={styles.hashtag_outline}>
			<Text style={styles.hashtag_text}>{hash}</Text>
		</View>
	)
}
const Acc = ({ acc }) => {

	return (
		<View style={styles.account_outline}>
			<Text style={styles.account_text}>{acc}</Text>
		</View>
	)
}
const DiscHead = () => {

	const [hash, setHash] = useState([
		{id: 1, hash: '#juice'},
		{id: 2, hash: '#banana'},
		{id: 3, hash: '#strawberry'},
		{id: 4, hash: '#pineapple'},
	])
	const [acc, setAcc] = useState([
		{id: 1, acc: '@biden'},
		{id: 2, acc: '@yo_mama'},
		{id: 3, acc: '@trump'},
		{id: 4, acc: '@elon'},
	])

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// for search, have a sectionList to where both hashtags and users show up at the same time
	// use the top 5 of both catagories and have drop downs for both sections (provide post count for both)
	////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<View style={styles.disc_head}>
			<View>
				<SafeAreaView style={styles.disc_head_safe}>
					
				</SafeAreaView>
			</View>
			<View style={{height: 50}}/>
			<View style={styles.disc_trending}>
				<View style={styles.trending_container}>
					<Text style={styles.trending_text}>trending</Text>
				</View>
				<View style={styles.interact_container}>
					<View style={styles.hashtag_container}>
						<View style={styles.hashtag_title_container}>
							<Text style={styles.hashtag_title}>hashtags</Text>
						</View>
						<Hash hash={hash[0].hash}/>
						<Hash hash={hash[1].hash}/>
						<Hash hash={hash[2].hash}/>
						<Hash hash={hash[3].hash}/>
					</View>
					<View style={styles.sep_container}>
						<View style={styles.sep}/>
					</View>
					<View style={styles.account_container}>
						<View style={styles.account_title_container}>
							<Text style={styles.account_title}>accounts</Text>
						</View>
						<Acc acc={acc[0].acc}/>
						<Acc acc={acc[1].acc}/>
						<Acc acc={acc[2].acc}/>
						<Acc acc={acc[3].acc}/>
					</View>
				</View>
			</View>
			<View style={styles.trend_post}>
				<Text style={styles.trend_post_text}>trending posts</Text>
			</View>
		</View>
	)
}

const Disc = () => {

	return (
		<View style={styles.disc_container}>

		</View>
	)
}

export default function Discover({ navigation }) {

	const listRef = useRef()
	const searchRef = useRef()
	const discAnim = useRef(new Animated.Value(1)).current
	const resultAnim = useRef(new Animated.Value(0)).current

	const [sourceList, setSourceList] = useState([
		{post_id: 1, pos: null, type: 'text', content: 'This is a test post. This should be generally working as an expandable text post that can be ever expanding unlike my competitors; twitter.'}, 
        {post_id: 2, pos: null, type: 'text', content: 'set for launch in exactly 2 months!'}, 
        {post_id: 3, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 4, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 5, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 6, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 7, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 8, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 9, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 10, pos: null, type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
        {post_id: 11, pos: 'last', type: 'text', content: 'This is another update on my demo... They have just scrolled down and read more and more of my pre-made content... lol do they even know? who knows haha'}, 
	])
	const [status, setStatus] = useState('disc')
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])
	const [count, setCount] = useState(8)
	const [offset, setOffset] = useState('0')
	const [momentum, setMomentum] = useState(false)
	const [resultLoading, setResultLoading] = useState(false)

	const continuousResult = ({ item }) => {
		return (
			<Result 
			navigation={navigation} 
			item={item}/>)
	}
	const discHead = ({ item }) => {
		return (<DiscHead/>)
	}
	const scrollTo = (y) => {
		listRef.current.scrollToOffset({ animated: true, offset: y })
	}
	const content = ({ item }) => {
		return (<Content 
			source={item} 
			id={item.id} 
			key={item.id} 
			scrollTo={scrollTo} 
			navigation={navigation}
            location={'discover'}
			pos={item.pos}/>)
    }
	const headResult = () => {
		return (<View style={styles.result_head}/>)
	}
	const loadResult = () => {
		return (
			<View style={{top: 40}}>
				<ActivityIndicator size="small" color="#C2C2C2"/>
			</View>
		)
	}
	const footResult = () => {
		return (
			<View style={styles.result_foot}/>
		)
	}
	const searchPress = () => {
		searchRef.current.focus()
	}

	const handleSearchFetch = async (x, y, z) => {
		setResultLoading(true)
		await fetch(`http://${portFile.HOST}:3000/search`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				search: x,
				count: y,
				offset: z
			})
		}).then((res) => res.json())
		.then((res) => {
			// setResults([...results, ...res])
			console.log('res: ' + res)
			setResults(res)
			setMomentum(false)
			// setOffset((parseInt(offset) + count).toString())
		})
		.catch((err) => console.error(err.message))
	}

	const searchUser = async (i) => {
		if (i === '') {
			setOffset('0')
			setSearch('')
			setResults([])
			setStatus('disc')
			Animated.parallel([
				Animated.timing(discAnim, {
					toValue: 1,
					duration: 477,
					useNativeDriver: false
				}),
				Animated.timing(resultAnim, {
					toValue: 0,
					duration: 177,
					useNativeDriver: false
				}),
			]).start()
		} else if (i !== '') {
			const searchInput = i.toLowerCase()

			console.log('results: ' + results)
			// const filteredArr = results !== undefined ? results.filter(arr => arr[0].startsWith(searchInput)) : []
			const filteredArr = []
			console.log('filteredArr: ' + filteredArr)
			const existingDifference = results.length - filteredArr.length
			console.log('existingDifference: ' + existingDifference)
			const actualCount = existingDifference > 0 ? existingDifference.toString() : count
			console.log('actualCount: ' + actualCount)
			const actualOffset = existingDifference > 0 ? filteredArr.length.toString() : offset
			console.log('actualOffset: ' + actualOffset)


			// if (i.length > 1) {
			// 	var newArr = [...results.splice(0, 4), ['hello'], ['world'], ['hello'], ['world']]
			// 	setResults(newArr)
			// }

			setSearch(searchInput)
			if (status !== 'result') {
				Animated.parallel([
					Animated.timing(discAnim, {
						toValue: 0,
						duration: 0,
						useNativeDriver: false
					}),
					Animated.timing(resultAnim, {
						toValue: 1,
						duration: 477,
						useNativeDriver: false
					}),
				]).start(() => setStatus('result'))
			}
			handleSearchFetch(searchInput, count, actualOffset)

			// if (i.length === 1) {
			// 	handleSearchFetch(searchInput, actualCount, actualOffset)
			// } else if (i.length > 1) {
			// 	handleSearchFetch(searchInput, actualCount, actualOffset)
			// }
			setResultLoading(false)
		}
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
				<SafeAreaView style={styles.search_safe}>
					<Pressable onPress={searchPress} style={styles.search_press}>
						<TextInput
						// value={search}
						ref={searchRef}
						returnKeyType='done'
						placeholder='search'
						placeholderTextColor={'#595959'}
						selectionColor={'#696969'}
						keyboardAppearance='dark'
						onChangeText={i => searchUser(i)}
						style={styles.search}/>
					</Pressable>
				</SafeAreaView>
				<Animated.View style={[styles.disc_safe, {zIndex: discAnim, opacity: discAnim}]}>
					<FlatList
					ref={listRef}
					initialNumToRender={1}
					maxToRenderPerBatch={2}
					removeClippedSubviews={true}
					style={styles.disc_list}
					data={sourceList}
					CellRendererComponent={content}
					ListHeaderComponent={discHead}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}/>
				</Animated.View>
				<Animated.View style={[styles.result_safe, {zIndex: resultAnim, opacity: resultAnim}]}>
					<FlatList 
					data={results}
					initialNumToRender={1}
					maxToRenderPerBatch={1}
					disableVirtualization={true}
					removeClippedSubviews={true}
					ListHeaderComponent={headResult}
					ListFooterComponent={footResult}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					renderItem={continuousResult}
					onMomentumScrollBegin={() => setMomentum(true)}
					onEndReached={momentum === true ? searchUser(search) : null}
					onEndReachedThreshold={0}/>
					{resultLoading && loadResult}
				</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#5F5F5F',
        height: window.height,
        width: window.width,
	},
	search_safe: {
		zIndex: 2,
	},
	search_press: {
		alignSelf: 'center',
		backgroundColor: '#C2C2C2',
		height: 37,
		width: window.width / 1.1,
		justifyContent: 'center',
		borderRadius: 11,
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
	},
	search: {
		width: '95%',
		left: 10,
		fontFamily: 'Louis',
		fontSize: 17
	},
	disc_safe: {
		position: 'absolute',
		height: window.height,
		width: window.width,
	},
	disc_list: {
		zIndex: 1,
		height: window.height,
		width: window.width,
		alignSelf: 'center',
		backgroundColor: '#5F5F5F',
	},
	disc_head: {
		height: 377,
		width: window.width,
		alignItems: 'center',
		backgroundColor: '#5F5F5F',
	},
	disc_head_safe: {
	},
	disc_trending: {
		width: window.width / 1.1,
		flex: 1,
		borderRadius: 11,
		backgroundColor: '#696969',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 4,
	},
	trending_container: { 
		height: 28,
		width: '100%',
		backgroundColor: '#888888',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderTopRightRadius: 11,
		borderTopLeftRadius: 11,
	},
	trending_text: {
		fontFamily: 'Louis',
		fontSize: 17,
		color: '#C2C2C2'
	},
	interact_container: {
		flex: 1,
		flexDirection: 'row'
	},
	hashtag_container: {
		flex: 1
	},
	hashtag_title_container: {
		height: 34,
		width: 140,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 7,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#717171'
	},
	hashtag_title: {
		fontFamily: 'Louis',
		fontSize: 17,
		color: '#C2C2C2'
	},
	hashtag_outline: {
		flex: 1,
		marginBottom: 10,
		borderRadius: 7,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#777777'
	},
	hashtag_text: {
		fontFamily: 'Louis',
		fontSize: 17,
		paddingHorizontal: 20,
		color: '#C2C2C2'
	},
	sep_container: {
		flexDirection: 'column'
	},
	sep: {
		flex: 1,
		width: 1,
		alignSelf: 'center',
		backgroundColor: '#494949'
	},
	account_container: {
		flex: 1
	},
	account_title_container: {
		height: 34,
		width: 140,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 7,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#717171'
	},
	account_title: {
		fontFamily: 'Louis',
		fontSize: 17,
		color: '#C2C2C2'
	},
	account_outline: {
		flex: 1,
		marginBottom: 10,
		borderRadius: 7,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#777777'
	},
	account_text: {
		fontFamily: 'Louis',
		fontSize: 17,
		paddingHorizontal: 20,
		color: '#C2C2C2'
	},
	trend_post: {
		height: 28,
		width: window.width / 1.04,
		backgroundColor: '#888888',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 11,
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 4,
	},
	trend_post_text: {
		fontFamily: 'Louis',
		fontSize: 17,
		color: '#C2C2C2'
	},
	disc_container: {
		width: '100%',
		height: window.height,
		borderTopLeftRadius: 11,
		borderTopRightRadius: 11,
		backgroundColor: 'black'
	},
	result_head: {
		height: 88
	},
	result_foot: {
		height: 77
	},
	result_safe: {
		position: 'absolute',
		height: window.height,
		width: window.width,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#5F5F5F',
	},	
	result_container: {
		marginTop: 4,
	},
	result: {
		width: window.width,
		justifyContent: 'center',
		alignItems: 'center',
	},	
	result_press: {
		height: 55,
		width: window.width / 1.04,
		backgroundColor: '#777777',
		borderRadius: 14,
	},
	result_row: {
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	result_image_container: {
		marginLeft: 10
	},
	result_image: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
	result_username_container: {
		left: 10
	},
	result_username: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: 17
	},
	result_end_container: {
		position: 'absolute',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	result_date_container: {
		marginRight: 10,
		alignItems: 'center'
	},
	result_date: {
		color: '#444444',
		fontFamily: 'Louis',
		fontSize: 17
	},
	result_stat_container: {
		flexDirection: 'row',
		marginRight: 10,
		paddingTop: 7,
		paddingBottom: 7,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 7,
		backgroundColor: '#888888'
	},
	result_stat_sep: {
		width: 2,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 50,
		backgroundColor: '#777777'
	},
	result_stat_text_container: {

	},
	result_stat_text: {
		color: '#444444',
		fontFamily: 'Louis',
		fontSize: 17
	}

});