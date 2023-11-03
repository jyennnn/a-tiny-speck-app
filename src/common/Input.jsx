
import { TextInput, View } from "react-native"

import TextMedium from "../common/TextMedium";


const Input = ({ title, value, error, setValue, setError, secureTextEntry=false }) => {
    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
            <TextMedium 
                text={ error ? `${title}   ${error}` : title}
                color={error ? '#e16161' : '#d0d0d0'}
                size={11}
                />
            <TextInput 
                autoCapitalize="none"
                autoComplete="off"
                secureTextEntry={secureTextEntry}
                style={{
                    borderBottomWidth: 1.5, 
                    borderColor: error ? '#e16161' : '#484848',
                    borderStyle: 'solid',  
                    height: 52,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    width: '100%',
                    marginBottom: 35,
                    color: '#d0d0d0'
                }}
                value={value}
                onChangeText={text =>{
                    setValue(text)
                    if (error) {
                        setError('')
                    }
                }}
            />
        </View>
    )
}

export default Input