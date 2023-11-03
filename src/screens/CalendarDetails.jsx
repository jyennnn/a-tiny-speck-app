import { StatusBar, TouchableOpacity } from "react-native"
import { useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Text, View } from "react-native"
import {Calendar} from 'react-native-calendars';

import Title from "../common/Title"
import Button from "../common/Button";


const CalendarDetails = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const translateY = new Animated.Value(0)
    const duration = 800

    useEffect(() => {
        Animated.loop(
        Animated.sequence([
        Animated.timing(translateY, {
            toValue: -20, 
            duration: duration, 
            useNativeDriver: true
        }),
        Animated.timing(translateY, {
            toValue: 0, 
            duration: duration, 
            useNativeDriver: true
        })
        ])
        ).start()
    }, [])

    const goBack = () => {
        navigation.navigate('Home')
    }


  return (

    <SafeAreaView 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: '#080808',
            
        }}>
        <StatusBar barStyle='light-content' />
        <View style={{ flex:0.1 , backgroundColor: 'pink', width: '100%'}}>
            <TouchableOpacity onPress={goBack}>
            <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex:0.9 , backgroundColor: 'yellow', width: '100%'}}>
        <Calendar
            // Customize the appearance of the calendar
            style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 350
            }}
            // Specify the current date
            current={'2012-03-01'}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
                console.log('selected day', day);
            }}
            // Mark specific dates as marked
            markedDates={{
                '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
                '2012-03-02': {marked: true},
                '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
            }}
            />
        </View>
    </SafeAreaView>
  )
}

export default CalendarDetails