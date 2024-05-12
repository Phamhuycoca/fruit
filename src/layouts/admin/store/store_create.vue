<template>
    <div>
        <v-dialog v-model="props.dialog" width="auto">
            <v-card width="800">
                <v-card-title>Tạo mới thông tin</v-card-title>
                <v-card-item>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="storeName" placeholder="Nhập tên cửa hàng"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="storeAddress" placeholder="Nhập địa chỉ cụ thể"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="lng" placeholder="Nhập kinh độ"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="lat" placeholder="Nhập vĩ độ"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="storeType" placeholder="Chi nhánh"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="storePhone" placeholder="Số điện thoại chi nhánh"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-item>
                <template v-slot:actions>
                    <v-btn text="Hủy" @click="emit('close')" color="red" variant="flat"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text="Lưu" @click="saveData" color="primary" variant="flat"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { useStore } from "@/services/store.service";
import { defineProps, defineEmits, ref } from "vue";
const { createStore } = useStore();
const props = defineProps(['dialog']);
const emit = defineEmits();
const storeName = ref('');
const storeAddress = ref('');
const lat = ref('');
const lng = ref('');
const storeType = ref('');
const storePhone = ref('');

const saveData = async () => {
    const formData = new FormData();
    formData.append('storeName', storeName.value);
    formData.append('storeAddress', storeAddress.value);
    formData.append('lat', lat.value);
    formData.append('lng', lng.value);
    formData.append('storeType', storeType.value);
    formData.append('storePhone', storePhone.value);
    const res = await createStore(formData);
    if (res.success) {
        showSuccessNotification(res.message)
    }
    else {
        if (res.errors !== undefined) {
            showErrors(res.errors);
        }
    }
    emit('loadData');
    emit('close');
}
</script>

<style></style>