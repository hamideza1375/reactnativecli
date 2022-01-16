import React, { Component, useEffect, useState } from "react";
import { LayoutAnimation, ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";

export default function App(props) {

  const [AccordionData, setAccordionData] = useState([
    {
      expanded: false,
      category_Name: "Mobiles",
      sub_Category: [
        { id: 1, name: "Mi" },
        { id: 2, name: "RealMe" },
        { id: 3, name: "Samsung" }]},
    {
      expanded: false,
      category_Name: "Laptops",
      sub_Category: [
        { id: 8, name: "Dell" },
        { id: 9, name: "MAC" },
        { id: 10, name: "HP" },
      ],
    },
    {
      expanded: false,
      category_Name: "Computer Accessories",
      sub_Category: [
        { id: 12, name: "Pendrive" },
        { id: 13, name: "Bag" },
      ],
    },
    {
      expanded: false,
      category_Name: "Home Entertainment",
      sub_Category: [{ id: 16, name: "Home Audio Speakers" }],
    },
    {
      expanded: false,
      category_Name: "TVs by brand",
      sub_Category: [{ id: 20, name: "Mi" }],
    },
    {
      expanded: false,
      category_Name: "Kitchen Appliances",
      sub_Category: [{ id: 24, name: "Microwave Ovens" }],
    },
  ]);

  const [show, setShow] = useState(false);

  const update_Layout = (index) => {
    const array = [...AccordionData];
    array[index]["expanded"] = !array[index]["expanded"];
    setAccordionData(array);
  };

  return (
    <ScrollView>
      {AccordionData.map((item, key) => (
        <View key={key}>
          <TouchableOpacity onPress={() => { setShow(!show); update_Layout(key);}}
            activeOpacity={0.8} style={styles.category_View}>
            <Text style={styles.category_Text}>{item.category_Name} </Text>
          </TouchableOpacity>

          <View style={{ height: item.expanded ? null : 0, overflow: "hidden" }}>
            {item.sub_Category.map((item, key) => (
              <TouchableOpacity key={key} style={styles.sub_Category_Text}>
                <Text> {item.name} </Text>

                <View style={{ width: "100%", height: 1, backgroundColor: "#000" }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#F5FCFF",
  },
  iconStyle: {
    width: 30,
    height: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    tintColor: "#fff",
  },

  sub_Category_Text: {
    fontSize: 18,
    color: "#000",
    padding: 10,
  },

  category_Text: {
    textAlign: "left",
    color: "#fff",
    fontSize: 21,
    padding: 10,
  },
  category_View: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091EA",
  },

  Btn: {
    padding: 10,
    backgroundColor: "#FF6F00",
  },
});
