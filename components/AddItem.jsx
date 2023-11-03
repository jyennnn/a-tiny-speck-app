// import React from 'react'
// import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { useState } from 'react';


// const AddItem = ({ addItem }) => {
//     const [text, setText] = useState('')

//     const onChange = (textValue) => setText(textValue)

//   return (
//     <View>
//         <TextInput 
//             placeholder="Add Item..." 
//             style={styles.input}
//             onChangeText={onChange}
//         />
//         <TouchableOpacity style={styles.btn} onPress={() => addItem(text)}>
//             <Text style={styles.btnText}>Add Item</Text>
//             <AntDesign name="plus" size={24} color="black" />
//         </TouchableOpacity>
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//     input: {
//         height: 60,
//         padding: 8,
//         fontSize: 16,
//     },
//     btn: {
//         backgroundColor: '#c2bad8',
//         padding: 9,
//         margin: 5, 
//     },
//     btnText: {
//         color: 'darkslateblue',
//         fontSize: 20, 
//         textAlign: 'center',
//     }
// });


// export default AddItem


