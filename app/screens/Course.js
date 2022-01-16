// import { useNavigationState } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import { Text, View, Image, FlatList, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import { getCourses } from "../../services/courseService";
import Screen from "../components/Screen";
import Styles from "../styles/Styles";
// import { useDimensions } from "@react-native-community/hooks";

// import NetInfo from "@react-native-community/netinfo";


// const state = await NetInfo.fetch();
// if (!state.isConnected) confirmationAlert();

// await AsyncStorage.removeItem("userId");

// import { StackActions } from "@react-navigation/native";

// navigation.dispatch(StackActions.replace("Home"));







const Course = ({ navigation,route }) => {
  const [courses, setCourses] = useState([]);
  // const ind = useNavigationState((state) => state.index)


  useEffect(() => {
    getCourses().then(({ data }) => {
    setCourses(data.courses)
    })
    // console.log(ind);
  }, [courses]);
  // const { screen, window } = useDimensions();



  // const { id, text } = route.params;

  // const pressHandler = () => navigation.navigate("Course", { id: "11", text: "سلام" });






  return (
    <Screen>
      <FlatList
        keyExtractor={(course) => course._id.toString()}
        numColumns={1}
        data={courses}
        renderItem={({ item }) => (
          <TouchableOpacity style={Styles.Ccontainer} onPress={() => 
          {navigation.navigate(`SingleCourse`, { id: item._id, title: item.title, videoUrl: item.videoUrl })}}>
            {/* <Image style={[Styles.Cimg, {height:screen.height / 2.2}]} source={{ uri: item.imageUrl}} /> */}
            <Image style={[Styles.Cimg, {height:222}]} source={{ uri: `http://192.168.43.171/upload/${item.imageUrl}`}} />
            <Text style={{ padding: 5, marginTop:7}}>{item.title}</Text>
            <Text style={{ padding: 5}}>قیمت: {item.price}</Text>
            <Text style={{ padding: 5}}>مدرس: حمید رضا عطار</Text>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}

export default Course;