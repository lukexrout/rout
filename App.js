import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Bottom_Nav from './navs/bottom_nav';
import Content from './screens/content';
import CreatePost from './screens/createPost';
import Create from './screens/create/create';
import Wallet from './screens/wallet'
import EditProfile from './screens/editprofile'
import Following from './screens/following'
import Followers from './screens/followers'
import DM from './screens/dm';
import ActiveChat from './screens/activeChat';
import Settings from './screens/settings';
import User from './screens/_user'
import Out from './screens/rout/out'
import Loading from './screens/rout/loading'
import Comments from './screens/comments';
import Save from './screens/save';
import Rerout from './screens/rerout';
import Filter from './screens/filter';
import Pick from './screens/pick';
import Data from './screens/set/data'
import Feedback from './screens/set/feedback'
import InterestSet from './screens/set/interest_set'
import NotificationSet from './screens/set/noti_set'
import Account from './screens/set/account'

const Stack = createNativeStackNavigator();

export default function App() {

	const [state, setState] = useState(null)

	useEffect(() => {
		AsyncStorage.getItem('user_id', (err, res) => {
			if (res === undefined || res === null) {
				setState('out')
			} else {
				setState('in')
				console.log(`res: ${res}`)
				console.log(`state: ${state}`)
			}
		})
	})

	const fadeConfig = ({ current }) => ({
		cardStyle: {
			opacity: current.progress,
		},
	});

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator name='main_nav'>
				<Stack.Group screenOptions={{headerShown: false}}>
					<Stack.Screen name='state' component={state === 'in' ? Bottom_Nav : state === null ? Loading : Out}/>
					<Stack.Screen name='out' component={Out}/>
					<Stack.Screen name='bottom_nav' component={Bottom_Nav}/>
					<Stack.Screen name='content' component={Content}/>
					<Stack.Screen name='create_post' component={CreatePost}/>
					<Stack.Screen name='pick' component={Pick}/>
					<Stack.Screen name='create' component={Create}/>
					<Stack.Screen name='filter' component={Filter}/>
					<Stack.Screen name='rerout' component={Rerout}/>
					<Stack.Screen name='comments' component={Comments}/>
					<Stack.Screen name='save' component={Save}/>
					<Stack.Screen name='settings' component={Settings}
					options={{
						animationTypeForReplace: 'push',
						gestureDirection: 'horizontal'
					  }}/>
					<Stack.Screen name='data' component={Data}/>
					<Stack.Screen name='feedback' component={Feedback}/>
					<Stack.Screen name='interest_set' component={InterestSet}/>
					<Stack.Screen name='noti_set' component={NotificationSet}/>
					<Stack.Screen name='account' component={Account}/>
					<Stack.Screen name='dm' component={DM}/>
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