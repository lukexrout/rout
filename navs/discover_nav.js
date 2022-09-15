import React from 'react';
// import Constants from 'expo-constants'
// import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import User from '../screens/_user'
import Discover from '../screens/discover';
import Message_Nav from './message_nav';

const Stack = createNativeStackNavigator();

export default function Discover_Nav() {
	

	return (
			<Stack.Navigator>

                <Stack.Group screenOptions={{headerShown: false}}>
					<Stack.Screen name='discover' component={Discover}/>
				</Stack.Group>

                <Stack.Group screenOptions={{headerShown: false}}>
					<Stack.Screen name='_user' component={User}/>
				</Stack.Group>

				
				

				
			</Stack.Navigator>
	)
}