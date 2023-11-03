import { StatusBar, TouchableOpacity } from "react-native"
import { useEffect, useLayoutEffect } from "react"
import { Animated, SafeAreaView, Text, View } from "react-native"
import { FontAwesome } from '@expo/vector-icons'; 
import Svg, { Line } from 'react-native-svg';
import { Feather } from "@expo/vector-icons";

import TextThin from "../common/TextThin";
import TextSmall from "../common/TextSmall";
import Title from "../common/Title"
import Button from "../common/Button";


const Share = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


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
            flex:0.12 , 
            width: '85%',
            flexDirection: 'row',
        }}>
            <View style={{
                    justifyContent:'center', 
                    alignItems: 'center'
            }}> 
                <TouchableOpacity   
                    onPress={() => navigation.navigate('Home')}
                >
                <FontAwesome name="moon-o" size={38} color={'#4d4d4d'} style={{ height: 50, width: 50 }} />
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'column',
                justifyContent:'center', 
                alignItems: 'center',
                paddingLeft: 2,
                paddingBottom: 12,
            }}>
                <TextSmall
                    text='a tiny speck'
                    color="#bfbfbf"
                    size={14}
                />

                <TextSmall
                    text='mindful yoga tracker'
                    color="#696969"
                    size={14}
                />
            </View>
        </View>

        <View style={{ 
            flex:0.2 , 
            width: '80%',
            flexDirection: 'row',
        }}>
            <View style={{
                    justifyContent:'center', 
                    alignItems: 'center',
                    position: 'relative',
                    bottom: 15,
                    
            }}>
                <TextSmall
                    text='DAY'
                    color="#bfbfbf"
                    size={14}
                />
            </View>

            <View style={{
                flexDirection: 'column',
                justifyContent:'center', 
                alignItems: 'flex-start',
                marginLeft: 20
            }}>
                <View style={{
                    position: 'relative',
                    left: -5
                }}>
                <TextThin 
                    text="67" 
                    color="#aaaaaa" 
                    size={100} 
                />
                </View>

                <View style={{
                    position: 'relative',
                    bottom: 25
                }}>
                <TextSmall
                    text='of my yoga journey,'
                    color="#696969"
                    size={18}
                />
                </View>
            </View>
        </View>

        <View style={{ flex:0.12 , width: '100%', position: 'relative', top: 15}}>
            <Svg>
                <Line x1="50" y1="0" x2="150" y2="0" stroke="#aaaaaa" strokeWidth="1" />
                <Line x1="150" y1="0" x2="150" y2="20" stroke="#aaaaaa" strokeWidth="0.5" />
                <Line x1="150" y1="20" x2="250" y2="20" stroke="#aaaaaa" strokeWidth="0.5" />
                <Line x1="250" y1="20" x2="250" y2="40" stroke="#aaaaaa" strokeWidth="0.5" />
                <Line x1="250" y1="40" x2="350" y2="40" stroke="#aaaaaa" strokeWidth="0.5" />
                <Line x1="350" y1="40" x2="350" y2="60" stroke="#aaaaaa" strokeWidth="0.5" />
            </Svg>
        </View>

        <View style={{ 
            flex:0.17 , 
            width: '80%',
            flexDirection: 'column',
            position: 'relative',
            top: -15
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TextThin 
                    text="155" 
                    color="#aaaaaa" 
                    size={70} 
                />
                <TextSmall
                    text='HOURS'
                    color="#696969"
                    size={15}
                />
                <TextThin 
                    text="26" 
                    color="#aaaaaa" 
                    size={70} 
                />
                <TextSmall
                    text='MINUTES'
                    color="#696969"
                    size={15}
                />
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextSmall
                    text='of mindfulness practice'
                    color="#696969"
                    size={18}
                />


            </View>

        </View>

        <View style={{ flex:0.07 , width: '80%'}}>
            <Svg>
                <Line x1="0" y1="15" x2="150" y2="15" stroke="#aaaaaa" strokeWidth="0.5" />
                <Line x1="140" y1="20" x2="300" y2="20" stroke="#aaaaaa" strokeWidth="0.5" />
            </Svg>
        </View>

        <View style={{ 
            flex:0.2 , 
            width: '80%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column' 

        }}>
            <View style={{
                height: 30, 
                width: 150,
                backgroundColor: '#33333352',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
            }}>
                <TextSmall
                    text={`today's reminder :`}
                    color="#696969"
                    size={14}
                />

            </View>


                <TextThin 
                    text="breathe" 
                    color="#aaaaaa" 
                    size={50} 
                />
        </View>

        <View style={{ 
            flex:0.12 , 
            width: '80%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'relative',
            bottom: 20
        }}>
            <TextSmall
                    text={`notes to self : `}
                    color="#696969"
                    size={14}
                />
            <TextSmall
                    text={` create positive vibes`}
                    color="#b4b4b4"
                    size={14}
                />

            <TouchableOpacity 
                style={{
                    position: 'relative', 
                    left: 50,
            }}>
                <Feather name="share-2" size={30} color="#313131" />
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default Share