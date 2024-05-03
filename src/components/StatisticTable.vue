<script setup lang="ts">
import { computed } from 'vue'
import { columns } from '@/lib/datatable'
import DataTable from "./DataTable.vue"
import { useStatisticsStore } from '@/stores/Statistics';

const store = useStatisticsStore()
const data = computed(() => store.getTable)

</script>

<template>
	<div>
		<DataTable :columns="columns" :data="data" />
	</div>
</template>