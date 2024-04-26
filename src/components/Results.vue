<script setup lang="ts">
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { computed, onMounted, ref } from 'vue'
import { useStatisticsStore } from '@/stores/Statistics'

const resultCards = [
	{
		name: "Median",
		accessKey: "median",
	},
	{
		name: "Mode",
		accessKey: "mode",
	},
	{
		name: "Average",
		accessKey: "average",
	},
	{
		name: "Standard Deviation",
		accessKey: "stdDeviation",
	},
	{
		name: "Variance",
		accessKey: "variance",
	},
	{
		name: "Typical Deviation",
		accessKey: "typicalDeviation",
	},
	/* {
		name: "Quartile",
		accessKey: "quartile",
	},
	{
		name: "Decile",
		accessKey: "decile",
	},
	{
		name: "Percentile",
		accessKey: "percentile",
	}, */
	{
		name: "Bias",
		accessKey: "bias",
	},
	{
		name: "Kurtosis",
		accessKey: "kurtosis",
	}
] as const

const store = useStatisticsStore()
const results = computed(() => store.getResultValues)

</script>

<template>
	<div class="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Card v-for="card in resultCards" :key="card.accessKey" class="flex flex-col">
			<CardHeader>
				<CardTitle>{{ card.name }}</CardTitle>
				<!-- <CardDescription>Card Description</CardDescription> -->
			</CardHeader>
			<CardContent>
				{{ results[card.accessKey] }}
			</CardContent>
			<!-- <CardFooter>
				Card Footer
			</CardFooter> -->
		</Card>
	</div>
</template>