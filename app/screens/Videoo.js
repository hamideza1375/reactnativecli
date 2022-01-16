import React, { useEffect, useState } from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity, Text, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import {
  OrientationLocker, PORTRAIT, LANDSCAPE, UNLOCK,
  unlockAllOrientations, useOrientationChange, useDeviceOrientationChange
} from "react-native-orientation-locker";

import Orientation from "react-native-orientation-locker";


import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';

var initial = Orientation.getInitialOrientation();
const { width, height } = Dimensions.get("window");


function Video({ route }) {

  const ind = useNavigationState((state) => state)
  const [oren, setoren] = useState(LANDSCAPE)
  // useDeviceOrientationChange((o) => {o === 'PORTRAIT' ?setLand(PORTRAIT):setLand(LANDSCAPE)})


  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => { setoren(UNLOCK) })
      return () => BackHandler.addEventListener("hardwareBackPress", () => { setoren(UNLOCK) })
    }, [])
  );

  return (
    <View style={{ width: '100%', height: '100%',aIndex:1 }}>
      <StatusBar hidden={true} />
      {(ind.routes[3].name === 'Videoo') && <OrientationLocker orientation={oren} />}
      <WebView style={{ width: '100%', height: '100%' }} source={{html: `
      <video width='100%' height='100%'; controls>
        <source src='${route.params.uri}' type= video/mp4 />
        <source src='${route.params.uri}' type= video/ogg />
      </video>`}} />
    </View>
  )
}

{/* <WebView style={{ width: '100%', height: '100%', }} source={{ uri: route.params.uri }} /> */ }


export default Video;
