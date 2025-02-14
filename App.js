import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

// スクリーンのインポート（これから作成）
import HomeScreen from "./src/screens/HomeScreen";
import PetProfileScreen from "./src/screens/PetProfileScreen";
import MealRecordScreen from "./src/screens/MealRecordScreen";
import WeightRecordScreen from "./src/screens/WeightRecordScreen";
import HealthCheckScreen from "./src/screens/HealthCheckScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#6200ee",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: "ペット一覧" }} />
                    <Stack.Screen name="PetProfile" component={PetProfileScreen} options={{ title: "ペットプロフィール" }} />
                    <Stack.Screen name="MealRecord" component={MealRecordScreen} options={{ title: "食事記録" }} />
                    <Stack.Screen name="WeightRecord" component={WeightRecordScreen} options={{ title: "体重記録" }} />
                    <Stack.Screen name="HealthCheck" component={HealthCheckScreen} options={{ title: "健康診断記録" }} />
                </Stack.Navigator>
                <StatusBar style="auto" />
            </NavigationContainer>
        </PaperProvider>
    );
}
