import React, { useEffect, useState } from 'react'
import { resetpassword } from '../../services/userService';
import { View, Text, Button, TextInput } from 'react-native'
import { Formik } from 'formik';



export const ResetPass = ({ navigation, route }) => {


  return (
    <View>
      <Formik initialValues={{ password: "", confirmPassword: "" }} onSubmit={async (values) => {
        try {
          const { status } = resetpassword(route.params.id, { password:values.password, confirmPassword:values.confirmPassword })
          if (status === 200) alert("تغییر رمز موفق آمیز بود") 
        } catch (err) { console.log(err); }
        }}>
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text>تغییر رمز عبور</Text>
            <TextInput onChangeText={handleChange("password")} placeholder="پسورد" value={values.password}
              keyboardType="numeric" autoCompleteType="password" style={{ borderColor: 'silver' }} />
            <TextInput value={values.confirmPassword} onChange={handleChange("confirmPassword")} 
             keyboardType="numeric" autoCompleteType="password" placeholder="تکرار پسورد" style={{ borderColor: 'silver' }}/>
            <Button onPress={handleSubmit} title="تغییر رمز عبور" />
          </View>
        )}
      </Formik>
    </View>
  )}
export default ResetPass