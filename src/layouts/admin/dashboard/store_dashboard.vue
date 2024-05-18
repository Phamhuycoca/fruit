<template>
    <div>
        <apexchart width="500" type="donut" :options="chartOptions" :series="series"></apexchart>
        <v-btn @click="dashboard">Làm mới</v-btn>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useDashboard } from '@/services/dashboard.service';

export default {
    name: 'VueChart',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const store = ref([]);
        const series = computed(() => store.value.map(s => s.revenue));
        const labels = computed(() => store.value.map(s => s.storeName));
        const chartOptions = computed(() => ({
            chart: {
                id: 'vuechart-example',
            },
            labels: labels.value,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 800
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }));

        const { storeDashboard } = useDashboard();

        const dashboard = async () => {
            try {
                const res = await storeDashboard();
                store.value = res.data;
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };

        dashboard();

        return {
            store,
            series,
            chartOptions,
            dashboard,
        };
    },
};
</script>

<style scoped>
button {
    margin-top: 20px;
}
</style>