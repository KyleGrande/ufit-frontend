import React from 'react';
import { View, Text } from 'react-native';


const MovementComponent = ({ movement }:any) => {
    return (
        
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', width: 300, padding: 20, margin: 10}}>
                <View>
                    <Text>{movement.movementName}</Text>
                    
                </View>

                <View>
                    <Text>
                        {movement.trackingData.trackingType === "setsreps" ? (
                            <Text>{movement.trackingData.sets} X {movement.trackingData.reps}</Text>
                        ) : null}
                        {movement.trackingData.trackingType === "rounds" ? (
                            <Text>Rounds: {movement.trackingData.rounds}</Text>
                        ) : null}
                        {movement.trackingData.trackingType === "timer" ? (
                            <Text>{movement.trackingData.genMin} Min {movement.trackingData.genSec} sec</Text>
                        ) : null}
                    </Text>
                </View>
            </View>
      
    );
  };
  
  export default MovementComponent;