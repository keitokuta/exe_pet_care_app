import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Card, Title, Divider } from "react-native-paper";

export default function PetProfileScreen({ route, navigation }) {
    const { mode, petId } = route.params || { mode: "create" };
    const [petData, setPetData] = useState({
        name: "",
        type: "",
        breed: "",
        age: "",
        weight: "",
        birthDate: "",
    });

    useEffect(() => {
        if (mode === "edit" && petId) {
            // TODO: ここでペットデータを取得する
            setPetData({
                name: "ポチ",
                type: "犬",
                breed: "柴犬",
                age: "3",
                weight: "12",
                birthDate: "2020-01-01",
            });
        }
    }, [mode, petId]);

    const handleSave = () => {
        // TODO: データを保存する処理
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>基本情報</Title>
                    <TextInput label="名前" value={petData.name} onChangeText={(text) => setPetData({ ...petData, name: text })} style={styles.input} />
                    <TextInput label="種類" value={petData.type} onChangeText={(text) => setPetData({ ...petData, type: text })} style={styles.input} />
                    <TextInput label="品種" value={petData.breed} onChangeText={(text) => setPetData({ ...petData, breed: text })} style={styles.input} />
                    <TextInput label="年齢" value={petData.age} onChangeText={(text) => setPetData({ ...petData, age: text })} keyboardType="numeric" style={styles.input} />
                </Card.Content>
            </Card>

            {mode === "edit" && (
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={() => navigation.navigate("MealRecord", { petId })} style={styles.button}>
                        食事記録
                    </Button>
                    <Button mode="contained" onPress={() => navigation.navigate("WeightRecord", { petId })} style={styles.button}>
                        体重記録
                    </Button>
                    <Button mode="contained" onPress={() => navigation.navigate("HealthCheck", { petId })} style={styles.button}>
                        健康診断記録
                    </Button>
                </View>
            )}

            <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
                保存
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    card: {
        margin: 16,
        elevation: 4,
    },
    input: {
        marginBottom: 12,
    },
    buttonContainer: {
        padding: 16,
    },
    button: {
        marginBottom: 12,
        backgroundColor: "#6200ee",
    },
    saveButton: {
        margin: 16,
        backgroundColor: "#4CAF50",
    },
});
