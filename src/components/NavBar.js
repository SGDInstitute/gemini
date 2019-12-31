import React from "react";
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class NavBar extends React.Component {
    render() {
        return (
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
                rightComponent={{ icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate('Settings') }}
                containerStyle={{
                    backgroundColor: '#009999',
                }}
            />
        );
    }
}

export default withNavigation(NavBar);