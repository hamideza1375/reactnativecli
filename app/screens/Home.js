import { useNavigationState } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { Text, ScrollView, ImageBackground, TouchableOpacity, Image, BackHandler, ToastAndroid, Dimensions, Button, Animated } from "react-native";
import Styles from "../styles/Styles";
import { strings } from '../locale/i18n';

import { scale, verticalScale, moderateScale, s, vs, ms, mvs } from 'react-native-size-matters';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useScrollToTop } from '@react-navigation/native';








const { width, height } = Dimensions.get("window");

export default function Home({ navigation }) {
    const ind = useNavigationState((state) => state)

    const [orientation, setOrientation] = useState("PORTRAIT");
    const [dHeight, setDheight] = useState(height);
    const [dWidth, setDwidth] = useState(width);

    const scrollRef = useRef();

    // useScrollToTop(React.useRef({
    //   scrollToTop: () => ,
    // }));





    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) { setOrientation("PORTRAIT"); setDwidth(width); setDheight(height) }
        else { setOrientation("LANDSCAPE"); setDwidth(width); setDheight(height) }
    })




    // useEffect(() => {
    //     console.log('orientation', orientation);
    // }, [orientation])


    // useEffect(() => {
    //     console.log('dHeight', dHeight);
    // }, [dHeight])


    // useEffect(() => {
    //     console.log('dWidth', dWidth);
    // }, [dWidth])



    useEffect(() => {
        if (ind.index === 0 && ind.index !== 1 && ind.index !== 2 && ind.index < 0 ) {
        let current = 0
        BackHandler.addEventListener("hardwareBackPress", () => {
            current += 1
            if (current === 2) { BackHandler.exitApp(); return true }
            ToastAndroid.show("برای خروج دوبار لمس کنید", ToastAndroid.SHORT)
            setTimeout(() => {
                current = 0
            }, 1000);
            return true
        })
        }

        return null

    }, [])










    // const positionX = event.nativeEvent.contentOffset.x;

    //    function handleScroll (event) {
    //         console.log(event.nativeEvent.contentOffset.y);
    //       }



    // const _onMomentumScrollEnd = ( event) => {
    //     // the current offset, {x: number, y: number} 
    //     const position = event.nativeEvent.contentOffset; 
    //     // page index 
    //     const index = Math.round(event.nativeEvent.contentOffset.x / width);

    //   };

    const art = () => {
        scrollRef.current.scrollTo({ y: height * 3 });
    }


    return (
        <ImageBackground source={require("../assets/bg4.jpg")} blurRadius={3.3} style={Styles.HimageBackground}>
            <ScrollView ref={scrollRef} >
                <Image style={Styles.HtinyLogo} source={require('../assets/logo.png')} />

                <TouchableOpacity style={[Styles.Hbutton, { marginBottom: 32, backgroundColor: '#f1030399' }]} onPress={() => navigation.navigate("CourseTable")}>
                    <Text style={Styles.Htext}>{strings('Admin panel')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.Hbutton, { marginBottom: 32 }]} onPress={() => navigation.navigate("Course", { id: '11', text: 'asss' })}>
                    <Text style={Styles.Htext}>{strings('courses')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.Hbutton, { backgroundColor: '#0fff0f99' }]} onPress={() => navigation.navigate("Register")}>
                    <Text style={Styles.Htext}>{strings('Register')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.Hbutton, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate("Login")}>
                    <Text style={Styles.Htext}>{strings('login')} </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.Hbutton, { backgroundColor: 'orange' }]} onPress={() => navigation.navigate("ForgetPass")}>
                    <Text style={Styles.Htext}>{strings('Forget the password')} </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.Hbutton, { backgroundColor: 'green' }]} onPress={() => navigation.navigate("ResetPass")}>
                    <Text style={Styles.Htext}>{strings('change Password')} </Text>
                </TouchableOpacity>             


            </ScrollView>
        </ImageBackground>

    );
}
