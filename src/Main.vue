<script setup lang="ts">
import { onMounted, ref, } from 'vue';
import { ExampleData, useStatisticsStore } from '@/stores/Statistics';
import { useI18n } from 'vue-i18n';

import Textarea from './components/ui/textarea/Textarea.vue';
import Button from './components/ui/button/Button.vue';
import { Icon } from '@iconify/vue';

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
import Configure from './components/Configure.vue';
import { usePersistentStorage } from './stores/PersistentStorage';
import { getStoreState } from 'tauri-plugin-pinia';

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

const statisticsStore = useStatisticsStore();
const persistentStore = usePersistentStorage();

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
	statisticsStore.setData(parsedInput.value);
	persistentStore.lastRawData = parsedInput.value;
}

const add = (...values: number[]) => {
	input.value = parsedInput.value.concat(values).join(', ');
	calculate();
}

const clearInput = () => {
	input.value = '';
	calculate();
}

const loadWelcome = ref(false);

onMounted(async () => {
	await usePersistentStorage().$tauri.start().then(() => {
		console.info("Persistent store started")
		// Load last autosave
		if (statisticsStore.getRawData.length >= 1) return;
		console.debug("Last autosave: ", persistentStore.lastRawData)
		console.debug("Current data: ", statisticsStore.getRawData)
		if (persistentStore.lastRawData.length >= 1) {
			console.debug("Loaded last auto save")
			input.value = persistentStore.lastRawData.join(', ');
			calculate();
		}
		else {
			input.value = ExampleData.join(', ');
			calculate();
		}

		getStoreState("persistent").then((state) => {
			console.debug("Loaded persistent storage", state)
		})
		loadWelcome.value = true;
	})
})

</script>

<template>
	<div class="h-full flex-1 flex-col space-y-8 p-8">
		<div class="flex items-center justify-between space-y-2">
			<div class="flex flex-row items-center justify-center space-x-4 w-full">
				<Title />
			</div>
		</div>
		<div class="space-y-4">
			<Textarea v-model="input" class="w-full h-48 p-4 text-lg rounded-lg text-muted" style="resize: none;"
				:placeholder="t('input')" @keyup="calculate"></Textarea>
			<CollapsibleSorted />
			<div
				class="grid items-center gap-2 grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:space-x-4">
				<Button @click="clearInput" variant="outline" class="flex justify-between col-span-1 w-full">
					<Icon icon="mdi:broom" class="w-6 h-6" />
					{{ t('clear') }}
					<div></div>
				</Button>
				<MultiAdd @add="add" class="col-span-1 w-full" />
				<Configure class="col-span-1 w-full" />
				<!-- <Button @click="forceSavePersistentStorage" variant="ghost" class="col-span-1 w-full">
					Save
				</Button> -->
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
		<div class="w-full flex flex-row justify-between">
			<div class="flex flex-row items-center space-x-2">
				<LangSelect />
				<DarkMode />
			</div>
			<WelcomeModal v-if="loadWelcome" />
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
