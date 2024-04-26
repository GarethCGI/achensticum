<template>
	<Bar :data="data" :options="options" />
</template>

<script setup lang="ts">
import { columns } from '@/lib/datatable';
import { useStatisticsStore } from '@/stores/Statistics';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js'
import { computed } from 'vue';

import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const store = useStatisticsStore()

const tableData = computed(() => store.getTable)

const data = computed(() => {
	console.log(tableData.value)
	return {
		labels: tableData.value.map((row) => row.classMark.toString()),
		datasets: [{
			label: 'Frequency',
			data: tableData.value.map((row) => row.frequency),
			// Brilliant Purple
			backgroundColor: 'rgba(159, 122, 234, 0.2)',
		}]
	}
})

const options = {
	responsive: true
}

</script>