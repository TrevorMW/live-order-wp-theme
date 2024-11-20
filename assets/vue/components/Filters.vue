<template>
    <ul class="filterLabels" v-if="this.initialLoad">
        <li v-for="(filter, key) in this.filters" class="filterLabel">
            <a href="#" @click.prevent="filterOrders(key)">
                <span class="filterLabelText">{{ filter.name }}</span>
                <span class="filterLabelCount">
                    <span><FilterCount :count="filter.value" /></span>
                </span>
            </a>
        </li>
    </ul>

    <GlobalLoader v-else />

</template>

<script>
import { mapState } from 'pinia';
import { orderStore } from "../stores/order.js";

import FilterCount  from "../components/FilterCount.vue";
import GlobalLoader from "../components/GlobalLoader.vue";

export default {
    name: "Filters",
    components: { 
        FilterCount,
        GlobalLoader
    },
    mounted(){
        const os = orderStore();
    },
    computed: {
        ...mapState(orderStore, {
           filters: store => store.filters,
           initialLoad: store => store.initialLoad
        })
    },
};
</script>

<style>
</style>
