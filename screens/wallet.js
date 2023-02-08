import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')

export default function Wallet({ navigation, route }) {
	
    const location = route.params.location

    const oneDayOpacity = useRef(new Animated.Value(0)).current
    const oneWeekOpacity = useRef(new Animated.Value(0)).current
    const oneMonthOpacity = useRef(new Animated.Value(0)).current
    const threeMonthOpacity = useRef(new Animated.Value(1)).current
    const sixMonthOpacity = useRef(new Animated.Value(0)).current
    const oneYearOpacity = useRef(new Animated.Value(0)).current
    const allOpacity = useRef(new Animated.Value(0)).current

    const [currentPeriod, setCurrentPeriod] = useState('3m')

    const navigate = (x) => {
        navigation.navigate(x)
    }

    const handlePeriodPress = (x, y) => {

        const periodObj = {
            '1d': oneDayOpacity,
            '1w': oneWeekOpacity,
            '1m': oneMonthOpacity,
            '3m': threeMonthOpacity,
            '6m': sixMonthOpacity,
            '1y': oneYearOpacity,
            'all': allOpacity
        }



        Animated.parallel([
            Animated.timing(periodObj[x], {
                toValue: 1,
                duration: 177,
                useNativeDriver: false
            }),
            Animated.timing(periodObj[y], {
                toValue: 0,
                duration: 177,
                useNativeDriver: false
            }),
        ]).start()

        setCurrentPeriod(x)

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
                <SafeAreaView style={styles.wallet_container}>
                    <Text style={styles.wallet}>wallet</Text>
                </SafeAreaView>
            </View>

            <View style={styles.chart_container}>
                <View style={styles.token_count_container}>
                    <Text style={styles.token_count}>$21,444</Text>
                </View>

                <View style={styles.line}>
                    <View style={styles.line_circle}>
                        
                    </View>
                    <View style={styles.line_circle_two}>

                    </View>
                </View>

                <View style={styles.period_container}>
                    <View style={styles.period_row}>
                        <Pressable onPress={() => handlePeriodPress('1d', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneDayOpacity}]}></Animated.View>
                            <Text style={styles.period}>1d</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriodPress('1w', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneWeekOpacity}]}></Animated.View>
                            <Text style={styles.period}>1w</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriodPress('1m', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneMonthOpacity}]}></Animated.View>
                            <Text style={styles.period}>1m</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriodPress('3m', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: threeMonthOpacity}]}></Animated.View>
                            <Text style={styles.period}>3m</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriodPress('6m', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: sixMonthOpacity}]}></Animated.View>
                            <Text style={styles.period}>6m</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriodPress('1y', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneYearOpacity}]}></Animated.View>
                            <Text style={styles.period}>1y</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriodPress('all', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: allOpacity}]}></Animated.View>
                            <Text style={styles.period}>all</Text>
                        </Pressable>
                    </View>                    
                </View>
            </View>

            <View style={styles.conversion_container}>
                
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
        // flexDirection: 'row'
    },
    wallet_container: {
        alignSelf: 'center'
    },
    wallet: {
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


    chart_container: {
        height: 444,
        width: window.width / 1.1,
        marginTop: 10,
        borderRadius: 21,
        alignSelf: 'center',
        backgroundColor: '#717171',
        shadowColor: '#444444',
        shadowOffset: {height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    token_count_container: {
        position: 'absolute',
        top: 21,
        alignSelf: 'center',
        shadowColor: '#333333',
        shadowOffset: {height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    token_count: {
        fontFamily: 'Louis',
        fontSize: 28,
        color: '#C2C2C2'
    },


    line: {
        position:'absolute',
        height: 3,
        width: '90%',
        bottom: '50%',
        transform: [{ rotate: '350deg' }],
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#444444'
    },
    line_circle: {
        position: 'absolute',
        height: 10,
        width: 10,
        borderRadius: 50,
        // alignSelf: 'flex-end',
        backgroundColor: '#444444'
    },
    line_circle_two: {
        position: 'absolute',
        height: 10,
        width: 10,
        borderRadius: 50,
        alignSelf: 'flex-end',
        backgroundColor: '#444444'
    },


    period_container: {
        position: 'absolute',
        height: 28,
        width: '95%',
        bottom: 10,
        borderRadius: 21,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#616161'
    },
    period_row: {
        height: '100%',
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    period_press: {
        overflow: 'hidden',
        flex: 1,
        height: '77%',
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },
    period_background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#777777'
    },
    period: {
        fontFamily: 'Louis',
        fontSize: 14,
        color: '#C2C2C2'
    },

    conversion_container: {
        height: 50,
        width: window.width / 1.1,
        marginTop: 10,
        borderRadius: 21,
        alignSelf: 'center',
        backgroundColor: '#777777'
    }
    
})