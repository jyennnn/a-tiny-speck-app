import { StatusBar } from "react-native"
import { useState, useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Modal, Text, View, TouchableOpacity } from "react-native"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Input from "../../common/Input";
import TextSmall from "../../common/TextSmall"
import ChoiceButton from "../../common/ChoiceButton";
import useGlobal from "../../core/global";


const YogaReminder = ( {navigation}) => {

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false
      })
   }, [])

   const time = useGlobal(state => state.time)
   const word1 = useGlobal(state => state.word1)
   const word2 = useGlobal(state => state.word2)
   const word3 = useGlobal(state => state.word3)
   const generateRandom = useGlobal(state => state.generateRandom)
   const updateReminder = useGlobal(state => state.setReminder)

   const [modalVisible, setModalVisible] = useState(false);
   const [customiseWord, setCustomiseWord] = useState('')

   const formatTime = (time) => {
       const minutes = Math.floor(time / 60);
       const seconds = time % 60;
       const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
       const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
       return `${formattedMinutes}:${formattedSeconds}`;
   };


    const [music, setMusic] = useState(false) 

    const toggleMusic = () => {
      if (music === false) {
        setMusic(true)
      } else {
        setMusic(false)
      }
    };

    const setReminder = (word) => {
      updateReminder(word)
      navigation.navigate('YogaTime')
    }

    const setCustomisedReminder = () => {
      updateReminder(customiseWord)
      setModalVisible(false)
      navigation.navigate('YogaTime')
    }


  return (
    <SafeAreaView 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start', 
            backgroundColor: '#080808',
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

        <View style={{ flex: 0.14, alignItems: 'center', justifyContent:'center'}}>
          <TextSmall 
              text={`today's reminder`}
              color='#d0d0d0'
              size= {20}
              />
       </View>

       <View style={{ flex: 0.35, alignItems: 'flex-start', justifyContent:'flex-start'}}>
        <ChoiceButton 
                  title={word1} 
                  onPress={() => setReminder(word1)}
              />
        <ChoiceButton
                  title={word2} 
                  onPress={() => setReminder(word2)}
              />
        <ChoiceButton 
                  title={word3}   
                  onPress={() => setReminder(word3)}
              />
       </View>

       <View style={{ flex: 0.1, alignItems: 'center', justifyContent:'center', }}>
          <View style={{flex: 0.8, width: 220, alignItems: 'flex-end', justifyContent: 'flex-start', paddingTop: 10}}>
            <TouchableOpacity onPress={generateRandom}>
            <Ionicons name="refresh" size={30} color="#636363" />
            </TouchableOpacity>
          </View>
          
          <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity 
            style={{borderBottomColor: '#7d7d7d', borderBottomWidth: 0.5}}
            onPress={() => setModalVisible(true)}>
            <TextSmall 
              text='customise' 
              color='#7d7d7d'
              size= {13}
              />
          </TouchableOpacity>
          </View>

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

export default YogaReminder