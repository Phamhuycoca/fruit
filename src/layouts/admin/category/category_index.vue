<template>
    <div>
        <v-row class="my-1">
            <v-col cols="12" style="display: flex;justify-content: space-between;align-items:center;">
                <v-text-field @change="searchData()" v-model="search" placeholder="Nhập thông tin"
                    style="max-width: 400px;" append-inner-icon="mdi-magnify" variant="solo" />
                <v-btn @click="dialog = true">Tạo mới</v-btn>
            </v-col>
        </v-row>
        <v-card>
            <v-table>
                <thead>
                    <tr>
                        <th class=" text-left">
                            STT
                        </th>
                        <th class=" text-left">
                            Tên loại
                        </th>
                        <th class=" text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index" v-if="tableData.length > 0">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.categoriesName }}</td>
                        <td class="text-center">
                            <div class="d-flex align-center justify-center">
                                <v-btn icon="mdi-pencil" class="ma-1" color="primary"
                                    @click="dialogEdit = true, currentItem = item"></v-btn>
                                <v-btn icon="mdi-delete" color="red" class="ma-1"
                                    @click="confirm = true, idDelete = item.fruitId"></v-btn>
                            </div>
                        </td>
                    </tr>
                    <tr v-else style="height: 58px;">
                        <td colspan="6">
                            <p class="text-center text-red">Không có dữ liệu</p>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
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
        <Confirm :confirm="confirm" @deleteData="deleteData" @close="confirm = false" />
        <Category_create :dialog="dialog" @close="dialog = false" @loadData="loadData" />
        <Category_update :currentItem="currentItem" :dialogEdit="dialogEdit" @close="dialogEdit = false"
            @loadData="loadData" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Confirm from '../../../common/page/confirm.vue'
import { useCategory } from '@/services/categoty.service';
const { fetchCategories, deleteCategory, searchCategories } = useCategory();
import Category_create from './category_create.vue';
import { showErrors, showSuccessNotification } from "@/common/helpers";
import Category_update from './category_update.vue';
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
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
const loadData = async () => {
    const res = await fetchCategories();
    tableData.value = res?.items;
    if (res?.totalItems !== undefined) {
        totalItems.value = Math.ceil(res?.totalItems / DEFAULT_COMMON_LIST_QUERY.limit);
    }
}
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
    const data = await searchCategories();
    tableData.value = data?.items;
}
const deleteData = async () => {
    const res = await deleteCategory(idDelete.value);
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