import { defineStore } from 'pinia'
import { ref } from 'vue';
interface TableColumn {
	interval: string;
	realLimits: string;
	frequency: number;
	acummulatedFrequency: number;
	classMark: number;
}

export const useStatisticsStore = defineStore("statistics", () => {
	const isGrouped = ref(false);
	const initialData = ref<number[]>([]);
	const tableColumns = ref<TableColumn[]>([])

	const setData = (data: number[]) => {
		initialData.value = data;
	}

	return {
		isGrouped,
		setData,
	}
})