import React from 'react';
import { View, Text, Button } from 'react-native';
import MovementComponent from './MovementCard';

const SessionComponent = ({ session, deleteSession, idx }:any) => {
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
                    <Button
                        title="Delete"
                        color="red"
                        onPress={() => {
                            deleteSession(idx);
                        }}              
                    />
                </View>
                <View>
                
                </View>
        </View>
    );
};

export default SessionComponent;