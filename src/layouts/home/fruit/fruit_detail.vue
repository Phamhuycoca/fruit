<template>
    <div style="min-height: 100vh;height:100%;" class="px-10 mt-10">
        <v-row>
            <v-col cols="8">
                <v-card elevation="0">
                    <v-card-item style="width: 100%;">
                        <span class="text-center" style="font-size: 30px;">
                            Chi tiết sản phẩm
                        </span>
                    </v-card-item>
                    <v-card-text class="d-flex" style="min-height: 300px;">
                        <v-img :src="item.fruitImg"
                            style="max-width: 400px;width: 100%;max-height: 400px;height: 100%;">
                            <span v-if="item.discount !== '0'"
                                style="font-size: 24px;float: right;min-width: 70px;min-height: 30px;padding: 2px;background-color: #ECF7ED;text-align: center;color: #37833B;font-weight: 500;font-family: Times New Roman;">
                                {{ item.discount }}% OFF
                            </span></v-img>
                        <div class="text-h5 ml-10 w-100" style="display: flex;flex-direction: column;">
                            <div>
                                <span style="color: #008000;">{{ item.fruitName }}</span>
                                <div
                                    style="background-color: #E7E7E7;border-radius: 4px;max-height: 50px;height: 100%;display: flex;align-items: center;max-width: 100%;width: 100%;justify-content: space-between;padding: 4px;">
                                    <span :class="{ 'discounted': item.discount !== '0' }"
                                        style="width: 100%; max-width: 200px;padding: 8px;border-radius: 2px;display: flex; justify-content: center;align-items: center;color: #333;margin-right: 5px;">
                                        {{ `${formatPrice(item.fruitPrice)} đ` }}</span>
                                    <span v-if="item.discount !== '0'" style="color: red;font-size: 30px;">{{
                                        `${formatPrice(item.priceDiscount)} đ` }}</span>
                                </div>
                            </div>
                            <div class="mt-10"
                                style="display: flex;justify-content: space-between;align-items: center;">
                                <div style="display: flex;height: 100%;align-items: center;">
                                    <div style="font-size: 14px;" class="mr-4">
                                        Số lượng
                                    </div>
                                    <v-text-field @input="handleDiscountInput" v-model="count" type="number" min="1"
                                        max="100" style="max-width: 50px;border: 1px;"
                                        variant="underlined"></v-text-field>
                                </div>
                                <v-btn size="small" color="#EF6C00">Mua ngay</v-btn>
                                <v-btn size="small" color="primary">Thêm giỏ hàng</v-btn>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-item>
                        {{ item.fruitDescription }}
                    </v-card-item>

                </v-card>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" vertical></v-divider>
            <v-col cols="4">
                <v-card>
                    <v-card-title>Sản phẩm bán chạy</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { formatNumberWithCommas, formatPrice } from '@/common/helpers';
import router from '@/router';
import { useFruit } from '@/services/fruit.service';
import { onMounted, ref } from 'vue';
const { getFruit } = useFruit();
const item = ref<any | ''>('');
const count = ref(1);
const incrementCount = () => {
    if (count.value < 100) {
        count.value += 1;
    }
};

const decrementCount = () => {
    if (count.value > 1) {
        count.value -= 1;
    }
};

const handleDiscountInput = (event: InputEvent) => {
    const inputValue = parseInt((event.target as HTMLInputElement).value, 10);
    if (inputValue > 100) {
        count.value = 100;
    }
}
onMounted(async () => {
    const id = router.currentRoute.value.params.id;
    const res = await getFruit(id);
    item.value = res.data;
})
</script>


<style scoped>
.discounted {
    text-decoration: line-through;
}
</style>