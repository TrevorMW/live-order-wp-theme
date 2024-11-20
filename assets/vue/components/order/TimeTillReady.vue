<template>
    <div class="timeTillReady">{{ min }}</div>
</template>

<script>

import * as helpers from '../../helpers/orderHelpers.js';

export default {
    name: "TimeTillReady",
    components:{},
    props:{
        min:{
            type: String,
            required: true
        }
    },
    computed: {
    },
};
</script>
