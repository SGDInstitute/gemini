import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Schedule from "../screens/Schedule";
import Contact from "../screens/Contact";
import Checkin from "../screens/Checkin";
import About from "../screens/About";
import Logout from "../screens/Auth/Logout";
import VirtualNameBadge from "../screens/VirtualNameBadge";

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

        Checkin: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="checkbox-multiple-marked-circle" size={26} style={{ color: tintColor }} />
                ),
                drawerLabel: "Check-in"
            },
            screen: Checkin
        },

        VirtualNameBadge: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="ticket-outline" size={24} style={{ color: tintColor }} />
                ),
                drawerLabel: "Virtual Name Badge"
            },
            screen: VirtualNameBadge
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

        About: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="information-outline" size={26} style={{ color: tintColor }} />
                ),
                drawerLabel: "About"
            },
            screen: About
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

        Logout: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="logout-variant" size={28} style={{ color: tintColor }} />
                ),
                drawerLabel: "Logout"
            },
            screen: Logout
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