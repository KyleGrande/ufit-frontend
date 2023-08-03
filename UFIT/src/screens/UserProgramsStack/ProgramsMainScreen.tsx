import * as React from 'react';
import { Text, View, Button, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
import {programStyles} from '../style';
import API, { Program, Session } from '../../api';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';
import { AntDesign } from '@expo/vector-icons'; 
import {CreateModal} from './CreateModal';
import { set } from 'react-hook-form';
// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramsMainScreen({ navigation }: ProgramsMainScreenProps){
    
    const [programs, setPrograms] = React.useState<Program[]>([]);
    const [createModalVisble, setCreateModalVisible] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        API.getPrograms().then((response) => {
            console.log(response.data);
            setPrograms(response.data.data);
            setError(null);
        })
        .catch((err) => {
            console.log(err);
            setError('Error retrieving data');
        });
    }, []);
    const handleCreatePress = React.useCallback(() => {
        setCreateModalVisible(true);
    }, [setCreateModalVisible]);

    return (
        <View>
            <View style={programStyles.viewContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={programStyles.titleBarText}>
                    Your Programs
                </Text>
                <TouchableOpacity
                style={{paddingRight: 30}}
                // onPress={() => 
                //             navigation.navigate('Create a Program')}
                onPress={handleCreatePress}
                            >
                <AntDesign name="plus" size={30} color="orange" style={{alignSelf:'center'}}/>
                </TouchableOpacity>
                </View>
                <ScrollView style={programStyles.programsContainer}>
                    {programs.map((program, index) => (
                        <Pressable
                            key={program._id.$oid}
                            onPress={() => navigation.navigate('Track a Program',
                                { program })}
                        >
                            <LinearGradient
                                top={getGradientColors(program.programCategory.toLowerCase())[0]}
                                bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
                                style={programStyles.singleProgramContainer}
                            >
                            <Text style={programStyles.programTitle}>
                                {program.programName}
                            </Text>
                            </LinearGradient>
                        </Pressable>
                    ))}
                </ScrollView>
                {/* <View style={[programStyles.buttonContainer,{flexDirection:'row', justifyContent:'space-evenly'}]}>
                    <Button 
                        title="Create Program" 
                        color='orange' 
                        onPress={() => 
                            navigation.navigate('Create a Program')} 
                    />
                    <Button 
                        title="AI Create" 
                        color='orange' 
                        onPress={() => 
                            navigation.navigate('AI Create')} 
                    />
                </View> */}
            </View>
            <CreateModal
            modalVisible={createModalVisble}
            setModalVisible={setCreateModalVisible}
            navigation={navigation}
        />
        </View>
    );
}
