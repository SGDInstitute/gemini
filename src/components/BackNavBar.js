import React from "react";
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class BackNavBar extends React.Component {
    render() {
        return (
            <Header
                leftComponent={{ icon: 'arrow-back', color: '#fff', underlayColor: '#546163', onPress: () => this.props.navigation.navigate(this.props.back, this.props.data), }}
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
                containerStyle={{
                    backgroundColor: '#009999',
                }}
            />
        );
    }
}

export default withNavigation(BackNavBar);