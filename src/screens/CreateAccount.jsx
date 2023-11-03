import { useLayoutEffect, useState } from "react"
import { KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Keyboard } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import TextSmall from "../common/TextSmall";
import TextMedium from "../common/TextMedium";
import TextUnderline from "../common/TextUnderline";
import Input from "../common/Input";
import Button from "../common/Button";
import useGlobal from "../core/global";




const CreateAccount = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [emailError, setEmailError] = useState('')
    const [password1Error, setPassword1Error] = useState('')
    const [password2Error, setPassword2Error] = useState('')

    const login = useGlobal((state) => state.login);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const goLogIn = () => {
        navigation.goBack()
    }

    const createAcc = () => {
        console.log(`create ${email} ${password1} ${password2}`)

        // Check Email 
        if (!email) {
            setEmailError('this field is required')
        }

        // Check Password1 
        if (!password1) {
            setPassword1Error('this field is required')
        } 
        if (password1.length < 8 ){
            setPassword1Error('password is too short')
        }

        // Check Password1 
        if (!password2) {
            setPassword2Error('this field is required')
        }
        if ( password2 !== password1 ){ 
            setPassword2Error('passwords don\'t match')
        }

        // Break out if there were any issues 
        if ( !email || !password1 || password1.length < 8 || !password2 || password2 !== password1) {
            return
        }

        // Make register request 
       
        const makeRegisterRequest = async () => {
          const url = "http://127.0.0.1:8000/api/users/register/";
      
          try {
            const data = {
             name: email,
              email: email,
              password: password2,
            };

            console.log(data, 'data to send')
      
            const response = await axios.post(url, data);
            console.log('response', response)
            const userId = response.data._id;
            const token = response.data.token;
            // Assuming the token is in the response data (e.g., response.data.token)
            if (token !== null) {
              // Save the token securely using SecureStore
              await SecureStore.setItemAsync("authToken", token);
              console.log("Token saved:", token);
              // Navigate to the home page
              login(userId);
              navigation.navigate("Main");
            } else {
              // Show an error
              console.error("Token is null. Authentication failed.");
            }
          } catch (error) {
            console.error("Axios error:", error);
          }
        };

        makeRegisterRequest()
    }

  return (
    <TouchableWithoutFeedback 
    onPress={Keyboard.dismiss}>
    <SafeAreaView style={{flex: 1}}>
        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20}}>
            <TouchableOpacity 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderRadius: 4,
                    elevation: 3,
                    borderWidth: 1, 
                    borderRadius: 15,
                    borderColor: '#5e5e5e',
                    borderStyle: 'solid',   
                    backgroundColor: '#2727275f'
                }}
                onPress={() => navigation.navigate('Start')}>
                <AntDesign name="left" size={15} color="#7c7c7c" />
            </TouchableOpacity>
        </View>
        
        <View style={{flex: 0.16, justifyContent:'center', alignItems: 'center'}}>
             <TextSmall 
                text='create account'
                color='#d0d0d0'
                size={25}
                />
        </View>

        <View style={{ flex: 0.32}}>
                <View style={{ 
                        marginTop: 30,
                        marginLeft: 25, 
                        marginRight: 25, 
                        flexDirection: 'column', 
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                    <Input 
                        title='E-MAIL'
                        value={email}
                        error={emailError}
                        setValue={setEmail}
                        setError={setEmailError} 
                    />

                    <Input 
                        title='PASSWORD'
                        value={password1}
                        error={password1Error}
                        setValue={setPassword1}
                        setError={setPassword1Error}
                        secureTextEntry={true}
                    />

                    <Input 
                        title='RE-TYPE PASSWORD'
                        value={password2}
                        error={password2Error}
                        setValue={setPassword2}
                        setError={setPassword2Error} 
                        secureTextEntry={true}
                    />
                </View>
        </View>

        <View style={{flex: 0.12}}>
        </View>

        <View style={{
            flex: 0.15,
            marginLeft: 90,
            marginRight: 90,
        }}>
            <Button 
                title='create' 
                onPress={createAcc}
            />
        </View>

        <View style={{
            marginTop: 20,
            marginLeft: 70,
            marginRight: 70,
        }}>
            <TouchableOpacity 
                style={{
                    alignItems: 'flex-end'
                }}
                onPress={goLogIn}>
                    <TextUnderline 
                        text='or log in'
                        color='#787878'
                        size= {15}
                     />
            </TouchableOpacity>
        </View>

    
    </SafeAreaView>
   </TouchableWithoutFeedback>
  )
}

export default CreateAccount