<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from '@/lib/datatable'
import DataTable from "./DataTable.vue"
import { TableColumn, TableMode, useStatisticsStore } from '@/stores/Statistics';

const data = ref<TableColumn<TableMode>[]>([])
const store = useStatisticsStore()
async function getData() {
	store.calculateTable()
	store.calculateResultValues()
	data.value = store.getTable
	console.log('Getting data', data.value)
	console.log('Results', store.getResultValues)
}

onMounted(() => {
	getData()
})
</script>

<template>
	<div class="container py-10 mx-auto">
		<button @click="getData">Get Data</button>
		<DataTable :columns="columns" :data="data" />
	</div>
</template>