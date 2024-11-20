<template>

    <a href="#" @click.prevent="showOrderActions(this.order)">
        <span class="material-symbols-outlined">more_vert</span>
    </a>

</template>

<script>
import { createApp } from 'vue';
import { mapState }   from "pinia";

import { orderStore } from "../../stores/order.js";
import { modalStore } from "../../stores/modal.js";

import OrderActionList from './../OrderActionList.vue';

export default {
    name: "OrderActions",
    components:{
        OrderActionList
    },
    props: {
        order:{
            type: Object,
            required: true
        }
    },
    methods: {
        showOrderActions: function(order){
            const self = this;
            const os = orderStore();

            os.getOrder(order.id, function(){
                const ms = modalStore();

                const content = createApp({ extends: OrderActionList }, {
                    order: order
                });
                    
                ms.openModal(content);
            })
        }
    },
    computed:{
        ...mapState(modalStore, {

        })
    }
};
</script>
