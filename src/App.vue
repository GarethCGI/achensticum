<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStatisticsStore } from '@/stores/Statistics';
import { useI18n } from 'vue-i18n';

import Textarea from './components/ui/textarea/Textarea.vue';
import Button from './components/ui/button/Button.vue';

import DarkMode from '@/components/DarkMode.vue';
import LangSelect from '@/components/LangSelect.vue';
import MultiAdd from '@/components/MultiAdd.vue';
import StatisticTable from '@/components/StatisticTable.vue';
import Results from '@/components/Results.vue';
import CollapsibleSorted from '@/components/CollapsibleSorted.vue';

import Histogram from '@/components/graphs/Histogram.vue';
import FreqPolygon from '@/components/graphs/FreqPolygon.vue';

import Title from '@/components/visual/Title.vue';
import WelcomeModal from './components/visual/WelcomeModal.vue';

const { t } = useI18n({
	messages: {
		es: {
			input: 'Introduce los datos separados por comas, espacios o saltos de línea.',
			clear: 'Limpiar',
			grouped: 'Modo agrupado',
			ungrouped: 'Modo no agrupado'
		},
		en: {
			input: 'Enter the data separated by commas, spaces or line breaks.',
			clear: 'Clear',
			grouped: 'Grouped mode',
			ungrouped: 'Ungrouped mode'
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

const groupedMode = computed({
	get: () => store.isGrouped === "grouped",
	set: (val) => {
		store.isGrouped = val ? "grouped" : "ungrouped";
		calculate();
	}
})

</script>

<template>
	<div class="h-full flex-1 flex-col space-y-8 p-8">
		<div class="flex items-center justify-between space-y-2">
			<div class="flex flex-row items-center justify-center space-x-4 w-full">
				<Title />
			</div>
			<div class="flex flex-row items-center space-x-2">
				<LangSelect />
				<DarkMode />
			</div>
		</div>
		<div class="space-y-4">
			<Textarea v-model="input" class="w-full h-48 p-4 text-lg rounded-lg text-muted" style="resize: none;"
				:placeholder="t('input')" @keyup="calculate"></Textarea>
			<CollapsibleSorted />
			<div class="flex items-center space-x-4">
				<Button @click="groupedMode = !groupedMode" variant="outline">{{ t(groupedMode ? 'ungrouped' :
					'grouped') }}</Button>
				<Button @click="input = ''" variant="outline">{{ t('clear') }}</Button>
				<MultiAdd @add="add" />
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
		<div class="w-full flex flex-row-reverse">
			<WelcomeModal />
		</div>
	</div>
</template>

<style>
textarea {
	font-family: 'Carter One';
}

button {
	font-family: 'Axis';
}
</style>
