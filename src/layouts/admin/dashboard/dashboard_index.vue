<template>
    <div style="min-height: 100vh;height:100%;">
        <v-row>
            <v-col cols="4">
                <store_dashboard />
            </v-col>
            <v-col cols="4">
                <bill_dashboard />
            </v-col>
            <v-col cols="4">
                <v-card class="ma-10">
                    <v-card-title>
                        Tổng số doanh thu
                        {{ total.bill_count }}
                    </v-card-title>
                </v-card>
                <v-card class="ma-10">
                    <v-card-title>
                        Tổng số sản phẩm được bán
                        {{ total.fruit_count }}

                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h3>Danh sách đơn hàng</h3>
                <v-table height="500px">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Người nhận hàng
                            </th>
                            <th class="text-left">
                                Địa chỉ nhận hàng
                            </th>
                            <th class="text-left">
                                Tổng tiền đơn hàng
                            </th>
                            <th class="text-left">
                                Cách thức thanh toán
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in bills" :key="item">
                            <td>{{ item.fullName }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.total_amount }}</td>
                            <td>{{ item.payments }}</td>
                        </tr>
                    </tbody>
                </v-table>
                <v-btn @click="Status">Duyệt tất cả</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import store_dashboard from './store_dashboard.vue'
import bill_dashboard from './bill_dashboard.vue'
import { useBill } from '@/services/bill.service';
import { onMounted, ref } from 'vue';
import { useDashboard } from '@/services/dashboard.service';
import { showSuccessNotification } from '@/common/helpers';
const { fetchitemsStatus0, updateStatus } = useBill();
const { totalsDashboard } = useDashboard();
const bills = ref<any | undefined>([]);
const total = ref('');
const fetchitemsStatus = async () => {
    const res = await fetchitemsStatus0();
    bills.value = res?.items;
    console.log(bills.value);
}
const Status = async () => {
    const rs = await updateStatus();
    if (rs.success) {
        showSuccessNotification(rs.message)
    }
}
onMounted(async () => {
    await fetchitemsStatus();
    const res = await totalsDashboard();
    total.value = res.data;
    console.log(total.value);
})
</script>

<style></style>