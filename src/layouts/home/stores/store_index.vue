<template>
    <div style="min-height: 100vh;height:100%;">
        <v-row class="mt-5">
            <v-col cols="4">
                <div style="display:flex;align-items: center;" class="mx-2">
                    <v-card style="min-width: 400px;width: 400px;" variant="text">
                        <v-card-item>
                            <v-text-field @change="searchData()" v-model="search" density="compact"
                                placeholder="Nhập thông tin" variant="solo-filled" append-inner-icon="mdi-magnify">

                            </v-text-field>
                            <v-select density="compact" label="Chọn danh mục" v-model="categoryId" :items="categories"
                                item-title="categoriesName" item-value="categoriesId" variant="solo-filled"></v-select>
                            <v-select density="compact" v-model="price" label="Chọn giá" item-title="text"
                                item-value="value" :items="prices" variant="solo-filled"></v-select>
                            <v-select density="compact" v-model="sale" label="Giảm giá" item-title="text"
                                item-value="value" :items="sales" variant="solo-filled"></v-select>
                        </v-card-item>
                    </v-card>
                </div>
                <div style="display:flex;align-items: center;">
                    <v-icon class="ma-4" color="success" size="large">mdi-storefront-outline</v-icon>
                    <span style="font-size: 24px;line-height: 24px;">{{ store.storeName }}</span>
                </div>
                <div style="display:flex;align-items: center;">
                    <v-icon class="ma-4" color="success" size="large">mdi-map-marker-outline</v-icon>
                    <span style="font-size: 16px;line-height: 24px;">{{ store.storeAddress }}</span>
                </div>
                <div style="display:flex;align-items: center;">
                    <v-icon class="ma-4" color="success" size="large">mdi-phone</v-icon>
                    <span style="font-size: 16px;line-height: 24px;">{{ store.storePhone }}</span>
                </div>
            </v-col>
            <v-col cols="8">
                <!-- <v-row class="mx-2">
                    <v-col cols="4" v-for="item in 6" :key="item">
                        <v-card>{{ item }}</v-card>
                    </v-col>
                </v-row> -->
                <v-row>
                    <v-col cols="4" v-for="(item, index) in products" :key="index">
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
                                <v-btn size="small" @click="showPay(item)" color="primary" variant="outlined">
                                    <v-icon>mdi-credit-card-outline</v-icon>
                                    Mua ngay</v-btn>
                                <v-btn size="small" @click="addToCart(item)" color="red" variant="text">
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
                <v-pagination v-model="page" :length="totalItems" class="my-4" rounded="circle"></v-pagination>
            </v-col>
        </v-row>
        <pay_nowDialog :payNow="payNow" :currentItem="currentItem" @closePayNow="payNow = false" />

    </div>
</template>

<script lang="ts" setup>
import pay_nowDialog from '@/layouts/home/pay_now/pay_now.vue';

import { DEFAULT_COMMON_LIST_QUERY_PRODUCTS } from '@/common/constants';
import { formatNumberWithCommas, showErrorNotification, showErrors, showSuccessNotification } from '@/common/helpers';
import router from '@/router';
import { useAuthService } from '@/services/auth.service';
import { useCategory } from '@/services/categoty.service';
import { useFruit } from '@/services/fruit.service';
import { useStore } from '@/services/store.service';
import { onMounted, reactive, ref, watch } from 'vue';
const store = ref<any | ''>('');
const products = ref<any | undefined>([]);
const { getStore } = useStore();
const { fetchProductByStore, searchProductByStore } = useFruit();
const { isAuthenticated } = useAuthService();
const { fetchCategories } = useCategory();
const page = ref(1);
const totalItems = ref<number | undefined>(0);
import { useCart } from '@/services/cart.service';
const { createCart } = useCart();
const payNow = ref(false);
const currentItem = ref('');
const price = ref('');
const sale = ref('');
const categoryId = ref('');
const search = ref('');
const show = ref(Array(products.value.length).fill(false));
const categories = ref<any | undefined>([]);
const idRoute = ref<any | ''>('');
const prices = reactive([
    { value: 'Từ cao đến thấp', text: 'Từ cao đến thấp' },
    { value: 'Từ thấp đến cao', text: 'Từ thấp đến cao' },
]);
const sales = reactive([
    { value: 'Đang giảm giá', text: 'Đang giảm giá' },
    { value: 'Không giảm giá', text: 'Không giảm giá' },
])
watch
    (price, (newval) => {
        DEFAULT_COMMON_LIST_QUERY_PRODUCTS.price = newval;
        loadAllProducts(idRoute.value);
    });
watch(sale, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.sale = newval;
    loadAllProducts(idRoute.value);
});
watch(categoryId, (newval) => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.categoriesId = newval;
    loadAllProducts(idRoute.value);
});
watch(search, (newval, oldval) => {
    if (newval === '') {
        page.value = 1;
    }
})
const addToCart = async (item: any) => {
    if (isAuthenticated.value) {
        const formData = new FormData();
        formData.append('fruitId', item.fruitId);
        formData.append('quantity', '1');
        formData.append('storeId', item.storeId);
        const res = await createCart(formData);
        if (res.success) {
            showSuccessNotification(res.message)
        }
        else {
            if (res.errors !== undefined) {
                showErrors(res.errors);
            }
        }
    } else {
        showErrorNotification('Hãy đăng nhập để đặt mua');
    }
}
const showPay = (item: any) => {
    if (isAuthenticated.value) {
        payNow.value = true,
            currentItem.value = item;
    } else {
        showErrorNotification('Hãy đăng nhập để đặt mua');
    }

}
const toggleDescription = (index: number) => {
    show.value[index] = !show.value[index];
};
const loadAllProducts = async (id: any) => {
    const res = await fetchProductByStore(id);
    products.value = res?.items;
    console.log(res?.items);
    if (res?.totalItems !== undefined) {
        totalItems.value = Math.ceil(res?.totalItems / 9);
    }
}
const searchData = async () => {
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.keyword = search.value;
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.page = 1
    const data = await searchProductByStore(idRoute.value);
    products.value = data?.items;
}
onMounted(async () => {
    const id = router.currentRoute.value.params.id;
    const res = await getStore(id);
    store.value = res.data;
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.keyword = '';
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.page = 1;
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.limit = 9;
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.price = '';
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.categoriesId = '';
    DEFAULT_COMMON_LIST_QUERY_PRODUCTS.sale = '';
    await loadAllProducts(res.data.storeId);
    const category = await fetchCategories();
    categories.value = category?.items;
    idRoute.value = id;
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