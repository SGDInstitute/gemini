import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Schedule from "./screens/Schedule";
import Maps from "./screens/Maps";
import Contact from "./screens/Contact";
import SettingsStack from "./SettingsStack";
import EvaluationsStack from "./EvaluationsStack";

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="home-outline" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Home"
            },
            screen: Home
        },

        Schedule: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="calendar-multiselect" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Schedule"
            },
            screen: Schedule
        },

        Maps: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="map-marker-outline" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Maps"
            },
            screen: Maps
        },

        Evaluations: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="file-document-outline" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Evaluations"
            },
            screen: EvaluationsStack
        },

        Contact: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="help" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Contact & FAQ"
            },
            screen: Contact
        },

        Settings: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="settings" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Settings"
            },
            screen: SettingsStack
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
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const Main = createAppContainer(MainNavigator);
export default Main;