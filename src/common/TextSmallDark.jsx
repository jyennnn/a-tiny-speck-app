import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Text } from "react-native"

const TextSmallDark = ({text, color}) => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        });

    if (!fontsLoaded) {
        return null; // You may choose to render a loading screen here.
        }

  return (
    <Text
        style={{
            textAlign: 'center',
            fontSize: 13,
            fontFamily: 'Poppins_400Regular',
            color: color
        }}
    >
        {text}
   </Text>
  )
}

export default TextSmallDark