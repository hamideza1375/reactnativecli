// import { useNavigationState } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getCourses } from "../../services/courseService";



export default function CourseTable({ navigation, route }) {

  const [courses, setCourses] = useState([]);
  // const ind = useNavigationState((state) => state.index)


  useEffect(() => {
    getCourses().then(({ data }) => {
      setCourses(data.courses)
    })
    // console.log(ind);
  }, [courses]);



  const [tableHead] = useState(['عنوان', 'قیمت', 'ویرایش','حذف'])

  // { backgroundColor: 'silver' }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate('CreateCourse') }} style={[styles.textr, {margin:3, border: 0, width: '20%', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.but, {width:'100%'}]}>createCourse</Text>
      </TouchableOpacity>


      <View style={{ flexDirection: 'row' }}>
        {tableHead.map((tableHead, key) => (
          <Text key={key} style={[styles.textr]}>{tableHead}</Text>
        ))}
      </View>
      {courses.map((course, key) => (
        <View key={key} style={{ flexDirection: 'row' }} >
          <Text style={[styles.textr]}>{course.title}</Text>
          {/* <Text style={[styles.textr, { paddingTop: 8 }]}>{course.price}</Text> */}
          {/* <Text style={styles.textr}>{course.teacher}</Text> */}

          <TouchableOpacity onPress={() => { navigation.navigate(`NewPart`, { id: course._id, }) }} style={[styles.textr, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.but, {backgroundColor:'silver'}]}>NewPart</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { navigation.navigate(`EditCourse`, { id: course._id }) }} style={[styles.textr, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.but]}>edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate(`DeleteCourse`, { id: course._id, title:course.title }) }} style={[styles.textr, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.but, {backgroundColor:'red'}]}>delete</Text>
          </TouchableOpacity>
        </View>
      ))}

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, alignItems: 'center' },
  textr: {
    height: 40,
    width: 110,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    paddingRight: 2,
    paddingLeft: 2,
  },
  but: {
    flex: .9,
    backgroundColor: '#00f9',
    textAlign: 'center',
    color: 'white',
    height: '85%',
    paddingTop: 5,
    borderRadius: 5
  },
});