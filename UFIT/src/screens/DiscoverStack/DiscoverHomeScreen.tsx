import * as React from 'react';
import { Text, View, Pressable, ScrollView, TouchableOpacity, SafeAreaView,} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from '../UserDiscover';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';

import API, {Program} from '../../api';
import { FeedStyles, programStyles, trackingStyles, discoverProgramStyles } from '../style';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';

type DiscoverHomeScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'Discovers'>;
};

export default function DiscoverHomeScreen({navigation: navigator}: DiscoverHomeScreenProps) {

    const [programs, setPrograms] = React.useState<Program[]>([]);
    const [error, setError] = React.useState<null | string>(null);
    const [filter, setFilter] = React.useState<string>('');
    const [showFilter, setShowFilter] = React.useState<boolean>(false);

    const filteredPrograms = filter 
    ? programs.filter(program => program.programCategory === filter) 
    : programs;
    
    // get all programs from the database
    React.useEffect(() => {
        API.getPrograms().then((response) => {
            //works?
            let noOriginalPrograms = response.data.data.filter((program: Program) => !program.originalProgramId);
            setPrograms(noOriginalPrograms);
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
            <SafeAreaView>
            <View style={FeedStyles.viewContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={FeedStyles.titleBarText}>
                    Discover
                </Text>
                <TouchableOpacity
                    style={{paddingRight: 30}}
                    onPress={() => setShowFilter(!showFilter)}
                >
                <Ionicons name="ios-filter" size={30} color={ showFilter ? 'orange' : 'gray' } style={{alignSelf:'center'}}/>
                </TouchableOpacity>
                </View>
                {showFilter &&
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
                    <Picker.Item label="Yoga" value="Yoga" />
                    <Picker.Item label="Cardio" value="Cardio" />
                    
                </Picker>
                }
                <ScrollView style={programStyles.programsContainer}// horizontal={true}
                // style={feedStyles.programsContainer}
                >
                    {filteredPrograms.map((program, index) => (
                        <Pressable
                            // style={[FeedStyles.singleProgramContainer, 
                            //     {backgroundColor: index % 2 === 0 ? 'blue' : 'darkblue'}]}  
                            key={index}
                            onPress={() => navigator.navigate('Program',
                                { program })}
                            style={{shadowColor:'#171717',shadowOffset: {width: -2, height: 4},
                            shadowOpacity: 0.2,
                            shadowRadius: 3,}}
                        >
                            <LinearGradient
                                top={getGradientColors(program.programCategory.toLowerCase())[0]}
                                bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
                                style={[FeedStyles.singleProgramContainer]}
                            >
                            <Text style={FeedStyles.programTitle}>
                                {program.programName}
                            </Text>
                            <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                            <Text style={[FeedStyles.programDescription,{height:'60%'}]}>
                                {program.programDescription.substring(0, 100) + '...'}
                            </Text>
                            <View style={{flexDirection:'row', justifyContent:'space-evenly', alignContent:'center', width:'100%', alignItems:'center', alignSelf:'flex-end' }}>
                            {
                                program.programCategory.toLowerCase() === 'strength' && (
                                    <Text style={{color:'white', paddingLeft:5}}>
                                        <Ionicons name="barbell" size={20} color="white" /> Strength
                                    </Text>
                                )
                            }
                            {
                                program.programCategory.toLowerCase() === 'yoga' && (
                                    <Text style={{color:'white', paddingLeft:5}}>
                                        <Ionicons name="fitness" size={20} color="white" /> Yoga
                                    </Text>
                                )
                            }
                            {
                                program.programCategory.toLowerCase() === 'cardio' && (
                                    <Text style={{color:'white', paddingLeft:5}}>
                                        <Ionicons name="walk" size={20} color="white" /> Cardio
                                    </Text>
                                )
                            }
                            {program.isCreatedByAI && (
                                <Text style={[ { color:'white', paddingLeft:5, paddingVertical:5, }]}>
                                    <FontAwesome5 name="brain" size={20} color="white" /> AI Generated
                                </Text>
                            )} 
                            </View>
                           </View>
                            </LinearGradient>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            </SafeAreaView>
    );
}