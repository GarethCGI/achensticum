<template>
	<Line :data="data" :options="options" />
</template>

<script setup lang="ts">
import { useStatisticsStore } from '@/stores/Statistics';
import { useColorMode } from '@vueuse/core';
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const colorMode = useColorMode({ deep: true })

const data = computed(() => {
	return {
		labels: tableData.value.map((row) => row.classMark.toString()),
		datasets: [{
			label: computed(() => t('table.frequency')).value,
			data: tableData.value.map((row) => row.frequency),

			backgroundColor: colorMode.value === 'light' ? '#FDE3EA' : '#0E0105',
			borderColor: colorMode.value === 'light' ? '#FD275F' : '#FD275F',
		}]
	}
})

const options = {
	responsive: true
}

</script>