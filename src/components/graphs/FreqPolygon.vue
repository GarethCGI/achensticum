<template>
	<Line :data="data" :options="options" />
</template>

<script setup lang="ts">
import { useStatisticsStore } from '@/stores/Statistics';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement
} from 'chart.js'
import { computed } from 'vue';

import { Line } from 'vue-chartjs'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)
const store = useStatisticsStore()

const tableData = computed(() => store.getTable)

const data = computed(() => {
	console.log(tableData.value)
	return {
		labels: tableData.value.map((row) => row.classMark.toString()),
		datasets: [{
			label: 'Frequency',
			data: tableData.value.map((row) => row.frequency),
			
		}]
	}
})

const options = {
	responsive: true
}

</script>