<template>
    <div>
        <v-dialog v-model="props.dialogEdit" width="auto">
            <v-card width="500">
                <v-card-title>Tạo mới thông tin</v-card-title>
                <v-card-item>
                    <v-text-field v-model="categoriesName" placeholder="Nhập thông tin"></v-text-field>
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
import { useCategory } from "@/services/categoty.service";
import { defineProps, defineEmits, ref, watch } from "vue";
const { updateCategory } = useCategory();
const props = defineProps(['dialogEdit', 'currentItem']);
const emit = defineEmits();
const categoriesName = ref('');
const categoriesId = ref('');
watch(() => props.currentItem, () => {
    categoriesName.value = props.currentItem.categoriesName;
    categoriesId.value = props.currentItem.categoriesId;
})
const saveData = async () => {
    const formData = new FormData();
    formData.append('categoriesName', categoriesName.value);
    formData.append('categoriesId', categoriesId.value);
    const res = await updateCategory(formData, categoriesId);
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