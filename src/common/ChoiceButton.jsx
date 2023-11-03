
import { TouchableOpacity } from "react-native"

import TextSmall from "./TextSmall";

const ChoiceButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center', 
                    marginTop: 25,
                    width: 250, 
                    paddingVertical: 20,
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

export default ChoiceButton