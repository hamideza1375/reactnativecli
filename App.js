import React, { useEffect, useState } from "react";
import { Button, I18nManager, Image, ImageBackground, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Course from "./app/screens/Course";
import Nazarat from "./app/screens/Nazarat";
import CourseTable from "./app/screens/CourseTable";
import EditCourse from "./app/screens/EditCourse";
import DeleteCourse from "./app/screens/DeleteCourse";
import SingleCourse from "./app/screens/SingleCourse";
import CreateCourse from "./app/screens/CreateCourse";
import ForgetPass from "./app/screens/ForgetPass.js";
import ResetPass from "./app/screens/ResetPass.js";
import Videoo from "./app/screens/Videoo";
import Payment from "./app/screens/Payment";
import NewPart from "./app/screens/NewPart";
import EditPart from "./app/screens/EditPart";



import PushNotificationIOS from "@react-native-community/push-notification-ios";
import firebase from '@react-native-firebase/app';
import PushNotification, { Importance } from "react-native-push-notification";



I18nManager.allowRTL(false)


const Stack = createNativeStackNavigator()



const App = () => {
  const [stop1, setstop1] = useState(true)



  // یه صفحه درست کن که تو اپلیکیشن وب رو نشون بده و از اونجا یه درخاست بده که یه صفحه ی مرورگر دیگه باز بشه




  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);


      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,

  });




  useEffect(()=>{
    firebase.initializeApp(App)
  },[])





  const sur = () => {
    PushNotification.localNotificationSchedule({
      channelId: ' 1',
      title: 'title',
      message: "My Notification Message",
      date: new Date(Date.now() + 1 * 1),
      allowWhileIdle: false,
    });
  }


  setTimeout(() => {
    setstop1(false)
  }, 1500);



  return (
    stop1 ?
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#333' }}>
        <Image source={require("./app/assets/logo.png")}
          style={{ width: 220, height: 220 }}
        />
      </View>
      :
      <>
      <StatusBar backgroundColor="#888" barStyle={'dark-content'} />
      <NavigationContainer>
      <Stack.Navigator >
      {/* <Stack.Screen name="Home" component={()=><Button title='not' onPress={sur}/>} /> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SingleCourse" component={SingleCourse} options={({ route }) => ({ headerShown: false, title: route.params.title })} />
        <Stack.Screen name="DeleteCourse" component={DeleteCourse} />
        <Stack.Screen name="EditCourse" component={EditCourse} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Nazarat" component={Nazarat} />
        <Stack.Screen name="Course" component={Course} options={{ text: 'My profile', id: '1' }} />
        <Stack.Screen name="CourseTable" component={CourseTable} />
        <Stack.Screen name="CreateCourse" component={CreateCourse} />
        <Stack.Screen name="ForgetPass" component={ForgetPass} />
        <Stack.Screen name="ResetPass" component={ResetPass} />
        <Stack.Screen name="Videoo" component={Videoo} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="NewPart" component={NewPart}/>
        <Stack.Screen name="EditPart" component={EditPart}/>
      </Stack.Navigator> 
      </NavigationContainer>
      </>
  )
}



export default App;



