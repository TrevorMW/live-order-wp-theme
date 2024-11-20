<template>

    <div v-if="this.order.tenders && 'card_details' in this.order.tenders[0]">
        <h2>Payment Details</h2>

        <div class="paymentDetails" v-for="tender in this.order.tenders">
            <div class="paymentIcon">
                <PaymentCardIcon :type="getPaymentType(tender)" />
            </div>
            <div class="paymentCard">
                <p v-html="getPaymentCard(tender)"></p>
                <small v-html="getPaymentTimestamp(tender)"></small>
            </div>
            <div class="paymentTotal" v-html="getPaymentTotal(tender)"></div>
        </div>

    </div>

</template>

<script>
import * as helpers from '../../helpers/orderHelpers.js';

import PaymentCardIcon from  '../panel/PaymentCardIcon.vue'

export default {
    name: "OrderPaymentDetails",
    components:{
        PaymentCardIcon
    },
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods: {
        getPaymentType: function (tender) {
            let brand = '';

            if(tender && 'card_details' in tender){
                brand = tender.card_details.card.card_brand;
            }

            return brand;
        },
        getPaymentCard: function (tender) {
            let paymentCard = '';

            if(tender && 'card_details' in tender){
                const card = tender.card_details.card;

                paymentCard = helpers.capitalize(card.card_brand) + ' ' + card.last_4;
            }

            return paymentCard;
        },
        getPaymentTotal: function (tender) {
            let total = '';

            if(tender){
                total = helpers.formatMoney(tender.amount_money.amount);
            }

            return total;
        },
        getPaymentTimestamp: function (tender) {
            let timeStamp = '';

            if(tender){
                timeStamp = new Date(tender.created_at).toLocaleString();
            }

            return timeStamp;
        }
    },
};
</script>

<style>

</style>
