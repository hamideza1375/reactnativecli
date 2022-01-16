import React, { useRef } from 'react'
import { Button, ScrollView, Text, View } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'




 const GetPart = ({ part,navigation, setVideoUrl,scrollRef }) => {





  return <ScrollView>
    {part && part.map((part, index) => (
      <>
      <View key={part._id} 
      style={{flexDirection:'row', justifyContent:'space-between', padding:5,margin:5, backgroundColor:'#888'}}
      >
        <Button onPress={() => navigation.navigate("EditPart", { id: part._id })} title="ویرایش" />
      <View style={{position:'absolute',left:100}}>
        <Button title="دانلود" onPress={() => {
          RNFetchBlob.config({
            addAndroidDownloads: {
              useDownloadManager: true,
              path: `${RNFetchBlob.fs.dirs.DownloadDir}/video${Math.random()}.mp4`
            }
          })
            .fetch('GET', `http://78.47.189.94/upload/${part.partVideoUrl}`)
            .then((res) => { console.log(res.path()); });
        }}
        />
        </View>
        <Button title={part.partTitle} onPress={() => {
          setVideoUrl(part.partVideoUrl)
          // scrollRef.current.scrollTo({ y: 1 });
        }} />
      </View>
        <Text style={{alignSelf:'center',width:'98%',borderRadius:45, color:'white', backgroundColor:'black'}}> {index + 2} </Text>
        </>
    ))}
  </ScrollView>;
}


export default GetPart;