<script setup lang="ts">
import { computed } from 'vue'
import { columns } from '@/lib/datatable'
import DataTable from "./DataTable.vue"
import { useStatisticsStore } from '@/stores/Statistics';

const store = useStatisticsStore()
const data = computed(() => store.getTable)

const prunedColumns = computed(() => {
	if (store.isGrouped == "grouped") {
		// Remove the third column
		return columns.filter((_, index) => index !== 2)
	}
	else {
		// Remove first two columns and last column
		return columns.filter((_, index) => index > 1 && index < columns.length - 1)
	}
})

</script>

<template>
	<div>
		<DataTable :columns="prunedColumns" :data="data" />
	</div>
</template>

<style scoped>
div {
	font-family: "Sniglet";
}
</style>