import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";

const AuthNavigator = createStackNavigator(
    {
        Login,
        Register
    },
    {
        headerMode: 'none'
    }
);

export default AuthNavigator;