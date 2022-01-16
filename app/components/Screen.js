import React from 'react'
import { View } from 'react-native'
// import Styles from '../styles/Componentstyles'


const Screen = ({ children, style }) => {
    return (
        // <View style={[style, Styles.Scontainer]}>
        <View style={style}>
            {children}
        </View>
    )
}

export default Screen