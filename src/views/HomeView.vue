<template>
  <div>
    <v-app>
      <v-app-bar style="background-color: #F5F5F5;" :elevation="0">
        <v-toolbar-title>
          <div style="display: flex; align-items: center;height:80px;width: 400px;">
            <v-img :width="80" style="margin: 5px;border-radius: 2px;width: 1%;height: 60px;padding:10px;" cover
              src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713553164/42880a403e2a7a2d1e2095a19daa4ead_l6efhf.jpg"></v-img>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;" to="">Trang
              chủ</router-link>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;" to="">Sản
              phẩm</router-link>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;" to="">Về chúng
              tôi</router-link>
          </div>
        </v-toolbar-title>
        <div style="display: flex; justify-content: space-between; align-items: center;max-width: 90px;width: 100%;">
          <v-badge color="error" content="6">
            <v-icon icon="mdi-bell" size="large"></v-icon>
          </v-badge>
          <v-avatar id="menu-activator" style="cursor: pointer;">
            <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
          <v-menu activator="#menu-activator" style="cursor: pointer;" width="200">
            <v-list>
              <v-list-item>
                <v-list-item-title style="height: 40px;">Xem thông tin</v-list-item-title>
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
      <v-main>
        <div v-if="$router.currentRoute.value.path === '/'">
          <Carousel_Home class="px-4" />
          <mainbody />
        </div>
        <RouterView v-else />
      </v-main>
      <Footer_Home style="padding: 0;margin-top: 50px;" />
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import Carousel_Home from '../components/carousel_home.vue'
import Footer_Home from '../components/footer_home.vue'
import router from '@/router';
import { RouterView } from 'vue-router';
import mainbody from '../layouts/home/mainbody.vue'

</script>

<style scoped>
.menu__link {
  color: #333;
  line-height: 2;
  position: relative;
}

.menu__link::before {
  content: '';
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background-color: #333;
  position: absolute;
  bottom: -.1rem;
  left: 0;
  transition: transform .4s, opacity .4s;
  opacity: 0;
}

.menu__link:hover::before {
  transform: translateY(-.25rem);
  opacity: 1;
}

.v-img__img,
.v-img__picture,
.v-img__gradient,
.v-img__placeholder,
.v-img__error {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 60% !important;
  height: 100% !important;
}
</style>