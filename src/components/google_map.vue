<template>
    <GMapMap :center="center" :zoom="10" map-type-id="terrain" style="width: 100vw; height: 20rem">
        <GMapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" :clickable="true"
            :draggable="true" @click="openMarker(marker.id)">
            <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === marker.id">
                <div>{{ marker.name }} </div>
                <div>Chi nhánh thứ {{ marker.id }} </div>
            </GMapInfoWindow>
        </GMapMarker>
    </GMapMap>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/services/store.service';

interface Marker {
    id: number;
    name: string,
    position: {
        lat: number;
        lng: number;
    };
}

export default defineComponent({
    data() {
        return {
            openedMarkerID: null as number | null,
            center: { lat: 20.9476712, lng: 105.7552136 },
            markers: [

            ] as Marker[]
        };
    },
    methods: {
        async loadData() {
            const { fetchStores } = useStore();
            try {
                const res = await fetchStores();
                if (res && res.items) {
                    this.markers = res.items.map(item => ({
                        id: item.storeId,
                        name: item.storeName,
                        position: {
                            lat: parseFloat(item.lat),
                            lng: parseFloat(item.lng)
                        }
                    }));
                }
            } catch (error) {
                console.error('Error loading store data:', error);
            }
        },
        openMarker(id: number | null) {
            this.openedMarkerID = id ?? null;
        }
    },
    mounted() {
        this.loadData();
    }
});
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
/*
[ { "id": 2, "position": { "lat": 106.6144558, "lng": 20.7858446 } }, { "id": 1, "position": { "lat": 105.7552136,
"lng": 20.9476712 } } ]


[ { "id": 1, "position": { "lat": 20.9476712, "lng": 105.7552136 } }, { "id": 2, "position": { "lat": 20.7858446, "lng":
106.6144558 } } ]
*/