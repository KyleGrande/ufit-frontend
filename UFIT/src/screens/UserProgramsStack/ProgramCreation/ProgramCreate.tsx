import React, {useState} from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import {creatingStyles} from '../../style';
import {Picker} from '@react-native-picker/picker';

// TODO:
// Add styling to style sheet file

export default function ProgramCreate() {
    const [text, onChangeText] = React.useState('Placeholder Text');
    const [number, onChangeNumber] = React.useState('Placeholder Text');
    const [selectedProgram, setSelectedProgram] = useState(['strength','yoga']);

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
                        selectedValue={selectedProgram}
                        onValueChange={(itemValue:any) =>
                            setSelectedProgram(itemValue)
                        }
                        itemStyle = {{color: "white", fontSize: 40}}
                        >
                        <Picker.Item label="Strength" value="strength" />
                        <Picker.Item label="Yoga" value="yoga" />
                    </Picker>

                </SafeAreaView>
                    {/* Add session button --> new page pop up --> 
                        1. Persist data of this page in Object, 
                        2. Open new session form page
                    */}
            </View>
        </View>
    );
}

