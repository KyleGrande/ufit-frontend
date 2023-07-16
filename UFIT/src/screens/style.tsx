import { StyleSheet } from "react-native";
//stylesheet instead of inline styling
export const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: 100,
  },
  titleBarText: {
    color: "gray",
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 20,
  },
});

export const programStyles = StyleSheet.create({
  viewContainer: {
    paddingTop: 100,
    height: "100%",
  },
  programsContainer: {
    // width: '100%',
    marginTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
    minHeight: "60%",
  },
  singleProgramContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    height: 70,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBarText: {
    paddingLeft: 20,
    color: "gray",
    fontSize: 30,
    fontWeight: "bold",
  },
  programTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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
    height: "100%",
    // backgroundColor: "blue",
  },
  grow: { flexGrow: 1 },
  titleBarText: {
    paddingTop: 20,
    paddingLeft: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  programDescription: {
    paddingTop: 20,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  sessionsContainer: {
    width: "100%",
    marginTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
    // backgroundColor: 'blue',
    height: "100%",
  },
  singleSessionContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    height: 70,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    padding: 5,
  },
});

export const creatingStyles = StyleSheet.create({
  viewContainer: {
    paddingTop: 100,
    minHeight: "85%",
    padding: 15,
    // backgroundColor: "blue",
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
