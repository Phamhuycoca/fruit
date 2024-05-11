<template>
    <div style="min-height: 100vh;height: 100%;display: flex;justify-content: center;align-items: center;">
        <v-card class="mx-auto" style="width: 100%;max-width: 400px;max-height: 100%;" variant="flat" rounded="lg">
            <v-img class="mx-auto" max-width="150" cover
                src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713596763/fruit-or-vegetable-logo-illustration-vector_rkan6u.jpg"></v-img>
            <div class="text-h4 mb-5 text-center" style="font-size: 32px;font-weight: 400;">
                Đăng nhập
            </div>
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" label="Email"
                    clearable></v-text-field>
                <v-text-field v-model="password" :readonly="loading" :rules="[required]" label="Password"
                    placeholder="Enter your password" clearable></v-text-field>
                <br>
                <v-btn @click="onSubmit" block class="mb-8" color="#0F60FF" size="large" :disabled="!form"
                    :loading="loading">
                    <span class="text-capitalize">Đăng</span>
                    <p class="text-lowercase"> nhập</p>
                </v-btn>
            </v-form>
            <div class=" d-flex align-center justify-center">
                <div style="font-size: 14px;font-weight: 400;line-height: 20px;">
                    Bạn chưa có tài khoản?
                </div>
                <router-link to="/register" class="text-decoration-none text-center ml-1"
                    style="font-weight: 600;font-size: 14px;line-height: 20px;color:#0F60FF;">
                    Đăng ký
                </router-link>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useAuthService } from "@/services/auth.service";
import { ref } from "vue";

const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const { login } = useAuthService();
const onSubmit = async () => {
    if (!form.value) return;
    loading.value = true;

    const emailValue = email.value || '';
    const passwordValue = password.value || '';
    alert(emailValue);

    const res = await login({ email: emailValue, password: passwordValue });
    if (res.success) {
        setTimeout(() => {
            loading.value = false;
            window.location.href = "/";
            //router.push('/');
        }, 3000);
    } else {
        loading.value = false;
    }
}

const required = (v: any) => {
    return !!v || 'Vui lòng nhập thông tin'
}
</script>

<style></style>