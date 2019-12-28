import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

import styles from "../styles";
import Activity from '../../components/Activity';

export default class EntireSchedule extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <View style={styles.flex1}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <View style={styles.flex1}>
                    <Activity
                        schedule="Main Track"
                        title="Registration Check-In/Information Table"
                        type="general"
                        location="Bernhard Center"
                        start="2020-02-14 14:00"
                        end="2020-02-14 20:00"
                    />
                </View>
            </View>
        );
    }
}