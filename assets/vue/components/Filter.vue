<template>
    
    <li v-if="type === 'radio'">
        <label class="control control-radio">
            {{ filter.name }}
            <input type="radio" 
                   :name="this.filterID" 
                   :value="filter.value" 
                   :checked="isChecked" 
                   @change="applyFilter($event, this.filter, this.filterID, 'radio')" />
            <div class="control_indicator"></div>
        </label>
    </li>

    <li v-if="type === 'checkbox'">
        <label class="control control-checkbox">
            {{ filter.name }}
            <input type="checkbox" 
                   :name="this.filterID"  
                   :value="filter.value" 
                   :checked="isChecked"  
                   @change="applyFilter($event, this.filter, this.filterID, 'checkbox')" />
            <div class="control_indicator"></div>
        </label>
    </li>
    
</template>

<script>
import { mapState }   from 'pinia';
import { orderStore } from "../stores/order.js";

export default {
    name: "Filter",
    props: { 
        type:{
            type: String,
            required: true,
        },
        filter: {
            type: Object,
            required: true
        },
        filterID: {
            type: String,
            required: true
        }
    },
    methods:{
        applyFilter:function(e, filter, id, type){
            const os = orderStore();
            
            if(type === 'checkbox'){
                const isChecked = e.target.checked;

                if(!isChecked){
                    os.removeFilter(e, filter, id)
                } else {
                    os.applyFilter(e, filter, id)
                }
            } else {
                os.applyFilter(e, filter, id)
            }
        }
    },
    computed: {
        ...mapState(orderStore, {
        }),
        isChecked:function(){
            return this.filter.checked
        }
    },
};
</script>

<style>
</style>
