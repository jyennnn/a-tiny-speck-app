import { StatusBar } from "react-native"
import { useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Text, View } from "react-native"
import Title from "../common/Title"


import { AntDesign } from "@expo/vector-icons";
import useGlobal from "../core/global";


const Splash2 = ({ navigation }) => {

    const init = useGlobal((state) => state.init)

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

          Animated.sequence([
            Animated.timing(moveLeft, {
                toValue: 0, 
                duration: durationML, 
                useNativeDriver: true
            })
            ]).start()

            Animated.sequence([
              Animated.timing(moveRight, {
                  toValue: 0, 
                  duration: durationMR, 
                  useNativeDriver: true
              })
              ]).start()

              setTimeout(() => {
                Animated.timing(opacity, {
                  toValue: 1, // Animate opacity to 1 (fully visible)
                  duration: 1000, // Adjust the duration as needed
                  useNativeDriver: true, // Use the native driver for performance
                }).start();

                setTimeout(() => {
                  init()
                }, 2000);

              }, 1000);

    }, [])

    const translateYStar = new Animated.Value(0)
    const durationStar = 1500


    const moveLeft = new Animated.Value(78)
    const durationML = 1500

    const moveRight = new Animated.Value(-75)
    const durationMR = 1500

    const opacity = new Animated.Value(0);

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
        <View style={{flex: 0.1, justifyContent: 'center', flexDirection: 'row', position: 'relative', top: 16}}>
        <Animated.View style={{transform: [{ translateX: moveLeft }] }}>
            <Title text='a tiny ' color='#A5A5A5'/>
        </Animated.View>
        <Animated.View style={{ opacity }}>
            <Title text='but mighty ' color='#4d4d4d'/>
        </Animated.View>
        <Animated.View style={{transform: [{  translateX: moveRight }], position: 'relative', left: -5 }}>
            <Title text=' speck' color='#A5A5A5'/>
        </Animated.View>
        </View>
    </SafeAreaView>
  )
}


export default Splash2