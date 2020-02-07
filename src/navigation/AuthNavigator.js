import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import ForgotPassword from "../screens/Auth/ForgotPassword";

const AuthNavigator = createStackNavigator(
    {
        Login,
        Register,
        ForgotPassword,
    },
    {
        headerMode: 'none'
    }
);

export default AuthNavigator;