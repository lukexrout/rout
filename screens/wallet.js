import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, SafeAreaView, Image, Animated, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

const window = Dimensions.get('window')
const back = require('../assets/img/back.png')
const info = require('../assets/img/info.png')

export default function Wallet({ navigation, route }) {
	
    const location = route.params.location

    const oneDayOpacity = useRef(new Animated.Value(0)).current
    const oneWeekOpacity = useRef(new Animated.Value(0)).current
    const oneMonthOpacity = useRef(new Animated.Value(0)).current
    const threeMonthOpacity = useRef(new Animated.Value(1)).current
    const sixMonthOpacity = useRef(new Animated.Value(0)).current
    const oneYearOpacity = useRef(new Animated.Value(0)).current
    const allOpacity = useRef(new Animated.Value(0)).current

    const toggleOneRight = useRef(new Animated.Value(20)).current
    const toggleTwoRight = useRef(new Animated.Value(20)).current
    const toggleThreeRight = useRef(new Animated.Value(20)).current
    const toggleFourRight = useRef(new Animated.Value(20)).current

    const toggleOneOpacity = useRef(new Animated.Value(0)).current
    const toggleTwoOpacity = useRef(new Animated.Value(0)).current
    const toggleThreeOpacity = useRef(new Animated.Value(0)).current
    const toggleFourOpacity = useRef(new Animated.Value(0)).current

    const [currentPeriod, setCurrentPeriod] = useState('3m')
    const [monetizeSettings, setMonetizeSettings] = useState({
        'one': {
            status: false,
            setting: 'show_ads'
        },
        'two': {
            status: false,
            setting: 'custom_ads'
        },
        'three': {
            status: false,
            setting: 'promo_requests'
        },
        'four': {
            status: false,
            setting: 'promo_requests'
        }
    })

    const navigate = (x) => {
        navigation.navigate(x)
    }

    const handlePeriod = (x, y) => {
        const periodObj = {
            '1d': oneDayOpacity,
            '1w': oneWeekOpacity,
            '1m': oneMonthOpacity,
            '3m': threeMonthOpacity,
            '6m': sixMonthOpacity,
            '1y': oneYearOpacity,
            'all': allOpacity
        }
        if (currentPeriod !== x) {
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
    }

    const handleToggle = (x, y) => {
        const toggleObj = {
            'one': [toggleOneRight, toggleOneOpacity],
            'two': [toggleTwoRight, toggleTwoOpacity],
            'three': [toggleThreeRight, toggleThreeOpacity],
            'four': [toggleFourRight, toggleFourOpacity]
        }
        if (monetizeSettings[x].status === false) {
            Animated.parallel([
                Animated.timing(toggleObj[x][0], {
                    toValue: 0,
                    duration: 177,
                    useNativeDriver: false
                }),
                Animated.timing(toggleObj[x][1], {
                    toValue: 1,
                    duration: 177,
                    useNativeDriver: false
                })
            ]).start()
            var newObj = monetizeSettings
            newObj[x].status = true
        } else {
            Animated.parallel([
                Animated.timing(toggleObj[x][0], {
                    toValue: 20,
                    duration: 177,
                    useNativeDriver: false
                }),
                Animated.timing(toggleObj[x][1], {
                    toValue: 0,
                    duration: 177,
                    useNativeDriver: false
                })
            ]).start()
            var newObj = monetizeSettings
            newObj[x].status = false
        }
            
        
        setMonetizeSettings(newObj)
    }

    // everything in front of this

    const [loaded] = useFonts({
        'Louis': require('../assets/fonts/Louis_George_Cafe.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
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
                        <Pressable onPress={() => handlePeriod('1d', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneDayOpacity}]}></Animated.View>
                            <Text style={styles.period}>1d</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriod('1w', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneWeekOpacity}]}></Animated.View>
                            <Text style={styles.period}>1w</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriod('1m', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneMonthOpacity}]}></Animated.View>
                            <Text style={styles.period}>1m</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriod('3m', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: threeMonthOpacity}]}></Animated.View>
                            <Text style={styles.period}>3m</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriod('6m', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: sixMonthOpacity}]}></Animated.View>
                            <Text style={styles.period}>6m</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriod('1y', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: oneYearOpacity}]}></Animated.View>
                            <Text style={styles.period}>1y</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePeriod('all', currentPeriod)} style={styles.period_press}>
                            <Animated.View style={[styles.period_background, {opacity: allOpacity}]}></Animated.View>
                            <Text style={styles.period}>all</Text>
                        </Pressable>
                    </View>                    
                </View>
            </View>
            
            <View style={styles.monetize_container}>
                <Text style={styles.monetize_container_text}>monetize account.</Text>
            </View>
            <View style={styles.monetize_ad_container}>
                <View style={styles.monetize_ad_text_container}>
                    <Text style={styles.monetize_ad_text}>ads.</Text>
                </View>

                <View style={styles.monetize_ad_toggle_container}>
                    <View style={styles.monetize_ad_toggle_text_container}>
                        <Text style={styles.monetize_ad_toggle_text}>show ads</Text>
                    </View>
                    <View style={styles.monetize_ad_toggle_end_container}>
                        <Pressable style={styles.info_container}>
                            <Image source={info} style={styles.info}/>
                        </Pressable>
                        <Pressable onPress={() => handleToggle('one')} style={styles.toggle_press}>
                            <View style={styles.toggle_safe}>
                                <Animated.View style={[styles.toggle_background, {opacity: toggleOneOpacity}]}/>
                                <View style={styles.toggle_container}>
                                    <Animated.View style={[styles.toggle, {right: toggleOneRight}]}/>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.monetize_ad_toggle_container}>
                    <View style={styles.monetize_ad_toggle_text_container}>
                        <Text style={styles.monetize_ad_toggle_text}>custom ads</Text>
                    </View>
                    <View style={styles.monetize_ad_toggle_end_container}>
                        <Pressable style={styles.info_container}>
                            <Image source={info} style={styles.info}/>
                        </Pressable>
                        <Pressable onPress={() => handleToggle('two')} style={styles.toggle_press}>
                            <View style={styles.toggle_safe}>
                                <Animated.View style={[styles.toggle_background, {opacity: toggleTwoOpacity}]}/>
                                <View style={styles.toggle_container}>
                                    <Animated.View style={[styles.toggle, {right: toggleTwoRight}]}/>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.monetize_ad_text_container}>
                    <Text style={styles.monetize_ad_text}>personal promotions.</Text>
                </View>
                <View style={styles.monetize_ad_toggle_container}>
                    <View style={styles.monetize_ad_toggle_text_container}>
                        <Text style={styles.monetize_ad_toggle_text}>promo requests</Text>
                    </View>
                    <View style={styles.monetize_ad_toggle_end_container}>
                        <Pressable style={styles.info_container}>
                            <Image source={info} style={styles.info}/>
                        </Pressable>
                        <Pressable onPress={() => handleToggle('three')} style={styles.toggle_press}>
                            <View style={styles.toggle_safe}>
                                <Animated.View style={[styles.toggle_background, {opacity: toggleThreeOpacity}]}/>
                                <View style={styles.toggle_container}>
                                    <Animated.View style={[styles.toggle, {right: toggleThreeRight}]}/>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.monetize_ad_toggle_container}>
                    <View style={styles.monetize_ad_toggle_text_container}>
                        <Text style={styles.monetize_ad_toggle_text}>suggest campaigns</Text>
                    </View>
                    <View style={styles.monetize_ad_toggle_end_container}>
                        <Pressable style={styles.info_container}>
                            <Image source={info} style={styles.info}/>
                        </Pressable>
                        <Pressable onPress={() => handleToggle('four')} style={styles.toggle_press}>
                            <View style={styles.toggle_safe}>
                                <Animated.View style={[styles.toggle_background, {opacity: toggleFourOpacity}]}/>
                                <View style={styles.toggle_container}>
                                    <Animated.View style={[styles.toggle, {right: toggleFourRight}]}/>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                

            </View>

            <View style={styles.monetize_click_container}>
                <View style={styles.monetize_click_text_container}>
                    <Text style={styles.monetize_click_text}>stats.</Text>
                </View>
                <View style={styles.monetize_click_stats_container}>
                    <View style={styles.monetize_click_stat_one}>
                        <View style={styles.monetize_click_stat_text_container}>
                            <Text style={styles.monetize_click_stat_text}>click through rate</Text>
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.height,
        width: window.width,
        backgroundColor: '#5F5F5F'
    },
    head_safe: {
        height: 100,
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

    monetize_container: {
        height: 44,
        width: window.width / 1.1,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    monetize_container_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2' 
    },
    monetize_ad_container: {
        width: window.width / 1.1,
        borderRadius: 11,
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    monetize_ad_text_container: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    monetize_ad_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2' 
    },
    monetize_ad_toggle_container: {
        height: 49,
        width: '95%',
        marginBottom: 10,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#888888'
    },
    monetize_ad_toggle_text_container: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        // backgroundColor: 'blue'
    },
    monetize_ad_toggle_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2' 
    },
    monetize_ad_toggle_end_container: {
        position: 'absolute',
        height: '100%',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },


    monetize_click_container: {
        width: window.width / 1.1,
        borderRadius: 11,
        marginTop: 10,
        marginBottom: 21,
        alignSelf: 'center',
        backgroundColor: '#777777'
    },
    monetize_click_text_container: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    monetize_click_text: {
        fontFamily: 'Louis',
        fontSize: 21,
        color: '#C2C2C2' 
    },
    monetize_click_stats_container: {

    },
    monetize_click_stat_one: {
        width: '95%',
        marginBottom: 10,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#888888'
    },
    monetize_click_stat_text_container: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
    },
    monetize_click_stat_text: {
        fontFamily: 'Louis',
        fontSize: 17,
        color: '#C2C2C2' 
    },

    toggle_press: {
        height: '100%',
        justifyContent: 'center'
    },
    toggle_safe: {
        height: 25,
        width: 45,
        marginRight: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5F5F5F'
    },
    toggle_container: {
        height: 21,
        width: 41,
        borderRadius: 50
    },
    toggle_background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 50,
        backgroundColor: '#3fa9f5'
    },
    toggle: {
        position: 'absolute',
        height: 21,
        width: 21,
        borderRadius: 50,
        backgroundColor: '#C2C2C2',
        shadowColor: '#222222',
        shadowOffset: {height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    info_container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    info: {
        height: 17,
        width: 17,
    }
})