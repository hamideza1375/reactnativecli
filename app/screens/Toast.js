import React from "react";
import { View, StyleSheet, ToastAndroid, Button, StatusBar } from "react-native";

const App = () => {

    
  const showToast = () => {
    ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
  };





  return (
    <View style={styles.container}>
      <Button title="Toggle Toast" onPress={() => showToast()} />
    </View>
  );
};











const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#888888",
    padding: 8
  }
});

export default App;