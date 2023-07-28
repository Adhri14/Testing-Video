import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Modal, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import VideoControl from "./VideoControl";
import ProgressBar from "./ProgressBar";
import Orientation, { LANDSCAPE, LANDSCAPE_LEFT, OrientationLocker, OrientationType } from "react-native-orientation-locker";

const { width, height } = Dimensions.get('window');

export default function ModalVideo() {
    const videoRef = useRef<Video>(null);
    const [showControl, setShowControl] = useState<boolean>(false);
    const [duration, setDuration] = useState<string>("0:00");
    const [currentDuration, setCurrentDuration] = useState<string>("0:00");
    const [play, setPlay] = useState(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [fullscreen, setFullScreen] = useState(false);

    // useEffect(() => {
    //     if (currentTime === totalDuration) {
    //         videoRef.current?.seek(0);
    //         setPlay(false);
    //     }
    // }, []);

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);
        return () => {
            Orientation.removeOrientationListener(handleOrientation);
        };
    }, []);

    const handleOrientation = (orientation: OrientationType) => {
        setTimeout(() => {
            if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
                setFullScreen(true);
                StatusBar.setHidden(true);
            } else {
                setFullScreen(false);
                StatusBar.setHidden(false);
            }
        }, 1000);
    }

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

    useEffect(() => {
        console.log('cek : ', fullscreen);
        if (fullscreen) {
            Orientation.unlockAllOrientations();
        } else {
            Orientation.lockToLandscape();
        }
    }, [fullscreen]);

    const handleFullscreen = useCallback(() => {
        setFullScreen(!fullscreen);
    }, [fullscreen])

    // console.log(StatusBar.currentHeight)

    return (
        <Modal style={{ width: '100%', height: '100%', paddingTop: StatusBar.currentHeight }} transparent visible={false} animationType="slide">
            <OrientationLocker orientation={LANDSCAPE_LEFT} />
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={fullscreen ? styles.wrapperVideoFull : styles.wrapperVideo}>
                    <Video
                        style={{ width: '100%', height: '100%' }}
                        controls={false}
                        source={require('../videos/video-meme.mp4')}
                        resizeMode="contain"
                        ref={videoRef}
                        onProgress={onProgress}
                        onLoad={onLoad}
                        paused={!play}
                        onEnd={onLoadEnd}
                        muted
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
                                isFullScreen={fullscreen}
                                onHandleFullScreen={handleFullscreen}
                            />
                            : null}
                    </Pressable>

                    <View style={[styles.wrapperProgress, { bottom: fullscreen ? 10 : -20 }]}>
                        <ProgressBar duration={totalDuration} position={currentTime} handleChange={handleChangeProgress} />
                    </View>
                </View>
                {/* {!fullscreen ? <Text>Modal Video</Text> : null} */}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    }
});