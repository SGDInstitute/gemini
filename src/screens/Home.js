import React from 'react';
import { AsyncStorage, ScrollView, View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import ImageCard from '../components/ImageCard';
import Card from '../components/Card';

import { getBulletins } from "../utils/api";

import styles from "./styles";

export default class Home extends React.Component {
    state = {
        bulletins: [],
        refreshing: false,
    }

    componentDidMount = async () => {
        this.getBulletins();
    }

    onRefresh = () => {
        this.setState({ refreshing: true });

        this.refreshBulletins().then(() => this.setState({ refreshing: false }));
    }

    getBulletins = async () => {
        const bulletins = await AsyncStorage.getItem('bulletins');

        if (bulletins) {
            this.setState({ bulletins: JSON.parse(bulletins) });
        } else {
            let bulletins = (await getBulletins()).payload;
            this.setState({ bulletins: bulletins });
        }
    }

    refreshBulletins = async () => {
        let bulletins = (await getBulletins()).payload;
        this.setState({ bulletins: bulletins });
    }

    renderImageBulletin = bulletin => {
        if (typeof bulletin.links === 'string') {
            bulletin.links = JSON.parse(bulletin.links);
        }

        return (
            <ImageCard key={bulletin.id} image={bulletin.image}>
                <Text>{bulletin.content}</Text>
                <View style={[t.mT4, t.flexRow]}>
                    {bulletin.links.map((link, index) => {
                        const inlineStyles = {
                            flex: 1,
                        };

                        if (bulletin.links.length > 1 && bulletin.links.length !== index + 1) {
                            inlineStyles.marginRight = 8;
                        }

                        return (
                            <TouchableOpacity key={index} style={inlineStyles}>
                                <Text style={styles.btn} onPress={() => this.props.navigation.navigate(link.link)}>{link.text}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ImageCard>
        );
    }

    renderCardBulletin = bulletin => {
        if (typeof bulletin.links === 'string') {
            bulletin.links = JSON.parse(bulletin.links);
        }

        return (
            <Card key={bulletin.id}>
                <Text>{bulletin.content}</Text>
                <View style={[t.mT4, t.flexRow]}>
                    {bulletin.links.map((link, index) => {
                        const inlineStyles = {
                            flex: 1,
                        };

                        if (bulletin.links.length > 1 && bulletin.links.length !== index + 1) {
                            inlineStyles.marginRight = 8;
                        }

                        return (
                            <TouchableOpacity key={index} style={inlineStyles}>
                                <Text style={styles.btn} onPress={() => this.props.navigation.navigate(link.link)}>{link.text}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Card>
        );
    }

    renderBulletins = () => {
        const { bulletins } = this.state;

        if (bulletins.length > 0) {
            return bulletins.map(bulletin => {
                if (bulletin.image !== null) {
                    return this.renderImageBulletin(bulletin);
                }

                return this.renderCardBulletin(bulletin);
            });
        }

    }

    render() {
        const { refreshing } = this.state;

        return (
            <View style={styles.flex1}>
                <NavBar title="Home" />
                <ScrollView
                    contentContainerStyle={[styles.pY8]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
                    }>
                    {this.renderBulletins()}
                </ScrollView>
            </View>
        );
    }
}