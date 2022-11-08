import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')

const back = require('../assets/img/back.png')
const profile_img = require('../assets/img/user_profile_template.png')
const plus_img = require('../assets/img/plus_sign.png')
const set_icon = require('../assets/img/cog.png')
const dm_icon = require('../assets/img/dm_icon_2.png')
const save_icon = require('../assets/img/save_icon_profile.png')

export default function EditProfile({ navigation, route }) {
	
    const location = route.params.location

    const navigate = (x) => {
        navigation.navigate(x)
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
                <SafeAreaView style={styles.edit_container}>
                    <Text style={styles.edit}>edit</Text>
                </SafeAreaView>
            </View>


            <View style={styles.profile_container}>
                    
                    <View style={styles.info_container}>
                        <View style={styles.pic_container}>
                            <Image style={styles.pic} source={profile_img}/>
                        </View>
                        <View style={styles.user_container}>
                            <Text style={styles.user}>schafferluke</Text>
                        </View>
                        <View style={styles.stat_container}>
                            <View style={{flexDirection: 'row'}}>
                                <Pressable onPress={() => navigate('followers')} style={styles.stat}>
                                    <View style={styles.stat_text_container}>
                                        <Text style={styles.stat_text}>followers</Text>
                                    </View>
                                    <View style={styles.stat_num_container}>
                                        <Text style={styles.stat_num}>1.35m</Text>
                                    </View>
                                </Pressable>
                                <View style={{width: window.width / 20}}/>
                                <Pressable onPress={() => navigate('following')} style={styles.stat}>
                                    <View style={styles.stat_text_container}>
                                        <Text style={styles.stat_text}>following</Text>
                                    </View>
                                    <View style={styles.stat_num_container}>
                                        <Text style={styles.stat_num}>5000</Text>
                                    </View>
                                </Pressable>
                            </View>
                            
                        </View>
                        <View style={styles.sep_stat}/>
                        <View style={styles.bio_container}>
                            <Text style={styles.bio}>this is my bio currently. what do you think? I hope you like it considerably.</Text>
                        </View>
                        <View style={[styles.sep_stat, {width: 77}]}/>
                        
                        
                    </View>
                </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#555555'
    },
    head_safe: {
        // flexDirection: 'row'
    },
    edit_container: {
        alignSelf: 'center'
    },
    edit: {
        fontFamily: 'Louis',
        fontSize: 35,
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
    

    profile_container: {
        flex: 1,
        // justifyContent: 'center',
        marginTop: 10,
        width: window.width,
        alignItems: 'center',

    },
    
    info_container: {
        width: 300,
        // marginBottom: window.height / 4,
        // backgroundColor: '#777777',
        paddingVertical: 10,
        borderRadius: 21,
        
        // paddingLeft: 100,
        // paddingRight: 100
    },
    user_container: {
        alignSelf: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginVertical: 14,
        borderRadius: 10,
        backgroundColor: '#777777',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    user: {
        fontFamily: 'Louis',
        fontSize: 24,
        color: '#C2C2C2',
    },
    pic_container: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    pic: {
        height: 70,
        width: 70,
        borderRadius: 50
    },
    stat_container: {
        width: '100%',
        marginBottom: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat_text_container: {
        backgroundColor: '#616161',
        borderRadius: window.width / 70,
        marginBottom: window.width / 120


    },
    stat_text: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 20,
        marginRight: 20,
    },
    stat_num_container: {
        backgroundColor: '#616161',
        borderRadius: window.width / 70,
    },
    stat_num: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
        marginRight: 10,
    },
    sep_stat: {
        width: '70%',
        height: window.width / 170,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#616161'
    },
    bio_container: {
        // flex: 1,
        width: '110%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#777777',
        shadowColor: '#121212',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    bio: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2',
        textAlign: 'center'
    },
    
})