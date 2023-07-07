import * as React from 'react';
import { Text, View, Button} from 'react-native';
import { styles } from './style';
import API, {Program} from '../api';
export default function ProgramFeed() {
    const [programs, setPrograms] = React.useState<Program[]>([]);
    const [error, setError] = React.useState<null | string>(null); // Add this

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
    if (error) {
        return (
            <View style={styles.viewContainer}>
                <Text style={styles.titleBarText}>{error}</Text>
            </View>
        );
    }
    return (
        <View>
            <View style={styles.viewContainer}>
                <Text style={styles.titleBarText}>
                    Discover
                </Text>
                <Text>
                    {programs.map((program) => (
                        <Text key={program._id}>
                            {program.programName}
                        </Text>
                    ))}
                </Text>

            </View>
        </View>
    );
}