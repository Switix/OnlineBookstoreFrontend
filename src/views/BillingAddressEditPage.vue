<template>
    <div class="flex items-center justify-center py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6 ">
                <h2 class="text-2xl font-bold text-center mb-4">Edycja adresu rozliczeniowego</h2>
                <BillingAddressEdit/>
            </div>
        </div>
    </div>
</template>
  
<script>
//import _ from 'lodash';
import BillingAddressEdit from '@/components/BillingAddressEdit'
export default {
    components:{
        BillingAddressEdit
    },
};
</script>
  
<style></style>