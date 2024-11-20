<template>
    <p>{{ order.ticketName }}</p>
    <p>{{ order.user.phone }}</p>

    <div v-if="this.order.isPickup">
        <small>Pickup at: {{ this.order.pickupAt }}</small>
    </div>

    <div v-if="this.order.isDelivery">
        <small>Delivery expected by: {{ this.order.deliverAt }}</small>
    </div>
</template>

<script>

export default {
    name: "UserDetails",
    components:{},
    props:{
        order:{
            type: Object,
            required: true
        }
    },
    computed: {
        orderUserDetails: function () {
            let html = '';
            const fulfillments = this.order.fulfillments;

            if (fulfillments && fulfillments.length >= 1) {
                const ful = fulfillments[0];

                if (ful.type === 'PICKUP') {
                    const recip = ful.pickup_details.recipient;

                    if (recip !== null) {
                        const person = recip.display_name;
                        const phone = recip.phone_number;

                        // Check to see if the Contact has a real name and not just a phone number
                        if (person !== phone) {
                            html += '<p>' + person + '</p>';
                        }
                        // If it IS just a phone number, lets format it
                        else {
                            html += '<p>' + helpers.formatPhoneNumber(phone) + '</p>'
                        }
                    }
                }

                if (ful.type === 'DELIVERY') {
                    const recip = ful.delivery_details.recipient;

                    if (recip !== null) {
                        const person = recip.display_name;
                        const phone = recip.phone_number;

                        // Check to see if the Contact has a real name and not just a phone number
                        if (person !== phone) {
                            html += '<p>' + person + '</p>';
                        }
                        // If it IS just a phone number, lets format it
                        else {
                            html += '<p>' + helpers.formatPhoneNumber(phone) + '</p>'
                        }
                    }
                }

                html += '<small>' + this.order.source.name + '</small>';
            }

            return html;
        },
    },
};
</script>
