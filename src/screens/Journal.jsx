import { SafeAreaView, Text, View, TouchableOpacity } from "react-native"
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import TextSmall from "../common/TextSmall";
import TextSmallDark from "../common/TextSmallDark";
import TextThin from "../common/TextThin";
import TextUnderline from "../common/TextUnderline";


const Journal = () => {

    const writeJournal = () => {
        console.log('write')
    }

  return (
    <SafeAreaView style={{ flex: 1}}>
       <View style={{ paddingTop: 40}}>
        <TextSmall 
            text='fill your paper with breathings of your heart.' 
            color='#d0d0d0'
            />
       </View>

       <View style={{
            marginTop: 30,
            flex: 0.36, 
            paddingLeft: 30, 
            paddingRight: 30,
        }}>
            <View style={{
                height: 68, 
                flexDirection: 'row', 
                marginTop: 10,
                borderWidth: 1, 
                borderRadius: 10,
                borderColor: '#484848',
                borderStyle: 'solid',   
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 16,
                paddingBottom: 16,
            }}>
                <Entypo name="emoji-happy" size={30} color="#414141" />
                <View style={{flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, marginTop: -2}}>
                    <TextSmall 
                        text='10th October 2023'
                        color='#d0d0d0'
                        size= {13}
                        />

                    <TextSmallDark 
                                text='note to self: create positive vibes'
                                color='#525252'
                                />
                </View>
            </View>

            <View style={{
                height: 68, 
                flexDirection: 'row', 
                marginTop: 10,
                borderWidth: 1, 
                borderRadius: 10,
                borderColor: '#484848',
                borderStyle: 'solid',   
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 16,
                paddingBottom: 16,
            }}>
                <Entypo name="emoji-neutral" size={30} color="#414141" />
                <View style={{flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, marginTop: -2}}>
                    <TextSmall 
                        text='27th September 2023'
                        color='#d0d0d0'
                        size= {13}
                        />

                    <TextSmallDark 
                                text='note to self: go at your own pace'
                                color='#525252'
                                />
                </View>
            </View>

            <View style={{
                height: 68, 
                flexDirection: 'row', 
                marginTop: 10,
                borderWidth: 1, 
                borderRadius: 10,
                borderColor: '#484848',
                borderStyle: 'solid',   
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 16,
                paddingBottom: 16,
            }}>
                <Entypo name="emoji-sad" size={30} color="#414141" />

                <View style={{flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, marginTop: -2}}>
                    <TextSmall 
                        text='25th September 2023'
                        color='#d0d0d0'
                        size= {13}
                        />

                    <TextSmallDark 
                                text='note to self: you are good enough'
                                color='#525252'
                                />
                </View>
            </View>
       </View>

       <View style={{
            flex: 0.4, 
            paddingTop: 20,
            paddingLeft: 60, 
            paddingRight: 60, 
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>

       </View>
        
       <View style={{
            flex: 0.15, 
            paddingTop: 20,
            paddingLeft: 60, 
            paddingRight: 60, 
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableOpacity 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 25,
                    paddingHorizontal: 38,
                    borderRadius: 4,
                    elevation: 3,
                    borderWidth: 1, 
                    borderRadius: 40,
                    borderColor: '#5e5e5e',
                    borderStyle: 'solid',   
                }}
                onPress={writeJournal}>
                <TextSmall 
                    text='write my thoughts'
                    color='#d0d0d0'
                    size={17}
                    />
            </TouchableOpacity>
       </View>

    </SafeAreaView>
  )
}

export default Journal