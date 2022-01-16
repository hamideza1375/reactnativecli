import React, { useEffect } from 'react';
import { View, TextInput, Text, Button, Keyboard } from "react-native";
import { Formik } from 'formik';

import * as Yup from "yup";
import Styles from "../styles/Styles";
import { loginUser } from '../../services/userService';
import localStorage from "@react-native-async-storage/async-storage"
import { JwtDecode } from './JwtDecode';



const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("این فیلد الزامی می باشد")
    .email("ایمیل معتبر نمی باشد"),
  password: Yup.string()
    .required("این فیلد الزامی می باشد")
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد"),
});




// medialibrary

const Login = ({ navigation, route }) => {

  const [remember1, setRemember1] = React.useState("1h");
  const [show, setShow] = React.useState(false);

  useEffect(()=>{
    console.log(remember1)
  },[remember1])

  JwtDecode(navigation)

  return (
    <Formik initialValues={{ email: "", password: "", remember: "" }}
      onSubmit={async (values) => {
        console.log(values.remember);
        const { status, data } = await loginUser({ email: values.email, password: values.password, remember: remember1 });
        if (status == 200) {
          await localStorage.setItem("token", data.token);
          navigation.navigate("Home")        }
      }}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        <View style={{ marginTop: 15, flex: 1 }} >


          <View style={Styles.Rcontainer}>
            <TextInput
              placeholder="ایمیل کاربری"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              style={Styles.RtextInput}
              placeholderTextColor="royalblue"
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={() => setFieldTouched("email")}
            />
          </View>

          {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}




          <View style={Styles.Rcontainer}>
            <TextInput
              placeholder="کلمه عبور"
              autoCompleteType="password"
              autoCorrect={false}
              style={Styles.RtextInput}
              placeholderTextColor="royalblue"
              secureTextEntry
              onChangeText={handleChange("password")}
              value={values.password}
              onBlur={() => setFieldTouched("password")}
            />
          </View>
          {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}



          <View style={{ flexDirection:'row',marginRight: 60, marginTop: 15, justifyContent: 'flex-end' }}>
            <Text style={{fontSize:19,marginRight:5}}>مرا بخاطر بسپر</Text>
            <TextInput
             autoCompleteType="password"
             onFocus={() => {Keyboard.dismiss(); remember1 == "1h" ? setRemember1("100h") : setRemember1("1h"); }}
             style={[(remember1 !== "1h") &&  { backgroundColor: 'green' },
             { margin:4,width: 2, height: 2, borderColor: '#777', borderWidth: 2, padding: 6.5 ,borderRadius:1}]}
            />
          </View>


          <View style={{ padding: 20, marginTop: 40 }}>

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}
    </Formik>)
}

export default Login