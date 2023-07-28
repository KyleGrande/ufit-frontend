import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
// TODO: check if package ^ is OK to download
const MovementComponentOption = ({ movement }:any) => {
    return (
        
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 20}}>
                <View>
                    <Text>{movement.movementName}</Text>
                    
                </View>

                <View>
                    <Text>
                        {movement.typeTracking.trackingType === "setsreps" ? (
                            <Text>{movement.typeTracking.sets} X {movement.typeTracking.reps}</Text>
                        ) : null}
                        {movement.typeTracking.trackingType === "rounds" ? (
                            <Text>Rounds: {movement.typeTracking.rounds}</Text>
                        ) : null}
                        {movement.typeTracking.trackingType === "timer" ? (
                            <Text>{movement.typeTracking.genMin} Min {movement.typeTracking.genSec} sec</Text>
                        ) : null}
                    </Text>
                    
                    <RectButton style={styles.deleteButton} onPress={() => console.log('hello')}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </RectButton>
                    
                </View>
            </View>
      
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#f0f0f0',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    deleteButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
    },
  });
  
  export default MovementComponentOption;