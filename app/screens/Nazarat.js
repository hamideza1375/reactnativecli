import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from "yup";
import Styles from "../styles/Styles";
import { commentCourse } from '../../services/courseService';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Swipable from "react-native-gesture-handler/Swipeable";





const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  email: Yup.string()
    .required("این فیلد الزامی می باشد")
    .email("ایمیل معتبر نمی باشد"),
  message: Yup.string()
    .required("این فیلد الزامی می باشد")
    .min(1, "کادر پیام خالی هست"),
});






const Nazarat = (param) => {

// console.log(param);
  return (
    <Formik
      initialValues={{ fullname: "", email: "", message: "" }} onSubmit={(values) => {
        commentCourse(param, values)
          .then(() => {
            alert('باموفقیت ارسال شد')
          }).catch((err) => console.log(err))
      }} validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        <View>


          <View style={Styles.Rcontainer}>
            <TextInput
              placeholder='نام کاربری'
              autoComplete="username"
              autoCorrect={false}
              keyboardType="default"
              style={Styles.RtextInput}
              placeholderTextColor="royalblue"
              onChangeText={handleChange("fullname")}
              value={values.fullname}
              onBlur={() => setFieldTouched("fullname")} />
          </View>

          {errors.fullname && touched.fullname && <Text style={{ color: 'red' }}>{errors.fullname}</Text>}
          {/* <MaterialCommunityIcons name='account' size={20} color="#6e6969" style={Styles.Ricon} /> */}



          <View style={Styles.Rcontainer}>
            <TextInput
              multiline
              placeholder="ایمیل کاربری"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              style={Styles.RtextInput}
              placeholderTextColor="royalblue"
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={() => setFieldTouched("email")} />
          </View>

          {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          {/* <MaterialCommunityIcons name='email' size={20} color="#6e6969" style={Styles.Ricon} /> */}




          <View style={Styles.Rcontainer}>
            <TextInput
              multiline
              placeholder="پیام"
              autoComplete='off'
              autoCorrect={false}
              keyboardType="default"
              style={[Styles.RtextInput, { height: 150, borderBottomEndRadius: 10 }]}
              placeholderTextColor="royalblue"
              onChangeText={handleChange("message")}
              value={values.message}
              onBlur={() => setFieldTouched("message")} />
          </View>
          {errors.message && touched.message && <Text style={{ color: 'red' }}>{errors.message}</Text>}

          {/* <MaterialCommunityIcons name='message' size={20} color="#6e6969" style={Styles.Ricon} /> */}


          <View style={{ padding: 30, marginTop: 10 }}>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Nazarat