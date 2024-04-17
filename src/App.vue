<template>
  <div>
    <v-btn @click="showToast">Show</v-btn>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from "vue-toastification";
const toast = useToast();
const showToast = () => {
  toast.success("My toast content", {
    timeout: 2000
  });
}
</script>