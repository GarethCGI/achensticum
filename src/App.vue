<script setup lang="ts">
import { ref } from 'vue';
import { useStatisticsStore } from '@/stores/Statistics';
import DarkMode from '@/components/DarkMode.vue';
import Title from '@/components/visual/Title.vue';
import StatisticTable from '@/components/StatisticTable.vue';
import Results from '@/components/Results.vue';
import Histogram from '@/components/graphs/Histogram.vue';
import FreqPolygon from '@/components/graphs/FreqPolygon.vue';

const store = useStatisticsStore();

const input = ref('');
const parsedInput = ref<number[]>([]);

const parseInput = () => {
	parsedInput.value = input.value.split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n));
}

const calculate = () => {
	parseInput();
	store.setData(parsedInput.value);
	store.calculateTable();
	store.calculateResultValues();
}
</script>

<template>
	<div class="h-full flex-1 flex-col space-y-8 p-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Title />
			</div>
			<div class="flex items-center space-x-2">
				<DarkMode />
			</div>
		</div>
		<div class="space-y-4">
			<textarea v-model="input" class="w-full h-48 p-4 text-lg bg-gray-100 dark:bg-gray-800 rounded-lg"
				style="resize: none;" placeholder="Introduce your number set here..." @input="calculate"></textarea>
<!-- 			<Button @click="calculate">Calculate</Button>
 -->			<StatisticTable />
			<Results />
			<div class="grid grid-cols-1 gap-4 xxl:grid-cols-2">
				<Histogram />
				<FreqPolygon />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
