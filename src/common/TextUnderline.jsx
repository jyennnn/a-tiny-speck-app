import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Text } from "react-native"

const TextUnderline = ({text, color, size}) => {
    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        });

    if (!fontsLoaded) {
        return null; // You may choose to render a loading screen here.
        }

  return (
    <Text
        style={{
            textAlign: 'center',
            fontSize: size,
            fontFamily: 'Poppins_300Light',
            color: color,
            textDecorationLine: 'underline'
        }}
    >
        {text}
   </Text>
  )
}

export default TextUnderline