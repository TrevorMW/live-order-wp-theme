<template>

    <div class="flex">
        <div>
            <h1 v-html="getOrderTitle"></h1>
        </div>
        
        <div>
            <OrderActions :order="this.order" />
        </div>
    </div>

    <div class="osOrderBadges">
        <BadgesList :badges="getBadges" />
    </div>

    <div class="osOrderDetails">
        <OrderDetails :order="this.order" />
    </div>

    <div class="osLineItems">
        <h2>Order Items</h2>
        <!-- <OrderLineItems :order="this.order" /> -->
    </div>

    <div class="osPriceBreakdown">
        <OrderPriceTable :order="this.order"/>
    </div>

    <div class="osPaymentDetails">
        <OrderPaymentDetails :order="this.order"/>
    </div>

    <div class="osOrderActivity"></div>

    <pre>{{ this.order }}</pre>

</template>

<script>
import { mapState } from 'pinia';
import { orderStore } from "../stores/order.js";

import BadgesList from '../components/panel/BadgesList.vue';
import OrderActions from '../components/panel/OrderActions.vue';
import OrderDetails from '../components/panel/OrderDetails.vue';
import OrderPriceTable from '../components/panel/OrderPriceTable.vue';
import OrderPaymentDetails from '../components/panel/OrderPaymentDetails.vue';

import * as helpers from '../helpers/orderHelpers.js';

export default {
    name: "OrderSummary",
    components:{
        BadgesList,
        OrderActions,
        OrderDetails,
        OrderPriceTable,
        OrderPaymentDetails
    },
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods: {

    },
    computed: {
        ...mapState(orderStore, {
        }),
        getOrderTitle: function(){
            let html = '';

            if (helpers.isUpcoming(this.order)) {
                return 'Upcoming Order #' + this.order.id;
            } else {

                if (helpers.isOpen(this.order)) {
                    const ful = this.order.fulfillments[0];

                    if (helpers.isPickup(this.order)) {
                        const recip = ful.pickup_details.recipient;

                        if (recip !== null) {
                            const person = recip.display_name;
                            const phone = recip.phone_number;

                            // Check to see if the Contact has a real name and not just a phone number
                            if (person !== phone) {
                                html += 'Order for ' + helpers.getCleanName(person, this.order.reference_id);
                            }
                            // If it IS just a phone number, lets format it
                            else {
                                html += helpers.formatPhoneNumber(phone)
                            }
                        }
                    }

                    if (helpers.isDelivery(this.order)) {
                        const recip = ful.delivery_details.recipient;

                        if (recip !== null) {
                            const person = recip.display_name;
                            const phone = recip.phone_number;

                            // Check to see if the Contact has a real name and not just a phone number
                            if (person !== phone) {
                                html += 'Order for ' + helpers.getCleanName(person, this.order.reference_id);
                            }
                            // If it IS just a phone number, lets format it
                            else {
                                html += helpers.formatPhoneNumber(phone)
                            }
                        }
                    }
                }
            }

            return html;
        },
        getBadges:function(){
            let badges = [];
            
            if(!this.order.hasOwnProperty('state')){
                badges.push('Upcoming');
            } else if(this.order.state === 'COMPLETED') {
                badges.push('Completed');
            } else {
                const fulfillment = this.order.fulfillments[0];

                if(fulfillment.state === 'PROPOSED'){
                    badges.push('New');
                } 

                if(fulfillment.state === 'RESERVED'){
                    badges.push('In Progress');
                }
                
                if(fulfillment.state === 'PREPARED'){
                    badges.push('Ready');
                } 
            }

            if(this.order.net_amount_due_money.amount > 0){
                badges.push('Not Paid')
            } else {
                badges.push('Paid')
            }
            

            return badges; 
        },
        notCompleted: function(){
            return !helpers.isCompleted(this.order);
        }
    },
};
</script>

<style>

</style>
