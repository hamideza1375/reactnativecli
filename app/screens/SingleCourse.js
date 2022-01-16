import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Button, Image, ScrollView, Text, TouchableOpacity, View, TextInput, Dimensions,
  ActivityIndicator, RefreshControl, Alert, useWindowDimensions, StatusBar, ToastAndroid, Linking, FlatList
} from 'react-native';
import { getCourse, commentCourse, getComment, getPartCourse, editlikecourse, getTrueLike, payment } from '../../services/courseService';
import VideoPlayer from 'react-native-video-controls';
import { Formik } from 'formik';
import * as Yup from "yup";
import Styles from "../styles/Styles";
import RNFetchBlob from 'react-native-fetch-blob'
import GetPart from './GetPart';
import OpenURLButton from './OpenURLButton';
import Videoo from './Videoo';
import List from './List';
import WebView from 'react-native-webview';
import { LANDSCAPE, PORTRAIT, useDeviceOrientationChange } from 'react-native-orientation-locker';
// import * as RNFS from 'react-native-fs';
// import { WebView } from 'react-native-webview';
// import Orientation from 'react-native-orientation-locker';
// var initial = Orientation.getInitialOrientation();

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import localStorage from "@react-native-async-storage/async-storage"

import Video, { TextTrackType } from "react-native-video";


const { width, height } = Dimensions.get("window");


const validationSchema2 = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  email: Yup.string()
    .required("این فیلد الزامی می باشد")
    .email("ایمیل معتبر نمی باشد"),
  message: Yup.string()
    .required("این فیلد الزامی می باشد")
    .min(1, "کادر پیام خالی هست"),
});



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const SingleCourse = ({ navigation, route }) => {


  const [like, setLike] = useState(false);
  const [likeCourse, setLikeCourse] = useState([]);
  const [ref1, setRef1] = useState();
  const [animating, setAnimating] = useState(false);
  const [course, setCourse] = useState({})
  const [videoUrl, setVideoUrl] = useState();
  const [price, setPrice] = useState();
  const [part, setPart] = useState()
  const [comment, setComment] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [Height, setHeight] = useState(height);
  const [Width, setWidth] = useState(width);
  const [land, setLand] = useState(PORTRAIT);
  const [buffer, setBuffer] = useState(15000);
  const [player, setPlayer] = useState(false);
  // const [scroll, setScroll] = useState();
  const [scrl2, setScrl2] = useState(5);

  const video = useRef(null);
  const scrollRef = useRef();
  const scrl = useRef();


  useEffect(() => {
    getTrueLike(route.params.id)
      .then(({ data }) => {
        console.log(data)
          (like) ? setRef1('eye') : setRef1('eye-slash')
        setLike(data.like2);
        console.log('like2', data.like2)
      }).catch((err) => {
        console.log(err.message)
      })
  }, [like])






  const handleLike = async () => {
    try {
      const like1 = editlikecourse(route.params.id, { like: !like })
      const { data, status } = await like1;
      if (status === 200) {
        setLike(!like)
        console.log('llike handle', data.like);
      }
    } catch (err) {
      setLike(false)
      ToastAndroid.show('بری پسندیدن ابتدا باید در دوره ثبت نام کنید', ToastAndroid.SHORT)
      console.log(err)
    }
  }






  useEffect(() => {
    // if (courseIdValidator(route.params.id)){
    getCourse(route.params.id)
      .then(({ data }) => {
        if (data.course) {
          setCourse(course)
          if (data.course.like) {
            const sisi = data.course.like.filter((l) => l.like === true)
            setLikeCourse(sisi.length)
          }
        }
        // else return history.go(-1)
      }).catch((err) => console.log(err))
    // } else { return history.go(-1)}
  }, [/*course*/like])





  useEffect(() => {
    getCourse(route.params.id)
      .then(({ data }) => {
        setCourse(data.course)
        setVideoUrl(data.course.videoUrl)
        setPrice(data.course.price)
      }).catch((err) => console.log(err))
  }, []);


  useEffect(() => {
    getComment(route.params.id)
      .then(({ data }) => {
        setComment(data.comment)
      }).catch((err) => console.log(err))
  }, [comment]);



  useEffect(() => {
    getPartCourse(route.params.id).then(({ data }) => {
      setPart(data.part)
    })
  }, [part])



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  // const as = useWindowDimensions()

  // useEffect(() => {
  // console.log(as);
  // }, [part])


  Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    if (width < height) { setWidth(width); setHeight(height) }
    else { setWidth(width); setHeight(height) }
  })


  useDeviceOrientationChange((o) => { o === 'PORTRAIT' ? setLand(PORTRAIT) : setLand(LANDSCAPE) })




  const onSubmitForm = async () => {
    const token = await localStorage.getItem('token')
    try {
      if (!token) {
        ToastAndroid.show('برای دسترسی ابتدا ثبت نام و ورود کنید', ToastAndroid.SHORT)
      }
      const getCode = payment(route.params.id);
      const { status, data } = await getCode;
      if (status === 200) {
        ToastAndroid.show("موفق", ToastAndroid.SHORT);
        setAnimating(false)
        // await Linking.openURL(data) 
        // return <WebView style={{display:'flex',flex:'100%', width: '100%', height: '100%', }} source={{ uri: data }} />
        return navigation.navigate("Payment", { uri: data })

      }
      else ToastAndroid.show('مشکلی پیش آمد', ToastAndroid.SHORT)

    } catch (err) {
      ToastAndroid.show('مشکلی پیش آمد', ToastAndroid.SHORT)
      console.log(err);
    }
  }




  function handleScroll({ nativeEvent }) {
    setScrl2(nativeEvent.contentOffset.y)
    //  console.log(nativeEvent.contentOffset.y);
  }


  //  const onMomentumScrollEnd1 = (event) => {
  //    console.log(event.target.style.marginTop);
  // }


  return (
    <View ref={scrollRef} style={{overflow:'scroll', width: '100%', height: 888 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View style={{ flex: 1, alignContent: 'space-around' }}>

        <StatusBar hidden={true} />


        <View style={{ alignItems: 'center', alignContent: 'center', borderWidth: 2, borderColor: '#444',
         height: land !== PORTRAIT ? Height : 270, width: '100%', alignSelf:'center' }}>
          <Video muted={false} repeat={false} resizeMode={"cover"}
            controls={true} style={{ width: '100%', height: land !== PORTRAIT ? Height : 300 }} rate={1.0}
            ignoreSilentSwitch={"ignore"} source={{ uri: `http://192.168.43.171/upload/${videoUrl}` }}
          // hideShutterView={true}
          // fullscreenOrientation={'portrait'}
          // mixWithOthers={'duck'}
          // paused={player}
          // pictureInPicture={true}
          // playInBackground={true}
          // poster="https://baconmockup.com/300/200/"
          // posterResizeMode={'cover'}
          // preferredForwardBufferDuration={20}
          // rate={0}
          // reportBandwidth={true}
          // volume={0.1}
          // onEnd={() => console.log('eenndd')}
          // onLoad={()=>console.log("llooaadd")}
          // stereoPan={-0.1}
          // onPictureInPictureStatusChanged={{isActive: true}}
          // onProgress={{
          //   currentTime: 5.2,
          //   playableDuration: 34.6,
          //   seekableDuration: 888
          // }}
          // stereoPan={0.1}
          // ref={(ref) => { setPlayer(ref) }}
          // ref={video}
          // bufferConfig={{
          // minBufferMs: 150000,
          // maxBufferMs: 500000,
          // bufferForPlaybackMs: 25000,
          // bufferForPlaybackAfterRebufferMs: 500000
          // }}
          // onBuffer={onBuffer}                // Callback when remote video is buffering
          />
        </View>








        <View style={{ width: '100%', height: 50, backgroundColor: 'silver', marginTop: 3,alignSelf:'center',
         justifyContent: 'center', alignContent: 'space-between', flexWrap: 'wrap' }}>

          <TouchableOpacity onPress={handleLike} style={{ borderBottomColor: '#27f', padding: 8, borderWidth: 1, width: 90, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
            {/* <Icon.Button onPress={() => setPlayer(!player)} name={ref1} size={20} backgroundColor='#19f' > */}
            <Text style={{ color: 'black' }} >{likeCourse}</Text>
            <Icon name={'heart'} size={20} color='red' />
          </TouchableOpacity>

          <View style={{ width: 80, marginLeft: 'auto' }}>
            <Button title='zoom in' onPress={() => navigation.navigate("Videoo", { uri: `http://192.168.43.171/upload/${videoUrl}` })} />
          </View>
          <View style={{ width: 100, marginRight: 10 }}>
            <Button title='download' style={{}} onPress={() => {

              RNFetchBlob.config({
                addAndroidDownloads: {
                  useDownloadManager: true,
                  path: `${RNFetchBlob.fs.dirs.DownloadDir}/video${Math.random()}.mp4`
                }
              })
                .fetch('GET', `http://192.168.43.171/upload/${videoUrl}`)
                .then((res) => { console.log(res.path()); });
            }} />
          </View>

        </View>

        {animating && <ActivityIndicator size="large" animating={animating} />}

        <View style={{ marginTop: 3, width: '100%', alignSelf:'center' }}>
          <Button color="#16f" title='خرید' onPress={() => { setAnimating(true); onSubmitForm() }} />
        </View>





        {/* scrl.current.onScrollEndDrag  onScrollBeginDrag "scrollToEnd  scrollViewRef  onTouchCancel */}
        {/* "scrollEnabled "scrollPerfTag "topScrollEndDrag "topScrollBeginDrag */}
        {/* "onTouchStart "onTouchEnd "scrollEventThrottle  "onMomentumScrollBegin "RCTScrollView */}
        {/* // onTouchMove={(event) => scrl.current.scrollTo({ y: event.nativeEvent.contentOffset.y + 30 })} */}
        {/* // pagingEnabled={true} */}
        <ScrollView
          ref={scrl}
          // onTouchMove={
            // (e) => { setScrl2(scrl2 => scrl2 + 35); scrl.current.scrollTo({ y: scrl2 }) }}
            // onScroll={handleScroll}
            style={{ width: '100%', height: 100, borderWidth: 1, borderColor: 'silver',alignSelf:'center' }}>
          <GetPart scrollRef={scrollRef} part={part} navigation={navigation} setVideoUrl={setVideoUrl} />
        </ScrollView>

        {/* <View style={{ flex: 1, width: 333, height: 55, margin: 38, padding: 6 }}> */}
          {/* <Button title={`Click\n`} */}
            {/* onPress={ */}
              {/* () => { setScrl2(scrl2 => scrl2 + 30); scrl.current.scrollTo({ y: scrl2 }) }} /> */}
        {/* </View> */}






{/* 
        <View style={{ width: '98%', height: 'auto', borderWidth: 1, borderColor: 'silver', marginTop: 30 }}>

          <Formik
            initialValues={{ fullname: "", email: "", message: "" }} onSubmit={(values) => {
              commentCourse(route.params.id, values)
                .then(() => {
                  alert('باموفقیت ارسال شد')
                }).catch((err) => console.log(err))
            }} validationSchema={validationSchema2}>
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


                <View style={{ padding: 30, marginTop: 10 }}>
                  <Button onPress={handleSubmit} title="Submit" />
                </View>
              </View>
            )}
          </Formik>
        </View> */}


        {/* <ScrollView style={{ width: '98%', flex: 1, height: '100%', borderWidth: 2, borderColor: 'silver', alignSelf: 'center', margin: 18 }}>

          <FlatList
            data={comment}
            keyExtractor={(comment) => comment._id.toString()}
            renderItem={({ item }) => (
              <View style={{ width: '80%', minHeight: 170, backgroundColor: 'silver', alignSelf: 'flex-end', margin: 8 }}>
                <Text style={{ padding: 7, width: '99%', margin: 3, height: 45, backgroundColor: 'white', alignSelf: 'center' }}>{item.fullname}</Text>
                <Text style={{
                  fontFamily: 'ih',
                  padding: 7, width: '99%', margin: 3, flex: 1, backgroundColor: 'white', alignSelf: 'center',
                  textShadowColor: '#00000066', textShadowRadius: 4, shadowColor: 'red', shadowRadius: 20, shadowOpacity: .6
                }}>{item.message}
                </Text>
              </View>
            )}
          />


        </ScrollView> */}

      </View>


      {/*  RNFS.downloadFile({
                fromUrl: `http://192.168.43.171/upload/${videoUrl}`,
                toFile: `${RNFS.DownloadDirectoryPath}/video${Math.random()}.mp4`,
                discretionary: true,
                progressInterval: 1,
                progressDivider: 1,
                connectionTimeout:50000,
              }).promise
                .then((r) => { console.log(r) })
                .catch((err) => console.log(err.message)) */}




      {/* <Button title='alert' onPress={()=>  Alert.alert(
      "Alert Title","My Alert Msg Alert Msg",
      [
        {text: "Cancel",onPress: () => console.log("Cancel Pressed")},
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )} /> */}


      {/* <OpenURLButton url={`http://192.168.43.171/downvideo/${videoUrl}`}>Open Supported URL</OpenURLButton> */}

    </View>
  );


}

export default SingleCourse;



