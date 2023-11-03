import { useFonts, Poppins_100Thin } from '@expo-google-fonts/poppins';
import { Text } from "react-native"

const TextThin = ({text, color, size}) => {
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        });

    if (!fontsLoaded) {
        return null; // You may choose to render a loading screen here.
        }

  return (
    <Text
        style={{
            textAlign: 'center',
            fontSize: size,
            fontFamily: 'Poppins_100Thin',
            color: color
        }}
    >
        {text}
   </Text>
  )
}

export default TextThin