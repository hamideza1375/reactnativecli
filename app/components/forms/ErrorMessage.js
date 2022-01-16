import React from "react";
import { StyleSheet } from "react-native";
import ToplearnText from "./../shared/ToplearnText";

const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;

    return (
        <ToplearnText fontFamily="ih" size="1.5" styles={styles.error}>
            {error}
        </ToplearnText>
    );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    error: {
        color: "red",
    },
});
