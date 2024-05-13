<template>
    <div style="min-height: 100vh;height:100%;" class="px-4 mt-10">
        <div>
            <v-row style="padding:0 100px 0 100px;display: flex;justify-content:space-around;margin-bottom: 50px;">
                <v-card variant="flat" elevation="0" hover style="max-width: 250px;width: 100%;">
                    <v-card-text style="display: flex;justify-content: center;">
                        <v-img style="max-width: 100px;width: 100%;max-height: 100px;height: 100%;"
                            src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713596763/fruit-or-vegetable-logo-illustration-vector_rkan6u.jpg" />
                    </v-card-text>
                    <v-card-text style="display: flex;flex-direction: column;">
                        <span style="display: flex;align-items: center;justify-content:center;">NGUỒN GỐC</span>
                        <div class="text-center" style="display:flex;justify-content:center">
                            Cam kết hàng hoa quả sạch có nguồn gốc xuất xứ thương hiệu nổi tiếng ở Việt Nam.
                        </div>
                    </v-card-text>
                </v-card>
                <v-card variant="flat" elevation="0" hover style="max-width: 250px;width: 100%;">
                    <v-card-text style="display: flex;justify-content: center;">
                        <v-img style="max-width: 100px;width: 100%;max-height: 100px;height: 100%;"
                            src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713596763/fruit-or-vegetable-logo-illustration-vector_rkan6u.jpg" />
                    </v-card-text>
                    <v-card-text style="display: flex;flex-direction: column;">
                        <span style="display: flex;align-items: center;justify-content:center;">TƯƠI NGON</span>
                        <div class="text-center" style="display:flex;justify-content:center">
                            Hoa quả sạch luôn tươi ngon và được bảo quản sạch sẽ, không dùng hóa chất bảo quản.
                        </div>
                    </v-card-text>
                </v-card>
                <v-card variant="flat" elevation="0" hover style="max-width: 250px;width: 100%;">
                    <v-card-text style="display: flex;justify-content: center;">
                        <v-img style="max-width: 100px;width: 100%;max-height: 100px;height: 100%;"
                            src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713596763/fruit-or-vegetable-logo-illustration-vector_rkan6u.jpg" />
                    </v-card-text>
                    <v-card-text style="display: flex;flex-direction: column;">
                        <span style="display: flex;align-items: center;justify-content:center;">TRỌNG LƯỢNG</span>
                        <div class="text-center" style="display:flex;justify-content:center">
                            Cam kết trọng lượng đúng như Quý khách yêu cầu chính xác đến từng Gram, không gian dối về
                            trọng lượng cũng như số lượng
                        </div>
                    </v-card-text>
                </v-card>
                <v-card variant="flat" elevation="0" hover style="max-width: 250px;width: 100%;">
                    <v-card-text style="display: flex;justify-content: center;">
                        <v-img style="max-width: 100px;width: 100%;max-height: 100px;height: 100%;"
                            src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713596763/fruit-or-vegetable-logo-illustration-vector_rkan6u.jpg" />
                    </v-card-text>
                    <v-card-text style="display: flex;flex-direction: column;">
                        <span style="display: flex;align-items: center;justify-content:center;">VẬN CHUYỂN</span>
                        <div class="text-center" style="display:flex;justify-content:center">
                            - Miễn phí vận chuyển nội thành cho các đơn hàng trị giá từ 1 triệu đồng, khác phí từ
                            20,000đ đến 30,000đ mỗi đơn hàng tùy địa điểm.
                        </div>
                    </v-card-text>
                </v-card>
            </v-row>
        </div>
        <div class="text-center text-h4 ma-10">
            Thông tin sản phẩm
        </div>
        <v-row style="padding:0 100px 0;margin: auto;width: 100%;">
            <v-col cols="4" v-for="(item, index) in fruits" :key="index" class="d-flex flex-column align-center">
                <v-card style="max-width: 350px;width: 100%;border-radius: 5px;min-height:300px;height: 100%;" hover
                    variant="flat">
                    <v-card-item>
                        <v-img :src="item.fruitImg" style="max-width: 200px;width: 100%;height: 100%;margin: auto;"
                            cover>
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
                            <div v-if="item.discount !== '0'" style="margin-left: 2px;margin-right: 2px;">-</div>
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
        <div class="text-center ma-10">
            <!-- <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination> -->
            <v-btn variant="outlined" color="primary">
                Xem thêm</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCategory } from '@/services/categoty.service';
import { onMounted, ref } from 'vue';
const { fetchCategories } = useCategory();
import { useFruit } from '@/services/fruit.service';
import { formatNumberWithCommas, showErrorNotification, showErrors, showSuccessNotification } from '@/common/helpers';
import { useAuthService } from '@/services/auth.service';
import { useCart } from '@/services/cart.service';
import { DEFAULT_COMMON_LIST_QUERY } from '@/common/constants';
const { fetchFruits } = useFruit();
const categories = ref<any | undefined>([]);
const fruits = ref<any | undefined>([]);
const { isAuthenticated } = useAuthService();
const { createCart } = useCart();
const page = ref(1);
const show = ref(Array(fruits.value.length).fill(false));
const toggleDescription = (index: number) => {
    show.value[index] = !show.value[index];
};
const loadData = async () => {
    const res = await fetchCategories();
    categories.value = res?.items;
    const response = await fetchFruits();
    fruits.value = response?.items;
}
const byNow = () => {
    if (isAuthenticated.value) {
        alert('Ok');
    } else {
        alert('ko')
    }
}
const addToCart = async (item: any) => {
    if (isAuthenticated.value) {
        alert(item.fruitId);
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
onMounted(async () => {
    DEFAULT_COMMON_LIST_QUERY.keyword = '';
    DEFAULT_COMMON_LIST_QUERY.limit = 10;
    DEFAULT_COMMON_LIST_QUERY.page = 1;
    await loadData();
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