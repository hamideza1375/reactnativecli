import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, PermissionsAndroid, Image } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';


// export async function request_storage_runtime_permission() {

//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       { 'title': 'ReactNativeCode Storage Permission','message': 'ReactNativeCode App needs access to your storage to download Photos.'})
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) { Alert.alert("Storage Permission Granted.");}
//     else { Alert.alert("Storage Permission Not Granted"); }
//   } 
//   catch (err) { console.warn(err) }
// }

// async componentDidMount() { await request_storage_runtime_permission() }




export default function Fetchblobdown() {
  const downloadImage = () => {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, notification: true, description: 'Image',
        path: RNFetchBlob.fs.dirs.PictureDir + "/image_" + Math.random()}})
      .fetch('GET', 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg')
      .then((res) => { Alert.alert("Image Downloaded Successfully."); });
  }


  return (
    <View style={styles.MainContainer}>
      <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg' }}
        style={{ width: 300, height: 300, resizeMode: 'contain', margin: 5 }} />
      <TouchableOpacity style={styles.button} onPress={downloadImage} >
        <Text style={styles.text}>Click Here To Download Above Image</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  button: {

    width: '80%',
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#2E7D32',
    borderRadius: 7,
    margin: 10
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  }
});