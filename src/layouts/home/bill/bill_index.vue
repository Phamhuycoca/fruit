<template>
    <div style="min-height: 100vh;height:100%;">
        <v-row>
            <v-col cols="8">
                <h3 class="ml-10 mt-10">Danh sách đơn đặt hàng</h3>
                <v-row>
                    <v-col class="ml-10 mt-10" v-for="item in bills" :key="item">
                        <v-card style="max-width: 500px;width: 500px;">
                            <v-card-title>
                                <div>
                                    {{ item.bill_Status === '0' ? 'Đơn hàng chưa thanh toán' : 'Đơn hàng đã thanh toán'
                                    }}
                                </div>
                            </v-card-title>
                            <v-card-items>
                                <div style="width: 100%;" class="ml-10 mt-2 mb-2">
                                    Người nhận:{{ item.fullName }}
                                </div>
                                <div style="width: 100%;" class="ml-10 mt-2 mb-2">
                                    Người nhận:{{ item.address }}
                                </div>
                                <div style="width: 100%;" class="ml-10 mt-2 mb-2">
                                    Người nhận:{{ item.phone }}
                                </div>
                            </v-card-items>
                            <v-card-text style="display: flex;justify-content: space-between;">
                                <div class="ml-5">
                                    {{ item.total_amount }} Vnđ
                                </div>
                                <div>
                                    <router-link to="/">Xem chi tiết</router-link>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4">
                <h3 class="ml-10 mt-10">Danh sách đơn đặt hàng</h3>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { useBill } from '../../../services/bill.service'
import { onMounted, ref } from 'vue';
const bills = ref<any | undefined>([]);

const { fetchBills } = useBill();
onMounted(async () => {
    const res = await fetchBills();
    bills.value = res?.items;
    console.log(bills.value);
})
</script>

<style></style>