<template>

    <Badge :text="orderStatus" />

</template>

<script>
import * as helpers from '../../helpers/orderHelpers.js';

import Badge from '../../components/primitives/Badge.vue';

export default {
    name: "Status",
    components: {
        Badge
    },
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods:{
        getStatusHTML: function(status){
            let statusKlass = helpers.sanitizeTitle(status);
            let html = `<span class="status status-${ statusKlass }">${ status }</span>`;
            return html;
        }
    },
    computed: {
        orderStatus: function () {            
            if(this.order.isUpcoming){
                return 'Upcoming';
            } else if(this.order.isCompleted) {
                return 'Completed';
            } else if(this.order.isNew) {
                return 'New';
            } else if(this.order.isReady) {
                return 'Ready';
            } else if(this.order.isInProgress) {
                return 'In Progress';
            } else if(this.order.state === 'COMPLETED') {
                return 'Completed';
            }
        },
        
    },
};
</script>
