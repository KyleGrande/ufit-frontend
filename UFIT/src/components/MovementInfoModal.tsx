import React from 'react';
import { Text, View, Pressable, TouchableOpacity, Modal } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe"; 

type MovementInfoModalProps = {
    selectedMovement: any,
    modalVisible: boolean,
    setModalVisible: (visible: boolean) => void,
};

export const MovementInfoModal = ({selectedMovement, modalVisible, setModalVisible}: MovementInfoModalProps) => (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}
>
    <Pressable style={{flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 40,
                        backgroundColor: 'rgba(0,0,0,0.5)'}} 
                onPress={() => setModalVisible(false)} 
                onStartShouldSetResponder={() => true}>
        <View style={{backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 20}} 
                onStartShouldSetResponder={() => true}
        >
            <Text style={[{paddingBottom: 7, fontSize: 16}]}>
                {selectedMovement?.movementDescription}
            </Text>
            {selectedMovement?.movementLink && (
                <YoutubePlayer
                    height={170}
                    width={300}
                    play={false}
                    videoId="dQw4w9WgXcQ"
                />
            )}
            {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity> */}
        </View>
    </Pressable>
</Modal>
);