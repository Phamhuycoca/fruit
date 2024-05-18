<template>
    <div style="min-height: 100vh;height:100%;">
        <v-row>
            <v-col cols="8">
                <h3 class="ml-10 mt-10">Danh sách đơn đặt hàng</h3>
                <v-row>
                    <v-col class="ml-10 mt-10" v-for="item in bills" :key="item" cols="5">
                        <v-card style="max-width: 500px;width: 500px;" :elevation="5">
                            <v-card-title>
                                <div>
                                    {{
                                        item.bill_Status == "0" ? 'Đơn hàng chưa thanh toán' : 'Đơn hàng đã thanh toán' }}
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
                                    <v-btn @click="getDetail_ById(item.billId), bill_detailId = item.billId">Xem chi
                                        tiết</v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { useBill_Detail } from '@/services/bill_detail.service';
import { useBill } from '../../../services/bill.service'
import { onMounted, ref } from 'vue';
const bills = ref<any | undefined>([]);
const { getBill_Detaill } = useBill_Detail();
const { fetchBills } = useBill();
const bill_detailId = ref('');
const bill_details = ref<[]>([]);
const getDetail_ById = async (id: any) => {
    const res = await getBill_Detaill(id);
    bill_details.value = res;
}
onMounted(async () => {
    const res = await fetchBills();
    bills.value = res?.items;
})
</script>

<style></style>