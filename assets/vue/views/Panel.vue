<template>

    <div data-panel :class="panelKlasses">
        <header class="flex">
            <div data-panel-title v-html="title"></div>
            <div>
                <a href="#" data-panel-close @click.prevent="closeModal()"><span class="material-symbols-outlined">close</span></a>
            </div>
        </header>
        <div data-panel-body>
            <div data-panel-content v-show="this.isContentLoaded"></div>
            <GlobalLoader v-if="!this.isContentLoaded"/>
        </div>
    </div>

</template>

<script>
import { mapState } from 'pinia';
import { panelStore } from "../stores/panel.js";

import GlobalLoader from "../components/GlobalLoader.vue";

export default {
    name: "Panel",
    components: {
        GlobalLoader
    },
    mounted() {
        const ps = panelStore();
        const container = document.querySelector('[data-panel-content]');

        ps.setContentContainerRef(container);
    },
    methods:{
        closeModal: function(){
            const ps = panelStore();
            ps.closePanel();
        }
    },
    computed: {
        ...mapState(panelStore, {
            isOpen: store => store.flags.isOpen,
            isContentLoaded: store => store.flags.isContentLoaded,
            title: store => store.content.title,
        }),
        panelKlasses:function(){
            return this.isOpen ? 'active' : '' ;
        }
    },
};
</script>

<style>

</style>
