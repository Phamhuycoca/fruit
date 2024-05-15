<template>
  <div>
    <v-app>
      <v-app-bar style="background-color: #F5F5F5;" :elevation="0">
        <v-toolbar-title>
          <div style="display: flex; align-items: center;height:80px;width: 500px;">
            <v-img :width="80" style="margin: 5px;border-radius: 2px;width: 1%;height: 60px;padding:10px;" cover
              src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1713553164/42880a403e2a7a2d1e2095a19daa4ead_l6efhf.jpg"></v-img>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;" to="/">Trang
              chủ</router-link>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;"
              to="/products">Sản
              phẩm</router-link>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;" to="">Về chúng
              tôi</router-link>
            <router-link class="menu__link" style="text-decoration: none;margin:10px;font-size: 15px;" to="">Chi nhánh
              cửa hàng</router-link>
          </div>
        </v-toolbar-title>
        <div style="display: flex; justify-content: space-between; align-items: center;max-width: 90px;width: 100%;">
          <v-badge color="error" content="6">
            <v-icon icon="mdi-bell-outline" size="large"></v-icon>
          </v-badge>
          <div v-if="isAuthenticated">
            <v-avatar id="menu-activator" style="cursor: pointer;">
              <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
            <v-menu activator="#menu-activator" style="cursor: pointer;" width="300">
              <v-list>
                <v-list-item>
                  <v-list-item-title style="height: 40px;">Xem thông tin</v-list-item-title>
                  <v-list-item-title style="height: 40px;" @click="openCart = true">Giỏ hàng của bạn</v-list-item-title>
                  <v-list-item-title style="height: 40px;" @click="Bill">Danh sách đơn hàng</v-list-item-title>
                  <v-list-item-title>Đăng xuất</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div v-else style="margin-right: 10px;">
            <!-- <v-avatar style="cursor: pointer;">
              <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar> -->
            <router-link to="/login">
              <v-icon style="cursor: pointer;" size="large">
                mdi-account-circle-outline
              </v-icon>
            </router-link>
          </div>
        </div>
      </v-app-bar>
      <v-main>
        <div v-if="$router.currentRoute.value.path === '/'">
          <Carousel_Home class="px-4" />
          <mainbody />
          <Google_map style="height: 100vh;" />
        </div>
        <RouterView v-else />
      </v-main>
      <Footer_Home style="padding: 0;margin-top: 20px;" />
    </v-app>
    <v-btn v-if="showScrollButton" class="scroll-to-top" @click="scrollToTop" icon="mdi-arrow-up-bold" color="primary">
    </v-btn>
    <Cart_index :openCart="openCart" @cloesCart="openCart = false" />
  </div>
</template>

<script lang="ts" setup>
import Cart_index from '../layouts/home/cart/cart_index.vue'
import Carousel_Home from '../components/carousel_home.vue'
import Footer_Home from '../components/footer_home.vue'
import router from '@/router';
import { RouterView } from 'vue-router';
import mainbody from '../layouts/home/mainbody.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Google_map from '@/components/google_map.vue';
import { useAuthService } from '@/services/auth.service';
const { isAuthenticated } = useAuthService();

const openCart = ref(false);
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})
const Bill = () => {
  window.location.href = '/bill_index'
}
const showScrollButton = ref(false);
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 100; // Adjust 1000 to your desired scroll threshold
}
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
})
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
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

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>