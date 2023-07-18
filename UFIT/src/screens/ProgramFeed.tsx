import * as React from 'react';
import { Text, View, Pressable, ScrollView} from 'react-native';
import { FeedStyles } from './style';
import API, {Program} from '../api';

export default function ProgramFeed() {

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
                            style={[FeedStyles.singleProgramContainer, 
                                {backgroundColor: index % 2 === 0 ? 'blue' : 'darkblue'}]}  
                            key={program._id}
                            onPress={() => navigation.navigate('Program',
                                { program })}
                        >
                            <Text style={FeedStyles.programTitle}>
                                {program.programName}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}