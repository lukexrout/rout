import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, FlatList } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const plus = require('../assets/img/plus.png')
const profile = require('../assets/img/user_profile_template.png')

const Chat = ({ navigation, route, status, user, last_dm }) => {

    const condenseSample = () => {
        if (last_dm.length > 17) {

            const fin_length = 17
            const fin = last_dm.substring(0, fin_length) + '...'

            return fin
        } else {
            return last_dm
        }
    }

    return (
        <View style={[styles.chat_container, status === 'read' ? {backgroundColor: '#777777'} : {backgroundColor: '#999999'}]}>
            <View style={styles.chat_img_container}>
                <Image style={styles.chat_img} source={profile}/>
            </View>
            <View style={styles.chat_info_container}>
                <View style={styles.chat_name_container}>
                    <Text style={[styles.chat_name, status === 'read' ? {color: '#C2C2C2'} : {color: '#333333'}]}>{user}</Text>
                </View>
                <View style={styles.chat_prev_container}>
                    <Text style={[styles.chat_prev, status === 'read' ? {color: '#B4B4B4'} : {color: '#444444'}]}>{condenseSample()}</Text>
                </View>
            </View>
            <View style={styles.chat_status_container}>
                <Text style={[styles.chat_status, status === 'read' ? {color: '#B4B4B4'} : {color: '#444444'}]}>{status} | 77w</Text>
            </View>

        </View>
    )
}

const ChatHead = () => {

    return (
        <View style={styles.chat_head}>
        </View>
    )

}

export default function DM({ navigation, route }) {
	
    const location = route.params.location

    const [chats, setChats] = useState([
        {id: 1, status: 'unread', user: 'schafferluke', last_dm: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'},
        {id: 2, status: 'read', user: 'elonmusk', last_dm: 'hello there!'},
        {id: 3, status: 'read', user: 'elonmusk', last_dm: 'How are you doing this evening?'},
        {id: 4, status: 'read', user: 'schafferluke', last_dm: 'samplesamplesamplesamplesamplesamplesample'},
    ])

    const navigate = (x) => {
        navigation.navigate(x)
    }

    const chat = ({item}) => {
        return (<Chat navigation={navigation} route={route} status={item.status} user={item.user} last_dm={item.last_dm} key={item.id}/>)
    }
    const chatHead = ({item}) => {
        return(<ChatHead/>)
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
                <SafeAreaView style={styles.dm_container}>
                    <Text style={styles.dm}>message</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.plus_safe}>
                    <Pressable style={styles.plus_press}>
                        <Image source={plus} style={styles.plus}/>
                    </Pressable>
                </SafeAreaView>
            </View>

            <View style={styles.chat_list_container}>
                <FlatList
                style={styles.chat_list}
                renderItem={chat}
                data={chats}
                ListHeaderComponent={chatHead}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                />
            </View>

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
        paddingBottom: 10,
    },
    dm_container: {
        alignSelf: 'center'
    },
    dm: {
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
    },
    back: {
        width: 12,
        height: 21
    },

    plus_safe: {
        alignSelf: 'flex-end',
        position: 'absolute'
    },
    plus_press: {
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        height: 24,
        width: 24
    },


    chat_list_container: {
        flex: 1,
    },
    chat_list: {

    },
    chat_head: {
        marginBottom: 7
    },
    chat_container: {
        flexDirection: 'row',
        height: 55,
        width: window.width / 1.07,
        marginBottom: 7,
        borderRadius: 11,
        alignSelf: 'center',
        alignItems: 'center'
    },
    chat_img_container: {
        width: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chat_img: {
        height: 42,
        width: 42,
        borderRadius: 50
    },
    chat_info_container: {
        paddingLeft: 4
    },
    chat_name_container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    chat_name: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2'
    },
    chat_prev_container: {
        flex: 1,
    },
    chat_prev: {
        fontFamily: 'Louis',
        fontSize: 14
    },
    chat_status_container: {
        flex: 1,
        height: '100%',
        paddingTop: 7,
        paddingRight: 7,
        alignItems: 'flex-end',
    },
    chat_status: {
        fontFamily: 'Louis',
        fontSize: 14
    }

})