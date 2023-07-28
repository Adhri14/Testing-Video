import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Row } from "../styles";
import { PaymentMethodTypes } from "../screens/Testing";

type TableBodyProps = {
    tanggal?: string;
    jam_masuk?: string;
    jam_keluar?: string;
}

const TableBody = (props: TableBodyProps) => {
    const { tanggal, jam_masuk, jam_keluar } = props;
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: 'royalblue', borderBottomWidth: 1, borderBottomColor: 'blue' },
            ]}>
            <Row align="center">
                <Text
                    style={[styles.thead]}>
                    {tanggal}
                </Text>
                <Text
                    style={[styles.thead]}>
                    {jam_masuk}
                </Text>
                <Text
                    style={[styles.thead]}>
                    {jam_keluar}
                </Text>
            </Row>
        </View>
    );
};

const TableEmpty = () => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: 'white' },
            ]}>
            <Row align="center">
                <Text style={{ color: '#242321' }}>
                    Data masih kosong
                </Text>
            </Row>
        </View>
    );
};

type TableProps = {
    data?: [];
}

const Table = (props: TableProps) => {
    const { data = [] } = props;
    const tempArr: any = [...data];
    return (
        <View style={styles.table}>
            <View style={styles.container}>
                <Row align="center">
                    <Text
                        style={[styles.thead]}>
                        Status
                    </Text>
                    <Text
                        style={[styles.thead]}>
                        Nama Payment
                    </Text>
                    <Text
                        style={[styles.thead]}>
                        Kode
                    </Text>
                </Row>
            </View>
            {tempArr.length > 0 ? (
                tempArr.map((item?: any, index?: number) => (
                    <TableBody
                        key={item?.id}
                        tanggal={item?.status}
                        jam_keluar={
                            item?.title
                        }
                        jam_masuk={
                            item?.notif_date
                        }
                    />
                ))
            ) : (
                <TableEmpty />
            )}
        </View>
    );
};

export default Table;

const styles = StyleSheet.create({
    table: {
        width: "100%",
        overflow: "hidden",
        borderRadius: 10,
    },
    container: {
        width: "100%",
        backgroundColor: "#1DCC70",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    thead: {
        width: 150,
        color: 'white',
        textAlign: 'center'
    },
});