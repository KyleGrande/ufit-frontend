import React from 'react';
import { View, Text } from 'react-native';
import MovementComponent from './MovementCard';

const SessionComponent = ({ session }:any) => {
    return (
        <View>
            <Text 
            style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                marginBottom: 0,
                paddingBottom: 0,
                marginTop: 16
            }}
            >
                {session.name}
            </Text>
                <View style = {{backgroundColor: "white", borderRadius: 20}}>
                {session.movements.map((movement:any) => (
                    <MovementComponent movement = {movement}/>
                ))}
            </View>

        </View>
    );
};

export default SessionComponent;