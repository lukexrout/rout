import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')

export default function Rerout({ navigation, route }) {
	
    const location = route.params.location
    
    const repostOpacity = useRef(new Animated.Value(1)).current
    const referenceOpacity = useRef(new Animated.Value(0)).current
    const repostTextOpacity = useRef(new Animated.Value(1)).current
    const referenceTextOpacity = useRef(new Animated.Value(0)).current

    const [reroutSelection, setReroutSelection] = useState('repost')

    const navigate = (x) => {
        navigation.navigate(x)
    }


    const reroutSelect = (x) => {

        setReroutSelection(x)
        const animObj = {
            'reference': [
                referenceOpacity,
                repostOpacity,
                referenceTextOpacity,
                repostTextOpacity
            ],
            'repost': [
                repostOpacity,
                referenceOpacity,
                repostTextOpacity,
                referenceTextOpacity
            ]
        }
        
        const animValueObjOne = {
            toValue: 1,
            duration: 177,
            useNativeDriver: false
        }
        const animValueObjZero = {
            toValue: 0,
            duration: 177,
            useNativeDriver: false
        }
        Animated.parallel([
            Animated.timing(animObj[x][0], animValueObjOne),
            Animated.timing(animObj[x][1], animValueObjZero),
            Animated.timing(animObj[x][2], animValueObjOne),
            Animated.timing(animObj[x][3], animValueObjZero)
        ]).start()
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
                <SafeAreaView style={styles.rerout_container}>
                    <Text style={styles.rerout}>rerout</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.done_safe}>
                    <Pressable onPress={() => navigate(location)} style={styles.done_press}>
                        <Text style={styles.done_text}>done</Text>
                    </Pressable>
                </SafeAreaView>
            </View>

            <View style={styles.rerout_select}>
                <Pressable onPress={() => reroutSelect('repost')} style={styles.repost_select}>
                    <Animated.View style={[styles.repost_anim, {opacity: repostOpacity}]}></Animated.View>
                    <Animated.Text style={[styles.repost_text, {opacity: referenceTextOpacity}]}>repost</Animated.Text>
                    <Animated.Text style={[styles.repost_text_selected, {opacity: repostTextOpacity}]}>repost</Animated.Text>
                </Pressable>
                <View style={styles.sep}/>
                <Pressable onPress={() => reroutSelect('reference')} style={styles.reference_select}>
                    <Animated.View style={[styles.reference_anim, {opacity: referenceOpacity}]}></Animated.View>
                    <Animated.Text style={[styles.reference_text, {opacity: repostTextOpacity}]}>reference</Animated.Text>
                    <Animated.Text style={[styles.reference_text_selected, {opacity: referenceTextOpacity}]}>reference</Animated.Text>
                </Pressable>
            </View>

            <View style={styles.rerout_content}>

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

    },
    rerout_container: {
        alignSelf: 'center'
    },
    rerout: {
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
    done_safe: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    done_press: {
        height: 40,
        width: 110,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    done_text: {
        fontFamily: 'Louis',
        fontSize: 24,
        color: '#111111'
    },

    rerout_select: {
        overflow: 'hidden',
        height: 33,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 50,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    repost_select: {
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444444'
    },
    repost_anim: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#999999',
    },
    repost_text: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17
    },
    repost_text_selected: {
        position: 'absolute',
        color: '#111111',
        fontFamily: 'Louis',
        fontSize: 17
    },
    sep: {
        height: '100%',
        width: 1,
        backgroundColor: '#333333',
    },
    reference_select: {
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444444'
    },
    reference_anim: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#999999',
    },
    reference_text: {
        color: '#C2C2C2',
        fontFamily: 'Louis',
        fontSize: 17
    }, 
    reference_text_selected: {
        position: 'absolute',
        color: '#111111',
        fontFamily: 'Louis',
        fontSize: 17
    },
    rerout_content: {
        height: 111,
        width: window.width / 1.1,
        borderRadius: 11,
        alignSelf: 'center',

        backgroundColor: '#777777'
    }
    
})