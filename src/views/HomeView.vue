<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer style="background-color: #43A047;color: white;" permanent>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom"
          title="Sandra Adams"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
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

    <v-main class="d-flex align-center justify-center" style="min-height: 100vh;background-color: #F5F5F5;">
      <RouterView />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

</script>