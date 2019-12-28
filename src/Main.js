import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Schedule from "./screens/Schedule";

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Ionicons name="md-home" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Home"
            },
            screen: Home
        },

        Schedule: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Ionicons name="md-calendar" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Schedule"
            },
            screen: Schedule
        },
    },
    {
        contentOptions: {
            activeTintColor: '#009999',
            itemsContainerStyle: {
                marginVertical: 0,
            },
            iconContainerStyle: {
                opacity: 1
            }
        }
    }
);

const Main = createAppContainer(MainNavigator);
export default Main;