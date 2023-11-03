import { StatusBar } from "react-native"
import { useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Text, View } from "react-native"
import Title from "../common/Title"


import { AntDesign } from "@expo/vector-icons";


const Splash = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const translateY = new Animated.Value(0)
    const duration = 1000

    useEffect(() => {
        Animated.loop(
        Animated.sequence([
        Animated.timing(translateY, {
            toValue: -5, 
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

        Animated.loop(
            Animated.sequence([
            Animated.timing(translateYStar, {
                toValue: -5, 
                duration: durationStar, 
                useNativeDriver: true
            }),
            Animated.timing(translateYStar, {
                toValue: 0, 
                duration: durationStar, 
                useNativeDriver: true
            })
            ])
            ).start()

        const delay = setTimeout(() => {
            navigation.navigate('Splash2');
          }, 3000);
      
          // Clear the timeout when the component unmounts to prevent memory leaks
          return () => clearTimeout(delay);

    }, [])

    const translateYStar = new Animated.Value(0)
    const durationStar = 1500


  return (
    <SafeAreaView 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start', 
            backgroundColor: '#080808',
            width: '100%'
        }}>
        <StatusBar barStyle='light-content' />

        {/* STARS */}
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          width: '73%',
          marginTop: 65
        }}
      >
        <View
          style={{
            postiion: "relative",
            top: -50,
          }}
        >
          <Animated.View style={{transform: [{ translateY: translateYStar }] }}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>

        <View style={{}}>
          <Animated.View style={{transform: [{ translateY: translateYStar }] }}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>

        <View
          style={{
            postiion: "relative",
            top: -50,
          }}
        >
          <Animated.View style={{transform: [{ translateY: translateYStar }] }}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>

        <View
          style={{
            postiion: "relative",
            top: 50,
          }}
        >
          <Animated.View style={{transform: [{ translateY: translateYStar }] }}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>
      </View>

        {/* BLANK PADDING */}
        <View style={{flex: 0.15}}/>

         {/* APP NAME */}
        <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Animated.View style={{transform: [{ translateY }] }}>
            <Title text='a tiny speck' color='#A5A5A5'/>
        </Animated.View>
        </View>
    </SafeAreaView>
  )
}

export default Splash