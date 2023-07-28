import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Store from "react-native-fs-store";
import { fetch } from "react-native-ssl-pinning";

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
    const [banner, setBanner] = useState([]);
    const [bod, setBod] = useState([]);
    const [infoUpdate, setInfoUpdate] = useState([]);
    const [newsUpdate, setNewsUpdate] = useState([]);
    const [onStage, setOnStage] = useState([]);
    const [tipsCorner, setTipsCorner] = useState([]);
    const Storage = new Store('default');

    const deviceId = "7101fc8ae6ea09c7";
    const token = "6495d15d49b942e1752d01d062df9ff236b82b95";
    const sessionId = "qi0y5ihipy";

    useEffect(() => {
        getBanner().finally(() => {
            getBod().finally(() => {
                getNewsUpdate().finally(() => {
                    getInfoUpdate().finally(() => {
                        getOnStage().finally(() => {
                            getTipsCorner().finally(() => {
                                saveToFS().then();
                            });
                        })
                    })
                })
            })
        })
    }, []);

    const getBanner = async () => {
        try {
            const config = {
                method: 'POST',
                body: JSON.stringify({
                    device_id: deviceId,
                    id_session: sessionId,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                sslPinning: {
                    certs: ['bristars_prod']
                }
            }
            const res = await fetch('http://10.35.65.88/bristars_api/api/oauth2/banner/allPrivateBanner', config);
            const data = await res.json();
            let newData: any = [];
            if (Array.isArray(data.data_banner)) {
                data.data_banner.map((item: any) => {
                    newData.push(item);
                });
            }
            setBanner(newData);
        } catch (error) {
            console.log(error);
            setBanner([]);
        }
    }

    const getBod = async () => {
        try {
            const config = {
                method: 'POST',
                body: JSON.stringify({
                    device_id: deviceId,
                    id_session: sessionId,
                    content_type: 1,
                    start: 0,
                    limit: 2,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                sslPinning: {
                    certs: ['bristars_prod']
                }
            }
            const res = await fetch('http://10.35.65.88/bristars_api/api/oauth2/content/allContent', config);
            const data = await res.json();
            let newData: any = [];
            if (Array.isArray(data.data)) {
                data.data.map((item: any) => {
                    newData.push(item);
                });
            }
            setBod(newData);
        } catch (error) {
            console.log(error);
            setBod([]);
        }
    }

    const getNewsUpdate = async () => {
        try {
            const config = {
                method: 'POST',
                body: JSON.stringify({
                    device_id: deviceId,
                    id_session: sessionId,
                    content_type: 2,
                    start: 0,
                    limit: 5,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                sslPinning: {
                    certs: ['bristars_prod']
                }
            }
            const res = await fetch('http://10.35.65.88/bristars_api/api/oauth2/content/allContent', config);
            const data = await res.json();
            let newData: any = [];
            if (Array.isArray(data.data)) {
                data.data.map((item: any) => {
                    newData.push(item);
                });
            }
            setNewsUpdate(newData);
        } catch (error) {
            console.log(error);
            setNewsUpdate([]);
        }
    }

    const getInfoUpdate = async () => {
        try {
            const config = {
                method: 'POST',
                body: JSON.stringify({
                    device_id: deviceId,
                    id_session: sessionId,
                    content_type: 3,
                    start: 0,
                    limit: 3,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                sslPinning: {
                    certs: ['bristars_prod']
                }
            }
            const res = await fetch('http://10.35.65.88/bristars_api/api/oauth2/content/allContent', config);
            const data = await res.json();
            let newData: any = [];
            if (Array.isArray(data.data)) {
                data.data.map((item: any) => {
                    newData.push(item);
                });
            }
            setInfoUpdate(newData);
        } catch (error) {
            console.log(error);
            setInfoUpdate([]);
        }
    }

    const getOnStage = async () => {
        try {
            const config = {
                method: 'POST',
                body: JSON.stringify({
                    device_id: deviceId,
                    id_session: sessionId,
                    content_type: 4,
                    start: 0,
                    limit: 3,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                sslPinning: {
                    certs: ['bristars_prod']
                }
            }
            const res = await fetch('http://10.35.65.88/bristars_api/api/oauth2/content/allContent', config);
            const data = await res.json();
            let newData: any = [];
            if (Array.isArray(data.data)) {
                data.data.map((item: any) => {
                    newData.push(item);
                });
            }
            setOnStage(newData);
        } catch (error) {
            console.log(error);
            setOnStage([]);
        }
    }

    const getTipsCorner = async () => {
        try {
            const config = {
                method: 'POST',
                body: JSON.stringify({
                    device_id: deviceId,
                    id_session: sessionId,
                    content_type: 5,
                    start: 0,
                    limit: 4,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                sslPinning: {
                    certs: ['bristars_prod']
                }
            }
            const res = await fetch('http://10.35.65.88/bristars_api/api/oauth2/content/allContent', config);
            const data = await res.json();
            let newData: any = [];
            if (Array.isArray(data.data)) {
                data.data.map((item: any) => {
                    newData.push(item);
                });
            }
            setTipsCorner(newData);
        } catch (error) {
            console.log(error);
            setTipsCorner([]);
        }
    }

    console.log({ banner, bod, newsUpdate, infoUpdate, onStage, tipsCorner });

    const saveToFS = async () => {
        try {
            const data_content = { banner, bod, newsUpdate, infoUpdate, onStage, tipsCorner }
            await Storage.setItem('data-content', data_content);
            console.log('sukses simpan data');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <SafeAreaView style={styles.page}>
            <Pressable onPress={() => navigation.navigate('Testing')}>
                <View style={styles.video}>
                    <Image source={require('../images/cover-rumah-singgah.jpeg')} style={styles.image} />
                    <View style={styles.duration}>
                        <Text style={styles.textDuration}>4.22</Text>
                    </View>
                </View>
                <Pressable style={styles.wrapperContent}>
                    <Image source={require('../images/cover-rumah-singgah.jpeg')} style={styles.profile} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.titleVideo}>FABIO ASHER - RUMAH SINGGAH (OFFICIAL MUSIC VIDEO)</Text>
                        <Text style={styles.subtitleVideo}>Fabio Asher • 129 jt x ditonton • 1 tahun yang lalu</Text>
                    </View>
                </Pressable>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        padding: 20
    },
    video: {
        width,
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    wrapperContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    titleVideo: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'black',
    },
    subtitleVideo: {
        fontWeight: 'normal',
        fontSize: 8,
        color: 'gray',
        marginTop: 5
    },
    duration: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 5
    },
    textDuration: {
        color: 'white',
        fontSize: 14
    }
});