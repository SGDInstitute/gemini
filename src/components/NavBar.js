import React from "react";
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class NavBar extends React.Component {
    render() {
        if (this.props.right) {
            const { rightPress } = this.props;

            return (
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={{ icon: 'menu', color: '#fff', size: 28, iconStyle: { padding: 5 }, underlayColor: '#546163', onPress: () => this.props.navigation.openDrawer(), }}
                    centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
                    rightComponent={{ icon: this.props.right, color: '#fff', underlayColor: '#546163', onPress: rightPress, }}
                    containerStyle={{
                        backgroundColor: '#009999',
                    }}
                />
            );
        }

        return (
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'menu', color: '#fff', size: 28, iconStyle: { padding: 5 }, underlayColor: '#546163', onPress: () => this.props.navigation.openDrawer(), }}
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
                containerStyle={{
                    backgroundColor: '#009999',
                }}
            />
        );
    }
}

export default withNavigation(NavBar);