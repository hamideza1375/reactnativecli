import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { Formik } from 'formik';
import Styles from "../styles/Styles";
import { launchImageLibrary } from 'react-native-image-picker';

import VideoPlayer from 'react-native-video-controls';

import { createCourse } from '../../services/courseService';






const CreateCourse = () => {

  const [getImage, setImage] = useState(false);
  const [getVideo, setVideo] = useState(false);


  useEffect(() => {
      console.log('setImage', getImage);
  }, [getImage ])


  useEffect(() => {
      console.log('setVideo', getVideo);
  }, [getVideo ])



  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (!res.didCancel) setImage(res.assets[0]);
      else console.log('err');
    })
  }


  const pickVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, (res) => {
      if (!res.didCancel) setVideo(res.assets[0]);
      else console.log('err');
    })
  }







  const handle = (values) => {

    const data = new FormData();
    data.append('title', values.title);
    data.append('price', values.price);
    data.append('info', values.info);
    getVideo && data.append('videoUrl', { name: getVideo.fileName, type: getVideo.type, uri: getVideo.uri });
    getImage && data.append('imageUrl', { name: getImage.fileName, type: getImage.type, uri: getImage.uri });

    createCourse(data)
      .then((status) => {if(status == 201) alert('باموفقیت ارسال شد') })
      .catch((err) => console.log(err))
  }


  return (
    <View>

      <TouchableOpacity onPress={pickImage} style={{ marginTop: 10, alignSelf: 'center', width: '70%', height: 70, borderWidth: 1, borderColor: '#444', backgroundColor: '#fff' }}>
        {getImage && (<Image source={{ uri: getImage.uri }} style={{ width: 200, height: 66 }} />)}
      </TouchableOpacity>


      <TouchableOpacity onPress={pickVideo} style={{ marginTop: 10, alignSelf: 'center', width: '70%', height: 70, borderWidth: 1, borderColor: '#444', backgroundColor: '#fff' }}>
        {getVideo && (<VideoPlayer source={{ uri: getVideo.uri }} style={{ width: 200, height: 66 }} />)}
      </TouchableOpacity>

      <Formik
        initialValues={{ title: "", price: '', info: "" }} onSubmit={(values) => handle(values)} >
        {({ handleChange, handleSubmit, values }) => (
          <View>


            <View style={Styles.Rcontainer}>
              <TextInput
                placeholder='title'
                keyboardType="default"
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                onChangeText={handleChange("title")}
                value={values.title}
              />
            </View>


            <View style={Styles.Rcontainer}>
              <TextInput
                multiline
                placeholder="price"
                keyboardType="numeric"
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                onChangeText={handleChange("price")}
                value={values.price}
              />
            </View>


            <View style={Styles.Rcontainer}>
              <TextInput
                placeholder='info'
                keyboardType="default"
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                onChangeText={handleChange("info")}
                value={values.info}
              />
            </View>



            <View style={{ padding: 30, marginTop: 10 }}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateCourse

