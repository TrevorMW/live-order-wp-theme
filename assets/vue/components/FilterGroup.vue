<template>
    
    <li data-filter-group>
        <a href="#" 
           data-filter-dropdown-trigger 
           @click.prevent="openDropdown">
                {{ title }}
                <span data-dropdown-icon class="material-symbols-outlined">expand_more</span>
        </a>
        <div data-filter-dropdown>
            <slot></slot>
        </div>
    </li>
    
</template>

<script>
import { mapState }   from 'pinia';
import { orderStore } from "../stores/order.js";

export default {
    name: "FilterGroup",
    props: {
        title:{
            type: String,
            required: true
        }
    },
    methods: {
        openDropdown: function (event) {
            const el = event.target;
            el.closest('[data-filter-group]').classList.toggle('active')
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
