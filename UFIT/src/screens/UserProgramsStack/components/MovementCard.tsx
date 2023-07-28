import React from 'react';
import { View, Text } from 'react-native';


const MovementComponent = ({ movement }:any) => {
    return (
        
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', width: 300, padding: 20, margin: 10, borderRadius: 20}}>
                <View>
                    <Text>{movement.movementName}</Text>
                    
                </View>

                <View>
                    <Text>
                        {movement.trackingType.trackingType === "setsreps" ? (
                            <Text>{movement.trackingType.sets} X {movement.trackingType.reps}</Text>
                        ) : null}
                        {movement.trackingType.trackingType === "rounds" ? (
                            <Text>Rounds: {movement.trackingType.rounds}</Text>
                        ) : null}
                        {movement.trackingType.trackingType === "timer" ? (
                            <Text>{movement.trackingType.genMin} Min {movement.trackingType.genSec} sec</Text>
                        ) : null}
                    </Text>
                </View>
            </View>
      
    );
  };
  
  export default MovementComponent;