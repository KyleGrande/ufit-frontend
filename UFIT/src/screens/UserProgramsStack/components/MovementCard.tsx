import React from 'react';
import { View, Text } from 'react-native';

// Movement card component that is used by the programcreation page, does not have delete option
const MovementComponent = ({ movement }:any) => {
    return (
        
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 20}}>
                <View style = {{width: '60%'}}>
                    <Text style = {{textAlign: 'left', fontWeight: 'bold'}}>{movement.movementName}</Text>
                </View>

                <View style = {{width: '40%'}}>
                    <Text style = {{textAlign: 'right', color: 'purple'}}>
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
