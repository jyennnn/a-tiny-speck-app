import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Text } from "react-native"

const TextSmall = ({text, color, size}) => {
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
        }}
    >
        {text}
   </Text>
  )
}

export default TextSmall