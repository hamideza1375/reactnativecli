import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import Toast from "react-native-tiny-toast";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Screen from "./../components/shared/Screen";
import ToplearnContext from "./../contexts/ToplearnContext";
import {
    NewCoursesScreen,
    TopCoursesScreen,
    CoursesScreen,
} from "./../screens";
import { fetchCourses } from "./../api/courses";
import { loadingToast } from "../utils/toasts";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    const [getCourses, setCourses] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                loadingToast("در حال بارگذاری...");
                const courses = await fetchCourses();
                setCourses(courses);
                Toast.hide();
            };
            fetchData();
        } catch (err) {
            console.log(err);
            Toast.hide();
        }
    }, []);

    return (
        <ToplearnContext.Provider
            value={{
                courses: getCourses,
            }}
        >
            <Screen>
                <TopTab.Navigator
                    initialRouteName="AllCourses"
                    backBehavior="none"
                    tabBarOptions={{
                        activeTintColor: "tomato",
                        inactiveTintColor: "gray",
                        labelStyle: {
                            fontFamily: "ih",
                            fontSize: RFPercentage(1.5),
                        },
                        style: { backgroundColor: "#f8f4f4" },
                    }}
                >
                    <TopTab.Screen
                        name="AllCourses"
                        component={CoursesScreen}
                        options={{ tabBarLabel: "همه دوره ها" }}
                    />
                    <TopTab.Screen
                        name="NewCourses"
                        component={NewCoursesScreen}
                        options={{ tabBarLabel: "دوره های جدید" }}
                    />
                    <TopTab.Screen
                        name="TopCourses"
                        component={TopCoursesScreen}
                        options={{ tabBarLabel: "دوره های محبوب" }}
                    />
                </TopTab.Navigator>
            </Screen>
        </ToplearnContext.Provider>
    );
};

export default TopTabNavigator;
