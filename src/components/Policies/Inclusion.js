import React from 'react';
import { Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

import ContentModal from '../ContentModal';

export default function Inclusion() {
    return (
        <ContentModal title="Inclusion" icon="all-inclusive">
            <Text style={[t.mB2]}>By attending the Midwest Bisexual Lesbian Gay Transgender Asexual College Conference, you agree to the following Code for Inclusion:</Text>
            <Text style={[t.mB2]}>This policy has been created for the greater safety and access of all guests and attendees.</Text>
            <Text style={[t.mB2]}>We have zero-tolerance for harassment of any kind, including but not limited to: stalking, offensive verbal comments, non-consensual photography or recording, bathroom policing, unwelcome physical attention, intimidation, physical or sexual assault, and/or inappropriate physical contact.</Text>
            <Text style={[t.mB2]}>We encourage anyone engaging in sexual activity to do so safely and consensually. We encourage the use of condoms, dental dams, lubricant, or other forms of protection. While this is a sex-positive space, be courteous to those who do not wish to engage in sexual activity, or those who may be sex-repulsed. Inversely, do not shame or judge those who engage in sexual activity, especially those who participate in kink communities. Your body, your choice.</Text>
            <Text style={[t.mB2]}>Consent should be received for any sexual and/or physical contact. Consent is ongoing and enthusiastic and can be given or taken away at any time.</Text>
            <Text style={[t.mB2]}>Provide content and/or trigger warnings whenever possible. Allow others to name their triggers when they arise and determine how to move forward without causing additional harm or dismissing the incident.</Text>
            <Text style={[t.mB2]}>Be mindful of your language. While we are all learning and you may not be aware of certain phrases that others may find offensive, be receptive to being informed by attendees, reflect when addressed, and adjust accordingly. This includes honoring people's pronouns and names and avoiding ableist language.</Text>
            <Text style={[t.mB2]}>If you encounter someone with a service, assistance, or guide animal, you should NOT touch, offer food to, or interact with the animal in any way unless otherwise explicitly stated by the owner. Service animals can sometimes be identified by a vest or other article of clothing indicating they are assisting.</Text>
            <Text style={[t.mB2]}>Please honor any accommodation or accessibility needs provided to attendees. Do not inhibit the assistance provided to and/or used by attendees such as ASL interpreters, reserved seating, service animals, or other types of services/equipment.</Text>
            <Text style={[t.mB2]}>Consider how your identities impact the space you're in. There are numerous intersections of identities present and it is vital to give room to those who are often denied the ability to take up space.</Text>
            <Text style={[t.mB2]}>Be sure to obtain permission before posting and/or tagging pictures of other attendees on social media. Avoid using bright or flashing lights whenever possible.</Text>
            <Text style={[t.mB2]}>We ask attendees to use scent-free products or limit/forego the excessive use of scented hygiene products while at the conference.</Text>
            <Text style={[t.mB12]}>Everyone is responsible for their own behavior in this space. While we wish for everyone to be able to express themselves, explore and learn in their own way, this code for inclusion sets an expectation that all attendees be considerate and careful of those around them. Failure to adhere to these necessary guidelines could result in removal from the event at the Institute's discretion. If you have questions or concerns about this policy, please contact R.B. Brooks, the Institute's director of operations, at roze@sgdinstitute.org</Text>
        </ContentModal>
    );
}