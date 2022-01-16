import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyCoursesScreen, AccountScreen } from "./../screens";
import TopTabNavigator from "./TopTabNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Courses"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Courses") {
                        iconName = focused ? "library-video" : "school";
                    } else if (route.name === "Account") {
                        iconName = focused
                            ? "account-circle"
                            : "account-circle-outline";
                    } else if (route.name === "MyCourses") {
                        iconName = "message-video";
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
                activeBackgroundColor: "light",
                labelStyle: {
                    fontFamily: "ih",
                    fontSize: RFPercentage(1.5),
                },
            }}
        >
            <Tab.Screen
                name="MyCourses"
                component={MyCoursesScreen}
                options={{
                    tabBarLabel: "دوره های من",
                    tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="Courses"
                component={TopTabNavigator}
                options={{
                    tabBarLabel: "دوره ها",
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: "اکانت کاربر",
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
