<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button'
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
	parsedInput.value = input.value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
}

const calculate = () => {
	parseInput();
	store.setData(parsedInput.value);
	store.calculateTable();
	store.calculateResultValues();
}
</script>

<template>
	<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
				style="resize: none;" placeholder="Introduce your number set here..."></textarea>
			<Button @click="calculate">Calculate</Button>
			<StatisticTable />
			<Results />
			<div class="flex flex-row space-x-4 md:flex-col md:space-x-0 md:space-y-4">
				<Histogram />
				<FreqPolygon />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
