import React from "react";
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class BackNavBar extends React.Component {
    render() {
        return (
            <Header
                leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.navigate(this.props.back), }}
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
                rightComponent={{ icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate('Settings') }}
                containerStyle={{
                    backgroundColor: '#009999',
                }}
            />
        );
    }
}

export default withNavigation(BackNavBar);