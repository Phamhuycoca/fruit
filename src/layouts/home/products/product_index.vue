<template>
    <div style="min-height: 100vh;height:100%;" class="px-10 mt-10">
        <v-row>
            <v-col cols="3">
                <v-card style="min-width: 400px;width: 400px;border: 1px solid #ccc;border-radius: 5px;" variant="text">
                    <v-card-title class="text-center">
                        Danh mục
                    </v-card-title>
                    <v-card-item>
                        <v-text-field @change="searchData()" v-model="search" density="compact"
                            placeholder="Nhập thông tin" variant="solo-filled" append-inner-icon="mdi-magnify">

                        </v-text-field>
                        <v-select density="compact" label="Chọn danh mục" v-model="categoryId" :items="categories"
                            item-title="categoriesName" item-value="categoriesId" variant="solo-filled"></v-select>
                        <v-select density="compact" v-model="price" label="Chọn giá" item-title="text"
                            item-value="value" :items="prices" variant="solo-filled"></v-select>
                        <v-select density="compact" v-model="sale" label="Giảm giá" item-title="text" item-value="value"
                            :items="sales" variant="solo-filled"></v-select>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="9">
                <v-row>
                    <v-col cols="4" v-for="(item, index) in fruits" :key="index">
                        <v-card style="max-width: 350px;width: 100%;border-radius: 5px;min-height:300px;height: 100%;"
                            hover variant="flat">
                            <v-card-item>
                                <v-img :src="item.fruitImg"
                                    style="max-width: 200px;width: 100%;height: 100%;margin: auto;" cover>
                                    <span v-if="item.discount !== '0'"
                                        style="font-size: 12px;float: right;min-width: 70px;min-height: 24px;padding: 2px;background-color: #ECF7ED;text-align: center;color: #37833B;font-weight: 500;font-family: Times New Roman;">
                                        {{ item.discount }}% OFF
                                    </span>
                                </v-img>
                            </v-card-item>
                            <v-card-text style="width: 100%;">
                                <div style="width: 100%; text-align: center;margin: 10px;">
                                    <router-link :to="`/fruit_detail/` + item.fruitId" style="text-decoration: none;"
                                        class="detail__link"> {{
                                            item.fruitName
                                        }}</router-link>
                                </div>
                                <div
                                    style="width: 100%; text-align: center;display: flex; justify-content: center;align-items: center;">
                                    <span :class="{ 'discounted': item.discount !== '0' }"
                                        style="max-width: 100px;background-color: #E9E6ED; width: 100%;padding: 4px;border-radius: 3px;display: flex; justify-content: center;align-items: center;color: #333;margin: 1px;">
                                        {{
                                            `${formatNumberWithCommas(item.fruitPrice)} đ` }}</span>
                                    <div v-if="item.discount !== '0'" style="margin-left: 2px;margin-right: 2px;">-
                                    </div>
                                    <span v-if="item.discount !== '0'"
                                        style="max-width: 100px;background-color: #078607;width: 100%;padding: 4px;border-radius: 2px;display: flex; justify-content: center;align-items: center;color: #fff;margin: 1px;">
                                        {{
                                            `${formatNumberWithCommas(item.priceDiscount)} đ` }}</span>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn size="small" @click="byNow" color="primary" variant="outlined">
                                    <v-icon>mdi-credit-card-outline</v-icon>
                                    Mua ngay</v-btn>
                                <v-btn size="small" @click="byNow" color="red" variant="text">
                                    <v-icon>
                                        mdi-cart-variant
                                    </v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>

                                <v-btn :icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="toggleDescription(index)"></v-btn>
                            </v-card-actions>
                            <v-expand-transition>
                                <div v-show="show[index]">
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        {{ item.fruitDescription }}
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>

                    </v-col>
                </v-row>
                <div class="text-center ma-10">
                    <v-btn variant="outlined" color="primary">
                        Xem thêm</v-btn>
                    <v-pagination class="ma-10" :length="4" rounded="circle"></v-pagination>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useCategory } from "@/services/categoty.service";
import { useFruit } from '@/services/fruit.service';
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_PRODUCTS } from '@/common/constants';
import { useAuthService } from '@/services/auth.service';
const { fetchFruits, searchGetAllProducts, fetchGetAllProducts } = useFruit();
import { formatNumberWithCommas, showErrorNotification } from '@/common/helpers';

const { fetchCategories } = useCategory();
const fruits = ref<any | undefined>([]);
const totalItems = ref<number | undefined>(0);
const { isAuthenticated } = useAuthService();
const page = ref(1);
const show = ref(Array(fruits.value.length).fill(false));
const price = ref('');
const sale = ref('');
const categoryId = ref('');
const search = ref('');

const toggleDescription = (index: number) => {
    show.value[index] = !show.value[index];
};
const loadData = async () => {
    const response = await fetchGetAllProducts();
    fruits.value = response?.items;
}
const byNow = () => {
    if (isAuthenticated.value) {
        alert('Ok');
    } else {
        showErrorNotification('Vui lòng đăng nhập');
    }
}
const categories = ref<any | undefined>([]);
const prices = reactive([
    { value: 'Từ cao đến thấp', text: 'Từ cao đến thấp' },
    { value: 'Từ thấp đến cao', text: 'Từ thấp đến cao' },
]);
const sales = reactive([
    { value: 'Đang giảm giá', text: 'Đang giảm giá' },
    { value: 'Không giảm giá', text: 'Không giảm giá' },
])
watch(price, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.price = newval;
    loadData();
});
watch(sale, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.sale = newval;
    loadData();
});
watch(categoryId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.categoriesId = newval;
    loadData();
});
watch(search, (newval, oldval) => {
    if (newval === '') {
        page.value = 1;
    }
})
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.page = 1
    const data = await searchGetAllProducts();
    fruits.value = data?.items;
}
onMounted(async () => {
    const category = await fetchCategories();
    categories.value = category?.items;
    loadData();

})
</script>

<style scoped>
.discounted {
    text-decoration: line-through;
}

.detail__link {
    color: #333;
    line-height: 2;
    position: relative;
}

.detail__link::before {
    content: '';
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: #333;
    position: absolute;
    bottom: -.5rem;
    left: 0;
    transition: transform .4s, opacity .4s;
    opacity: 0;
}

.detail__link:hover::before {
    transform: translateY(-.25rem);
    opacity: 1;
}
</style>