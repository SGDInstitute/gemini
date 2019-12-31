import { createStackNavigator } from "react-navigation-stack";

import Settings from "./screens/Settings";
import EditSettings from "./screens/EditSettings";

const SettingsStack = createStackNavigator(
    {
        Settings: {
            navigationOptions: {
                tabBarLabel: "All"
            },
            screen: Settings
        },
        EditSettings: {
            navigationOptions: {
                tabBarLabel: "My Schedule"
            },
            screen: EditSettings
        }
    },
    {
        headerMode: 'none'
    }
);

export default SettingsStack;