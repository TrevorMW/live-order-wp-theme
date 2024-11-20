<template>
    <span :class="getBadgeClasses">{{ text }}</span>
</template>

<script>
import * as helpers from '../../helpers/orderHelpers.js';

export default {
    name: "Badge",
    props:{
        text: {
            type: String,
            required: true
        }
    },
    computed: {
        getBadgeClasses: function(){
            let klasses = [];

            if(this.text){
                klasses.push('badge')
                klasses.push('badge-' + helpers.sanitizeTitle(this.text).toLowerCase())
            }

            return klasses.join(' ')
        }
    },
};
</script>
