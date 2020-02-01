import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NavBar from '../components/NavBar';

const mblgtacc = [
    {
        title: 'Facebook',
        icon: 'facebook',
        link: 'https://facebook.com/mblgtacc'
    },
    {
        title: 'Twitter',
        icon: 'twitter',
        link: 'https://twitter.com/mblgtacc'
    },
    {
        title: 'Instagram',
        icon: 'instagram',
        link: 'https://instagram.com/mblgtacc'
    },
];

const sgdinstitute = [
    {
        title: 'Facebook',
        icon: 'facebook',
        link: 'https://facebook.com/sgdinstitute'
    },
    {
        title: 'Twitter',
        icon: 'twitter',
        link: 'https://twitter.com/sgdinstitute'
    },
    {
        title: 'Instagram',
        icon: 'instagram',
        link: 'https://instagram.com/sgdinstitute'
    },
    {
        title: 'YouTube',
        icon: 'youtube',
        link: 'https://www.youtube.com/c/sgdinstituteorg'
    },
    {
        title: 'Flickr',
        icon: 'flickr',
        link: 'https://www.flickr.com/sgdinstitute'
    },
    {
        title: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/company/12175681?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A12175681%2Cidx%3A2-1-2%2CtarId%3A1472680024853%2Ctas%3AMidwest%20Institute%20for%20Se'
    },
];

export default class About extends React.PureComponent {
    render() {
        return (
            <View style={[t.flex1]}>
                <NavBar title="About" />
                <ScrollView>
                    <Text style={[t.pX4, t.pY8]}>The Midwest Bisexual Lesbian Gay Transgender Asexual College Conference (MBLGTACC) is the larges, longest running queer college conference in the United States. Founded in 1993, MBLGTACC aims to connect, educate, and empower LGBTQIA+ students across the Midwest, and highlight the work being done by the queer and trans community that is often overlooked by those who think this type of work is only possible on the coasts.</Text>
                    <View>
                        {
                            mblgtacc.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={<MaterialCommunityIcons name={item.icon} size={28} />}
                                    onPress={() => Linking.openURL(item.link)}
                                    topDivider={i === 0}
                                    bottomDivider
                                    chevron
                                />
                            ))
                        }
                    </View>

                    <Text style={[t.pX4, t.pY8]}>The Midwest Institute for Sexuality and Gender Diversity (the Institute) is a non-profit organization born out of MBLGTACC. We are an all volunteer team of mostly previous MBLGTACC student planners who assist the current student planning teams with big picture logistics and advising to help the conference transition smoothly each year as the host school changes. We are also looking to add additional programing for LGBTQIA+ students across the Midwest.</Text>
                    <View style={[t.pB8]}>
                        {
                            sgdinstitute.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={<MaterialCommunityIcons name={item.icon} size={28} />}
                                    onPress={() => Linking.openURL(item.link)}
                                    topDivider={i === 0}
                                    bottomDivider
                                    chevron
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}