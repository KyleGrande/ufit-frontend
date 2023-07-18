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
        paddingTop: 100,
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
        paddingTop: 100,
        height: '100%',
        backgroundColor: 'blue',
    },
    titleBarText: {
        paddingTop: 20,
        paddingLeft: 20,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
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
        backgroundColor: 'blue',
        height: '80%',
    },
    singleSessionContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 70,
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
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
        // backgroundColor: 'red',
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
});

export const creatingStyles = StyleSheet.create({
    viewContainer: {
        paddingTop: 100,
        height: '100%',
        backgroundColor: 'blue',
    },
});

export const FeedStyles = StyleSheet.create({
    viewContainer: {
        paddingTop: 100,
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
        justifyContent: 'flex-start',
        height: 180,
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 10,
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
    },
});

export const repBubbleStyles = StyleSheet.create({
    bubble: {
        margin: 10,
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const timerStyles = StyleSheet.create({
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'blue',
    },
});

export const userSetting = StyleSheet.create({
    textInput: {
      width: "95%",
      padding: 12,
      borderColor: "#ffffff",
      marginTop: 12,
      color: "#ffffff",
      marginLeft: 10,
      marginRight: 10,
    },
    settingText: {
      color: "#ffffff",
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