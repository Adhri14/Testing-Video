import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Aes, { decrypt, sha256 } from 'react-native-aes-crypto'
import Table from "../components/Table";
import Store from "react-native-fs-store";

export interface PaymentMethodTypes {
    id?: number;
    name?: string;
    code?: string;
    thumbnail?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

export default function Testing(): JSX.Element {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodTypes[]>([]);
    const Storage = new Store('default');
    useEffect(() => {
        // decrypt().then(res => {
        //     const result = JSON.parse(res);
        //     console.log(result)
        //     setPaymentMethods(result);
        // }).catch(err => {
        //     console.log(err);
        // })
        getData();
    }, [])

    const decrypt = () => {
        return Aes.sha256('testing1234').then(shax => {
            return fetch('http://10.233.65.238:8000/api/testing-aes').then(res => res.json()).then(response => {
                return Aes.decrypt(response.data.ciper, shax, response.data.iv, 'aes-256-cbc').then(data => data).catch(err => { throw err });
            })
        });
    };

    const getData = async () => {
        try {
            const JSObject = await Storage.getItem('data-content');
            console.log(JSObject, 'testing');
            setPaymentMethods(JSObject?.newsUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }} horizontal showsHorizontalScrollIndicator={false}>
                <Table data={paymentMethods} />
            </ScrollView>
        </View>
    );
}