import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export type TableMode = "ungrouped" | "grouped";

interface BaseTableColumn {
	frequency: number;
	relativeFrequency: number;
	acummulatedFrequency: number;
	acummulatedRelativeFrequency: number;
	classMark: number;

	//Internal only
	fMark: number;
}

interface UngroupedTableColumn extends BaseTableColumn {
	value: number;
}

interface GroupedTableColumn extends BaseTableColumn {
	interval: [number, number];
	realLimits: [number, number]
}

export type TableColumn<T extends TableMode> = T extends "ungrouped" ? UngroupedTableColumn : GroupedTableColumn;


interface ResultValues {
	median: number;
	mode: number;
	average: number;

	stdDeviation: number;
	variance: number;
	typicalDeviation: number;

	quartile: number;
	decile: number;
	percentile: number;

	bias: number;
	kurtosis: number;
}

const testData = [
	10, 11, 13, 13, 13, 14, 14, 15, 16, 16, 17, 17, 17, 17, 17, 17, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 26, 26, 27, 29
]

export const useStatisticsStore = defineStore("statistics", () => {
	const isGroupedMode = ref<TableMode>("grouped");
	const initialData = ref<number[]>([
		...testData
	]);
	const tableColumns = ref<TableColumn<TableMode>[]>([])
	const resultValues = ref<ResultValues>({
		median: 0,
		mode: 0,
		average: 0,
		stdDeviation: 0,
		variance: 0,
		typicalDeviation: 0,
		quartile: 0,
		decile: 0,
		percentile: 0,
		bias: 0,
		kurtosis: 0,
	})

	const range = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.max(...data) - Math.min(...data);
	})

	const intervals = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.ceil(1 + 3.33 * Math.log10(data.length));
	})

	const classWidth = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.round(range.value / intervals.value);
	})

	const totalFrequency = computed(() => {
		return initialData.value.reduce((acc, curr) => acc + curr, 0);
	})

	const calculateTable = () => {
		tableColumns.value = [];

		let start = Math.min(...initialData.value);
		let end = start + (classWidth.value - 1);
		for (let i = 0; i < intervals.value; i++) {
			let frequency = initialData.value.filter(value => value >= start && value <= end).length;
			let acummulatedFrequency = initialData.value.filter(value => value <= end).length;
			if (i == intervals.value - 1 && acummulatedFrequency < initialData.value.length) {
				end = end + (initialData.value.length - acummulatedFrequency) + 1;
				frequency = frequency + (initialData.value.length - acummulatedFrequency);
				acummulatedFrequency = acummulatedFrequency + (initialData.value.length - acummulatedFrequency);
			}
			const relativeFrequency = (frequency * 100) / initialData.value.length;
			const acummulatedRelativeFrequency = (acummulatedFrequency * 100) / initialData.value.length;
			const classMark = (start + end) / 2;
			

			tableColumns.value.push({
				interval: [start, end],
				realLimits: [start - 0.5, end + 0.5],
				frequency,
				relativeFrequency,
				acummulatedFrequency,
				acummulatedRelativeFrequency,
				classMark,
				// Internal
				fMark: frequency * classMark
			})

			start = end + 1;
			if (i == intervals.value - 1 && acummulatedFrequency < initialData.value.length) {
				for (let j = 0; j <= 2; j++) {
				}
			} else {
				end = start + (classWidth.value - 1);
			}
		}
	}

	const calculateResultValues = () => {
		// Calculate Table results
		const average = tableColumns.value.map(column => column.fMark * column.frequency).reduce((acc, curr) => acc + curr, 0) / totalFrequency.value;

		const median = tableColumns.value[Math.floor(tableColumns.value.length / 2)].classMark;

		const mode = tableColumns.value.reduce((acc, curr) => acc.frequency > curr.frequency ? acc : curr).classMark;

		const variance = tableColumns.value.map(column => Math.pow(column.classMark - average, 2) * column.frequency).reduce((acc, curr) => acc + curr, 0) / totalFrequency.value;

		const stdDeviation = Math.sqrt(variance);

		const typicalDeviation = stdDeviation / average;

		const quartile = tableColumns.value[Math.floor(tableColumns.value.length / 4)].classMark;

		const decile = tableColumns.value[Math.floor(tableColumns.value.length / 10)].classMark;

		const percentile = tableColumns.value[Math.floor(tableColumns.value.length / 100)].classMark;

		const bias = (average - median) / stdDeviation;

		const kurtosis = tableColumns.value.map(column => Math.pow(column.classMark - average, 4) * column.frequency).reduce((acc, curr) => acc + curr, 0) / totalFrequency.value;

		resultValues.value = {
			average,
			median,
			mode,
			variance,
			stdDeviation,
			typicalDeviation,
			quartile,
			decile,
			percentile,
			bias,
			kurtosis
		}
	}

	const setData = (data: number[]) => {
		initialData.value = data;
	}

	const getTable = computed(() => {
		return tableColumns.value;
	})

	const getResultValues = computed(() => {
		return resultValues.value;
	})

	return {
		isGrouped: isGroupedMode,
		setData,
		calculateTable,
		calculateResultValues,
		getTable,
		getResultValues,
	}
})
