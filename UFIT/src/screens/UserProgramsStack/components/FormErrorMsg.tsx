import React from 'react';
import { View, Text } from 'react-native';
//fieldState?.error
const FormErrorMsg = ({ fieldState }:any) => {
    return (        
        <Text style={{ fontSize: 20, color: 'red' }}>{fieldState.error.message}</Text>
    )
}


export default FormErrorMsg;