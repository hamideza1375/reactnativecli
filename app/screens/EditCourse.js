import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, Image } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { editCourse, getCourse } from '../../services/courseService';
import Styles from "../styles/Styles";
// import { editCourse, getCourse } from '../../services/courseService';
// import * as ImagePicker from "expo-image-picker";

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-controls';




const validationSchema = Yup.object().shape({
  title: Yup.string().
    required("عنوان الزامی می باشد"),
  price: Yup.string()
    .required(" قیمت الزامی می باشد"),
  info: Yup.string()
    .required("این فیلد الزامی می باشد")
});








const EditCourse = ({ route }) => {

  const [title, setTitle] = useState();
  const [price, setPrice] = useState(1);
  const [info, setInfo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [imageUrl, setImageUrl] = useState();


  useEffect(() => {
    getCourse(route.params.id)
    .then(({ data }) => {
      setTitle(data.course.title)
      setPrice(data.course.price)
      setInfo(data.course.info)
    }).catch((err) => console.log(err))
  }, []);



 


  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (!res.didCancel) { setImageUrl(res.assets[0]);}
      else console.log('err');
    })
  }


  const pickVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, (res) => {
      if (!res.didCancel) { setVideoUrl(res.assets[0]);
        console.log(res.assets[0]) }
      else console.log('err');
    })
  }

  const handle = () => {
    const data = new FormData();
    data.append('title', title);
    data.append('price', price);
    data.append('info', info);
    videoUrl && data.append('videoUrl', { name: videoUrl.fileName, type: videoUrl.type, uri: videoUrl.uri });
    imageUrl && data.append('imageUrl', { name: imageUrl.fileName, type: imageUrl.type, uri: imageUrl.uri });


    editCourse(route.params.id, data)
      .then(() => { alert('باموفقیت ارسال شد') })
      .catch((err) => console.log(err))
  }



  return (
    <View>


      <TouchableOpacity onPress={pickImage} style={{ marginTop: 10, alignSelf: 'center', width: '70%', height: 70, borderWidth: 1, borderColor: '#444', backgroundColor: '#fff' }}>
        {imageUrl && (<Image source={{ uri: imageUrl.uri }} style={{ width: 220, height: 66 }} />)}
      </TouchableOpacity>

      <TouchableOpacity onPress={pickVideo} style={{ marginTop: 10, alignSelf: 'center', width: '70%', height: 70, borderWidth: 1, borderColor: '#444', backgroundColor: '#fff' }}>
        {videoUrl && (<VideoPlayer source={{ uri: videoUrl.uri }} style={{ width: 220, height: 66 }} />)}
      </TouchableOpacity>

      


      <View>
        <View style={Styles.Rcontainer}>
          <TextInput
            placeholder='title'
            keyboardType="default"
            style={Styles.RtextInput}
            placeholderTextColor="royalblue"
            onChangeText={(text) => setTitle(text)}
            value={title} />
          {/* <MaterialCommunityIcons name='account' size={20} color="#6e6969" style={Styles.Ricon} /> */}
        </View>


        <View style={Styles.Rcontainer}>
          <TextInput
            value={price.toString()}
            placeholder="price"
            keyboardType="numeric"
            style={Styles.RtextInput}
            placeholderTextColor="royalblue"
            onChangeText={(text) => setPrice(text)}/>
          {/* <MaterialCommunityIcons name='price' size={20} color="#6e6969" style={Styles.Ricon} /> */}
        </View>


        <View style={Styles.Rcontainer}>
          <TextInput
            multiline
            placeholder='info'
            keyboardType="default"
            style={Styles.RtextInput}
            placeholderTextColor="royalblue"
            onChangeText={(text) => setInfo(text)}
            value={info}
          // onBlur={() => setFieldTouched("info")} 
          />
          {/* <MaterialCommunityIcons name='account' size={20} color="#6e6969" style={Styles.Ricon} /> */}
        </View>

        {/* {errors.info && touched.info && <Text style={{ color: 'red' }}>{errors.info}</Text>} */}


        <View style={{ padding: 30, marginTop: 10 }}>
          <Button onPress={handle} title="Submit" />
        </View>
      </View>
    </View>

  );
};

export default EditCourse
