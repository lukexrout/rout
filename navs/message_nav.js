import React from 'react';
// import Constants from 'expo-constants'
// import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Direct_Msg from '../screens/(not used) dm';
import ActiveChat from '../screens/activeChat';

const Stack = createNativeStackNavigator();

export default function Message_Nav({ navigation }) {
	
    console.log(navigation.getState())


	return (
			<Stack.Navigator>

				<Stack.Group screenOptions={{headerShown: false}}>
					<Stack.Screen name='direct_msg' component={Direct_Msg}/>
				</Stack.Group>

				<Stack.Group screenOptions={{headerShown: false}}>
					<Stack.Screen name='active_chat' component={ActiveChat}/>
				</Stack.Group>
				
			</Stack.Navigator>
	)
}