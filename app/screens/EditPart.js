import React, { useEffect, useState } from "react";
import { Button, TextInput, StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import { editPartCourse, getSinglePartCourse } from "../../services/courseService";
import Styles from "../styles/Styles";





const EditPart = ({ route }) => {


  const [partTitle, setPartTitle] = useState('');
  const [partPrice, setPartPrice] = useState('');
  const [partInfo, setPartInfo] = useState('');
  const [partVideoUrl, setPartVideoUrl] = useState('');


  useEffect(() => {

    getSinglePartCourse(route.params.id)
      .then(({ data }) => {
        setPartTitle(data.part[0].partTitle);
        setPartPrice(data.part[0].partPrice.toString());
        setPartInfo(data.part[0].partInfo);
        // setPartVideoUrl(data.part.partVideoUrl);
      })
      .catch((err) => console.log('eeerrrreerr'))

  }, [])




  const handleSubmit = async (values) => {
    try {
      let data1 = new FormData();
      data1.append("partTitle", values.title);
      data1.append("partPrice", Number(values.price));
      data1.append("partVideoUrl", { name: partVideoUrl.fileName, type: partVideoUrl.type, uri: partVideoUrl.uri });
      data1.append("partInfo", values.info);

      const { data, status } = await editPartCourse(route.params.id, data1);
      // if (status === 200) {
      alert("ساخته شد")
      // }
    }
    catch (ex) {
      console.log(ex);
    }
  };




  const pickVideo = (type) => {
    launchImageLibrary({ mediaType: type }, (res) => {
      if (!res.didCancel) setPartVideoUrl(res.assets[0]);
      else console.log('err');
    })
  }




  return (
    <>
      <Formik initialValues={{ title: "", price: '', info: "" }} onSubmit={(values) => handleSubmit(values)} >
        {({ handleChange, handleSubmit, values }) => (
          <>

            <View style={Styles.Rcontainer}>
              <TextInput placeholder='partTitle' value={partTitle}
                onChange={(e) => setPartTitle(e.target.value)}
                keyboardType="default" style={Styles.RtextInput}
                placeholderTextColor="royalblue" onChangeText={handleChange("title")} />
            </View>



            <View style={Styles.Rcontainer}>
              <TextInput placeholder="partPrice" value={partPrice}
                onChange={(e) => setPartPrice(e.target.value)}
                keyboardType="numeric" style={Styles.RtextInput}
                placeholderTextColor="royalblue" onChangeText={handleChange("price")}
              />
            </View>


            <View style={Styles.Rcontainer}>
              <TextInput multiline placeholder='partInfo' value={partInfo}
                onChange={(e) => setPartInfo(e.target.value)}
                keyboardType="default" style={Styles.RtextInput}
                placeholderTextColor="royalblue" onChangeText={handleChange("info")}
              />
            </View>


            <View style={[Styles.Rcontainer, { flexDirection: "row" }]}>
              <Text style={{ color: 'white', backgroundColor: 'blue', width: 89, borderRadius: 8, padding: 10 }} onPress={() => pickVideo('video')} >download</Text>
              <Text style={{ borderRadius: 4, padding: 9, color: '#0000ff9f', width: 75, fontSize: 18 }} onPress={() => pickVideo('video')} >video</Text>
            </View>


            <View style={{ padding: 30, marginTop: 10 }}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </>
        )}
      </Formik>


    </>
  )
}

export default EditPart



const styles = StyleSheet.create({
  formik: {
    border: '1px solid silver',
    borderRadius: '1.4%/1.4%',
    padding: '3rem',
    background: 'silver',
  },
})