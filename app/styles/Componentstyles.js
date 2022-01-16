import { StyleSheet,StatusBar } from 'react-native'






const ComponentStyles = StyleSheet.create({
    Scontainer: {
            marginTop: StatusBar.currentHeight,
            flex: 1,
            overflow: 'hidden',
            padding: 10,
    },
})

export default ComponentStyles