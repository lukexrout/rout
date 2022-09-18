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










const DiscHead = () => {

	const [hashTrend, setHashTrend] = useState([
		{id: 1, hash: '#juice'},
		{id: 2, hash: '#banana'},
		{id: 3, hash: '#strawberry'},
		{id: 4, hash: '#pineapple'},
	])
	const [accTrend, setAccTrend] = useState()



	const Hash = () => {


		return (
			<View syle={styles.hash_container}>

			</View>
		)
	}











	return (
		<View style={styles.disc_head}>
			<View style={styles.disc_trending}>
				<View style={styles.trending_container}>
					<Text style={styles.trending_text}>trending</Text>
				</View>
				<View style={styles.sep_line}/>
				<View style={styles.trending_row}>
					<View style={styles.trend_container}>
						<View style={styles.outline_trend}>
							<Text style={styles.text_trend}>hastags</Text>
						</View>

							<FlatList
							style={styles.list_trend}
							data={hashTrend}
							renderItem={Hash}
							scrollEnabled={false}
							/>
					</View>
					<View style={styles.trend_container}>
						<View style={styles.outline_trend}>
							<Text style={styles.text_trend}>accounts</Text>
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
		height: '100%',
        width: '100%',
		backgroundColor: '#555555',
		alignItems: 'center',
	},

	search_container: {
		zIndex: 2
	},
	search_press: {
		backgroundColor: '#C2C2C2',
		height: window.width / 11,
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
		fontSize: window.width / 21
	},







	disc_safe: {
		position: 'absolute',
		alignItems: 'center',
	},
	disc_list: {
		position: 'absolute',
		height: window.height,
	},
	disc_head: {
		height: window.height / 2.3,
		width: window.width,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	disc_trending: {
		width: window.width / 1.1,
		height: window.width / 2,
		marginBottom: window.width / 28,
		borderRadius: window.width / 40,
		backgroundColor: '#696969',
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
	},
	trending_container: { 
		width: '100.2%',
		height: window.width / 11,
		backgroundColor: '#424242',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderTopRightRadius: window.width / 40,
		borderTopLeftRadius: window.width / 40,
	},
	trending_text: {
		fontFamily: 'Louis',
		fontSize: window.width / 21,
		color: '#C2C2C2'
	},
	trending_row: {
		width: '100%',
		top: window.width / 40,
		justifyContent: 'center',
		flexDirection: 'row'
	},
	sep_line: {
		width: window.width / 170,
		top: window.width / 9,
		position: 'absolute',
		alignSelf: 'center',
		height: '74%',
		backgroundColor: '#616161'
	},
	trend_container: {
		// backgroundColor: 'white',
		height: window.width / 2.9,
		width: window.width / 2.2,
		alignItems: 'center'
	},
	outline_trend: {
		width: window.width / 3,
		height: window.width / 14,
		borderRadius: window.width / 70,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#777777'
	},
	text_trend: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: window.width / 22
	},
	list_trend: {
		width: '100%',
		backgroundColor: 'white'
	},
	hash_container: {
		height: window.width / 20,
		width: '90%',
		backgroundColor: 'white'
	},



	trend_post: {
		height: window.width / 11,
		width: window.width / 1.04,
		backgroundColor: '#424242',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: window.width / 28,
		borderRadius: window.width / 70,
		shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.2,
        shadowRadius: window.width / 70,
	},
	trend_post_text: {
		fontFamily: 'Louis',
		fontSize: window.width / 21,
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
		height: window.width / 4.4,
	},
	result_foot: {
		height: window.width / 12
	},
	result_safe: {
		position: 'absolute',
		height: window.height / 1.1,
		width: window.width,
		justifyContent: 'center',
		alignItems: 'center',
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
