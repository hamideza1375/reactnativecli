import React, { useState } from "react";
import { Button, TextInput, StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import { partCourse } from "../../services/courseService";
import Styles from "../styles/Styles";



const NewPart = ({ navigation, route }) => {

	const [partVideoUrl, setpartVideoUrl] = useState('');


	const handleSubmit = async (values) => {
		try {
			let data1 = new FormData();
			data1.append("partTitle", values.title);
			data1.append("partPrice", Number(values.price));
			data1.append("partVideoUrl", { name: partVideoUrl.fileName, type: partVideoUrl.type, uri: partVideoUrl.uri });
			data1.append("partInfo", values.info);

			const { data, status } = await partCourse(route.params.id, data1);
			if (status === 200) {
				alert("ساخته شد")
			}
		}
		catch (ex) {
			console.log(ex);
		}
	};


	const pickVideo = (type) => {
		launchImageLibrary({ mediaType: type }, (res) => {
			if (!res.didCancel) setpartVideoUrl(res.assets[0]);
			else console.log('err');
		})
	}



	return (
		<>
			<Formik initialValues={{ title: "", price: '', info: "" }} onSubmit={(values) => handleSubmit(values)} >
				{({ handleChange, handleSubmit, values }) => (
					<>

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


						<View style={[Styles.Rcontainer,{flexDirection:"row"}]}>
							<Text style={{color:'white', backgroundColor:'blue',width:89,borderRadius:8,padding:10}} onPress={() => pickVideo('video')} >download</Text>
							<Text style={{borderRadius:4,padding:9,color:'#0000ff9f',width:75, fontSize:18 }} onPress={() => pickVideo('video')} >video</Text>
						</View>


						<View style={{ padding: 30, marginTop: 10 }}>
							<Button onPress={handleSubmit} title="Submit" />
						</View>
					</>
				)}
			</Formik>

		</>
	);
};


// export default withRouter(NewPart);
export default NewPart;

const styles = StyleSheet.create({
	formik: {
		border: '1px solid silver',
		borderRadius: '1.4%/1.4%',
		padding: '3rem',
		background: 'silver',
	},
})