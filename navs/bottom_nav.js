import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home'
import Discover_Nav from './discover_nav';
import Notification from '../screens/notification';
import Profile from '../screens/profile'
// import Discover from '../screens/discover';
// import Notification from '../screens/bell_con';
// import User from '../screens/_user'

const window = Dimensions.get('window')

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function Bottom_Nav() {

	return (
		<Tab.Navigator 
		screenOptions={{
			tabBarShowLabel: false,
			tabBarStyle: [styles.container],


		}} >
			
			<Tab.Screen name="home" component={Home} options={{ headerStyle: {height: 0}, animationEnabled: false,
			tabBarIcon: ({ focused }) => (
				<View style={styles.icon_flow}>
					{focused ? <Image 
					style={styles.home_icon}
					source={require('../assets/img/home_icon_light.png')}
					/> :
					<Image 
					style={styles.home_icon}
					source={require('../assets/img/home_icon.png')}
					/>}
				</View>
			)}} />
			<Tab.Group>

				<Tab.Screen name="discover_nav" component={Discover_Nav} options={{ 
				tabBarHideOnKeyboard: true, 
				headerStyle: {height: 0}, 
				animationEnabled: false,
				
				tabBarIcon: ({ focused }) => (
					<View style={styles.icon_flow}>
						{focused ? <Image 
						style={styles.discover_icon}
						source={require('../assets/img/look_glass_light.png')}
						/> :
						<Image 
						style={styles.discover_icon}
						source={require('../assets/img/looking_glass_4.png')}
						/>}
					</View>
				)}} />
				{/* <Tab.Screen name="_user" component={User} options={{ headerStyle: {height: 0}, animationEnabled: false,tabBarIconStyle: {position: 'absolute'} }} /> */}
			</Tab.Group>
			<Tab.Screen name="notifications" component={Notification} options={{ headerStyle: {height: 0}, animationEnabled: false,
			tabBarIcon: ({ focused }) => (
				<View style={styles.icon_flow}>
					{focused ? <Image 
					style={styles.noti_icon}
					source={require('../assets/img/bell_icon_tapped.png')}
					/> :
					<Image 
					style={styles.noti_icon}
					source={require('../assets/img/bell_icon.png')}
					// source={require('../assets/img/notification_icon_3.png')}
					/>}
				</View>
			)}} />
			<Tab.Group>

				<Tab.Screen name="profile" component={Profile} options={{ headerStyle: {height: 0}, animationEnabled: false,
				tabBarIcon: ({ focused }) => (
					<View style={styles.icon_flow}>
						{focused ? <Image 
						style={styles.profile_icon}
						source={require('../assets/img/profile_icon_light.png')}
						/> :
						<Image 
						style={styles.profile_icon}
						source={require('../assets/img/profile_icon.png')}
						/>}
					</View>
				)}} />
			</Tab.Group>

		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
    container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: window.height / 12.4,
		backgroundColor: '#5F5F5F',
		borderTopLeftRadius: 11,
		borderTopRightRadius: 11,
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderTopWidth: 0,
		shadowOpacity: 0.7,
		shadowOffset: {height: 0},
		shadowRadius: window.width / 80,
		shadowColor: '#171717'
    },
	icon_flow: {
		// justifyContent: 'center',
		// alignItems: 'center',
		// top: 10
		top: window.height / 140
	},
	home_icon: {
		width: 22,
		height: 22
	},
	discover_icon: {

		width: 22.5,
		height: 22
	},
	// noti_icon: {
	// 	width: window.width / 13,
	// 	height: window.width / 15
	// },
	noti_icon: {
		width: 22.5,
		height: 22
	},
	profile_icon: {
		width: 19.5,
		height: 22
	}
  });
  