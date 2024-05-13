<template>
    <div>
        <v-layout style="position: relative;">
            <v-navigation-drawer v-model="props.openCart" location="right" temporary width="550"
                style="padding-top: 60px;">
                <div style="position: absolute;left: -10px;background-color: #fff;border-radius: 50%;font-size: 20px;z-index: 1000;"
                    @click="cloesCart">
                    <v-icon color="error">mdi-close-circle</v-icon>
                </div>
                <div v-if="carts.length > 0">
                    <div class="text-center" style="font-size: 24px;margin-top: 10px;">Giỏ hàng của bạn</div>
                    <div v-for="(item, index) in carts" :key="index">
                        <v-card class="mx-3 my-2" variant="text" hover>
                            <v-card-item>
                                <div style="display: flex;align-items: center;">
                                    <v-checkbox style="display: flex;align-items: center;" :v-model="checkbox[index]"
                                        @click="toggleDescription(index)"></v-checkbox>
                                    <v-img :src="item.fruitImg" style="height: 50px;width: 50px;" />
                                    <div
                                        style="width: 380px;display: flex;align-items: center;justify-content: space-evenly;">
                                        <span class="d-inline-block text-truncate" style="max-width: 150px;">{{
                                            item.fruitName }}
                                            <v-tooltip activator="parent" location="top">
                                                {{
                                                    item.fruitName }}
                                            </v-tooltip>
                                        </span>
                                        <div>
                                            <v-btn color="orange-lighten-2" variant="text"
                                                @click="GiamQuantity(item, item.quantity)">-</v-btn>
                                            <span>{{ item.quantity }}</span>
                                            <v-btn color="orange-lighten-2" variant="text"
                                                @click="TangQuantity(item, item.quantity)">+</v-btn>
                                            <v-btn size="small" icon="mdi-delete" @click="deleteCartItem(item.cartId)"
                                                color="red"></v-btn>
                                        </div>
                                    </div>
                                </div>
                            </v-card-item>
                        </v-card>
                    </div>
                    <div style="position: absolute;left: 0px;font-size: 20px;z-index: 1000;bottom: 0px;margin: 10px;">
                        <v-btn prepend-icon="mdi-cart" color="success" v-if="checkbox" @click="ThanhToan">Thanh
                            toán</v-btn>
                        <v-btn prepend-icon="mdi-cart" color="success" v-else>Thanh toán tất cả</v-btn>
                    </div>
                    <!-- <div style="position: absolute;right: 0px;font-size: 20px;z-index: 1000;bottom: 0px;margin: 10px;">
                        <v-btn prepend-icon="mdi-cart" color="error" v-if="checkbox">Xóa tất cả</v-btn>
                        <v-btn prepend-icon="mdi-cart" color="error" v-else>Xóa</v-btn>
                    </div> -->
                </div>
                <div v-else>
                    <div style="height: 800px;display: flex;justify-content: center;align-items: center;">
                        <span style="font-size: 20px;">
                            Giỏ
                            hàng trống...
                        </span>
                    </div>
                </div>
            </v-navigation-drawer>
        </v-layout>
    </div>
</template>

<script lang="ts" setup>
import { useAuthService } from "@/services/auth.service";
import { useCart, } from "@/services/cart.service";
import { defineProps, defineEmits, onMounted, ref, watch } from "vue";
const props = defineProps(['openCart']);
const { isAuthenticated } = useAuthService();

const emit = defineEmits();
const { fetchCart, tanggiamCart, deleteCart } = useCart();
// const checkbox = ref(false);
const carts = ref<any | undefined>([]);
const checkbox = ref(Array(carts.value.length).fill(false));
const toggleDescription = (index: number) => {
    checkbox.value[index] = !checkbox.value[index];
};
watch(() => props.openCart, () => {
    if (props.openCart) {
        loadData();
    }
})
const cloesCart = () => {
    emit('cloesCart');
}
const deleteCartItem = async (id: any) => {
    const res = await deleteCart(id);
    if (res) {
        loadData();
    }
}
const TangQuantity = async (item: any, quantity: number) => {
    const quantityCart = quantity += 1;
    const formData = new FormData();
    formData.append('cartId', item.cartId);
    formData.append('fruitId', item.fruitId);
    formData.append('quantity', quantityCart.toString());
    await tanggiamCart(formData);
    loadData();
}
const GiamQuantity = async (item: any, quantity: number) => {
    if (quantity > 1) {
        const quantityCart = quantity - 1;
        const formData = new FormData();
        formData.append('cartId', item.cartId);
        formData.append('fruitId', item.fruitId);
        formData.append('quantity', quantityCart.toString());
        await tanggiamCart(formData);
        loadData();
    }
}
const ThanhToan = () => {
    const danhSachDaChon = <any | undefined>([]);
    checkbox.value.forEach((isChecked, index) => {
        if (isChecked) {
            danhSachDaChon.push(carts.value[index]);
        }
    });
    console.log(danhSachDaChon);
}
const loadData = async () => {
    const res = await fetchCart();
    carts.value = res?.items;
}
onMounted(async () => {
    if (isAuthenticated.value) {
        await loadData();
    }
})
</script>

<style></style>