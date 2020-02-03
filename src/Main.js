import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import LoadingScreen from './screens/Auth/LoadingScreen'

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppNavigator,
            Auth: AuthNavigator,
        },
        {
            initialRouteName: 'Loading',
        }
    )
);