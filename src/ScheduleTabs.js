import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import EntireSchedule from "./screens/Schedule/EntireSchedule";
import PersonalSchedule from "./screens/Schedule/PersonalSchedule";

const ScheduleTabNavigator = createMaterialTopTabNavigator(
    {
        EntireSchedule: {
            navigationOptions: {
                tabBarLabel: "All"
            },
            screen: EntireSchedule
        },
        PersonalSchedule: {
            navigationOptions: {
                tabBarLabel: "My Schedule"
            },
            screen: PersonalSchedule
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#cad0d6',
            indicatorStyle: '#f2b716',
            labelStyle: {
                fontSize: 14,
            },
            style: {
                backgroundColor: '#1a7796',
            },
        }
    }
);

export default ScheduleTabNavigator;