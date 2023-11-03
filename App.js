import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./src/screens/Start";
import Splash from "./src/screens/Splash";
import SignIn from "./src/screens/SignIn";
import Main from "./src/screens/Main";
import CreateAccount from "./src/screens/CreateAccount";
import YogaQuote from "./src/screens/Yoga/YogaQuote";
import YogaReminder from "./src/screens/Yoga/YogaReminder";
import YogaTime from "./src/screens/Yoga/YogaTime";
import YogaComplete from "./src/screens/Yoga/YogaComplete";

import useGlobal from "./src/core/global";
import Share from "./src/screens/Share";
import Splash2 from "./src/screens/Splash2";

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#080808",
  },
};

const Stack = createNativeStackNavigator();

const App = () => {

  const initialized = useGlobal((state) => state.initialized);
  const authenticated = useGlobal((state) => state.authenticated);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          {!initialized ? (
            <>
              <Stack.Screen name="Splash" component={Splash} options={{ animation: "fade" }}/>
              <Stack.Screen name="Splash2" component={Splash2} options={{ animation: "fade" }}/>
            </>
          ) : !authenticated ? (
            <>
              <Stack.Screen name="Start" component={Start} options={{ animation: "fade" }}/>
              <Stack.Screen name="SignIn" component={SignIn} options={{ animation: "fade" }}/>
              <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ animation: "fade" }}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen
                name="YogaQuote"
                component={YogaQuote}
                options={{ animation: "fade" }}
              />
              <Stack.Screen
                name="YogaReminder"
                component={YogaReminder}
                options={{ animation: "fade" }}
              />
              <Stack.Screen
                name="YogaTime"
                component={YogaTime}
                options={{ animation: "fade" }}
              />
              <Stack.Screen
                name="YogaComplete"
                component={YogaComplete}
                options={{ animation: "fade" }}
              />
              <Stack.Screen
                name="Share"
                component={Share}
                options={{ animation: "fade" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default App;
