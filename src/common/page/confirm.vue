<template>
    <div class="d-flex align-center justify-center" style="width: 100%;">
        <v-dialog v-model="props.confirm" width="auto">
            <v-card text="Bạn có muốn xóa thông tin" title="Thông báo" prepend-icon="mdi-bell" max-width="400"
                elevation="16">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Có" color="primary" @click="emit('deleteData')"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-auto" text="Không" @click="emit('close')" color="red"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(['confirm'])
const emit = defineEmits();
</script>

<style></style>