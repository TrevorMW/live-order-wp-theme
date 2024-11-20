<template>
    <div v-if="this.loaded && disallowed" class="disallowed">
        <NoItems :icon="this.icon" :message="this.disallowedMessage" />
    </div>
    <div v-else>
        <header class="pageHeader orderDashboardHeader">
            <h1>{{ name }} &nbsp;&nbsp;&nbsp;<small>Last Updated: {{ this.lastUpdatedAt }}</small></h1>

            <div class="lastUpdated">
                <a href="" @click.prevent="openFilterPanel()" id="filterPanelTrigger">
                    <span class="material-symbols-outlined">tune</span>
                </a>
            </div>
        </header>

        <div :class="[{ 'filterPanel': true, 'filterPanelOpen': this.flags.filtersOpen }]">
            <div>
                <div class="container flexed">
                    <h4 >Filter By:</h4>
                    <div class="">
                        <h4>Type:</h4>
                        <ul>
                            <li><a href="" @click.prevent="setFilter()">Pickup</a></li>
                            <li><a href="" @click.prevent="setFilter()">Delivery</a></li>
                            <li><a href="" @click.prevent="setFilter()">Curbside</a></li>
                        </ul>
                    </div>

                    <div class="">
                        <h4>Status:</h4>
                        <ul>
                            <li><a href="" @click.prevent="setFilter()"></a></li>
                        </ul>
                    </div>

                    <div class="">
                        <h4>Source:</h4>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="this.loaded && !disallowed">
            <div class="orderFilters">
                <!-- <div class="utilityBar flex">
                <div class="filterList">
                    <form data-filter-form>
                        <ul>
                            <FilterGroup v-for="(filterDef, key) in this.filterDefs" :title="filterDef.name">
                                <ul>
                                    <Filter v-for="filterChoice in filterDef.values" :type="filterDef.type"
                                        :filter="filterChoice" :filterID="key" />
                                </ul>
                            </FilterGroup>
                        </ul>
                    </form>
                </div>
            </div> -->
            </div>

            <div class="orderListWrapper" v-if="this.loaded">
                <div class="orderListColumns">

                    <section class="orderList ordersProposed">
                        <h3>New</h3>
                        <OrdersList v-if="this.proposed && this.proposed.length > 0" :orders="proposed"
                            @viewOrderDetails="viewOrderDetails" />
                        <NoItems v-else icon="fastfood" message="No orders have been placed." />
                    </section>

                    <section class="orderList ordersReserved">
                        <h3>In Progress</h3>
                        <OrdersList v-if="this.reserved && this.reserved.length > 0" :orders="reserved"
                            @viewOrderDetails="viewOrderDetails" />
                        <NoItems v-else icon="fastfood" message="There are no orders being prepared." />
                    </section>

                    <section class="orderList ordersPrepared">
                        <h3>Ready</h3>
                        <OrdersList v-if="this.prepared && this.prepared.length > 0" :orders="prepared"
                            @viewOrderDetails="viewOrderDetails" />
                        <NoItems v-else icon="fastfood"
                            message="There are currently no orders ready for delivery or pickup." />
                    </section>

                </div>
            </div>
        </div>
        <GlobalLoader v-else />
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { orderStore } from "../stores/order.js";
import { globalStore } from "../stores/global.js";
import { restaurantStore } from "../stores/restaurant.js";

import NoItems from "../components/NoItems.vue";
import Filters from "../components/Filters.vue";
import GlobalLoader from "../components/GlobalLoader.vue";
import OrdersList from "../components/OrdersList.vue";
import FilterGroup from "../components/FilterGroup.vue";
import Filter from "../components/Filter.vue";
import OrderActions from "../components/panel/OrderActions.vue";

export default {
    name: "Dashboard",
    components: {
        Filters,
        GlobalLoader,
        OrdersList,
        FilterGroup,
        Filter,
        OrderActions,
        NoItems
    },
    data() {
        return {
            userID: null,
            merchantID: null,
            locationID: null,
            flags: {
                filtersOpen: false
            }
        }
    },
    mounted() {
        const os = orderStore();
        const rs = restaurantStore();

        let merchID = null;
        let userID = null;
        let locID = null;

        if ('user_id' in this.$router.currentRoute.value.params) {
            userID = this.$router.currentRoute.value.params.user_id;
            this.userID = userID;
        }

        if ('merchant_post' in this.$router.currentRoute.value.params) {
            merchID = this.$router.currentRoute.value.params.merchant_post;
            this.merchantID = merchID;
        }

        if ('location_post' in this.$router.currentRoute.value.params) {
            locID = this.$router.currentRoute.value.params.location_post;
            this.locationID = locID;
        }

        os.loadOrdersData(userID, merchID, locID);
        rs.loadRestaurantData(this.$router.currentRoute.value.params?.location_post);
    },
    computed: {
        ...mapState(globalStore, {
            userID: store => store?.user?.ID
        }),
        ...mapState(restaurantStore, {
            name: store => store?.restaurant?.name
        }),
        ...mapState(orderStore, {
            proposed: store => store.orders?.proposed,
            reserved: store => store.orders?.reserved,
            prepared: store => store.orders?.prepared,
            lastUpdatedAt: store => store.lastUpdatedAt,
            loaded: store => store.loaded,
            disallowed: store => store.disallowAccess,
            disallowedMessage: store => store.message,
            icon: store => store.icon
        })
    },
    methods: {
        viewOrderDetails(data) {
            const os = orderStore();

            os.loadOrderData(this.userID, this.merchantID, this.locationID, data.order.id).then((resp) => {
                
            });
        },
        openFilterPanel() {
            this.flags.filtersOpen = !this.flags.filtersOpen;
        }
    }
};
</script>

<style></style>
