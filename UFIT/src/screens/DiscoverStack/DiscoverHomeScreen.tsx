import * as React from 'react';
import { Text, View, Pressable, ScrollView} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from '../UserDiscover';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';

import API, {Program} from '../../api';
import { FeedStyles } from '../style';

type DiscoverHomeScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'Discover'>;
};

export default function DiscoverHomeScreen({navigation: navigator}: DiscoverHomeScreenProps) {

    const [programs, setPrograms] = React.useState<Program[]>([]);
    const [error, setError] = React.useState<null | string>(null);

    // get all programs from the database
    React.useEffect(() => {
        API.getPrograms().then((response) => {
            // console.log(response.data);
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
                <ScrollView style={FeedStyles.programsContainer}// horizontal={true}
                >
                    {programs.map((program, index) => (
                        <Pressable
                            // style={[FeedStyles.singleProgramContainer, 
                            //     {backgroundColor: index % 2 === 0 ? 'blue' : 'darkblue'}]}  
                            key={program._id}
                            onPress={() => navigator.navigate('Program',
                                { program })}
                        >
                            <LinearGradient
                                top={getGradientColors(program.programCategory)[0]}
                                bottom={getGradientColors(program.programCategory)[1]}
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