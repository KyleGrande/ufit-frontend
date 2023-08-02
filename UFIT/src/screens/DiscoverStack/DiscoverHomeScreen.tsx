import * as React from 'react';
import { Text, View, Pressable, ScrollView,} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from '../UserDiscover';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';

import API, {Program} from '../../api';
import { FeedStyles } from '../style';
import { Picker } from '@react-native-picker/picker';
type DiscoverHomeScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'Discover'>;
};

export default function DiscoverHomeScreen({navigation: navigator}: DiscoverHomeScreenProps) {

    const [programs, setPrograms] = React.useState<Program[]>([]);
    const [error, setError] = React.useState<null | string>(null);
    const [filter, setFilter] = React.useState<string>('');

    const filteredPrograms = filter 
    ? programs.filter(program => program.programCategory === filter) 
    : programs;
    
    // get all programs from the database
    React.useEffect(() => {
        API.getPrograms().then((response) => {
            setPrograms(response.data.data);
            setError(null);
        })
        .catch((err) => {
            console.log(err);
            setError('Error retrieving data');
        });
    }, []);
    // if there is an error
    if (error) {
        return (
            <View style={FeedStyles.viewContainer}>
                <Text style={FeedStyles.titleBarText}>{error}</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={FeedStyles.viewContainer}>
                <Text style={FeedStyles.titleBarText}>
                    Discover
                </Text>
                <Picker
                    selectedValue={filter}
                    onValueChange={(itemValue) =>
                        setFilter(itemValue)
                    }
                    // if not selected dont show
                    itemStyle={{height: 50,color:'gray', fontWeight: 'bold',margin:0,padding:0,}}
                    style={[{padding:0,margin:0, height:50}]}
                    >
                    <Picker.Item label="All Catagories" value='' />
                    <Picker.Item label="Strength" value="strength" />
                    <Picker.Item label="Yoga" value="yoga" />
                    <Picker.Item label="Cardio" value="cardio" />

                </Picker>
                
                <ScrollView style={FeedStyles.programsContainer}// horizontal={true}
                >
                    {filteredPrograms.map((program, index) => (
                        <Pressable
                            // style={[FeedStyles.singleProgramContainer, 
                            //     {backgroundColor: index % 2 === 0 ? 'blue' : 'darkblue'}]}  
                            key={program._id.$oid}
                            onPress={() => navigator.navigate('Program',
                                { program })}
                        >
                            <LinearGradient
                                top={getGradientColors(program.programCategory.toLowerCase())[0]}
                                bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
                                style={FeedStyles.singleProgramContainer}
                            >
                            <Text style={FeedStyles.programTitle}>
                                {program.programName}
                            </Text>
                            <Text style={FeedStyles.programDescription}>
                                {program.programDescription.substring(0, 100) + '...'}
                            </Text>
                            </LinearGradient>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}