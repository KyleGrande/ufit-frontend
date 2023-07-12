import * as React from 'react';
import { Text, View, Button, ScrollView, Pressable } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
import {programStyles} from '../style';
import API, { Program, Session } from '../../api';

// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramsMainScreen({ navigation }: ProgramsMainScreenProps){
    
    const [programs, setPrograms] = React.useState<Program[]>([]);
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

    return (
        <View>
            <View style={programStyles.viewContainer}>
                <Text style={programStyles.titleBarText}>
                    Your Programs
                </Text>
                <ScrollView style={programStyles.programsContainer}>
                    {programs.map((program, index) => (
                        <Pressable
                            style={[programStyles.singleProgramContainer, 
                                {backgroundColor: index % 2 === 0 ? 'blue' : 'darkblue'}]}  
                            key={program._id}
                            onPress={() => navigation.navigate('Track a Program',
                                { program })}
                        >
                            <Text style={programStyles.programTitle}>
                                {program.programName}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <View style={programStyles.buttonContainer}>
                    <Button 
                        title="Create Program" 
                        color='orange' 
                        onPress={() => 
                            navigation.navigate('Create a Program')} 
                    />
                </View>
            </View>
        </View>
    );
}
