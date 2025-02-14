import React from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Card, Title, Paragraph } from "react-native-paper";

export default function HomeScreen({ navigation }) {
    // 仮のペットデータ
    const pets = [
        { id: 1, name: "ポチ", type: "犬", breed: "柴犬", age: 3 },
        { id: 2, name: "タマ", type: "猫", breed: "雑種", age: 2 },
    ];

    return (
        <View style={styles.container}>
            {pets.map((pet) => (
                <Card key={pet.id} style={styles.card} onPress={() => navigation.navigate("PetProfile", { petId: pet.id })}>
                    <Card.Content>
                        <Title>{pet.name}</Title>
                        <Paragraph>
                            {pet.type} ({pet.breed}) - {pet.age}歳
                        </Paragraph>
                    </Card.Content>
                </Card>
            ))}

            <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate("PetProfile", { mode: "create" })} label="ペットを追加" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#6200ee",
    },
});
