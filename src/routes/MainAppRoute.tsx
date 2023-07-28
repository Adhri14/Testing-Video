import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import VideoPlayer from "../screens/VideoPlayer";
import Testing from "../screens/Testing";

const Stack = createStackNavigator();

export default function MainAppRoute() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Testing" component={Testing} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}