import { StatusBar, SafeAreaView, Text, View, TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';


import Settings from "./Settings";
import Journal from "./Journal";
import Home from "./Home";
import FullCalendar from "./FullCalendar";

const Tab = createMaterialTopTabNavigator();

const Main = ({ navigation }) => {
  
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const [sound, setSound] = useState();

    async function playSound() {

      if (music === false) {
        setMusic(true)

      } else {
        setMusic(false)
      }

      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync( require('../assets/Music-1.mp3')
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    }
  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  

    const insets = useSafeAreaInsets()
    const [music, setMusic] = useState(false) 

    const toggleMusic = () => {
      if (music === false) {
        setMusic(true)

      } else {
        setMusic(false)
      }
    };


  return (
    <>
    <View 
        style={{
            flex: 1,
            backgroundColor: '#080808'
        }}>
    <StatusBar barStyle='light-content' />
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#333333',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: {
              backgroundColor: '#080808',
              marginTop: insets.top,
              height: 70,
              justifyContent: 'center'
            },
            tabBarShowLabel: false,
            tabBarShowIcon: true,
            tabBarIndicatorStyle: {
              display: 'none',
            },
          }}
    >
        <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size, focused }) => {
                const iconColor = focused ? '#333333' : '#A1A1A1';
                return (
                  <View style={{ position: 'relative', left: -10, alignItems: 'center' }}>
                    <FontAwesome name="moon-o" size={28} color={iconColor} style={{ height: 50, width: 50 }} />
                  </View>
                )},
            }}
        />

        <Tab.Screen 
            name="Journal" 
            component={Journal} 
            options={{ 
              tabBarLabel: 'Journal',
              tabBarIcon: ({ color, size, focused }) => {
                const iconColor = focused ? '#333333' : '#A1A1A1';
                return (
                  <View style={{ position: 'relative', left: 50, alignItems: 'center' }}>
                    <Ionicons name="cloudy-outline" size={28} color={iconColor} style={{ height: 50, width: 50 }} />
                  </View>
                )},
            }}
        />

        <Tab.Screen 
            name="Settings" 
            component={Settings} 
            options={{ 
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size, focused }) => {
                const iconColor = focused ? '#333333' : '#A1A1A1';
                return (
                  <View style={{ position: 'relative', left: -25, alignItems: 'center' }}>
                    <Ionicons name="leaf-outline" size={26} color={iconColor} style={{ height: 50, width: 50 }} />
                  </View>
                )},
            }}
        />


    </Tab.Navigator>
    <TouchableOpacity
      onPress={playSound}
      style={{
        position: 'absolute',
        top: 73,
        right: 28,
        padding: 10,
      }}
    >
      {music ? (
        <SimpleLineIcons name="music-tone-alt" size={23} color="#A1A1A1" />
      ) : (
        <MaterialCommunityIcons name="music-note-off-outline" size={25} color="#A1A1A1" />
      )}
    </TouchableOpacity>

    </View>
    </>
  )
}

export default Main


