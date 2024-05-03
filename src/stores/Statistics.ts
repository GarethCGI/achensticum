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

	const range = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.max(...data) - Math.min(...data);
	})

	const intervalQuantity = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.ceil(1 + 3.33 * Math.log10(data.length));
	})

	const classWidth = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.round(range.value / intervalQuantity.value);
	})

	const totalFrequency = computed(() => {
		return initialData.value.length;
	})

	const limits = computed(() => {
		const ls: [number, number][] = [];
		let start = Math.min(...initialData.value);
		for (let i = 0; i < intervalQuantity.value; i++) {
			const end = start + classWidth.value;
			ls.push([start, end - 1]);
			start = end;
		}
		return ls;
	})

	const realLimits = computed(() => {
		const rls: [number, number][] = []
		for (let i = 0; i < limits.value.length; i++) {
			const [start, end] = limits.value[i];
			const prevEnd = limits.value[i - 1] ? limits.value[i - 1][1] : start - classWidth.value;
			const nextStart = limits.value[i + 1] ? limits.value[i + 1][0] : start + classWidth.value;
			rls.push([
				(start + prevEnd) / 2,
				(end + nextStart) / 2
			])
		}
		return rls;
	})

	const frequencies = computed(() => {
		const fs: number[] = [];
		for (let i = 0; i < realLimits.value.length; i++) {
			const [start, end] = realLimits.value[i];
			fs.push(initialData.value.filter(value => value >= start && value <= end).length);
		}
		return fs;
	})

	const accumulatedFrequencies = computed(() => {
		// Accumulated frequencies are the current index frequency plus the previous frequencies
		return frequencies.value.map((_, i) => frequencies.value.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0));
	})

	/* const calculateResultValues = () => {
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
	} */

	const setData = (data: number[]) => {
		initialData.value = data;
	}

	const getTable = computed(() => {
		const columns: TableColumn<TableMode>[] = [];

		for (let i = 0; i < intervalQuantity.value; i++) {
			// Average between the previous end and the current start, and the current end and the next start
			const [start, end] = limits.value[i];
			const [realStart, realEnd] = realLimits.value[i];

			const frequency = frequencies.value[i];
			// Percent of the total frequency
			const relativeFrequency = frequency / totalFrequency.value * 100;
			const acummulatedFrequency = accumulatedFrequencies.value[i];
			const acummulatedRelativeFrequency = acummulatedFrequency / totalFrequency.value * 100;
			const classMark = (start + end) / 2;

			const fMark = frequency * classMark;

			columns.push({
				frequency,
				relativeFrequency,
				acummulatedFrequency,
				acummulatedRelativeFrequency,
				classMark,
				interval: [start, end],
				realLimits: [realStart, realEnd],
				fMark
			})
		}
		return columns;
	})

	const getResultValues = computed(() => {
		return {
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
		} satisfies ResultValues;
	})

	return {
		isGrouped: isGroupedMode,
		setData,
		getTable,
		getResultValues,
	}
})
