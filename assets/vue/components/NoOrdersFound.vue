<template>
    
    <div class="noOrdersFound">
        <span class="material-symbols-outlined">receipt_long</span>
        <p v-html="notFoundText"></p>
    </div>

</template>

<script>

export default {
    name: "NoOrdersFound",
    props:{
        type: {
            type: String,
            required: false
        }
    },
    computed: {
        notFoundText: function () {
            let txt = 'No orders found.';

            if(this.type){
                txt = 'No orders of type "' + this.type + '" found.'
            }

            return txt
        }
    },
};
</script>
