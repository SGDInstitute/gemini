import React from 'react';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import ContentModal from '../ContentModal';

export default function Refund() {
    return (
        <ContentModal title="Refund" icon="credit-card-refund">
            <Text style={[t.mB12]}>The regular registration rate is available until January 17, 2020. Full refunds are available for cancelled orders until this date. Cancellations received after this date will not be eligible for a refund. Refunds are not available for attendees who choose not to attend the event if the cancellation is not received before the stated cancellation deadline. Orders may be transferred to another attendee at no charge, at any time. Cancellations or transfers must be requested by the user who created the order and should include the name of the attendee. To request a cancellation and refund, or to transfer your ticket to another attendee, please email support@sgdinstitute.org.</Text>
        </ContentModal>
    );
}