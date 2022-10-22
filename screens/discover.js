import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Keyboard, Pressable, Dimensions, Animated, SafeAreaView, Image, FlatList, useWindowDimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

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
		<View style={styles.hash_acc_outline}>
			<Text style={styles.trend_text}>{hash}</Text>
		</View>
	)
}

const Acc = ({ acc }) => {

	return (
		<View style={styles.hash_acc_outline}>
			<Text style={styles.trend_text}>{acc}</Text>
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



	const hash_ = ({ item }) => {

		return(<Hash hash={item.hash} key={item.id}/>)
		
	}

	const acc_ = ({ item }) => {

		return(<Acc acc={item.acc} key={item.id}/>)
		
	}




	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// for search, have a sectionList to where both hashtags and users show up at the same time
	// use the top 5 of both catagories and have drop downs for both sections (provide post count for both)
	////////////////////////////////////////////////////////////////////////////////////////////////////////




	return (
		<View style={styles.disc_head}>
			{/* <SafeAreaView style={styles.disc_head_safe}/> */}
			<View style={styles.disc_trending}>
				<View style={styles.trending_container}>
					<Text style={styles.trending_text}>trending</Text>
				</View>
				<View style={styles.trending_row}>
					<View style={styles.trend_container}>
						<View style={styles.outline_trend}>
							<Text style={styles.text_trend}>hastags</Text>
						</View>
						<View style={styles.list_trend_container}>
							<FlatList
							listKey='hash'
							style={styles.list_trend}
							data={hash}
							renderItem={hash_}
							scrollEnabled={false}
							/>
						</View>
						
							
					</View>
						<View style={styles.sep_line}/>
					<View style={styles.trend_container}>
						<View style={styles.outline_trend}>
							<Text style={styles.text_trend}>accounts</Text>
						</View>
						<View style={styles.list_trend_container}>
							<FlatList
							listKey='acc'
							style={styles.list_trend}
							data={acc}
							renderItem={acc_}
							scrollEnabled={false}
							/>
						</View>
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

	const [results, setResults] = useState()
	const [discover, setDiscover] = useState([{id: 0}])
	const [search, setSearch] = useState('')
	const [count, setCount] = useState(17)
	const [momentum, setMomentum] = useState(false)
	
	const searchRef = useRef()
	const topRef = useRef(new Animated.Value(0)).current

	const continuousResult = ({ item }) => {
		return (<Result navigation={navigation} username={item} id={results.indexOf(item)} length={results.length} />)
	}
	const disc = ({ item }) => {
		return (<Disc/>)
	}
	const discHead = ({ item }) => {
		return (<DiscHead/>)
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

				<SafeAreaView style={styles.search_container}>
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

				<SafeAreaView/>

				<Animated.View style={[styles.disc_safe, {top: topRef}]}>

					<FlatList
					style={styles.disc_list}
					data={discover}
					renderItem={disc}
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
		backgroundColor: '#555555',
        height: window.width,
        width: window.width,
	},

	search_container: {
		zIndex: 2
	},
	search_press: {
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
		// position: 'absolute',
		height: window.height,
		width: window.width,
	},
	disc_list: {
		zIndex: 1,
		position: 'absolute',
		height: window.height,
		width: window.width,
		alignSelf: 'center',
		backgroundColor: '#555555',
	},
	disc_head: {
		marginTop: 10,
		width: window.width,
		alignItems: 'center',
		backgroundColor: '#555555',
	},
	disc_head_safe: {

	},
	
	disc_trending: {
		// marginTop: 47,
		width: window.width / 1.1,
		// height: 170,
		borderRadius: window.width / 40,
		backgroundColor: '#696969',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
	},
	trending_container: { 
		width: '100.2%',
		height: 28,
		backgroundColor: '#424242',
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
	trending_row: {
		width: '100%',
		marginVertical: 10,
		justifyContent: 'center',
		flexDirection: 'row'
	},
	sep_line: {
		width: window.width / 170,
		position: 'absolute',
		alignSelf: 'center',
		height: '88%',
		backgroundColor: '#616161'
	},
	trend_container: {
		// backgroundColor: 'white',/
		// height: window.height / 2.9,
		width: window.width / 2.2,
		alignItems: 'center'
	},
	outline_trend: {
		width: 120,
		height: 28,
		borderRadius: window.width / 70,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#777777'
	},
	text_trend: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: 17
	},
	list_trend_container: {
		width: '100%',
	},
	list_trend: {
		
	},
	hash_acc_outline: {
		height: 28,
		width: '88%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: window.height / 70,
		borderRadius: window.width / 70,
		backgroundColor: '#6F6F6F'
	},
	trend_text: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: 16
	},



	trend_post: {
		height: 28,
		width: window.width / 1.04,
		backgroundColor: '#424242',
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
