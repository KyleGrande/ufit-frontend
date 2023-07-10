import React from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import {creatingStyles} from '../../style';

export default function ProgramCreate() {
    const [text, onChangeText] = React.useState('Placeholder Text');
    const [number, onChangeNumber] = React.useState('');
    return (
        <View style={creatingStyles.viewContainer}>
            <View style = {{paddingLeft:15}}>
                <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>
                    Create A Program
                </Text>

                <SafeAreaView>
                    <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>
                        Name:
                    </Text>
                    <TextInput
                        style={{
                            height: 40,
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            color: 'white',
                            borderColor: 'white'
                          }}
                        onChangeText={onChangeText}
                        value={text}
                    />
                    <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>
                        Description:
                    </Text>
                    <TextInput
                        style={{
                            height: 40,
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            color: 'white',
                            borderColor: 'white'
                          }}
                        onChangeText={onChangeNumber}
                        value={number}                                                
                    />
                </SafeAreaView>
            </View>
        </View>
    );
}

