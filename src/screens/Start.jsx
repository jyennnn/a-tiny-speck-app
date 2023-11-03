import { useLayoutEffect, useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSpring,
} from "react-native-reanimated";

import TextSmall from "../common/TextSmall";
import TextUnderline from "../common/TextUnderline";
import Input from "../common/Input";
import Button from "../common/Button";

import useGlobal from "../core/global";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
});

const Start = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(1, { duration: 10000, easing: Easing.linear }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* BLANK PADDING */}
      <View
        style={{
          flex: 0.08,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      />

      {/* STARS */}
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          marginLeft: 60,
          marginRight: 60,
        }}
      >
        <View
          style={{
            postiion: "relative",
            top: -50,
          }}
        >
          <Animated.View style={animatedStyle}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>

        <View style={{}}>
          <Animated.View style={animatedStyle}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>

        <View
          style={{
            postiion: "relative",
            top: -50,
          }}
        >
          <Animated.View style={animatedStyle}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>

        <View
          style={{
            postiion: "relative",
            top: 50,
          }}
        >
          <Animated.View style={animatedStyle}>
            <AntDesign name="staro" size={18} color="#bdbdbd" />
          </Animated.View>
        </View>
      </View>

      {/* APP NAME */}
      <View
        style={{
          flex: 0.35,
          justifyContent: "center",
        }}
      >
        <TextSmall text="a tiny speck" color="#d0d0d0" size={28} />
        <TextSmall text="mindful yoga tracker" color="#5a5a5a" size={28} />
      </View>

      {/* BLANK PADDING */}
      <View style={{ flex: 0.12 }} />

      {/* LOG IN */}
      <View
        style={{
          flex: 0.15,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button title="log in" onPress={() => navigation.navigate('SignIn')} />
      </View>

      {/* CREATE ACCOUNT */}
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
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <TextUnderline text="or create account" color="#787878" size={15} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Start;
