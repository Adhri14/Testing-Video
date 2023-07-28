import React, { useRef, useState } from "react";
import { Dimensions, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { LANDSCAPE, OrientationLocker } from "react-native-orientation-locker";
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import ProgressBar from "../components/ProgressBar";
import VideoControl from "../components/VideoControl";

const { width, height } = Dimensions.get('window');

export default function VideoPlayer() {
    const videoRef = useRef<Video>(null);
    const [showControl, setShowControl] = useState<boolean>(false);
    const [duration, setDuration] = useState<string>("0:00");
    const [currentDuration, setCurrentDuration] = useState<string>("0:00");
    const [play, setPlay] = useState(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);

    const handleShowControl = () => {
        setShowControl(true);
        setTimeout(() => {
            setShowControl(false);
        }, 4000);
    }

    const onProgress = (data: OnProgressData) => {
        const seconds = data?.currentTime;
        const durationMinute = Math.floor(seconds / 60);
        const extraSeconds = Math.ceil(seconds % 60);

        setCurrentDuration(`${durationMinute}:${extraSeconds < 10 ? "0" + extraSeconds : extraSeconds}`);
        setCurrentTime(seconds);
    }

    const onLoad = (data: OnLoadData) => {
        const seconds = data?.duration;
        const durationMinute = Math.floor(data?.duration / 60);
        const extraSeconds = Math.ceil(seconds % 60);

        setDuration(`${durationMinute}:${extraSeconds < 10 ? "0" + extraSeconds : extraSeconds}`);
        setTotalDuration(seconds);
    }

    const onLoadEnd = () => {
        videoRef.current?.seek(0);
        setTimeout(() => {
            setPlay(!play);
        }, 50);
    }

    const handleForward = () => {
        videoRef.current?.seek(currentTime + 15);
        setCurrentTime(currentTime + 15);
    }

    const handleBackward = () => {
        if (currentTime > 0) {
            videoRef.current?.seek(currentTime - 15);
            setCurrentTime(currentTime - 15);
        }
    }

    const handleChangeProgress = (value: number) => {
        videoRef.current?.seek(value);
        setCurrentTime(value);
    }

    return (
        <View style={styles.container}>
            <OrientationLocker orientation={LANDSCAPE} />
            <StatusBar barStyle="light-content" hidden />
            <View style={styles.wrapperVideoFull}>
                <Video
                    style={{ width: '100%', height: '100%' }}
                    controls={false}
                    source={require('../videos/rumah-singgah.mp4')}
                    resizeMode="contain"
                    ref={videoRef}
                    onProgress={onProgress}
                    onLoad={onLoad}
                    paused={!play}
                    onEnd={onLoadEnd}
                // muted
                />
                <Pressable onPress={handleShowControl} style={styles.videoControll}>
                    {showControl ?
                        <VideoControl
                            handlePlayPause={() => setPlay(!play)}
                            isPlay={play}
                            currentDuration={currentDuration}
                            duration={duration}
                            onHandleBackward={handleBackward}
                            onHandleForward={handleForward}
                        />
                        : null}
                </Pressable>

                <View style={[styles.wrapperProgress, { bottom: 10 }]}>
                    <ProgressBar duration={totalDuration} position={currentTime} handleChange={handleChangeProgress} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width
    },
    wrapperVideo: {
        backgroundColor: 'black',
        paddingTop: 60,
        height: 320,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperVideoFull: {
        backgroundColor: 'black',
        height,
        width,
        flex: 1
    },
    videoControll: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    wrapperProgress: {
        position: 'absolute',
        bottom: -18,
        left: 0,
        right: 0,
        width,
    }
});