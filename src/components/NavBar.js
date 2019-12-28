import React from "react";
import { Header } from 'react-native-elements';

const NavBar = props => (
    <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer(), }}
        centerComponent={{ text: props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
        rightComponent={{ icon: 'settings', color: '#fff' }}
        containerStyle={{
            backgroundColor: '#009999',
        }}
    />
);

export default NavBar;