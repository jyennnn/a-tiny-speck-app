import { StatusBar } from "react-native"
import { useState, useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Text, View, TouchableOpacity} from "react-native"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


import TextSmall from "../../common/TextSmall"
import useGlobal from "../../core/global";

const YogaQuote = ({ navigation }) => {

    const time = useGlobal(state => state.time)

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        // Delay the navigation to "YogaReminder" after 3 seconds
        const delay = setTimeout(() => {
          navigation.navigate('YogaReminder');
        }, 1000);
    
        // Clear the timeout when the component unmounts to prevent memory leaks
        return () => clearTimeout(delay);
      }, []);

    const [music, setMusic] = useState(false) 

    const toggleMusic = () => {
      if (music === false) {
        setMusic(true)

      } else {
        setMusic(false)
      }
    };

   

  return (
    <SafeAreaView 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start', 
            backgroundColor: '#080808'
        }}>
        <StatusBar barStyle='light-content' />

        <View style={{ 
            flex: 0.15, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '70%', 
        }}>
        <TextSmall 
            text={formatTime(time)} 
            color='#d0d0d0'
            size= {20}
            />
         <TouchableOpacity
            onPress={toggleMusic}
            style={{
            // position: 'absolute',
            // top: 73,
            // right: 28,
            // padding: 10,
            }}
        >
            {music ? (
            <SimpleLineIcons name="music-tone-alt" size={23} color="#A1A1A1" />
            ) : (
            <MaterialCommunityIcons name="music-note-off-outline" size={25} color="#A1A1A1" />
            )}
        </TouchableOpacity>
        
       </View>

        <View style={{ flex: 0.7, alignItems: 'center', justifyContent:'center'}}>
        <TextSmall 
            text='amazing' 
            color='#d0d0d0'
            size= {20}
            />
       </View>

    </SafeAreaView>
  )
}

export default YogaQuote