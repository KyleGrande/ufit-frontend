import React from 'react';
import { View, Text } from 'react-native';


const MovementComponent = ({ movement }:any) => {
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
                </View>
            </View>
      
    );
  };
  
  export default MovementComponent;