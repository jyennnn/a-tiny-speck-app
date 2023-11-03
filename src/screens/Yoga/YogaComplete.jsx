import { StatusBar } from "react-native"
import { useState, useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Text, View, TouchableOpacity, Modal } from "react-native"
import axios from 'axios'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import Input from "../../common/Input";
import TextSmall from "../../common/TextSmall"
import useGlobal from "../../core/global";
import Button from "../../common/Button";

const YogaComplete = ({ navigation }) => {

    const stopTimer = useGlobal(state => state.stopTimer)
    const clearTimer = useGlobal(state => state.clearTimer)
    const time = useGlobal(state => state.time)
    const userId = useGlobal(state => state.userId)
    const reminder = useGlobal(state => state.reminder)
    const resetReminder = useGlobal(state => state.resetReminder)
    const updateReminder = useGlobal(state => state.setReminder)


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return {
            mmss: `${formattedMinutes}:${formattedSeconds}`,
            minutes: formattedMinutes,
            seconds: formattedSeconds,
          };
    };

    const { mmss, minutes, seconds } = formatTime(time);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    const [music, setMusic] = useState(false) 

    const [modalVisible, setModalVisible] = useState(false);
    const [customiseWord, setCustomiseWord] = useState('')


    const toggleMusic = () => {
      if (music === false) {
        setMusic(true)

      } else {
        setMusic(false)
      }
    };

    const setCustomisedReminder = () => {
        updateReminder(customiseWord)
        setModalVisible(false)
        navigation.navigate('YogaComplete')
      }

    const createYogaLog = async () => {
        const url = 'http://127.0.0.1:8000/api/yogalogs/logYogaPractice/';
    
        try {
            const data = {
                user: userId,
                reminder: reminder,
                time: time,
                completedAt: new Date()              
            };

            const response = await axios.post(url, data);

            console.log(response)
            clearTimer()
            resetReminder()
            navigation.navigate('Home')
            
            
        } catch (error) {
            console.error('Axios error:', error);
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
            text={mmss} 
            color='#d0d0d0'
            size= {20}
            />
         <TouchableOpacity
            onPress={clearTimer}
            style={{
            }}
        >
            {music ? (
            <SimpleLineIcons name="music-tone-alt" size={23} color="#A1A1A1" />
            ) : (
            <MaterialCommunityIcons name="music-note-off-outline" size={25} color="#A1A1A1" />
            )}
        </TouchableOpacity>
        
       </View>

        <View style={{ flex: 0.1, width: '100%', alignItems: 'center', justifyContent:'center'}}>

        </View>

        <View style={{ flex: 0.2, width: '100%', alignItems: 'center', justifyContent:'center'}}>
                <TextSmall 
                    text={`today's reminder`}
                    color='#969696'
                    size= {20}
                    />

                <TextSmall 
                    text={reminder}
                    color='#d0d0d0'
                    size= {35}
                    />
                <TouchableOpacity 
                style={{borderColor: '#8a8a8a', borderBottomWidth: 1, paddingTop:20}}
                onPress={() => setModalVisible(true)}
                >
                <TextSmall 
                    text='edit' 
                    color='#8a8a8a'
                    size= {13}
                    />
                </TouchableOpacity>
        </View>

        <View style={{ flex: 0.28, width: '60%', alignItems: 'center', justifyContent:'center'}}>
            <TextSmall 
                    text=
                    {`incredible, you have completed`}
                    color='#8a8a8a'
                    size= {13}
                />
            <TextSmall 
                    text=
                    {`${minutes} minutes ${seconds} seconds`}
                    color='#bbbbbb'
                    size= {15}
                />
            <TextSmall 
                    text=
                    {`of yoga practice today`}
                    color='#8a8a8a'
                    size= {13}
                />
        </View>

        <View style={{
            flex: 0.15,
            marginLeft: 80,
            marginRight: 80,
        }}>
            <Button 
                title='return home'  
                // onPress={endYoga}
                onPress={() => createYogaLog()}
            />
        </View>

        <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
      >
      <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
        }}>
        <View 
          style={{
            margin: 20,
            backgroundColor: '#1a1a1aeb',
            borderRadius: 20,
            // borderColor: '#434242',
            // borderWidth: 1,
            height: 200,
            width: '60%',
            paddingTop: 20,
            alignItems: 'center',
            justifyContent: 'even',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <TextSmall 
            text='set your own text' 
            color='#d0d0d0'
            size= {15}
            />

          <Input 
            value={customiseWord}
            setValue={setCustomiseWord}
          /> 
          <TouchableOpacity
            style={{
              borderWidth: 1, 
              padding: 15,
              borderRadius: 20,
              backgroundColor: '#2d2d2d42', 
              borderColor:'#0a0a0abb', 

            }}
            onPress={setCustomisedReminder}>
              <TextSmall 
              text='confirm' 
              color='#afafaf'
              size= {15}
              />
          </TouchableOpacity>   
        </View>
        </View>
      </Modal>


    </SafeAreaView>
  )
}

export default YogaComplete