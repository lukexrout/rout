///// Template for all future screens.

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')

function ProfileHead({ navigation, route }) {
	


    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.general_profile_container}>
                <SafeAreaView style={{flexDirection: 'row'}}>
                    <View style={styles.profile_container}>
        
                        <View style={styles.rout_container}>
                            <Text style={styles.rout_text}>rout</Text>
                        </View>
        
        
                        <View style={styles.set_dm_container}>
                            <Pressable onPress={() => navigate('direct_msg')} style={styles.dm_container}>
                                <Image style={styles.dm} source={dm_icon}/>
                            </Pressable>
                            <Pressable onPress={() => navigate('settings')} style={styles.set_container}>
                                <Image style={styles.set} source={set_icon}/>
                            </Pressable>
                        </View>
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
                                <View style={styles.sep_stat}/>
                            </View>
            
                            <View style={styles.button_container}>
                                <View style={styles.button_wallet}>
                                    <Text style={styles.button_text}>wallet</Text>
                                </View>
                                <View style={{width: window.width / 11}}/>
                                <View style={styles.button_edit}>
                                    <Text style={styles.button_text}>edit profile</Text>
            
                                </View>
                            </View>
            
                        </View>
        
                    </View>
                    
                    
                </SafeAreaView>
                <View style={styles.tab_container}>
                        <Pressable onPress={() => contentPress()} style={styles.tab_text_container}>
                            <View style={styles.tab_text_center}>
                                <Animated.View style={[styles.tab_text_outline, {opacity: contentOpacity}]}/>
                                <Text style={styles.tab_text}>content</Text>
                            </View>
                        </Pressable>
        
                        <View style={styles.sep_line}/>
                        <Pressable onPress={() => interestPress()} style={styles.tab_text_container}>
                            <View style={styles.tab_text_center}>
                                <Animated.View style={[styles.tab_text_outline, {opacity: interestOpacity}]}/>
                                <Text style={styles.tab_text}>interests</Text>
                            </View>
                        </Pressable>
                    </View>
            </View>
    )
}

const styles = StyleSheet.create({
    general_profile_container: {
        flexDirection: 'row',
        width: window.width,
        height: window.height / 2.08,
        alignItems: 'center',

    },
    profile_container: {
        height: window.height / 2.8,
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center',

    },
    rout_container: {
        position: 'absolute',
        width: window.width,
        top: 0,
        // alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rout_text: {
        fontFamily: 'Louis',
        fontSize: 40,
        color: '#C2C2C2'
    },
    set_dm_container: {
        position: 'absolute',
        height: 70,
        width: 28,
        top: window.width / 30,
        right: window.width / 21,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    dm_container: {
        top: 0,
        position: 'absolute',
        width: '100%',
    },
    dm: {
        width: 32,
        height: 24,
        right: window.width / 270
    },
    set_container: {
        width: '100%',
    },
    set: {
        width: '100%',
        height: 36
    },
    info_container: {
        // top: window.width / 70,
        marginTop: window.width / 8,
        width: window.width / 1.5,
        // backgroundColor: 'blue'
    },
    user_container: {
        // backgroundColor: 'red',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: window.width / 30,
        marginBottom: window.width / 30
    },
    user: {
        fontFamily: 'Louis',
        fontSize: 24,
        color: '#C2C2C2'
    },
    pic_container: {
        // backgroundColor: 'gray',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pic: {
        height: window.width / 6,
        width: window.width / 6,
        borderRadius: 50
    },
    stat_container: {
        width: '100%',
        // flexDirection: 'row',
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
        marginTop: window.width / 70,
        marginBottom: window.width / 70,
        marginLeft: window.width / 12,
        marginRight: window.width / 12,
    },
    stat_num_container: {
        backgroundColor: '#616161',
        borderRadius: window.width / 70,
    },
    stat_num: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17,
        marginTop: window.width / 70,
        marginBottom: window.width / 70,
        marginLeft: window.width / 40,
        marginRight: window.width / 40,
    },
    sep_stat: {
        width: '130%',
        height: window.width / 170,
        marginTop: window.height / 70,
        borderRadius: 50,
        backgroundColor: '#4F4F4F'
    },
    button_container: {
        flexDirection: 'row',
        marginTop: window.height / 70,

        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_wallet: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
        borderRadius: window.width / 70,
        width: window.width / 2.8

    },
    button_edit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
        borderRadius: window.width / 70,
        width: window.width / 2.8
    },
    button_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        marginVertical: window.width / 70,
        color: '#555555'
        
    },




    tab_container: {
        position: 'absolute',
        width: window.width,
        height: window.height / 20,
        backgroundColor: '#5F5F5F',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    sep_line: {
        position: 'absolute',
        width: window.width / 170,
        height: '59%',
        backgroundColor: '#717171',
        borderRadius: 50
    },
    tab_text_container: {
        width: window.width / 2,
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab_text_center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab_text_outline: {
        borderRadius: window.width / 70,
        height: window.height / 28,
        width: window.width / 2.2,
        backgroundColor: '#6A6A6A',
    },
    tab_text: {
        position: 'absolute',
        fontFamily: 'Louis',
        // alignSelf: 'center',
        fontSize: 17,
        // marginVertical: window.width / 70,
        // marginHorizontal: window.width / 7,
        color: '#C2C2C2'
    },
})

export const MemoizedProfileHead = React.memo(ProfileHead)