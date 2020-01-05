import { createStackNavigator } from "react-navigation-stack";

import Maps from "../screens/Maps";
import Location from "../screens/Maps/Location";
import Floor from "../screens/Maps/Floor";

const MapsStack = createStackNavigator(
    {
        Maps: {
            screen: Maps
        },
        Location: {
            screen: Location
        },
        Floor: {
            screen: Floor
        }
    },
    {
        headerMode: 'none'
    }
);

export default MapsStack;