import React from 'react';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import ContentModal from '../ContentModal';

export default function Privacy() {
    return (
        <ContentModal title="Legal & Privacy" icon="fingerprint">
            <Text style={[t.textXl, t.textBlue700, t.uppercase, t.trackingWide, t.mB4]}>Privacy Policy</Text>
            <Text style={[t.mB2, t.textLg, t.fontBold]}>General Policy Statement (Policy #002)</Text>
            <Text style={[t.mB8]}>The Midwest Institute for Sexuality and Gender Diversity (“Institute”) recognizes its responsibility to safeguard and protect the nonpublic personal information of its directors, officers, employees, and agents, along with event attendees and other parties with whom business is conducted. The purpose of this policy is to set forth guidelines under which such information may be shared with third parties, and the measures employed to protect and keep such information confidential. It is the intent of the Institute to comply with all applicable laws and regulations governing privacy.</Text>

            <Text style={[t.mB4, t.textLg, t.fontBold]}>Best Practices and Procedures</Text>
            <View style={[t.mL8]}>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>1.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        <Text stlye={[t.fontBold]}>Collection of Information:</Text>
                        The Institute will only collect information that is necessary to conduct its business.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>2.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        <Text stlye={[t.fontBold]}>Maintenance of Information:</Text>
                        The Institute takes reasonable steps and will implement procedures to assure that information it gathers is accurate and maintained in a manner to assure its accuracy. In the event inaccurate information is discovered, the Institute will correct the inaccuracy as promptly as possible.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>3.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        <Text stlye={[t.fontBold]}>Sale of Information Prohibited</Text>
                        It is the policy of the Institute not to sell nonpublic personal information to any third party under any circumstance.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>4.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        <Text stlye={[t.fontBold]}>Disclosure of Information to Third Parties</Text>
                        In an effort to provide services and to comply with state and federal laws and regulations, the Institute may share nonpublic personal information with third parties. Such information sharing will be done in compliance with applicable laws and regulations.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>5.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        <Text stlye={[t.fontBold]}>Responsibility of Non-Affiliated Third Parties</Text>
                        The Institute selects its service partners with due diligence and care. If nonpublic personal information will be shared, the Institute will only select a service partner with an established privacy policy that is consistent with the privacy policy of the Institute and the laws and regulations governing privacy. When appropriate, the Institute will protect nonpublic personal information through contractual provisions that prohibit non-affiliated services partners from using information for any other purpose than for which the Institute provides the information to the service partner.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>6.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        <Text stlye={[t.fontBold]}>Internal Security and Privacy</Text>
                        The Institute will restrict access to nonpublic personal information it obtains to only those directors, officers, employees, and agents who have a specific business purpose for accessing and utilizing such information. All directors, officers, employees, and agents shall be required to maintain the confidentiality and privacy of all personal information they access.
                    </Text>
                </View>
            </View>

            <Text style={[t.textXl, t.textBlue700, t.uppercase, t.trackingWide, t.mB4]}>Copyright and Intellectual Property</Text>
            <Text style={[t.mB2, t.textLg, t.fontBold]}>General Policy Statement (Policy #008)</Text>
            <Text style={[t.mB8]}>The Midwest Institute for Sexuality and Gender Diversity (“Institute”) recognizes its responsibility to respect the intellectual property of others and to safeguard and protect its own intellectual property. The purpose of this policy is to set forth our own copyright policy and guidelines under which infringement reporting is conducted. It is the intent of the Institute to comply with all applicable laws and regulations governing intellectual property.</Text>

            <Text style={[t.mB2, t.textLg, t.fontBold]}>Copyright</Text>
            <Text style={[t.mB2]}>Unless credited otherwise, all images are licensed under a Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0) license, and all videos are licensed under a Creative Commons Attribution-NonCommercialNonDerivative 4.0 (CC BY-NC-ND 4.0) license. All other resources and intellectual property are owned by the Midwest Institute for Sexuality and Gender Diversity (“Institute”), with all rights reserved.</Text>
            <Text style={[t.mB8]}>If you’re interested in reproducing content you’ve found on our website, contact marketing@sgdinstitute.org with a description of your purpose, medium, and distribution.</Text>

            <Text style={[t.mB2, t.textLg, t.fontBold]}>Copyright infringement</Text>
            <Text style={[t.mB8]}>The Institute has adopted the following general policy toward copyright infringement in accordance with the Digital Millennium Copyright Act (http://lcweb.loc.gov/copyright/legislation/dmca.pdf). The address of the Designated Agent to Receive Notification of Claimed Infringement ("Designated Agent") is listed at the end of this policy.</Text>

            <Text style={[t.mB2, t.textLg, t.fontBold]}>Procedure for Reporting Copyright Infringement:</Text>
            <Text style={[t.mB2]}>If you believe that material or content residing on or accessible through Institute websites or services infringes a copyright, please send a notice of copyright infringement containing the following information to the Designated Agent listed below:</Text>
            <View style={[t.mL8]}>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>1.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that has been allegedly infringed;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>2.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Identification of works or materials being infringed; this includes, at a minimum and if applicable, the URL or IP address of the link shown on the Site where such material may be found, as well as the reference or link to the material or activity that you claim to be infringing, that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate that reference or link, including at a minimum, if applicable, the URL or IP address of the link shown on the Site where such reference or link may be found.</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>3.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>Contact information about the notifier including address, telephone number and, if available, e-mail address;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>4.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        A statement that the notifier has a good faith belief that the material is not authorized by the copyright owner, its agent, or the law; include this statement in the body of the Notice:
                        <Text style={[t.italic]}>I hereby state that I have a good faith belief that the disputed use of the copyrighted material or reference or link to such material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use).</Text>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text>5.</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        A statement made under penalty of perjury that the information provided is accurate and the notifying party is authorized to make the complaint on behalf of the copyright owner; include this statement in the body of the Notice:
                        <Text style={[t.italic]}>I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed.</Text>
                    </Text>
                </View>
            </View>
            <Text style={[t.mB2]}>Please contact the Designated Agent to Receive Notification of Claimed Infringement for the Institute at ip@sgdinstitute.org or at:</Text>

            <Text>Nick Pfost</Text>
            <Text>c/o Midwest Institute for Sexuality & Gender Diversity</Text>
            <Text>Attn: IP Abuse</Text>
            <Text>PO Box 1053</Text>
            <Text style={[t.mB8]}>East Lansing, MI 48826-1053</Text>

            <Text style={[t.textXl, t.textBlue700, t.uppercase, t.trackingWide, t.mB4]}>Non-discrimination Policy</Text>
            <Text style={[t.mB2]}>The Midwest Institute for Sexuality and Gender Diversity complies with all applicable federal and state laws regarding nondiscrimination and affirmative action. The Institute is committed to a policy of equity and justice or all persons and does not discriminate on the basis of gender, gender identification or expression; sexual orientation or identity; romantic orientation or identity; affectional preference; sex; race; ethnicity; color; age; physical handicap or disability; class, socio-economic status, or background; religious, spiritual, or secular beliefs; political affiliation and views; public assistance status; veteran status; marital or familial status; weight; national origin; status of residency; or openness of any of the aforementioned; or any other basis prohibited by law.</Text>
            <Text style={[t.mB12]}>Inquiries or complaints may be addressed to the director of operations, R.B. Brooks (roze@sgdinstitute.org). For other Institute information email our director of marketing and communications, Nick Pfost (nick@sgdinstitute.org).</Text>
        </ContentModal>
    );
}