import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { FAB, Card, Title, Portal, Modal, TextInput, Button } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

export default function WeightRecordScreen({ route }) {
    const { petId } = route.params;
    const [visible, setVisible] = useState(false);
    const [newWeight, setNewWeight] = useState({
        date: new Date().toISOString().split("T")[0],
        weight: "",
    });

    // 仮の体重記録データ
    const weightRecords = [
        { id: 1, date: "2025-02-01", weight: "12.0" },
        { id: 2, date: "2025-02-07", weight: "12.2" },
        { id: 3, date: "2025-02-14", weight: "12.1" },
    ];

    const chartData = {
        labels: weightRecords.map((record) => record.date.slice(5)),
        datasets: [
            {
                data: weightRecords.map((record) => parseFloat(record.weight)),
                color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const handleSave = () => {
        // TODO: 新規体重記録を保存する処理
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title>体重の推移</Title>
                        <LineChart
                            data={chartData}
                            width={Dimensions.get("window").width - 32}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#ffffff",
                                backgroundGradientFrom: "#ffffff",
                                backgroundGradientTo: "#ffffff",
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={styles.chart}
                        />
                    </Card.Content>
                </Card>

                {weightRecords.map((record) => (
                    <Card key={record.id} style={styles.card}>
                        <Card.Content>
                            <Title>{record.date}</Title>
                            <Title>{record.weight} kg</Title>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>新規体重記録</Title>
                    <TextInput label="日付" value={newWeight.date} onChangeText={(text) => setNewWeight({ ...newWeight, date: text })} style={styles.input} />
                    <TextInput label="体重 (kg)" value={newWeight.weight} onChangeText={(text) => setNewWeight({ ...newWeight, weight: text })} keyboardType="numeric" style={styles.input} />
                    <Button mode="contained" onPress={handleSave} style={styles.button}>
                        保存
                    </Button>
                </Modal>
            </Portal>

            <FAB style={styles.fab} icon="plus" onPress={() => setVisible(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    card: {
        margin: 8,
        elevation: 4,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#6200ee",
    },
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    modalTitle: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
        backgroundColor: "#6200ee",
    },
});
