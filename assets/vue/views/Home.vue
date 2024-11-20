<template>
    <div v-if="this.loaded">

        <!-- Check if someone isnt logged in first -->
        <main :class="[{ 'login': !loggedIn }]" v-if="!loggedIn">
            <Authentication />
        </main>

        <!-- Then assume were sending them to the backend after logging in. -->
        <main class="dashboard" v-if="loggedIn && isAdmin">
            <div class="nav">
                <div class="logoBox container flexed">
                    <div class="logo">
                        Live Order Dashboard
                    </div>

                    <div class="logout">
                        <a @click.prevent="logUserOut" class="logout">
                            <span class="material-symbols-outlined">logout</span>
                        </a>
                    </div>
                </div>

                <div class="menuSections" v-if="this.restaurantSet">
                    <header>
                        <h5>Menu</h5>
                    </header>
                    <nav>
                        <ul>
                            <li v-for="(route, idx) in routes" class="w-icon" :key="idx">
                                <a v-if="showNavItem(route, this)" href="" @click.prevent="this.$router.push(route.path)">
                                    <span class="material-symbols-outlined">{{ route.icon }}</span>
                                    <span>
                                        {{ route.name }}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>


                    <div class="currentRestaurant">
                        <header class="">
                            <h5>Current Restaurant</h5>
                        </header>
                        <div class="currentRestaurantDetails">
                            <p>{{ currentRestaurant.post_title }}</p>

                            <a href="" @click.prevent="editRestaurant()"><small>Edit</small></a>&nbsp;&nbsp;&nbsp;
                            <a href="" @click.prevent="disconnectPOS()"><small>Change</small></a>
                        </div>
                    </div>
                </div>

                <div class="userBlock">
                    <a @click.prevent="this.$router.push('/profile')" class="userDetails">
                        <span class="">
                            <span class="material-symbols-outlined">account_circle</span>
                        </span>
                        <span class="">
                            <strong>{{ username }}</strong><br />
                            <small>{{ email }}</small>
                        </span>
                    </a>
                </div>
            </div>

            <div class="content">
                <div class="utilBar">
                    <Utils />
                </div>

                <router-view />
            </div>

            <LoaderOverlay :isActive="isActive" />
        </main>

        <!-- And if neither, lets assume it's a frontend page that is public, and remove the admin panel for these -->
        <main :class="[{ 'frontend': true }, `frontend-${this.$router.resolve(this.$route.path).name.toLowerCase()}`]"
            v-if="!isAdmin">
            <router-view />

        </main>
    </div>
    <div v-else>
        <main class="loading">
            <LoaderOverlay :isActive="!this.loaded" />
        </main>
    </div>
    <Notice :msg="msg" :status="status" :visible="visible" />
</template>

<script>
import { toRaw } from 'vue';
import { mapActions, mapState } from 'pinia';

import { globalStore } from "../stores/global.js";
import { scStore } from "../stores/servicecharge.js";
import { orderStore } from "../stores/order.js";
import { noticeStore } from "../stores/notice.js";
import { loaderStore } from "../stores/loader.js";

import { updateIsForMerchant } from "../helpers/webhookHelper.js";

import axios from "Axios";
import routes from '../../js/src/routes.js';

import Authentication from '../views/Authentication.vue';

import Notice from '../components/Notice.vue';
import Utils from '../components/Utils.vue';
import LoaderOverlay from '../components/LoaderOverlay.vue';
import Modal from './Modal.vue';

export default {
    name: "Home",
    components: {
        Utils,
        Notice,
        Authentication,
        LoaderOverlay,
        Modal
    },
    sockets: {
        connect() {
            console.log('Frontend Vue socket open');
        },
        orderUpdated(webhook) {
            // We need to check that the data being sent through the socket is meant for this user. 
            if (updateIsForMerchant(webhook, 'order_updated', this.ids.merchantID, this.ids.locationID)) {
                const os = orderStore();

                const orderID = webhook?.data?.id;
                const el = document.getElementById('orderLineItem-' + orderID);

                // first, get the latest version of the order from API
                os.loadOrderData(this.ids.userID, this.ids.merchantPost, this.ids.locationPost, orderID).then((resp) => {
                    const newAPIOrderData = resp.data?.data?.order;
                    const newAPIPlacement = resp.data?.data?.placement;

                    // then, lets find any current store objects with the same ID so we can compare.
                    const orderData = os.findCurrentOrderInst(orderID);

                    // dont do nothing unless we got at least one order found.
                    if (orderData && orderData.inst && newAPIOrderData && newAPIPlacement) {
                        const orderStatus = orderData.placement;

                        // if we find that the two statuses are the same, 
                        // then we just update the whole object instead of moving it to another column
                        if (orderStatus === newAPIPlacement) {
                            os.orders[orderData.placement][orderData.idx] = newAPIOrderData;

                            if (el) {
                                el.classList.remove('scale-in-center')
                                el.classList.add('pulsate-bck');
                            }

                            // need to remove this after first run otherwise it doesnt work as second time.
                            setTimeout(() => {
                                if (el) {
                                    el.classList.remove('pulsate-bck');
                                }
                            }, 3000);
                        } else {
                            // activate the animation to remove it from wherever it is
                            orderData.inst.changing = true;

                            // then remove it from the current array
                            os.removeOrder(orderData.placement, orderData.inst);

                            // then, if it's not 100% completed,  put it in the appropriate column.
                            if (newAPIPlacement !== 'completed') {
                                os.categorizeOrder(newAPIOrderData, newAPIPlacement);
                            }
                        }
                    }
                })
            }
        },
        orderCreated(webhook) {
            if (updateIsForMerchant(webhook, 'order_created', this.ids.merchantID, this.ids.locationID)) {
                const os = orderStore();

                // whenever we get an order update, assume that we should re-run getOrders to pull new, in progress, and ready orders into their respective columns
                os.loadOrderData(this.ids.userID, this.ids.merchantPost, this.ids.locationPost, webhook?.data?.id).then((resp) => {
                    if (resp.status === 200 && resp.data) {
                        os.categorizeOrder(resp.data.data.order, resp.data.data.placement);
                    }
                });
            }
        }
    },
    data() {
        return {
            routes: routes,
            componentLoaded: false,
            ids: {
                merchantID: null,
                locationID: null,
                merchantPost: null,
                locationPost: null,
                userID: null,
                systemID: null
            }
        };
    },
    mounted() {
        const whichSide = this.$router.resolve(this.$route.path).meta;

        // gotta set these at the top level to be able to properly make calls to load order data
        this.$router.isReady().then(() => {
            const routeParams = this.$router.currentRoute.value.params;
            this.ids.merchantID = routeParams.merchant_id;
            this.ids.locationID = routeParams.location_id;
            this.ids.merchantPost = routeParams.merchant_post;
            this.ids.locationPost = routeParams.location_post;
            this.ids.userID = routeParams.user_id;
        })

        this.loadGlobalData();
    },
    computed: {
        ...mapState(globalStore, {
            loaded: store => store.loaded,
            loggedIn: store => store.isLoggedIn,
            restaurantSet: store => store.isRestaurantSet,
            logoutURL: (store) => store.logoutURL,
            username: (store) => store.user.username,
            email: (store) => store.user.email,
            id: (store) => store.user.id,
            endpoints: (store) => store.endpoints,
            currentRestaurant: (store) => store.currentRestaurant,
        }),
        ...mapState(scStore, {
            dataLoaded: store => store.loaded
        }),
        ...mapState(loaderStore, {
            isActive: store => store.isActive
        }),
        ...mapState(noticeStore, {
            msg: store => store.msg,
            visible: store => store.visible,
            status: store => store.status,
        }),
        isAdmin() {
            return this.$router.resolve(this.$route.path).meta.admin;
        }
    },
    methods: {
        ...mapActions(globalStore, ['loadGlobalData', 'unsetCurrentRestaurant']),
        ...mapActions(scStore, ['loadData']),
        ...mapActions(noticeStore, ['hideNotice']),
        logUserOut: function () {
            const gs = globalStore();

            const url = core.ajaxUrl;
            const data = new FormData();

            data.append("action", this.endpoints.logout.action);
            data.append("nonce", this.endpoints.logout.nonce);

            gs.logUserOut(data);
        },
        handleUnsetRedirect: function () {
            this.$router.push("/profile");
        },
        disconnectPOS: function () {
            const gs = globalStore();
            const ns = noticeStore();

            gs.unsetCurrentRestaurant(this.id).then((resp) => {
                if (resp.status === 200) {
                    gs.loadGlobalData().then(() => {
                        ns.showNotice('You have successfully disconnected from the current restaurant!', true);
                        this.handleUnsetRedirect();
                    });
                }
            });
        },
        showNavItem: function (route, scope) {
            let shouldShow = true;

            if ('relies_on' in route === false) {
                if ('hide_in_nav' in route === true) {
                    return false;
                }

                return true;
            }

            if (!this.restaurantSet) {
                return false;
            }

            return shouldShow;
        }
    }
};
</script>
