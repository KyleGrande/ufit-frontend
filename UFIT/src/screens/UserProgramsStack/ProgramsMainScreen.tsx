import * as React from 'react';
import { Text, View, Button, ScrollView, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
import {programStyles} from '../style';
import API, { Program, Session } from '../../api';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';
import { AntDesign } from '@expo/vector-icons'; 
import {CreateModal} from './CreateModal';
import { set } from 'react-hook-form';
import useAuth from "../../hook/useAuth";
import { useUserPrograms } from '../../provider/UserProgramsContext';

// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramsMainScreen({ navigation }: ProgramsMainScreenProps){
    
    // const [programs, setPrograms] = React.useState<Program[]>([]);
    const { programs } = useUserPrograms();
    const [createModalVisble, setCreateModalVisible] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const userId = useAuth()._id as string;
    // React.useEffect(() => {
    //     API.getProgramsByUserId(userId).then((response) => {
    //         // console.log(response.data);
    //         setPrograms(response.data.data);
    //         setError(null);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         setError('Error retrieving data');
    //     });
    // }, [userId]);
    const handleCreatePress = React.useCallback(() => {
        setCreateModalVisible(true);
    }, [setCreateModalVisible]);

    return (
        <SafeAreaView>
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
                    {programs?.map((program, index) => (
                        <Pressable
                            key={index}
                            onPress={() => navigation.navigate('Track a Program',
                                { program })}
                                style={{shadowColor:'#171717',shadowOffset: {width: -2, height: 4},
                                shadowOpacity: 0.2,
                                shadowRadius: 3,}}
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
        </SafeAreaView>
    );
}
