import React from 'react';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import ContentModal from '../ContentModal';

export default function Photo() {
    return (
        <ContentModal title="Photo" icon="camera">
            <Text style={[t.mB2]}>The Midwest Institute for Sexuality and Gender Diversity (the Institute) or authorized licenses of the Midwest Bisexual Lesbian Gay Transgender Asexual College Conference (MBLGTACC) will be photographing common spaces, keynotes, and entertainment during MBLGTACC weekend (the Event), and any onstage discussions thereafter. The goal of this photography is to share the best moments of the Event with alumni, supporters, and other community members, to celebrate our community, and to enhance the visibility of the Institute and the Event in the Midwest and nationally.</Text>

            <Text style={[t.mB2]}>The Institute respects, protects, and centers the rights of students who do not consent to be photographed. To that end, MBLGTACC and the Institute:</Text>

            <View style={[t.mL4]}>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>{'\u2022'}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Will offer intentional spaces where photography by attendees is welcome and encouraged;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>{'\u2022'}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Will offer wearable markers for attendees to flag for others that they do not consent to be photographed;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>{'\u2022'}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Will not share on its website or social media any photographs featuring attendees with do not photograph markers;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>{'\u2022'}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Will not tolerate non-consensual photography by attendees and guests;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>{'\u2022'}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Requires that all attendees and guests obtain permission before posting photos of others taken at the conference to social media; and</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>{'\u2022'}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Requires that all attendees and guests obtain permission before tagging someone in a post at the conference on social media</Text>
                </View>
            </View>

            <Text style={[t.mB2]}>By attending the Event, you acknowledge that the commissioned photos and recordings belong to the Institute, and you will not receive payment or any other compensation in connection with the pictures and recordings. You further release MBLGTACC and the Institute from any and all liability that may or could arise from the taking or use of the pictures.</Text>

            <Text style={[t.mB12]}>This policy has been created for the greater safety and access of all guests and attendees. You may discuss this policy further with the Institute's director of marketing and communications, Nick Pfost (marketing@sgdinstitute.org).</Text>
        </ContentModal>
    );
}