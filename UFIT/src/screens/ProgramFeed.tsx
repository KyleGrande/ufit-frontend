import * as React from 'react';
import { Text, View, Button} from 'react-native';
import { styles } from './style';
import API, {Program} from '../api';
export default function ProgramFeed() {
    const [programs, setPrograms] = React.useState<Program[]>([]);

    React.useEffect(() => {
        API.getPrograms().then((response) => {
            console.log(response.data);
            setPrograms(response.data.data);
        });
    }, []);

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