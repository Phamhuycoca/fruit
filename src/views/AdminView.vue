<template>
    <v-layout class="rounded rounded-md">
        <v-navigation-drawer style="background-color: #43A047;color: white;" permanent>
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item to="/admin/dashboard" prepend-icon="mdi-monitor-dashboard" title="Dashboard"
                    value="Dashboard"></v-list-item>
                <v-list-item to="/admin/store" prepend-icon="mdi-store-check-outline" title="Quản lý cửa hàng"
                    value="Quản cửa hàng"></v-list-item>
                <v-list-item to="/admin/fruits" prepend-icon="mdi-fruit-cherries" title="Quản lý hoa quả"
                    value="Quản lý hoa quả"></v-list-item>
                <v-list-item to="/admin/bill" prepend-icon="mdi-cash" title="Quản lý hóa đơn"
                    value="Quản lý hóa đơn"></v-list-item>
                <v-list-item to="/admin/categories" prepend-icon="mdi-shape" title="Quản lý loại"
                    value="Quản lý loại"></v-list-item>
            </v-list>

            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block>
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar title="Dashboard" elevation="0">
            <template v-slot:append>
                <v-badge :content="56" floating class="mr-5 mt-2">
                    <v-icon icon="$vuetify" size="x-large"></v-icon>
                </v-badge>
            </template>
        </v-app-bar>

        <v-main style="min-height: 100vh;background-color: #F5F5F5;">
            <RouterView class="px-4" />
        </v-main>
    </v-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

</script>