import React from 'react';
import localStorage from "@react-native-async-storage/async-storage"
import jwt_decode from "jwt-decode";





export const JwtDecode = async (navigation) => {
    const token = await localStorage.getItem("token");
    const user = jwt_decode(token)
    // if (user) { navigation.navigate("Home") }
    return ""
}