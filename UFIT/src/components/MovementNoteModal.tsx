import React from 'react';
import { Text, View, Pressable, TouchableOpacity, Modal, TextInput } from 'react-native';

type MovementNoteModalProps = {
    selectedMovement: any,
    modalVisible: boolean,
    setModalVisible: (visible: boolean) => void,
};

export const MovementNoteModal = ({selectedMovement, modalVisible, setModalVisible}: MovementNoteModalProps) => (
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
                    borderRadius: 20,
                    minWidth: 300,
                    minHeight: 200}} 
                onStartShouldSetResponder={() => true}
        >
    <TextInput
        multiline={true}
        style={{ maxHeight: 200, maxWidth: 300,flex:1, flexWrap: 'wrap'}}
        placeholder='Enter Note'
    />
    </View>
    </Pressable>
</Modal>
);