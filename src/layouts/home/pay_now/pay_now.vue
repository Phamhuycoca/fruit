<template>
    <div>
        <v-dialog v-model="props.payNow" max-width="900">
            <v-card title="Mua ngay">
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field placeholder="Người nhận hàng" v-model="fullName"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field placeholder="Số điện thoại giao hàng" v-model="phone"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field placeholder="Tổng tiền" disabled v-model="total_amount"
                                variant="solo"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field placeholder="Địa chỉ giao hàng" v-model="address"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select placeholder="Hình thức thanh toán" v-model="payments" :items="paymentTypes"
                                item-title="text" item-value="value"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <template v-slot:actions>
                    <v-btn text="Hủy" @click="emit('closePayNow')" color="red" variant="flat"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text="Xác nhận" color="primary" variant="flat" @click="payCart"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { showSuccessNotification } from "@/common/helpers";
import { useBill } from "@/services/bill.service";
import { reactive, watch } from "vue";
import { defineProps, defineEmits, ref } from "vue";
const { createBill, payNow } = useBill();
const emit = defineEmits();
const total_amount = ref('');
const fullName = ref('');
const address = ref('');
const payments = ref('');
const phone = ref('');
const fruitId = ref('');
const props = defineProps(['payNow', 'currentItem']);
watch(() => props.currentItem, () => {
    fruitId.value = props.currentItem.fruitId;
    total_amount.value = props.currentItem.priceDiscount;
})
const paymentTypes = reactive([
    { value: 'Thanh toán sau khi nhận hàng', text: 'Thanh toán sau khi nhận hàng' },
    { value: 'Thanh toán bằng VNPay', text: 'Thanh toán bằng VNPay' },
])
const payCart = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName.value);
    formData.append('address', address.value);
    formData.append('payments', payments.value);
    formData.append('phone', phone.value);
    formData.append('total_amount', total_amount.value);
    formData.append('fruitId', fruitId.value);
    const res = await payNow(formData);
    if (res.success) {
        showSuccessNotification(res.message);
        address.value = '';
        fullName.value = '';
        total_amount.value = '';
        payments.value = '';
        phone.value = '';
        if (res.data.payments !== 'Thanh toán sau khi nhận hàng') {
            // window.location.href = res.data;
            window.open(res.data, '_blank');
        }
        emit('closePayNow');
    }

}
</script>

<style></style>