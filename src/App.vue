<script setup lang="ts">
import { ref } from 'vue';
import { useStatisticsStore } from '@/stores/Statistics';
import DarkMode from '@/components/DarkMode.vue';
import LangSelect from '@/components/LangSelect.vue';
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
}
</script>

<template>
	<div class="h-full flex-1 flex-col space-y-8 p-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Title />
			</div>
			<div class="flex items-center space-x-2">
				<LangSelect />
				<DarkMode />
			</div>
		</div>
		<div class="space-y-4">
			<textarea v-model="input" class="w-full h-48 p-4 text-lg bg-gray-100 dark:bg-gray-800 rounded-lg"
				style="resize: none;" placeholder="Introduce your number set here..." @input="calculate"></textarea>
			<StatisticTable />
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Results />
				<div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 h-full">
					<Histogram />
					<FreqPolygon />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
