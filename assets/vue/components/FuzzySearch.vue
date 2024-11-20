<template>

    <div class="fieldControl hasFieldIcon">
        <input type="search" name="" value="" placeholder="Search Active Orders" data-fuzzy-search />
        <span class="fieldIcon"><span class="material-symbols-outlined">search</span></span>
    </div>

</template>

<script>
import { mapState } from 'pinia';
import { orderStore } from "../stores/order.js";

export default {
    name: "FuzzySearch",
    components: {
    },
    mounted(){
    },
    computed: {
        ...mapState(orderStore, {
           orders: store => store.orders
        })
    },
};
</script>

<style>
</style>
