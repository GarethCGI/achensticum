<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { columns } from '@/lib/datatable'
import DataTable from "./DataTable.vue"
import { TableColumn, TableMode, useStatisticsStore } from '@/stores/Statistics';

const store = useStatisticsStore()
const data = computed(() => store.getTable)

</script>

<template>
	<div class="container py-10 mx-auto">
		<DataTable :columns="columns" :data="data" />
	</div>
</template>