import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FAB, Card, Title, Paragraph, Portal, Modal, TextInput, Button, Switch } from "react-native-paper";
import * as Notifications from "expo-notifications";

export default function HealthCheckScreen({ route }) {
    const { petId } = route.params;
    const [visible, setVisible] = useState(false);
    const [newCheck, setNewCheck] = useState({
        date: new Date().toISOString().split("T")[0],
        nextDate: "",
        weight: "",
        temperature: "",
        notes: "",
        setReminder: false,
    });

    // 仮の健康診断記録データ
    const healthChecks = [
        {
            id: 1,
            date: "2025-02-14",
            nextDate: "2025-05-14",
            weight: "12.1",
            temperature: "38.2",
            notes: "予防接種実施。特に問題なし。",
        },
        {
            id: 2,
            date: "2024-11-14",
            nextDate: "2025-02-14",
            weight: "12.0",
            temperature: "38.1",
            notes: "健康状態良好。",
        },
    ];

    const handleSave = async () => {
        // TODO: 新規健康診断記録を保存する処理

        if (newCheck.setReminder && newCheck.nextDate) {
            try {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "健康診断リマインダー",
                        body: "次回の健康診断の予定日です。",
                    },
                    trigger: {
                        date: new Date(newCheck.nextDate),
                    },
                });
            } catch (error) {
                console.error("通知の設定に失敗しました:", error);
            }
        }

        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {healthChecks.map((check) => (
                    <Card key={check.id} style={styles.card}>
                        <Card.Content>
                            <Title>診察日: {check.date}</Title>
                            <Paragraph>
                                次回予定日: {check.nextDate}
                                {"\n"}
                                体重: {check.weight} kg
                                {"\n"}
                                体温: {check.temperature} ℃{"\n"}
                                メモ: {check.notes}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>新規健康診断記録</Title>
                    <TextInput label="診察日" value={newCheck.date} onChangeText={(text) => setNewCheck({ ...newCheck, date: text })} style={styles.input} />
                    <TextInput label="次回予定日" value={newCheck.nextDate} onChangeText={(text) => setNewCheck({ ...newCheck, nextDate: text })} style={styles.input} />
                    <TextInput label="体重 (kg)" value={newCheck.weight} onChangeText={(text) => setNewCheck({ ...newCheck, weight: text })} keyboardType="numeric" style={styles.input} />
                    <TextInput label="体温 (℃)" value={newCheck.temperature} onChangeText={(text) => setNewCheck({ ...newCheck, temperature: text })} keyboardType="numeric" style={styles.input} />
                    <TextInput label="メモ" value={newCheck.notes} onChangeText={(text) => setNewCheck({ ...newCheck, notes: text })} multiline numberOfLines={3} style={styles.input} />
                    <View style={styles.reminderContainer}>
                        <Paragraph>次回の予定を通知する</Paragraph>
                        <Switch value={newCheck.setReminder} onValueChange={(value) => setNewCheck({ ...newCheck, setReminder: value })} />
                    </View>
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
    reminderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
        backgroundColor: "#6200ee",
    },
});
