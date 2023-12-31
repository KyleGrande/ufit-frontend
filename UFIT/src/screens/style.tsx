import { StyleSheet } from 'react-native';

//stylesheet instead of inline styling
export const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: 100,
    },
    titleBarText: {
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
});

export const programStyles = StyleSheet.create({
    viewContainer: {
        paddingTop: 40,
        height: '100%',
        
    },
    programsContainer: {
        width: '100%',
        marginTop: 20,
        paddingRight: 40,
        paddingLeft: 40,
        

    },
    singleProgramContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 70,
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 10,
    },
    buttonContainer: {
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 50,
        // marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    titleBarText: {
        paddingLeft: 20,
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',
        
    },
    programTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
        letterSpacing: 1.2,
        

    },
    touchableOpacityStyle: {
        position: "relative",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // right: 30,
        bottom: 30,
        borderRadius: 10,
    },
});

export const trackingStyles = StyleSheet.create({
    viewContainer: {
        // paddingTop: 40,
        height: '100%',
        
        // backgroundColor: 'blue',
    },
    titleBarText: {
        paddingTop: 20,
        paddingLeft: 20,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1.4,
        
    },
    programDescription: {
        paddingTop: 20,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    sessionsContainer: {
        width: '100%',
        marginTop: 20,
        paddingRight: 40,
        paddingLeft: 40,
        // backgroundColor: 'blue',
        height: '80%',
    },
    singleSessionContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        // height: 70,
        minHeight: 70,
        marginBottom: 20,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.5)',

    },
    sessionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'Black',
        padding: 5,
    },
    bubbleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    timerButton: {
        margin: 10,
        marginLeft: 20,
        width: 100,
        height: 35,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 50,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    movementName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
        marginLeft: 10,
        marginTop: 10,
    },
    trackingTextInput: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
        marginLeft: 20,
        marginTop: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignContent:'center',
        textAlign:'center', 
        marginBottom: 0, 
        paddingBottom:0
    },
    trackingTextInputName: {
        color: 'white',
        padding: 5,
        marginLeft: 20,
        marginTop:0,
        fontSize:12,
        textAlign:'center'
    },
    
});

export const creatingStyles = StyleSheet.create({
    viewContainer: {
        paddingTop: 100,
        height: '100%',
 //       backgroundColor: 'blue',
    },
});

export const FeedStyles = StyleSheet.create({
    viewContainer: {
        paddingTop: 40,
        height: '100%',
    },
    programsContainer: {
        width: '100%',
        // marginTop: 20,
        paddingRight: 40,
        paddingLeft: 40,

    },
    singleProgramContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 180,
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBarText: {
        paddingLeft: 20,
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',

    },
    programTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
        letterSpacing: 1,

    },
    programDescription: {
        fontSize: 12,
        color: 'white',
        padding: 5,
        
    },
});

export const repBubbleStyles = StyleSheet.create({
    bubble: {
        margin: 10,
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const timerStyles = StyleSheet.create({
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});

export const userSetting = StyleSheet.create({
    textInput: {
        width: "95%",
        padding: 12,
        borderColor: "#ffffff",
        marginTop: 12,
        color: "gray",
        marginLeft: 10,
        marginRight: 10,
    },
    settingText: {
        color: "gray",
        fontSize: 18,
        paddingLeft: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
      // paddingHorizontal: 12,
    },
});

export const discoverProgramStyles = StyleSheet.create({
    viewContainer: {
        paddingTop: 40,
        height: '100%',
    },
    programDescription: {
        paddingTop: 20,
        color: 'white',
        fontSize: 17,
        paddingLeft: 20,
        paddingRight: 70,
        marginBottom: 35,
        letterSpacing: -.05,
    },
    theProgramTitle: {
        paddingLeft: 20,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    
    movementContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginTop: 5,
        borderBottomWidth: .5,
        borderBottomColor: 'white',

    }, 
    movementText: {
        fontSize: 15,
        color:'white'
        // marginBottom: 5,
    },
    singleSessionContainer: {
        // alignItems: 'flex-start',
        // justifyContent: 'center',
        minHeight: 70,
        marginBottom: 20,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',

        // backgroundColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)',

    },
    sessionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingBottom:3,
        // padding: 5,
    },

});

export const loginStyles = StyleSheet.create({
    viewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', 
        // backgroundColor: 'blue',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingHorizontal: 12,
        width: '90%',
        height: 45,
        marginBottom: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonContainer: {
        color: "#ebe2e2",
        // backgroundColor: "#000",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontWeight: "bold",
        padding: 12,
        opacity: 0.7,
        borderWidth: 1,
        overflow: "hidden",
        borderRadius: 8,
        paddingHorizontal: 12,
        // width: 300,
        height: 45,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
        justifyContent: 'center',
    },
    uFitName: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        letterSpacing: 1.2,
        marginBottom: 20,
    },
});

