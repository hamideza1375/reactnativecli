import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getComment } from '../../services/courseService';




export default function GetComments({ param }) {


  const [comment, setComment] = useState([]);


  useEffect(() => {
    getComment(param)
    .then(({ data }) => {
      setComment(data.comment)
    }).catch((err) => console.log(err))
  }, [comment]);



  return (
    <ScrollView style={{ width: '98%', flex: 1, height: '100%', borderWidth: 2, borderColor: 'silver', alignSelf: 'center', margin: 18 }}>

      {comment.map((comment, index) =>
        <View key={index} style={{ width: '80%', height: 170, backgroundColor: 'silver', alignSelf: 'flex-end', margin: 8 }}>
          <Text style={{ padding: 7, width: '99%', margin: 3, height: 45, backgroundColor: 'white', alignSelf: 'center' }}>{comment.fullname}</Text>
          <Text style={{
            padding: 7, width: '99%', margin: 3, flex: 1, backgroundColor: 'white', alignSelf: 'center',
            textShadowColor: '#00000066', textShadowRadius: 4, shadowColor: 'red', shadowRadius: 20, shadowOpacity: .6 /* shadowOffset:{width: 4, height: 4}*/
          }}>{comment.message}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}
