import Slider from "@react-native-community/slider";
import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
    duration?: number;
    handleChange?: (value: number) => void;
    position?: number;
}

export default function ProgressBar(props: Partial<ProgressBarProps>) {
    const { duration, handleChange, position } = props;
    return (
        <Slider
            style={styles.indicator}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="red"
            maximumTrackTintColor="white"
            thumbTintColor="red"
            onSlidingComplete={handleChange}
        />
    );
}

const styles = StyleSheet.create({
    indicator: { width: '100%', height: 30 },
});