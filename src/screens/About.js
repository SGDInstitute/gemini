import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';

import NavBar from '../components/NavBar';
import Inclusion from '../components/Policies/Inclusion';
import Photo from '../components/Policies/Photo';
import Privacy from '../components/Policies/Privacy';
import Refund from '../components/Policies/Refund';

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
    {
        title: 'Website',
        icon: 'monitor-dashboard',
        link: 'https://mblgtacc.org'
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
    {
        title: 'Website',
        icon: 'monitor-dashboard',
        link: 'https://sgdinstitute.org'
    },
];

export default class About extends React.PureComponent {
    openLink(item) {
        Linking.openURL(item.link)
    }

    render() {
        const buildVersion = Constants.nativeBuildVersion;

        return (
            <View style={[t.flex1]}>
                <NavBar title="About" />
                <ScrollView>
                    <Text style={[t.pX4, t.pY8]}>The Midwest Bisexual Lesbian Gay Transgender Asexual College Conference (MBLGTACC) is America's largest and oldest continuously-running conference for queer and trans+ college students. “MBLGTACC,” “Midwest Bisexual Lesbian Gay Transgender Asexual College Conference,” “Midwest Bisexual Lesbian Gay Transgender Ally College Conference,” and the MBLGTACC logo are servicemarks of the Midwest Institute for Sexuality and Gender Diversity, a non-profit 501(c)(3) organization.</Text>

                    <View>
                        <Text style={[t.p4, t.bgGray200, t.border, t.borderGray400, t.textLg]}>Policies</Text>
                        <Inclusion />
                        <Photo />
                        <Refund />
                        <Privacy />
                    </View>

                    <View>
                        <Text style={[t.p4, t.bgGray200, t.border, t.borderGray400, t.textLg]}>MBLGTACC Social Links</Text>
                        {
                            mblgtacc.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={<MaterialCommunityIcons name={item.icon} size={28} />}
                                    onPress={() => this.openLink(item)}
                                    bottomDivider
                                    chevron
                                />
                            ))
                        }
                    </View>

                    <View>
                        <Text style={[t.p4, t.bgGray200, t.border, t.borderGray400, t.textLg]}>SGD Institute Social Links</Text>
                        {
                            sgdinstitute.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={<MaterialCommunityIcons name={item.icon} size={28} />}
                                    onPress={() => this.openLink(item)}
                                    bottomDivider
                                    chevron
                                />
                            ))
                        }
                    </View>

                    <View style={[t.pB8]}>
                        <Text style={[t.p4, t.bgGray200, t.border, t.borderGray400, t.textLg]}>App Version</Text>
                        <Text style={[t.p4, t.textLg]}>{buildVersion}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}