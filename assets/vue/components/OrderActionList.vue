<template>

    <p>Mark order as...</p>
    <hr />
    <br />
    <a href="#" v-if="canMarkInProgress"                                      @click.prevent="markOrderAs(this.order, 'IN-PROGRESS', fulfillmentUID )" class="btn btn-primary btn-full">In Progress</a>
    <a href="#" v-if="canMarkReady || canMarkInProgress"                      @click.prevent="markOrderAs(this.order, 'READY',       fulfillmentUID )" class="btn btn-primary btn-full">Ready</a>
    <a href="#" v-if="canMarkComplete || canMarkReady || canMarkInProgress"   @click.prevent="markOrderAs(this.order, 'COMPLETED',   fulfillmentUID )" class="btn btn-primary btn-full">Picked Up</a>

</template>

<script>
import { mapState }   from "pinia";
import { orderStore } from "../stores/order.js";
import { modalStore } from "../stores/modal.js";

import * as helpers from '../helpers/orderHelpers.js';

export default {
    name: "OrderActionList",
    props: {
        order:{
            type: Object,
            required: true
        }
    },
    methods:{
        markOrderAs: function(order, state, uid){
            const os = orderStore();
            
            // os.markOrderAsTest(order, state, uid, function(resp){
            //     const ms = modalStore();
            //     ms.closeModal();
            // });

            os.markOrderAs(order, state, uid, function(resp){
                const ms = modalStore();
                ms.closeModal();
            });
        }
    },
    computed:{
        fulfillmentUID: function(){
            return this.order.fulfillments[0].uid;
        },
        canMarkInProgress: function(){
            let showBtn = true;

            if(!helpers.isNew(this.order)){
                showBtn = false;
            }

            return showBtn;
        },
        canMarkReady: function(){
            let showBtn = true;

            if(!helpers.isInProgress(this.order)){
                showBtn = false;
            }

            return showBtn;
        },
        canMarkComplete: function(){
            let showBtn = true;

            if(!helpers.isReady(this.order)){
                showBtn = false;
            }

            return showBtn;
        }
    }
};
</script>
