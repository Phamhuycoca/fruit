<template>
    <div>
        <v-dialog v-model="props.dialog" max-width="900">
            <v-card title="Thêm mới thông tin">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="6">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Hình ảnh</div>
                            <v-file-input label="File input" prepend-icon="mdi-camera" variant="filled"
                                v-if="selectedImage === null" type="file" @change="onFileChanged"></v-file-input>
                            <div class="d-flex justify-space-around align-center">
                                <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
                                    style="width: 200px;height: 100px;" />
                                <v-btn v-if="selectedImage" type="danger" color="red" @click="onRemoveImage">Xóa</v-btn>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Tên hoa quả</div>
                            <v-text-field v-model="fruitName" placeholder="Nhập thông tin"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Số lượng</div>
                            <v-text-field v-model="fruitQuantity" placeholder="Nhập thông tin"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Giá bán</div>
                            <v-text-field v-model="fruitPrice" placeholder="Nhập thông tin"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Giảm giá</div>
                            <v-text-field v-model="discount" @input="handleDiscountInput" :min="1" :max="100"
                                placeholder="Nhập thông tin"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Danh mục</div>
                            <v-select v-model="categoriesId" label="Chọn thông tin" :items="options"
                                item-title="categoriesName" item-value="categoriesId"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <div class="text-subtitle-1 my-2 text-medium-emphasis">Mô tả chi tiết</div>
                            <v-textarea v-model="fruitDescription" clearable placeholder="Nhập thông tin"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <template v-slot:actions>
                    <v-btn text="Hủy" @click="emit('close')" color="red" variant="flat"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text="Lưu" color="primary" @click="saveData" variant="flat"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { showErrors, showSuccessNotification } from "@/common/helpers";
import { useCategory } from "@/services/categoty.service";
import { useFruit } from "@/services/fruit.service";
import { defineProps, defineEmits, ref, onMounted, computed } from "vue";

const { createFruit } = useFruit();
const props = defineProps(['dialog']);
const emit = defineEmits();
const file = ref<File | null>(null);
const selectedImage = ref<string | null>(null);
const fruitName = ref('');
const fruitDescription = ref('');
const fruitQuantity = ref('');
const fruitPrice = ref('');
const discount = ref<number>(0);
const priceDiscount = ref<any>('');
const categoriesId = ref('');
const { fetchCategories } = useCategory();
const options = ref<any | undefined>([]);
const handleDiscountInput = (event: InputEvent) => {
    const inputValue = parseInt((event.target as HTMLInputElement).value, 10);
    if (inputValue > 100) {
        discount.value = 100; // Set the discount to 100 if the input value exceeds 100
    }
}
const onFileChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
        file.value = target.files[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                selectedImage.value = e.target.result as string;
            }
        };
        reader.readAsDataURL(file.value);
    }
};
const saveData = async () => {
    const formData = new FormData();
    formData.append('fruitName', fruitName.value);
    formData.append('fruitDescription', fruitDescription.value);
    formData.append('fruitQuantity', fruitQuantity.value);
    formData.append('fruitPrice', fruitPrice.value);
    formData.append('fruitId', '0');
    formData.append('discount', discount.value.toString());
    formData.append('categoriesId', categoriesId.value);
    if (file.value !== null) {
        formData.append('fileImg', file.value);
    }
    const res = await createFruit(formData);
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
const loadData = async () => {
    const res = await fetchCategories();
    options.value = res?.items;
}
onMounted(async () => {
    loadData();
})
const onRemoveImage = () => {
    selectedImage.value = null;
    file.value = null;
}
</script>

<style></style>