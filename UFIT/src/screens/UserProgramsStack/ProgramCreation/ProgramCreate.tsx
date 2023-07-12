import React, {useState} from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import {creatingStyles} from '../../style';
import {Picker} from '@react-native-picker/picker';

export default function ProgramCreate() {
    const [text, onChangeText] = React.useState('Placeholder Text');
    const [number, onChangeNumber] = React.useState('Placeholder Text');
    const [selectedLanguage, setSelectedLanguage] = useState(['java','js']);

    return (
        <View style={creatingStyles.viewContainer}>
            <View style = {{paddingLeft:15}}>
                
                
                <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>
                    Create A Program
                </Text>

                <SafeAreaView style={{marginTop:40}}>
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
                    <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>
                        Category:
                    </Text>
                    <Picker
                        style = {{color:'white'}}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue:any) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item style={{color:'white'}} label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                </SafeAreaView>
                
            </View>
        </View>
    );
}

