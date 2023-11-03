import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import useGlobal from "../core/global";
import TextHeader1 from "../common/TextHeader1"
import TextSmall from "../common/TextSmall";
import TextSmallDark from "../common/TextSmallDark";

const Settings = () => {

    const logout = useGlobal(state => state.logout)

  return (    
  <SafeAreaView style={{ flex: 1}}>
        <View style={{ paddingTop: 40}}>
        <TextHeader1 
            text='Settings' 
            color='#A5A5A5'
            />
       </View>

       <View style={{
                flex: 0.7,
                marginLeft: 80,
                marginRight: 80,
                marginTop: 40,
       }}>
            <View style={{
                height: 60, 
                flexDirection: 'row', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderWidth: 1, 
                borderRadius: 50,
                borderColor: '#686868',
                borderStyle: 'solid',   
                marginBottom: 20,
                    }}>
                    <MaterialIcons name="account-circle" size={30} color="#414141" style={{paddingRight: 15, marginLeft: 60}} />
                        <TextSmall 
                            text='My Account'
                            color='#d0d0d0'
                            size= {14}
                            />
            </View>

            <View style={{
                height: 60, 
                flexDirection: 'row', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderWidth: 1, 
                borderRadius: 50,
                borderColor: '#686868',
                borderStyle: 'solid',  
                marginBottom: 20, 
                    }}>
                    <MaterialCommunityIcons name="yoga" size={30} color="#414141" style={{paddingRight: 15, marginLeft: 60}} />
                        <TextSmall 
                            text='Yoga'
                            color='#d0d0d0'
                            size= {14}
                            />
            </View>

            <View style={{
                height: 60, 
                flexDirection: 'row', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderWidth: 1, 
                borderRadius: 50,
                borderColor: '#686868',
                borderStyle: 'solid',  
                marginBottom: 20, 
                    }}>
                    <SimpleLineIcons name="pencil" size={28} color="#414141" style={{paddingRight: 15, marginLeft: 60}} />
                        <TextSmall 
                            text='Journal'
                            color='#d0d0d0'
                            size= {14}
                            />
            </View>

            <View style={{
                height: 60, 
                flexDirection: 'row', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderWidth: 1, 
                borderRadius: 50,
                borderColor: '#686868',
                borderStyle: 'solid',  
                marginBottom: 20, 
                    }}>
                    <MaterialCommunityIcons name="ipod" size={30} color="#414141" style={{paddingRight: 15, marginLeft: 60}} />
                        <TextSmall 
                            text='Set Music'
                            color='#d0d0d0'
                            size= {14}
                            />
            </View>
            
            <TouchableOpacity
                onPress={logout}>
            <View style={{
                height: 60, 
                flexDirection: 'row', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderWidth: 1, 
                borderRadius: 50,
                borderColor: '#686868',
                borderStyle: 'solid',  
                marginBottom: 20, 
                    }}>
                    <MaterialCommunityIcons name="door" size={30} color="#414141" style={{paddingRight: 15, marginLeft: 60}} />
                
                        <TextSmall 
                            text='Logout'
                            color='#d0d0d0'
                            size= {14}
                            />
            </View>
            </TouchableOpacity>
                
            

       </View>
    </SafeAreaView>
  )
}

export default Settings