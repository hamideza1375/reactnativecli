import { StyleSheet } from 'react-native'







const Styles = StyleSheet.create({
    // Home
    HimageBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    Hbutton: {
        backgroundColor: "#f519",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "90%",
        marginBottom: 15,
        marginTop: 10,
    },
    HtinyLogo: {
        width: 350,
        height: 260,
        position: 'absolute',
        top: 90,
    },
    Htext: {
        color: 'white',
    },
    //End Home





    // Course
    Ccontainer: {
        flex: 1,
        width: '99.7%',
        height: '100%',
        // flexBasis: '30%',
        // height: 330,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5,
        margin: 9,
        marginHorizontal: 'auto',
        marginVertical: 20,
    },
    Cimg: {
        width: '99.75%',
        // height: 222,
    },
    CfirstContainer: {
        // marginTop: StatusBar.currentHeight,
        marginTop: 10,
    },
    //End Course




    // Register
    Rcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        width: "75%",
        borderRadius: 20,
        padding: 5,
        alignSelf: 'center',
        marginTop: 30,
        borderWidth: 1,
        borderColor: 'silver',
        height: 60

    },
    Ricon: {
        position: 'absolute',
        top: "36%",
        left:7

    },
    Rval: {
        overflow: 'hidden',
        width: '90%',
        height: '90%',
        borderWidth: 1,
        borderColor: 'silver',
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
        shadowColor: 'red',
        // shadowOffset:20,
        shadowOpacity: 0,
        shadowRadius: 20

    },
    Rtext1: {
        fontSize: 20,
        textAlign: 'center',
    },
    Rcon1: {
        marginTop: 60,
        width: "3%",
    },
    RtextInput: {
        width: "96%",
        borderRadius: 10,
        textAlign: "left",
        fontSize: 18,
        padding: 5
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    // End Register






})



export default Styles