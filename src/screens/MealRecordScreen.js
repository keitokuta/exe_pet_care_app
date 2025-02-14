import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FAB, Card, Title, Paragraph, Portal, Modal, TextInput, Button } from "react-native-paper";

export default function MealRecordScreen({ route }) {
    const { petId } = route.params;
    const [visible, setVisible] = useState(false);
    const [newMeal, setNewMeal] = useState({
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString().slice(0, 5),
        type: "",
        amount: "",
    });

    // 仮の食事記録データ
    const meals = [
        { id: 1, date: "2025-02-14", time: "07:00", type: "ドライフード", amount: "100g" },
        { id: 2, date: "2025-02-14", time: "19:00", type: "ドライフード", amount: "100g" },
    ];

    const handleSave = () => {
        // TODO: 新規食事記録を保存する処理
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {meals.map((meal) => (
                    <Card key={meal.id} style={styles.card}>
                        <Card.Content>
                            <Title>{meal.date}</Title>
                            <Paragraph>
                                時間: {meal.time}
                                {"\n"}
                                種類: {meal.type}
                                {"\n"}
                                量: {meal.amount}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>新規食事記録</Title>
                    <TextInput label="日付" value={newMeal.date} onChangeText={(text) => setNewMeal({ ...newMeal, date: text })} style={styles.input} />
                    <TextInput label="時間" value={newMeal.time} onChangeText={(text) => setNewMeal({ ...newMeal, time: text })} style={styles.input} />
                    <TextInput label="種類" value={newMeal.type} onChangeText={(text) => setNewMeal({ ...newMeal, type: text })} style={styles.input} />
                    <TextInput label="量" value={newMeal.amount} onChangeText={(text) => setNewMeal({ ...newMeal, amount: text })} style={styles.input} />
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
    button: {
        marginTop: 16,
        backgroundColor: "#6200ee",
    },
});
