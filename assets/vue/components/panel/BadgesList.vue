<template>
    
    <div class="badgeList" v-if="this.badges.length > 0">
        <ul>
            <li v-for="badge in this.badges">
                <Badge :text="badge" />
            </li>
        </ul>
    </div>

</template>

<script>

import Badge from './../../components/primitives/Badge.vue';

export default {
    name: "BadgeList",
    components: {
        Badge
    },
    props:{
        badges:{
            type: Object,
            required: true,
            default: []
        }
    },
    computed: {

    },
};
</script>
