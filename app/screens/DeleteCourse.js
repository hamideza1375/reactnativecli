import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, Image } from "react-native";
import { deleteCourse } from '../../services/courseService';
import Styles from "../styles/Styles";








const EditCourse = ({ route, navigation }) => {



  const handle = () => {
    deleteCourse(route.params.id)
      .then(() => { alert('باموفقیت') })
      .catch((err) => alert('no') )
  }


  return (
    <View style={{ width: '100%', height: '100%', flex: 1 }}>
      <View style={{ top: 20, borderRadius: 4, backgroundColor: 'white', padding: 8, width: 300, height: 150, borderColor: '#777', borderWidth: 1, alignSelf: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>{route.params.title}پاک کردن</Text>
        <View style={{ flexDirection: 'row', width: '100%', height: '90%' }}>

          <View style={{ position: 'absolute', right: 20, width: 70, height: 50, alignSelf: 'flex-end' }}>
            <Button onPress={handle} title='delet' color='red' />
          </View>

          <View style={{ position: 'absolute', right: 95, width: 70, height: 50, alignSelf: 'flex-end' }}>
            <Button onPress={() => navigation.navigate('CourseTable') } title="انصراف" color='yellow' />
          </View>

        </View>
      </View>
    </View>
  );
};

export default EditCourse