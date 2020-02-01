import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Schedule from "../screens/Schedule";
import Contact from "../screens/Contact";
import Checkin from "../screens/Checkin";
import About from "../screens/About";

import EvaluationsStack from "./EvaluationsStack";
import MapsStack from "./MapsStack";
import SettingsStack from "./SettingsStack";

const AppNavigator = createDrawerNavigator(
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
            screen: MapsStack
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
                    <MaterialCommunityIcons name="clippy" size={28} style={{ color: tintColor }} />
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

        Checkin: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="checkbox-multiple-marked-circle" size={26} style={{ color: tintColor }} />
                ),
                drawerLabel: "Check-in"
            },
            screen: Checkin
        },

        About: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="information-outline" size={26} style={{ color: tintColor }} />
                ),
                drawerLabel: "About"
            },
            screen: About
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

export default AppNavigator;