	import { StatusBar } from 'expo-status-bar';
	import React, { useState, useEffect, useRef } from 'react';
	import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Pressable, FlatList } from 'react-native';
	import { useFonts } from 'expo-font';

	const profile_img = require('../assets/img/user_profile_template.png')
	const drop_down_icon = require('../assets/img/drop_down_arrow.png')
	const cog = require('../assets/img/cog.png')

	const aws = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/353A7670-2B3B-4B7E-91CD-29640662A756_4_5005_c.jpeg'
	const aws_2 = 'https://rout-media-storage.s3.us-east-2.amazonaws.com/rout-image00/3B7B6670-B919-4C98-A232-9044BA65B022_4_5005_c.jpeg'


	const window = Dimensions.get('window')

	const NotiHead = ({ navigate }) => {
	return (
		<View style={styles.head_container}>
			<SafeAreaView style={styles.notification_header_container}>
				<Text style={styles.notification_header_text}>rout</Text>
			</SafeAreaView>
			<SafeAreaView style={styles.cog_container}>
				<Pressable onPress={() => navigate('noti_set')}>
					<Image style={styles.cog} source={cog}/>
				</Pressable>
			</SafeAreaView>
		</View>
	)
	}
	const NotiFoot = () => {
	return (
		<View style={styles.noti_foot}/>
	)
	}

	function Noti({ navigation, user, text, time, type, source }) {

	return (
		<View style={styles.noti_container}>
		<View style={styles.profile_container}>
			<Image style={styles.profile} source={profile_img} />
		</View>
		<View style={styles.text_container}>
			<Text style={styles.text}><Text style={styles.user}>{user}</Text>{text}</Text>
		</View>
		
		<View style={styles.end_container}>
			{type === 'image' || type === 'video' ?
			<View style={styles.post_container}>
			<Image style={styles.post} source={{uri: source}}/>
			</View>
			: 
			<View/>
			}
			
			<View style={styles.time_container}>
			<Text style={styles.time}>{time}</Text>

			</View>
		</View>
		</View>
	);
	}



	export default function Notification({ navigation, route }) {

	const [nofications, setNotifications] = useState([
		{id: 1, type: 'image', source: aws, time: '2s', user: 'user00', text: ' upvoted post'},
		{id: 2, type: 'text', source: null, time: '44s', user: 'schafferluke', text: ' commented on post'},
		{id: 3, type: 'video', source: aws_2, time: '1m', user: 'user02', text: ' rerouted post'},
		{id: 4, type: 'text', source: null, time: '7m', user: 'user03', text: ' upvoted post'},
		{id: 5, type: 'text', source: null, time: '12m', user: 'user04', text: ' downvoted post'},
		{id: 6, type: 'image', source: aws, time: '4h', user: 'user05', text: ' rerouted post'},
		{id: 7, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 8, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 9, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 10, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 11, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 12, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 13, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 14, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 15, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 16, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 17, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 18, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 19, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 20, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
		{id: 21, type: 'image', source: aws_2, time: '2d', user: 'user06', text: ' shared post'},
	])

	const navigate = (x) => {
        navigation.navigate(x, {
            location: 'notifications'
        })
    }

	const noti = ({ item }) => {
		return (
		<Noti navigation={navigation} time={item.time} user={item.user} text={item.text} type={item.type} source={item.source} />
		)
	}

	const notiHead = () => {
		return (
		<NotiHead navigate={navigate}/>
		)
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
			<FlatList
			contentContainerStyle={styles.list_container}
			data={nofications}
			ListHeaderComponent={notiHead}
			ListFooterComponent={NotiFoot}
			renderItem={noti}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			/>
		
		
		</View>
	);
	}


	const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#5F5F5F',
	},
	list_container: {
		width: window.width,
		alignItems: 'center',
	},
	head_container: {
		// flexDirection: 'row',
	},
	notification_header_container: {
		alignItems: 'center',
		width: window.width,
		height: 100,
		marginBottom: 17
	},
	notification_header_text: {
		color: '#C2C2C2',
		fontFamily: 'Louis',
		fontSize: 40
	},
	cog_container: {
		position: 'absolute',
		marginTop: 71,
		right: 21,
		alignSelf: 'flex-end',
		// backgroundColor: 'white',
	},
	cog: {
		height: 28,
		width: 28
	},
	noti_foot: {
		height: window.height / 11
	},
	noti_container: {
		height: 55,
		width: window.width / 1.07,
		borderRadius: 11,
		backgroundColor: '#777777',
		marginBottom: 7,
		flexDirection: 'row',
	},
	profile_container: {
		height: '100%',
		width: window.width / 7,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: window.width / 40,
		borderBottomLeftRadius: window.width / 40,
	},
	profile: {
		height: 42,
		width: 42,
		borderRadius: 50
	},
	text_container: {
		height: '100%',
		width: window.width / 1.8,
		justifyContent: 'center',
	},
	user: {
		color: '#171717'
	},
	text: {
		fontFamily: 'Louis',
		fontSize: 15,
		color: '#C2C2C2',
	},
	end_container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	post_container: {
		right: window.width / 9
	},
	post: {
		height: window.width / 11,
		width: window.width / 11,
		borderRadius: window.width / 70
	},
	time_container: {
		position: 'absolute',
		top: window.width / 40,
		right: window.width / 40,
	},
	time: {
		fontFamily: 'Louis',
		fontSize: window.width / 28,
		color: '#B4B4B4',
		
	}
});

