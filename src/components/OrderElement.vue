<template>

    <p class="text-lg">Id zamówienia: {{ order.id }}</p>
    <p class="text-lg ">{{ order.createdAt }} </p>
    <p class="text-lg flex justify-between ">
        <span>{{ order.total }}zł. </span>
        <select v-if="editable" @click.prevent v-model="selectedStatus.status" @change="handleStatusChange" :class="getStatusClass(selectedStatus.status)"
            class="appearance-none text-center text-base bg-bg-200 border border-primary-200 px-2 py-1 rounded shadow focus:outline-none focus:border-primary">
            <option :class="getStatusClass('Nieopłacone')" value="Nieopłacone" >Nieopłacone</option>
            <option :class="getStatusClass('Opłacone')" value="Opłacone">Opłacone</option>
            <option :class="getStatusClass('W realizacji')" value="W realizacji">W realizacji</option>
            <option :class="getStatusClass('Wysłane')" value="Wysłane">Wysłane</option>
        </select>
        <span v-else :class="getStatusClass(order.orderStatus.status)">{{ order.orderStatus.status }}</span>
    </p>
</template>

<script>
import Order from '@/components/model/Order';
export default {
    props: {
        order: Order,
        editable: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        getStatusClass(status) {
            switch (status) {
                case "Nieopłacone": {
                    this.selectedStatus.id = 1;
                    return 'text-accent-200';
                }
                case "Opłacone": {
                    this.selectedStatus.id = 2;
                    return 'text-primary-200';
                }
                case "W realizacji": {
                    this.selectedStatus.id = 3;
                    return 'text-green-500';
                }
                case "Wysłane": {
                    this.selectedStatus.id = 4;
                    return 'text-gray-300';
                }
                default:
                    return '';
            }
        },
        updateSelectedStatusId(status) {
            switch (status) {
                case "Nieopłacone":
                    this.selectedStatus.id = 1;
                    break;
                case "Opłacone":
                    this.selectedStatus.id = 2;
                    break;
                case "W realizacji":
                    this.selectedStatus.id = 3;
                    break;
                case "Wysłane":
                    this.selectedStatus.id = 4;
                    break;
                default:
                    this.selectedStatus.id = null;
            }
        },
         async handleStatusChange(event) {
            this.updateSelectedStatusId(event.target.value);
            const data={
                id: this.order.id,
                orderStatusId:this.selectedStatus.id
            }
            await this.$store.dispatch('admin/updateOrder', data);
            await this.$store.dispatch('admin/fetchOrders');
            await this.$store.dispatch('admin/searchOrderById', this.$store.state.admin.searchedOrder.id);
        },
    },
    computed: {
        selectedStatus(){
            return this.order.orderStatus;
        } 
             
        
    },
};

</script>