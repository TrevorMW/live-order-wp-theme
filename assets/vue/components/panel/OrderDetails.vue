<template>

    <h2 v-html="getFulfillmentDetailsHeader"></h2>
    <table>
        <tbody>
            <tr>
                <th>Recipient</th>
                <td v-html="getRecipientsName"></td>
            </tr>

            <tr>
                <th>Contact Information</th>
                <td v-html="getContactInfo"></td>
            </tr>

            <tr>
                <th>Location</th>
                <td v-html="getLocationInfo"></td>
            </tr>

            <tr>
                <th v-html="getFulfillmentPrefix"></th>
                <td v-html="getPickupTime"></td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import * as helpers from '../../helpers/orderHelpers.js';

export default {
    name: "OrderDetails",
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    computed: {
        getFulfillmentDetailsHeader: function () {
            const fulType = helpers.pickupOrDeliveryKey(this.order);

            let header = fulType + ' Details';

            return helpers.capitalize(header);
        },
        getRecipientsName: function () {
            const deets = helpers.getFulfillmentDetails(this.order);

            return helpers.getCleanName(deets.recipient.display_name, this.order.reference_id);
        },
        getContactInfo: function () {
            const deets = helpers.getFulfillmentDetails(this.order)

            let html = '';

            if (deets.recipient.phone_number) {
                html += '<a target="_blank" href="tel:' + deets.recipient.phone_number + '">' + helpers.formatPhoneNumber(deets.recipient.phone_number) + '</a>';
            }

            if (deets.recipient.email_address) {
                html += '<br /><br /><a target="_blank" href="mailto:' + deets.recipient.email_address + '">' + deets.recipient.email_address + '</a>'
            }


            return html;
        },
        getLocationInfo: function () {
            const deets = helpers.getFulfillmentDetails(this.order)

            return deets.recipient.pickup_at;
        },
        getPickupTime: function () {
            const deets = helpers.getFulfillmentDetails(this.order)
            const key = this.order.fulfillments[0].type;

            let getBy = deets.pickup_at;

            if (key === 'DELIVERY') {
                getBy = deets.deliver_by;
            }

            return new Date(getBy).toUTCString();
        },
        getFulfillmentPrefix: function () {
            const fulType = helpers.pickupOrDeliveryKey(this.order);

            let header = fulType + ' At';

            if (fulType === 'Delivery') {
                header = fulType + ' By'
            }

            return helpers.capitalize(header);
        }
    },
};
</script>

<style>

</style>
