
import { TouchableOpacity } from "react-native"

import TextSmall from "../common/TextSmall";

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center', 
                    width: 280,
                    // marginTop: 50,
                    paddingVertical: 25,
                    paddingHorizontal: 38,
                    borderRadius: 4,
                    borderWidth: 1, 
                    borderRadius: 40,
                    borderColor: '#5e5e5e',
                    borderStyle: 'solid',   
                }}
                onPress={onPress}
        >
            <TextSmall 
                    text={title}
                    color='#d0d0d0'
                    size={17}
                    />
        </TouchableOpacity>
    )
}

export default Button