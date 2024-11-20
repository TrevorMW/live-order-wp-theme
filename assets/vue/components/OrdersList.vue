<template>
    <ul class="">
        <template v-for="order in orders" :key="order.id">
            <li v-if="!order.changing" 
                :id="'orderLineItem-' + order.id"
                :class="[{
                    'orderLineItem': true,
                    'scale-in-center': !order.changing,
                    'scale-out-center': order.changing,
                }]">
                <OrderCard :order="order" @viewOrderDetails="viewOrderDetails" :class="[{
                    'pulsate-bck': order.updating
                }]" />
            </li>
        </template>
    </ul>
</template>

<script>

import { mapState } from 'pinia';
import { orderStore } from "../stores/order.js";
import { panelStore } from "../stores/panel.js";

import GlobalLoader from "../components/GlobalLoader.vue";
import NoOrdersFound from "../components/NoOrdersFound.vue";

import OrderCard from '../components/OrderCard.vue';

import OrderSummary from '../components/OrderSummary.vue';

import * as helpers from '../helpers/orderHelpers.js';

export default {
    name: "OrdersList",
    components: {
        GlobalLoader,
        NoOrdersFound,
        OrderCard
    },
    props: {
        orders: {
            type: Array,
            required: true,
            default: () => { }
        }
    },
    computed: {
        ...mapState(orderStore, {

        })
    },
    methods: {
        viewOrderDetails(data){
            this.$emit('viewOrderDetails', { order : data.order });
        }
    }
};
</script>
