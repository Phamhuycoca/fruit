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
        const bill = ref({
            bill_Count: 0,
            don_hang_chua_thanh_toan: 0,
            don_hang_dang_giao: 0,
            don_hang_da_giao: 0,
        });

        const series = computed(() => [
            bill.value.bill_Count,
            bill.value.don_hang_chua_thanh_toan,
            bill.value.don_hang_dang_giao,
            bill.value.don_hang_da_giao,
        ]);

        const labels = [
            'Tổng số đơn hàng',
            'Đơn hàng chưa thanh toán',
            'Đơn hàng đang giao',
            'Đơn hàng đã giao',
        ];

        const chartOptions = computed(() => ({
            chart: {
                id: 'vuechart-example',
            },
            labels,
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

        const { billDashboard } = useDashboard();

        const dashboard = async () => {
            try {
                const res = await billDashboard();
                bill.value = res.data;
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };

        dashboard();

        return {
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