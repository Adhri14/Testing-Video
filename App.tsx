import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainAppRoute from "./src/routes/MainAppRoute";

const App = () => {
    return (
        <NavigationContainer>
            <MainAppRoute />
        </NavigationContainer>
    )
}

export default App;