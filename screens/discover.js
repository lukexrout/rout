import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Keyboard, Pressable, Dimensions, Animated, SafeAreaView, Image, FlatList, useWindowDimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import Content from './content.js';

import Recommended from '../components/recommended'
import Trending from '../components/trending'
import News from '../components/news'

const profile_img = require('../assets/img/user_profile_template.png')

const window = Dimensions.get('window')

const Result = ({ navigation, username, length, id }) => {

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
				<Image style={styles.result_image} source={profile_img}/>
				<View style={{left: window.width / 50}}>
					<Text style={styles.result_username}>{username}</Text>
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

	const [results, setResults] = useState()
	const [sourceList, setSourceList] = useState([
	])
	const [search, setSearch] = useState('')
	const [count, setCount] = useState(17)
	const [momentum, setMomentum] = useState(false)
	
	const searchRef = useRef()
	const topRef = useRef(new Animated.Value(0)).current

	const continuousResult = ({ item }) => {
		return (<Result navigation={navigation} username={item} id={results.indexOf(item)} length={results.length} />)
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
			/>)
    }

	const headResult = () => {
		return (<View style={styles.result_head}/>)
	}
	const footResult = () => {
		return (<View style={styles.result_foot}/>)
	}

	const searchPress = () => {
		searchRef.current.focus()
	}

	const initialLoad = (i) => {

		if (i !== '') {
			Animated.timing(topRef, {
				toValue: window.height,
				duration: 177,
				useNativeDriver: false
			}).start()
		} else if (i === '') {
			Animated.timing(topRef, {
				toValue: 0,
				duration: 177,
				useNativeDriver: false
			}).start()
		}

		setSearch(i)
		if (search === '') {


			const searchInput = i.toLowerCase()
			axios.post('http://localhost:3000/search', { _user: searchInput, count: count})
			.then((res) => {
				setResults(res.data)
			})
			.catch((err) => console.error(err.message))
		} else {
			loadUsers(i)
		}

	}

	const loadUsers = () => {

		const searchInput = search.toLowerCase()
		axios.post('http://localhost:3000/search', { _user: 'u', count: count + 5})
		.then((res) => {
			const data = res.data
			const addArr = []
			let o = null

			for (let i = 0; i <= data.length - 1; i++) {
				{results.includes(data[i]) === false ? addArr.push(data[i]) : o = 0}
			}

			setResults((i) => [...i, ...addArr])
			setMomentum(false)

		})
		.then(() => setCount(i => i + 5))
		.catch((err) => console.error(err))

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
						ref={searchRef}
						value={search}
						placeholder='search'
						placeholderTextColor={'#595959'}
						selectionColor={'#696969'}
						keyboardAppearance='dark'
						onChangeText={i => initialLoad(i)}
						style={styles.search}
						/>
					</Pressable>
				</SafeAreaView>

					



				<Animated.View style={[styles.disc_safe, {top: topRef}]}>

					<FlatList
					ref={listRef}
					style={styles.disc_list}
					data={sourceList}
					CellRendererComponent={content}
					ListHeaderComponent={discHead}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					/>
				</Animated.View>


				{search !== '' ? 
				<View style={[styles.result_safe]}>
					<FlatList 
					data={results}
					ListHeaderComponent={headResult}
					ListFooterComponent={footResult}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					renderItem={continuousResult}
					onMomentumScrollBegin={() => setMomentum(true)}
					onEndReached={momentum === true ? loadUsers() : null}
					onEndReachedThreshold={0}
					/>
				</View>
				
				: <View/>}
			
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#5F5F5F',
        height: window.width,
        width: window.width,
	},
	search_safe: {
		zIndex: 2,
		// width: 1
	},
	search_press: {
		// position: 'absolute',
		alignSelf: 'center',
		backgroundColor: '#C2C2C2',
		height: window.height / 24,
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







	disc_safe: {

		position: 'absolute',
		height: window.height,
		width: window.width,
	},
	disc_list: {

		zIndex: 1,
		// position: 'absolute',
		height: window.height,
		width: window.width,
		alignSelf: 'center',
		backgroundColor: '#5F5F5F',
	},
	disc_head: {
		height: window.height / 2.3,
		width: window.width,
		alignItems: 'center',
		backgroundColor: '#5F5F5F',
	},
	disc_head_safe: {

	},
	
	disc_trending: {
		// marginTop: 47,
		width: window.width / 1.1,
		flex: 1,
		borderRadius: window.width / 40,
		backgroundColor: '#696969',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
	},
	trending_container: { 
		height: 28,
		// flex: 1,
		width: '100%',
		backgroundColor: '#888888',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderTopRightRadius: window.width / 40,
		borderTopLeftRadius: window.width / 40,
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
		// position: 'absolute',
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
		marginTop: window.height / 77,
		marginBottom: window.height / 77,
		borderRadius: window.width / 70,
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
	},
	trend_post_text: {
		fontFamily: 'Louis',
		fontSize: 17,
		color: '#C2C2C2'
	},
	disc_container: {
		width: '100.07%',
		height: window.height * 2,
		borderTopLeftRadius: window.width / 70,
		borderTopRightRadius: window.width / 70,
		backgroundColor: 'black'
	},











	result_head: {
		height: window.width / 4,
	},
	result_foot: {
		height: window.width / 4
	},
	result_safe: {
		position: 'absolute',
		height: window.height,
		width: window.width,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#555555',
	},	
	result_container: {
		marginTop: window.width / 70,
	},
	result: {
		width: window.width,

		justifyContent: 'center',
		alignItems: 'center',
	},	
	result_press: {
		height: window.width / 7,
		width: window.width / 1.04,
		backgroundColor: '#333333',
		borderRadius: window.width / 30,
		alignItems: 'center',
		flexDirection: 'row'
	},
	result_image: {
		width: window.width / 9,
		height: window.width / 9,
		borderRadius: 50,
		marginLeft: window.width / 70
	},
	result_username: {
		color: '#A6A6A6',
		fontFamily: 'Louis',
		fontSize: window.width / 23
	},
	result_status: {
		color: '#777777',
		marginTop: window.width / 170,
		fontFamily: 'Louis',
		fontSize: window.width / 27
	}

});
