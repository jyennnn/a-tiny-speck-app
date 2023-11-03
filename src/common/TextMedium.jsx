import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Text } from "react-native"

const TextMedium = ({text, color, size}) => {
    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        });

    if (!fontsLoaded) {
        return null; // You may choose to render a loading screen here.
        }

  return (
    <Text
        style={{
            textAlign: 'center',
            fontSize: size,
            fontFamily: 'Poppins_500Medium',
            color: color
        }}
    >
        {text}
   </Text>
  )
}

export default TextMedium