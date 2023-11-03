import { useLayoutEffect, useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import TextSmall from "../common/TextSmall";
import TextMedium from "../common/TextMedium";
import TextUnderline from "../common/TextUnderline";
import Input from "../common/Input";
import Button from "../common/Button";
// import api from "../core/api";

import useGlobal from "../core/global";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = useGlobal((state) => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [onSignIn]);

  const makeSignInRequest = async () => {
    const url = "http://127.0.0.1:8000/api/users/login/";

    try {
      const data = {
        username: email,
        password: password,
      };

      const response = await axios.post(url, data);
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

  const goBack = () => {
    console.log("go back");
  };

  const onSignIn = () => {
    console.log("signin", email, password);

    // Check Email
    if (!email) {
      setEmailError("this field is required");
    }

    // Check Password
    if (!password) {
      setPasswordError("this field is required");
    }

    // Break out if there were any issues
    if (!email || !password) {
      return;
    }

    makeSignInRequest();
  };

  const createAcc = () => {
    console.log("create");
    navigation.navigate("CreateAccount");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.1,
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 4,
              elevation: 3,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: "#5e5e5e",
              borderStyle: "solid",
              backgroundColor: "#2727275f",
            }}
            onPress={() => navigation.navigate('Start')}
          >
            <AntDesign name="left" size={15} color="#7c7c7c" />
          </TouchableOpacity>
        </View>

        <View
          style={{ flex: 0.16, justifyContent: "center", alignItems: "center" }}
        >
          <TextSmall text="log in" color="#d0d0d0" size={25} />
        </View>

        <View style={{ flex: 0.32 }}>
          <View
            style={{
              marginTop: 30,
              marginLeft: 25,
              marginRight: 25,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Input
              title="E-MAIL"
              value={email}
              error={emailError}
              setValue={setEmail}
              setError={setEmailError}
            />

            <Input
              title="PASSWORD"
              value={password}
              error={passwordError}
              setValue={setPassword}
              setError={setPasswordError}
              secureTextEntry={true}
            />

            <TextSmall text="I forgot my password" color="#8b8b8b" size={13} />
          </View>
        </View>

        <View style={{ flex: 0.12 }}></View>

        <View
          style={{
            flex: 0.15,
            marginLeft: 90,
            marginRight: 90,
          }}
        >
          <Button title="continue" onPress={onSignIn} />
        </View>

        <View
          style={{
            marginTop: 20,
            marginLeft: 70,
            marginRight: 70,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
            }}
            onPress={createAcc}
          >
            <TextUnderline text="or create account" color="#787878" size={15} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
