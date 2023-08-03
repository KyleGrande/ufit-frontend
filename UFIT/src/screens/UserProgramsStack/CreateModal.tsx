import React from 'react';
import { Text, View, Pressable, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
type CreateodalProps = {
    modalVisible: boolean,
    setModalVisible: (visible: boolean) => void,
    navigation: any,
};

export const CreateModal = ({ modalVisible, setModalVisible, navigation}: CreateodalProps) => (
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
                    minHeight: 200,
                flexDirection: 'row',
            justifyContent: 'space-around'}} 
                onStartShouldSetResponder={() => true}
        >
        <TouchableOpacity
        onPress={() => {
            navigation.navigate('Create a Program');
            setModalVisible(false);
            
        }}
        style={{alignSelf: 'center'}}
        >
    <Text style={{color: 'orange', alignSelf: 'center', paddingBottom:10, fontSize:36, fontWeight:'bold'}}>User</Text>
    <Text style={{color: 'orange', alignSelf: 'center', fontSize:36}}>Create</Text>
    </TouchableOpacity>
    <Entypo name="flow-line" size={100} color="orange" style={{alignSelf:'center'}}/>
    <TouchableOpacity
        onPress={() => {
            navigation.navigate('AI Create');
            setModalVisible(false);
        }}
        style={{alignSelf: 'center'}}
        >
    <Text style={{color: 'orange', alignSelf: 'center', paddingBottom:10, fontSize:36, fontWeight:'bold'}}>AI</Text>
    <Text style={{color: 'orange', alignSelf: 'center', fontSize:36}}>Create</Text>
    </TouchableOpacity>
    </View>
    </Pressable>
</Modal>
);