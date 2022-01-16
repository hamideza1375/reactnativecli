import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";



const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
         await Linking.openURL(url) 
    }, [url]);
    return <Button title={children} onPress={handlePress} />;
  };

  export default OpenURLButton
  