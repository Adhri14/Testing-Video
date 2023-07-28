import React from "react";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import IcVideoPlay from "../icons/video-play.svg";
import IcVideoPause from "../icons/video-pause.svg";
import IcVideoForward from "../icons/video-forward.svg";
import IcVideoBackward from "../icons/video-backward.svg";
import IcOpenFullScreen from "../icons/fullscreen-open.svg";
import IcCloseFullScreen from "../icons/fullscreen-close.svg";

interface VideoControlProps {
    duration?: string;
    currentDuration?: string;
    isPlay?: boolean;
    handlePlayPause?: () => void;
    onHandleForward?: () => void;
    onHandleBackward?: () => void;
    onHandleFullScreen?: () => void;
    isFullScreen?: boolean
}

const { width } = Dimensions.get('window');

export default function VideoControl(props: Partial<VideoControlProps>) {
    const { duration, isPlay, currentDuration, handlePlayPause, onHandleForward, onHandleBackward, isFullScreen, onHandleFullScreen } = props;
    return (
        <View style={styles.container}>
            <View style={styles.rowControl}>
                <Pressable onPress={onHandleBackward}>
                    <IcVideoBackward />
                </Pressable>
                <Pressable onPress={handlePlayPause}>
                    {isPlay ? <IcVideoPause width={50} height={50} /> : <IcVideoPlay width={50} height={50} />}
                </Pressable>
                <Pressable onPress={onHandleForward}>
                    <IcVideoForward />
                </Pressable>
            </View>
            <View style={[styles.controlBottom, { bottom: 50 }]}>
                <Text style={styles.duration}>{currentDuration} / <Text style={{ color: 'gray' }}>{duration}</Text></Text>
                <Pressable onPress={onHandleFullScreen}>
                    {!isFullScreen ? <IcOpenFullScreen width={15} height={15} /> : <IcCloseFullScreen width={15} height={15} />}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width
    },
    rowControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    controlBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        alignItems: 'center',
        width
    },
    duration: {
        fontSize: 10,
        color: 'white'
    }
});