<template>
    <div style="min-height: 100vh;height:100%;">
        <v-row>
            <v-col cols="6">
                <h3 class="text-center mt-10">Nhập thông tin đơn hàng</h3>
                <v-row style="display: flex;width: 100%;justify-content: center;" class="py-10">
                    <v-col cols="5">
                        <v-text-field placeholder="Người nhận hàng" v-model="fullName"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field placeholder="Số điện thoại giao hàng" v-model="phone"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field placeholder="Tổng tiền" disabled v-model="total_amount"
                            variant="solo"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field placeholder="Địa chỉ giao hàng" v-model="address"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-select placeholder="Hình thức thanh toán" v-model="payments" :items="paymentTypes"
                            item-title="text" item-value="value"></v-select>
                    </v-col>
                    <v-col cols="12" style="display: flex; justify-content: center;">
                        <v-btn @click="payCart">Xác nhận</v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <h3 class="text-center mt-10">Danh sách sản phẩm</h3>
                <v-row v-for="item in cartItems" :key="item">
                    <v-col cols="12" style="display: flex;justify-content: center;">
                        <v-card class="mx-3 my-2" variant="text" hover style="width: 800px;">
                            <v-card-item>
                                <div style="display: flex;align-items: center;">
                                    <v-img :src="item.fruitImg" style="height: 100px;width: 100px;" />
                                    <div
                                        style="width: 380px;display: flex;align-items: center;justify-content: space-evenly;">
                                        <span class="d-inline-block text-truncate" style="max-width: 150px;">{{
                                            item.fruitName }}
                                        </span>
                                    </div>
                                    <v-btn size="small" icon="mdi-delete" color="red"
                                        @click="deleteItem(item.cartId)"></v-btn>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
                <v-pagination :length="8" style="display: flex;justify-content: center;"></v-pagination>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { showSuccessNotification } from '@/common/helpers';
import { useBill } from '@/services/bill.service';
import { usePayments } from '@/services/payments.service';
import { useReloadStore } from '@/stores/reload';
import { computed, onMounted, reactive, ref } from 'vue';
const { fetchCartItems, deleteToPayment } = usePayments();
const reload = useReloadStore();
const { createBill } = useBill();

const total_amount = ref('');
const fullName = ref('');
const address = ref('');
const payments = ref('');
const phone = ref('');

const cartItems = ref<any | undefined>([]);
const paymentTypes = reactive([
    { value: 'Thanh toán sau khi nhận hàng', text: 'Thanh toán sau khi nhận hàng' },
    { value: 'Thanh toán bằng VNPay', text: 'Thanh toán bằng VNPay' },
])
const loadData = async () => {
    const res = await fetchCartItems();
    cartItems.value = res?.items;
    console.log(res?.items);
    const total = computed(() => {
        return cartItems.value.reduce((accumulator: any, item: any) => accumulator + item.payment_Price, 0);
    })
    total_amount.value = total.value;
}
const deleteItem = async (id: any) => {
    alert(id);
    await deleteToPayment(id);
    loadData();
}
const payCart = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName.value);
    formData.append('address', address.value);
    formData.append('payments', payments.value);
    formData.append('phone', phone.value);
    formData.append('total_amount', total_amount.value);
    const res = await createBill(formData);
    if (res.success) {
        showSuccessNotification(res.message);
        setTimeout(() => {
            window.location.href = res.data;
        }, 3000)
    }
}
onMounted(() => {
    loadData();
})
</script>

<style></style>