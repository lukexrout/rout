import React, { useEffect, useState } from 'react';
// import Constants from 'expo-constants'
// import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userJSON from './user.json'

import Bottom_Nav from './navs/bottom_nav';
import CreatePost from './screens/createPost';
import Create from './screens/create/create';
import Wallet from './screens/wallet'
import EditProfile from './screens/editprofile'
import Following from './screens/following'
import Followers from './screens/followers'
import DirectMsg from './screens/direct_msg';
import ActiveChat from './screens/activeChat';
import Settings from './screens/settings';
import User from './screens/_user'
import Out from './screens/out/out'
import Loading from './screens/out/loading'
import Comments from './screens/comments';
import Save from './screens/save';
import Rerout from './screens/rerout';
import Filter from './screens/filter';
import Pick from './screens/pick';

const Stack = createNativeStackNavigator();

export default function App() {

	const [state, setState] = useState(null)

	useEffect(() => {
		AsyncStorage.getItem('state', (err, res) => {
			if (res === undefined || res === 'out' || res === null) {
				AsyncStorage.setItem('state', 'out')
				// console.log(res)
				setState('out')
			} else {
				console.log(res)
				setState('in')
				console.log(state)
			}
		})
	})

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator name='main_nav'>
				<Stack.Group screenOptions={{headerShown: false}}>
					 
					<Stack.Screen name='state' component={state === 'in' ? Bottom_Nav : state === null ? Loading : Out}/>
					<Stack.Screen name='out' component={Out}/>
					<Stack.Screen name='bottom_nav' component={Bottom_Nav}/>
					<Stack.Screen options={{animationTypeForReplace: 'pop'}} name='create_post' component={CreatePost}/>
					<Stack.Screen name='pick' component={Pick}/>
					<Stack.Screen name='create' component={Create}/>
					<Stack.Screen name='filter' component={Filter}/>
					<Stack.Screen name='rerout' component={Rerout}/>
					<Stack.Screen name='comments' component={Comments}/>
					<Stack.Screen name='save' component={Save}/>
					<Stack.Screen name='settings' component={Settings}/>
					<Stack.Screen name='direct_msg' component={DirectMsg}/>
					<Stack.Screen name='active_chat' component={ActiveChat}/>
					<Stack.Screen name='wallet' component={Wallet}/>
					<Stack.Screen name='edit_profile' component={EditProfile}/>
					<Stack.Screen name='following' component={Following}/>
					<Stack.Screen name='followers' component={Followers}/>
					<Stack.Screen name='_user' component={User}/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	)
}