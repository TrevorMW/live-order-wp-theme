<template>
    
    {{ count }}
    
</template>

<script>
import { mapState }   from 'pinia';
import { orderStore } from "../stores/order.js";

export default {
    name: "FilterCount",
    props: { 
        count:{
            type: Number,
            required: true,
            default: 0
        }
    },
    computed: {
        ...mapState(orderStore, {
           filters: store => store.filters,
        })
    },
};
</script>

<style>
</style>
