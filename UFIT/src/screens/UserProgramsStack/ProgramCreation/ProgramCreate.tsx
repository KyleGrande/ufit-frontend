import React, {useState} from "react";
import { Text, View, Button, SafeAreaView, TextInput, ScrollView } from "react-native";
import {creatingStyles} from '../../style';
import {Picker} from '@react-native-picker/picker';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../UserPrograms';
// TODO:
// Add styling to style sheet file
type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramCreate({ navigation }: ProgramsMainScreenProps) {
    const [text, onChangeText] = React.useState('Placeholder Text');
    const [number, onChangeNumber] = React.useState('Placeholder Text');
    const [selectedProgram, setSelectedProgram] = useState(['strength','yoga']);

    return (
        <View style={creatingStyles.viewContainer}>
            <View style = {{paddingLeft:15}}>
                
            <ScrollView>
                <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>
                    Create A Program
                </Text>

                <SafeAreaView style={{marginTop:40}}>
                    <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>
                        Name:
                        <Text style = {{flexDirection: "row", color: "red"}}>*</Text>
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
                        <Text style = {{flexDirection: "row", color: "red"}}>*</Text>
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
                    <Text style={{fontSize:20, color: 'white', fontWeight: 'bold', marginBottom:0, paddingBottom:0}}>
                        Category:
                        <Text style = {{flexDirection: "row", color: "red"}}>*</Text>
                    </Text>
                    <Picker
                        style = {{color:'white', marginTop:0, paddingTop:0}}
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
                <View>
                <Button 
                        title="Add Session" 
                        color='orange' 
                        onPress={() => 
                            navigation.navigate('Create a Program')} 
                    />
                </View>
                </ScrollView>
            </View>
        </View>
    );
}

