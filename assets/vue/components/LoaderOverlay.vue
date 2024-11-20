<template>
    <div :class="[{ 'loaderOverlay': true, 'isActive': isActive }]">
        <GlobalLoader />
    </div>
</template>
  
<script>
import GlobalLoader from '../components/GlobalLoader.vue';

export default {
    name: "LoaderOverlay",
    components: {
        GlobalLoader
    },
    props: {
        isActive: {
            type: Boolean,
            required: false,
            default: ''
        }
    },
    data() {
        return {};
    }
};

</script>
  