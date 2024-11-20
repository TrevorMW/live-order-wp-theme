<template>

    <div data-modal-wrapper :class="[{ 'active': this.isOpen }]">
        <div data-modal>
            <header class="flex">
                <div data-modal-title v-html="title"></div>
                <div>
                    <a href="#" data-modal-close @click.prevent="closeModal()"><span
                            class="material-symbols-outlined">close</span></a>
                </div>
            </header>
            <div data-modal-body>
                <div data-modal-content v-show="this.isContentLoaded" v-html="content"></div>
                <GlobalLoader v-if="!this.isContentLoaded" />
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'pinia';
import { modalStore } from "../stores/modal.js";

import GlobalLoader from "../components/GlobalLoader.vue";

export default {
    name: "Modal",
    components: {
        GlobalLoader
    },
    mounted(){
        const ms = modalStore();
        const container = document.querySelector('[data-modal-content]');

        ms.setContentContainerRef(container);
    },
    methods: {
        closeModal: function () {
            const ms = modalStore();
            ms.closeModal()
        }
    },
    computed: {
        ...mapState(modalStore, {
            isOpen: store => store.flags.isOpen,
            isContentLoaded: store => store.flags.isContentLoaded,
            title: store => store.content.title,
            content: store => store.content.content
        })
    },
};
</script>

<style>

</style>
