<template>
    <a v-if="!order.isCompleted && !order.isUpcoming" href="#" @click.prevent="showOrder(order.id)">
        <div v-if="order.hasOwnProperty('source')" class="olicCompany">
            <SourceLogo :source="order.source.name" />
        </div>
        <div class="olicUserDetails">
            <UserDetails :order="order" />
        </div>
        <div class="olicPickupDetails">
            <TimeTillReady :order="order" />
        </div>
        <div class="olicStatus">
            <Status :order="order" />
        </div>
    </a>

    <a v-if="order.isCompleted" href="#" @click.prevent="showOrder(order.id)">
        <!-- <pre>{{ order }}</pre> -->
        <div v-if="order.source" class="olicCompany">
            <SourceLogo :source="order.source" />
        </div>

        <div v-if="order.source" class="olicUserDetails">
            <UserDetails :order="order" />
        </div>
        <div v-else class="olicUserDetails">
            {{ order.id }}
        </div>
        <div class="olicPickupDetails">

        </div>
        <div class="olicStatus">
            <Status :order="this.order" />
        </div>
    </a>

    <a v-if="isUpcoming" href="#" @click.prevent="showOrder(order.id)">HELLO
        <pre style="font-size:7px;">{{ order }}</pre>
        <div class="olicUserDetails">

        </div>
        <div class="olicPickupDetails">

        </div>
        <div class="olicStatus">
            <Status :order="this.order" />
        </div>
    </a>

</template>

<script>
import { createApp } from 'vue';
import { mapState } from 'pinia';

import { panelStore } from "../stores/panel.js";
import { orderStore } from "../stores/order.js";

import SourceLogo from '../components/SourceLogo.vue';
import TimeTillReady from '../components/order/TimeTillReady.vue';
import UserDetails from '../components/order/UserDetails.vue';
import Status from '../components/order/Status.vue';

import OrderSummary from '../components/OrderSummary.vue';

import * as helpers from '../helpers/orderHelpers.js';

export default {
    name: "OrderLineItemCntr",
    components: {
        SourceLogo,
        TimeTillReady,
        UserDetails,
        Status
    },
    props: {
        order: {
            type: Object,
            required: true
        },
        idx: {
            type: Number,
            required: false
        }
    },
    computed: {
        ...mapState(orderStore, {
        }),
        isCompleted: function () {
            return helpers.isCompleted(this.order);
        },
        isUpcoming: function () {
            return helpers.isUpcoming(this.order);
        }
    },
    methods: {
        showOrder: function (id) {
            const self = this;
            const os = orderStore();

            os.getOrder(id, function (order) {
                const ps = panelStore();

                // if the panel is already open and content is loaded, then fire the closePanel first, to clear out old app content
                if (ps.flags.isContentLoaded) {
                    ps.closePanel();
                }

                const content = createApp({ extends: OrderSummary }, {
                    order: order
                });

                ps.openPanel(content);
            })
        }
    }
};
</script>

<style>

</style>
