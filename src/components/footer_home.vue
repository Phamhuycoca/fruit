<template>
    <GMapMap :center="center" :zoom="10" map-type-id="terrain" style="width: 100vw; height: 20rem">
        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
            :draggable="true" @click="openMarker(m.id)">
            <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === m.id">
                <div>I am in info window {{ m.id }} </div>
            </GMapInfoWindow>
        </GMapMarker>
    </GMapMap>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    data() {
        return {
            openedMarkerID: null as number | null,
            center: { lat: 20.9476712, lng: 105.7552136 },
            markers: [
                {
                    id: 1,
                    position: {
                        lat: 20.9476712,
                        lng: 105.7552136
                    }
                },
                {
                    id: 2,
                    position: {
                        lat: 20.7858446,
                        lng: 106.6144558
                    }
                }
            ]
        };
    },
    methods: {
        openMarker(id: number | null) {
            this.openedMarkerID = id ?? null;
        }
    }
});
</script>

<style scoped>
body {
    margin: 0;
}
</style>
