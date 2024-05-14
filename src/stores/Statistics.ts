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
	modesQuantity: number;
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

// TABLEAS function, returns the table asserting that it is the specified type
function tableAs<T extends TableMode>(table: TableColumn<TableMode>[]): TableColumn<T>[] {
	return table as TableColumn<T>[];
}

export const useStatisticsStore = defineStore("statistics", () => {
	const isGroupedMode = ref<TableMode>("grouped");
	const unsortedData = ref<number[]>([
		...testData
	]);
	const initialData = computed(() => {
		return unsortedData.value.sort((a, b) => a - b);
	})

	// LAST - FIRST
	const range = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.max(...data) - Math.min(...data);
	})

	// 1 + 3.33 * log10(n)
	const intervalQuantity = computed(() => {
		if (isGroupedMode.value === "ungrouped") return range.value;
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.ceil(1 + 3.33 * Math.log10(data.length));
	})

	// (LAST - FIRST) / INTERVALS
	const classWidth = computed(() => {
		const data = initialData.value;
		if (data.length === 0) return 0;
		return Math.round(range.value / intervalQuantity.value);
	})

	// N
	const totalFrequency = computed(() => {
		return initialData.value.length;
	})

	/*	iterative
		min + classWidth - 1
	*/
	const limits = computed(() => {
		if (isGroupedMode.value === "ungrouped") {
			// Return a value for each element in range
			let start = Math.min(...initialData.value);
			const ls: [number, number][] = [];
			for (let i = 0; i < range.value; i++) {
				const end = start + 1;
				ls.push([start, end - 1]);
				start = end;
			}
			return ls;
		}
		const ls: [number, number][] = [];
		let start = Math.min(...initialData.value);
		for (let i = 0; i < intervalQuantity.value; i++) {
			const end = start + classWidth.value;
			ls.push([start, end - 1]);
			start = end;
		}
		return ls;
	})

	/*	iterative
		(start + prevEnd) / 2
		(end + nextStart) / 2
	*/
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

	// F (ABSOLUTE FREQUENCY)
	const frequencies = computed(() => {
		const fs: number[] = [];
		for (let i = 0; i < realLimits.value.length; i++) {
			const [start, end] = realLimits.value[i];
			fs.push(initialData.value.filter(value => value >= start && value <= end).length);
		}
		return fs;
	})

	// FAA FN + ... + F1
	const accumulatedFrequencies = computed(() => {
		return frequencies.value.map((_, i) => frequencies.value.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0));
	})


	const setData = (data: number[]) => {
		unsortedData.value = data;
	}

	const getRawData = computed(() => {
		return initialData.value;
	})

	const getTable = computed(() => {

		if (range.value <= 2) return [];

		const columns: TableColumn<TableMode>[] = [];

		for (let i = 0; i < intervalQuantity.value; i++) {
			let [start, end] = limits.value[i];
			let [realStart, realEnd] = realLimits.value[i];

			let f = frequencies.value[i];
			let ac = accumulatedFrequencies.value[i];

			if (i == intervalQuantity.value - 1 && ac < initialData.value.length) {
				end = end + (initialData.value.length - ac) + 1;
				realEnd = end + 0.5;
				f = f + (initialData.value.length - ac);
				ac = ac + (initialData.value.length - ac);
			}

			const frequency = f;
			const acummulatedFrequency = ac;
			const relativeFrequency = frequency / totalFrequency.value * 100;
			const acummulatedRelativeFrequency = acummulatedFrequency / totalFrequency.value * 100;
			const classMark = (start + end) / 2;
			const fMark = frequency * classMark;

			columns.push({
				frequency,
				relativeFrequency,
				value: classMark,
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
		const tableData = getTable.value;
		if (tableData.length === 0) return {
			median: 0,
			mode: 0,
			modesQuantity: 0,
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

		// SUM(FA) / N
		const average = tableData.map(column => column.fMark).reduce((acc, curr) => acc + curr, 0) / totalFrequency.value;
		const median = tableData[Math.floor(tableData.length / 2)].classMark;


		let mode = 0;
		let modesQuantity = 0;
		/* MODE */
		if (isGroupedMode.value === "ungrouped") {
			/* just get the highest frequency indexed value */
			const modeIndex = tableData.map(column => column.frequency).indexOf(Math.max(...tableData.map(column => column.frequency)));
			mode = tableAs<"ungrouped">(tableData)[modeIndex].value;
			const modeFreq = tableAs<"ungrouped">(tableData)[modeIndex].frequency;
			modesQuantity = tableAs<"ungrouped">(tableData).filter(column => column.frequency === modeFreq).length;
		} else {
			/*	
				1. Get the highest frequency index
				2. Based on index, get inferior Limit (Li)
				3. Get the frequency of the mode
				4. Get the difference between the mode frequency and the previous frequency
				5. Get the difference between the mode frequency and the next frequency
				6. Calculate the mode
			*/
			const modeIndex = tableData.map(column => column.frequency).indexOf(Math.max(...tableData.map(column => column.frequency)));
			const modeCol = tableAs<"grouped">(tableData)[modeIndex];
			const modeIndexLi = modeCol.interval[0];
			const modeFreq = modeCol.frequency;
			const d1 = modeFreq - tableAs<"grouped">(tableData)[modeIndex - 1]?.frequency || 0;
			const d2 = modeFreq - tableAs<"grouped">(tableData)[modeIndex + 1]?.frequency || 0;
			mode = modeIndexLi + (d1 / (d1 + d2)) * classWidth.value;
			modesQuantity = tableData.filter(column => column.frequency === modeFreq).length;
		}

		const variance = tableData.map(column => Math.pow(column.classMark - average, 2) * column.frequency).reduce((acc, curr) => acc + curr, 0) / totalFrequency.value;
		const stdDeviation = Math.sqrt(variance);
		const typicalDeviation = stdDeviation / average;
		const quartile = tableData[Math.floor(tableData.length / 4)].classMark;
		const decile = tableData[Math.floor(tableData.length / 10)].classMark;
		const percentile = tableData[Math.floor(tableData.length / 100)].classMark;
		// Bias based on Pearson's Coefficient of Skewness
		const bias = (average - median) / stdDeviation;
		/* Kurtosis based on Fisher's Coefficient
			SUM ( (Xi - X) ^ 4 * Fi ) / N * S^4 
			-3 is the kurtosis of a normal distribution
		*/
		const kurtosis = tableData.map(column => Math.pow(column.classMark - average, 4) * column.frequency).reduce((acc, curr) => acc + curr, 0) / totalFrequency.value / Math.pow(stdDeviation, 4) - 3;

		return {
			median: intoFixed(median, 2),
			mode: intoFixed(mode, 2),
			modesQuantity,
			average: intoFixed(average, 2),
			stdDeviation: intoFixed(stdDeviation, 2),
			variance: intoFixed(variance, 2),
			typicalDeviation: intoFixed(typicalDeviation, 2),
			quartile: intoFixed(quartile, 2),
			decile: intoFixed(decile, 2),
			percentile: intoFixed(percentile, 2),
			bias: parseFloat(bias.toFixed(2)),
			kurtosis: intoFixed(kurtosis, 2),
		} satisfies ResultValues;
	})

	return {
		isGrouped: isGroupedMode,
		setData,
		getRawData,
		getTable,
		getResultValues,
	}
})

const intoFixed = (value: number, fixed: number) => parseFloat(value.toFixed(fixed));