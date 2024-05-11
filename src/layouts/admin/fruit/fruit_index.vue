<template>
    <div>
        <v-row class="my-1">
            <v-col cols="12" style="display: flex;justify-content: space-between;align-items:center;">
                <v-text-field @change="searchData()" v-model="search" placeholder="Nhập thông tin"
                    style="max-width: 400px;" append-inner-icon="mdi-magnify" size="small" variant="solo" />
                <v-btn @click="dialog = true">Tạo mới</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-table fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center" style="max-width: 10px;">
                                STT
                            </th>
                            <th class="text-center">
                                Hình ảnh
                            </th>
                            <th class="text-center">
                                Tên hoa quả
                            </th>
                            <th class="text-center">
                                Giá bán
                            </th>
                            <th class="text-center">
                                Giá giảm
                            </th>
                            <th class="text-center">
                                Giảm giá %
                            </th>
                            <th class="text-center">
                                Mô tả chi tiết
                            </th>
                            <th class="text-center">
                                Thuộc danh mục
                            </th>
                            <th class="text-center">
                                Số lượng
                            </th>
                            <th class="text-center">
                                Chi nhánh
                            </th>
                            <th class="text-center">
                                Tùy chọn
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index" v-if="tableData.length > 0">
                            <td class="text-center" style="max-width: 10px;">{{ index + 1 }}</td>
                            <td style="display: flex;justify-content: center;">
                                <v-img style="width: 50px;height: 50px;" :src="item.fruitImg" />
                            </td>
                            <td class="text-center">{{ item.fruitName }}</td>
                            <td class="text-center">{{ item.fruitPrice }}</td>
                            <td class="text-center"> {{ item.priceDiscount === null ? '' : item.priceDiscount }}</td>
                            <td class="text-center">{{ item.discount === null || item.discount === 'null' ? '' :
                                `${item.discount}%` }}</td>
                            <td style="max-width: 250px;height: 58px;" class="text-truncate">{{
                                item.fruitDescription }}</td>
                            <td class="text-center">{{ item.categoriesName }}</td>
                            <td class="text-center">{{ item.fruitQuantity }}</td>
                            <td class="text-center">{{ item.storeName }}</td>
                            <td class="text-center">
                                <div class="d-flex align-center justify-center">
                                    <v-btn icon="mdi-pencil" size="small" class="ma-1" color="primary"
                                        @click="dialogEdit = true, currentItem = item"></v-btn>
                                    <v-btn icon="mdi-delete" size="small" color="red" class="ma-1"
                                        @click="confirm = true, idDelete = item.fruitId"></v-btn>
                                </div>
                            </td>
                        </tr>
                        <tr v-else style="height: 58px;">
                            <td colspan="12">
                                <p class="text-center text-red">Không có dữ liệu</p>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <div class="text-center">
            <v-container>
                <v-row justify="center">
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination v-model="page" :length="totalItems" class="my-4"></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <Fruit_Create :dialog="dialog" @close="dialog = false" @loadData="loadData" />
        <Fruit_Update :currentItem="currentItem" :dialogEdit="dialogEdit" @close="dialogEdit = false"
            @loadData="loadData" />
        <Confirm :confirm="confirm" @deleteData="deleteData" @close="confirm = false" />

    </div>
</template>

<script lang="ts" setup>
import { useFruit } from '@/services/fruit.service';
import Fruit_Create from './fruit_create.vue'
import Fruit_Update from './fruit_update.vue';
import { onMounted, ref, watch } from 'vue';
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
import Confirm from '@/common/page/confirm.vue';
import { showErrors, showSuccessNotification } from '@/common/helpers';
const { fetchFruits, searchFruits, deleteFruit } = useFruit();

const currentItem = ref([]);
const page = ref(1);
const dialog = ref(false);
const confirm = ref(false);
const dialogEdit = ref(false);
const idDelete = ref('');
const search = ref('');
let lengthPage = ref('')
const tableData = ref<any | undefined>([]);
const totalItems = ref<number | undefined>(0);
watch(page, (newVal) => {
    DEFAULT_COMMON_LIST_QUERY.page = newVal
    loadData()
})
watch(search, (newval, oldval) => {
    if (newval === '') {
        page.value = 1;
    }
})
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY.page = 1
    const data = await searchFruits();
    tableData.value = data?.items;
}
const loadData = async () => {
    const res = await fetchFruits();
    tableData.value = res?.items;
    if (res?.totalItems !== undefined) {
        totalItems.value = Math.ceil(res?.totalItems / DEFAULT_COMMON_LIST_QUERY.limit);
    }
}
const deleteData = async () => {
    const res = await deleteFruit(idDelete.value);
    if (res.success) {
        showSuccessNotification(res.message)
    }
    else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    idDelete.value = '';
    confirm.value = false;
    loadData();
}
onMounted(async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = '';
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    loadData();
})
</script>

<style></style>