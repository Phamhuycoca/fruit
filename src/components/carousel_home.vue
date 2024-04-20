<template>
    <v-carousel delimiter-icon="mdi-square" height="400" show-arrows="hover" cycle hide-delimiter-background
        interval="3000">
        <v-carousel-item v-for="(item, i) in 5" :key="i" src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
            style="border-radius: 10px;" cover></v-carousel-item>
    </v-carousel>
</template>
<script lang="ts" setup>

</script>