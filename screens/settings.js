import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, FlatList } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')

const Setting = ({ navigation, setting, location }) => {

    const navigate = (x) => {
        navigation.navigate(x, {
            location: 'settings'
        })
    }

    return (
        <Pressable onPress={() => navigate(location)} style={styles.setting_container}>
            <Text style={styles.setting_text}>{setting}</Text>
        </Pressable> 
    )
}

export default function Save({ navigation, route }) {
	
    const [settings, setSettings] = useState([
        {id: 0, setting: 'privacy', location: 'privacy'},
        {id: 1, setting: 'notifications', location: 'noti_set'},
        {id: 2, setting: 'interests', location: 'interest_set'},
        {id: 3, setting: 'monetize', location: 'monetize_set'},
        {id: 4, setting: 'data', location: 'data'},
        {id: 5, setting: 'password', location: 'password'},
        {id: 6, setting: 'feedback', location: 'feedback'}
    ])

    const location = route.params.location

    const navigate = (x) => {
        navigation.navigate(x)
    }

    const setting = ({ item }) => {
        return (<Setting navigation={navigation} setting={item.setting} location={item.location}/>)
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
            <View style={styles.head_safe}>
                <SafeAreaView style={styles.back_safe}>
                    <Pressable onPress={() => navigate(location)} style={styles.back_press}>
                        <Image style={styles.back} source={back}/>
                    </Pressable>
                </SafeAreaView>
                <SafeAreaView style={styles.settings_container}>
                    <Text style={styles.settings}>settings</Text>
                </SafeAreaView>
            </View>
            <FlatList
            listKey='settings'
            style={styles.settings_list}
            data={settings}
            renderItem={setting}
            scrollEnabled={false}
            />
            <Pressable style={styles.logout_container}>
                <Text style={styles.logout_text}>logout</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#5F5F5F'
    },
    head_safe: {
        // flexDirection: 'row'
    },
    settings_container: {
        alignSelf: 'center'
    },
    settings: {
        fontFamily: 'Louis',
        fontSize: 30,
        color: '#C2C2C2'
    },
    back_safe: {
        position: 'absolute'
    },
    back_press: {
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue'
    },
    back: {
        width: 12,
        height: 21
    },

    settings_list: {
        marginTop: 21
    },

    setting_container: {
        height: 55,
        width: window.width / 1.07,
        marginBottom: 10,
        borderRadius: 21,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#777777'
    },
    setting_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        left: 21,
        color: '#C2C2C2'
    },

    logout_container: {
        height: 42,
        width: 100,
        right: 21,
        bottom: 21,
        borderRadius: 17,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555555',
    },
    logout_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#A1A1A1'
    }
    
})




// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Pressable, Image, Dimensions, SafeAreaView } from 'react-native';
// import { useFonts } from 'expo-font';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const window = Dimensions.get('window')
// const x_button = require('../assets/img/x_button02.png')

// export default function Settings({ navigation, route }) {

//     const [logout_toggle, setLoggout_toggle] = useState(false)
	
// 	const location = route.params.location

//     const goBack = () => {
// 		navigation.navigate(location)
// 	}

//     const logOut = () => {
//         setLoggout_toggle(true)
//     }

//     const no_toggle = () => {
//         setLoggout_toggle(false)
//     }
    
//     const yes_toggle = () => {
//         // logout function
//         AsyncStorage.setItem('state', 'out')
//         navigation.navigate('out')
//     }

//     const [loaded] = useFonts({
//         'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
//         'LinLibertime': require('../assets/fonts/LinLibertime.ttf')
//     })

//     if (!loaded) {
//         return null;
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.settings_header}>
//                 <Pressable onPress={goBack} style={styles.x_button_container}>
//                     <Image source={x_button} style={styles.x_button}/>
//                 </Pressable>
//                 <Text style={styles.settings_title}>Settings</Text>
//             </View>
//             <SafeAreaView style={{top: window.width / 5}}>
//             <View style={styles.seperation_line_container}>
//                 <View style={styles.seperation_line}/>
//             </View>
//             <Pressable style={styles.option1}>
//                 <Text style={styles.option1_text}>Privacy & Security</Text>
//             </Pressable>
//             <View style={styles.seperation_line_container}>
//                 <View style={styles.seperation_line}/>
//             </View>
//             <Pressable style={styles.option0}>
//                 <Text style={styles.option1_text}>Notifications</Text>
//             </Pressable>
//             <View style={styles.seperation_line_container}>
//                 <View style={styles.seperation_line}/>
//             </View>
//             <Pressable style={styles.option1}>
//                 <Text style={styles.option1_text}>Data Usage</Text>
//             </Pressable>
//             <View style={styles.seperation_line_container}>
//                 <View style={styles.seperation_line}/>
//             </View>
//             <Pressable style={styles.option0}>
//                 <Text style={styles.option1_text}>Account</Text>
//             </Pressable>
//             <View style={styles.seperation_line_container}>
//                 <View style={styles.seperation_line}/>
//             </View>
//             <Pressable style={styles.option1}>
//                 <Text style={styles.option1_text}>About</Text>
//             </Pressable>
//             </SafeAreaView>
//             <Pressable onPress={logOut} style={styles.logout_container}>
//                 <Text style={styles.logout} >Logout</Text>
//                 <View style={styles.logout_shadow}/>
//             </Pressable>
//             {logout_toggle && 
//             <View style={styles.confirmation}>
//                 <Text style={styles.logout_text}>LogOut?</Text>
//                 <View style={styles.buttons}>
//                     <Pressable onPress={yes_toggle} style={styles.yes_button}>
//                         <Text style={styles.toggle_text} >yes</Text>
//                     </Pressable>
//                     <View style={styles.middle}/>
//                     <Pressable onPress={no_toggle} style={styles.no_button}>
//                         <Text style={styles.toggle_text} >no</Text>
//                     </Pressable>
//                 </View>
//             </View>
//             }
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         height: '100%',
//         width: '100%',
//         backgroundColor: '#555555',
//         alignItems: 'center'
//     },
//     settings_header: {
//         // top: window.height / 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     x_button_container: {
//         // backgroundColor: '#333333',
//         width: window.width / 13,
// 		height: window.width / 13,
//         justifyContent: 'center',
// 		alignItems: 'center',
// 		top: window.height / 17,
// 		right: window.width / 2.5
//     },
//     x_button: {
//         position: 'absolute',
//         width: window.width / 15,
// 		height: window.width / 15
//     },
//     settings_title: {
//         position: 'absolute',
//         top: window.height / 17,
//         fontFamily: 'Louis',
//         fontSize: window.width / 15
//     },
//     option1: {
//         zIndex: 2,
//         // top: window.height / 11,
//         width: window.width,
//         height: window.width / 5,
//         backgroundColor: '#555555',
//         borderRadius: 10,
//         // alignItems: 'flex-start',
//         justifyContent: 'center'
//     },
//     seperation_line_container: {
//         zIndex: 2, 
//         justifyContent: 'flex-end', 
//         alignItems: 'center'
//     },
//     seperation_line: {
//         position: 'absolute', 
//         borderColor: '#3C3C3C', 
//         borderWidth: 1, 
//         width: window.width / 1.12
//     },
//     option0: {
//         zIndex: 1,
//         // top: window.height / 11,
//         width: '100%',
//         height: window.width / 5,
//         backgroundColor: '#555555',
//         borderRadius: 10,
//         // alignItems: 'center',
//         justifyContent: 'center',
//         // shadowColor: 'black',
//         // shadowRadius: 15,
//         // shadowOpacity: 1,
//         // shadowOffset: {height: .5}
//     },
//     option1_text: {
//         fontSize: window.width / 20,
//         fontFamily: 'Louis',
//         left: window.width / 15
//     },
//     logout_container: {
//         position: 'absolute',
//         alignItems: 'center',
//         justifyContent: 'center',
//         top: window.height / 1.114,
//         left: window.width / 1.7,
//         width: 150,
//         height: 60,
//     },
//     logout_shadow: {
//         position: 'absolute',
//         width: 150,
//         height: 60,
//         backgroundColor: 'transparent',
//         borderWidth: 7,
//         borderColor: '#555555',
//         overflow: 'hidden',
//         shadowColor: '#191919',
//         shadowRadius: 2,
//         shadowOffset: {height: -.5},
//         borderRadius: 20,
//         shadowOpacity: 1
//     },
//     logout: {
//         fontSize: window.width / 21,
//         fontFamily: 'Louis',
//         color: '#999999',
//     },
//     confirmation: {
//         zIndex: 3,
//         bottom: window.height / 3,
//         width: window.width / 1.2,
//         height: window.height / 4,
//         borderRadius: 25,
//         shadowOpacity: 1,
//         shadowColor: '#111111',
//         shadowRadius: 3,
//         shadowOffset:{height: .5},
//         backgroundColor: '#323232',
//         alignItems: 'center'
//     },
//     logout_text: {
//         position: 'absolute',
//         fontSize: window.width / 10,
//         fontFamily: 'Louis',
//         color: '#999999',
//         top: window.width / 10
//     },
//     buttons: {
//         top: window.width / 3,
//         flexDirection: 'row'
//     },
//     yes_button: {
//         backgroundColor: '#A7A7A7',
//         height: window.width / 10,
//         width: window.width / 4,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5
//     },
//     middle: {
//         width: 20
//     },
//     no_button: {
//         backgroundColor: '#A7A7A7',
//         height: window.width / 10,
//         width: window.width / 4,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5
//     },
//     toggle_text: {
//         color: '#626262',
//         fontFamily: 'Louis',
//         fontSize: window.width / 17
//     }
// })