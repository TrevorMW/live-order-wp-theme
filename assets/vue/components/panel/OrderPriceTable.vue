<template>

    <h2>Summary</h2>
    <table>
        <tbody>
            <tr>
                <th>Subtotal</th>
                <td v-html="getSubtotal"></td>
            </tr>

            <tr>
                <th>Tax</th>
                <td v-html="getTax"></td>
            </tr>
            

            <tr v-if="hasServiceCharge">
                <th>Service Charge</th>
                <td v-html="getServiceChargeTotal"></td>
            </tr>

            <tr v-if="hasTip">
                <th>Tip</th>
                <td v-html="getTipTotal"></td>
            </tr>

            <tr v-if="hasDiscount">
                <th>Discount</th>
                <td v-html="getDiscountTotal"></td>
            </tr>

            <tr>
                <th>Total</th>
                <td v-html="getTotal"></td>
            </tr>

        </tbody>
    </table>

</template>

<script>
import * as helpers from '../../helpers/orderHelpers.js';

export default {
    name: "OrderPriceTable",
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    computed: {
        hasServiceCharge: function(){
            return this.order.total_service_charge_money.amount > 0 ? true : false ;
        },
        hasTip: function(){
            return this.order.total_tip_money.amount > 0 ? true : false ;
        },
        hasDiscount: function(){
            return this.order.total_discount_money.amount > 0 ? true : false ;
        },
        getSubtotal: function(){
            const total = this.order.total_money.amount;
            const tax = this.order.total_tax_money.amount;
            const discount = this.order.total_discount_money.amount;
            const tip = this.order.total_tip_money.amount;
            const service = this.order.total_service_charge_money.amount;

            const subtotalCalc = (total - tax - discount - tip - service);

            return helpers.formatMoney(new Number(subtotalCalc));
        },
        getTax: function(){
            return helpers.formatMoney(new Number(this.order.total_tax_money.amount));
        },
        getTotal: function(){
            return helpers.formatMoney(new Number(this.order.total_money.amount));
        },
        getDiscountTotal: function(){
            return helpers.formatMoney(new Number(this.order.total_discount_money.amount));
        },
        getTipTotal: function(){
            return helpers.formatMoney(new Number(this.order.total_tip_money.amount));
        },
        getServiceChargeTotal: function(){
            return helpers.formatMoney(new Number(this.order.total_service_charge_money.amount));
        }
    },
};
</script>

<style>

</style>
