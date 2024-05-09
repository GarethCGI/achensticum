<script setup lang="ts">
import { ref } from 'vue';
import { useStatisticsStore } from '@/stores/Statistics';
import Textarea from './components/ui/textarea/Textarea.vue';

import DarkMode from '@/components/DarkMode.vue';
import LangSelect from '@/components/LangSelect.vue';
import Title from '@/components/visual/Title.vue';
import MultiAdd from '@/components/MultiAdd.vue';
import StatisticTable from '@/components/StatisticTable.vue';
import Results from '@/components/Results.vue';
import Histogram from '@/components/graphs/Histogram.vue';
import FreqPolygon from '@/components/graphs/FreqPolygon.vue';
import { useI18n } from 'vue-i18n';
import Button from './components/ui/button/Button.vue';

const { t } = useI18n({
	messages: {
		es: {
			input: 'Introduce los datos separados por comas, espacios o saltos de línea.',
			clear: 'Limpiar'
		},
		en: {
			input: 'Enter the data separated by commas, spaces or line breaks.',
			clear: 'Clear'
		}
	}
});

const store = useStatisticsStore();

const input = ref('');
const parsedInput = ref<number[]>([]);

const parseInput = () => {
	// Split by spaces, command, line breaks and convert to numbers, then filter out NaN values, ignore empty values
	const split = input.value.split(/[\s,]+/)
	const p = split.filter(v => v !== '');
	const buffer: number[] = [];
	for (const value of p) {
		const num = parseFloat(value);
		if (!isNaN(num) && isFinite(num) && num !== null) {
			buffer.push(num);
		}
	}
	parsedInput.value = buffer;
}

const calculate = () => {
	parseInput();
	store.setData(parsedInput.value);
}

const add = (...values: number[]) => {
	input.value = parsedInput.value.concat(values).join(', ');
	calculate();
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
			<Textarea v-model="input" class="w-full h-48 p-4 text-lg dark:bg-black rounded-lg"
				style="resize: none;" :placeholder="t('input')" @keyup="calculate"
				></Textarea>
				<div class="flex items-center space-x-4">
					
				<MultiAdd @add="add" />
				<Button @click="input = ''" variant="outline">{{ t('clear') }}</Button>
			</div>
			<StatisticTable />
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Results />
				<div class="flex flex-col space-y-4 md:space-y-0 lg:flex-row md:space-x-4 h-full">
					<Histogram />
					<FreqPolygon />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

TextArea {
	font-family: 'Carter One';
}

Button {
	font-family: 'Axis';
}

</style>
