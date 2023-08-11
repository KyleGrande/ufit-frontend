import React, {useState} from 'react';
import { Text, View, Pressable, TouchableOpacity, Modal, TextInput } from 'react-native';

type MovementNoteModalProps = {
    selectedMovement: any,
    modalVisible: boolean,
    setModalVisible: (visible: boolean) => void,
    onSaveNote: (note: string) => void
};

export const MovementNoteModal = ({selectedMovement, modalVisible, setModalVisible, onSaveNote}: MovementNoteModalProps) => {
    const [note, setNote] = React.useState(selectedMovement?.typeTracking.notes ?? '');

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
            onSaveNote(note);
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
                <Text>
                    {selectedMovement?.movementName}
                </Text>
        <TextInput
            multiline={true}
            value={note}
            onChangeText={setNote}
            style={{ maxHeight: 200, maxWidth: 300,flex:1, flexWrap: 'wrap'}}
            placeholder='Enter Note'
        />
        <TouchableOpacity onPress={() => {
                        onSaveNote(note);
                        setModalVisible(false);
                    }}>
                        <Text>Save</Text>
                    </TouchableOpacity>
        </View>
        </Pressable>
    </Modal>
    );
}