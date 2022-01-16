import React from 'react'
import { Formik } from 'formik'
import { View, Text, Button, TextInput } from 'react-native'
import { forgetpassword } from '../../services/userService'




export const ForgetPass = () => {

  return (
    <View>
      <Formik initialValues={{ email: "" }} onSubmit={async (values) => {
        try {
          const { status } = await forgetpassword({ email: values.email })
          if (status === 200) { alert("موفق بود") }
        } catch (err) { console.log(err); }
      }}>
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text>فراموشی رمز عبور</Text>
            <TextInput onChangeText={handleChange("email")} placeholder="آدرس ایمیل" value={values.email}
              autoCompleteType="email" keyboardType="email-address" style={{ borderColor: 'silver' }} />
            <Button onPress={handleSubmit} title="ریست پسورد" />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default ForgetPass