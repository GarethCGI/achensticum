<script setup lang="ts">
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { computed } from 'vue'
import { useStatisticsStore } from '@/stores/Statistics'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const resultCards = [
	{
		name: computed(() => t('results.median')),
		accessKey: "median",
	},
	{
		name: computed(() => t('results.mode')),
		accessKey: "mode",
	},
	{
		name: computed(() => t('results.average')),
		accessKey: "average",
	},
	{
		name: computed(() => t('results.stdDeviation')),
		accessKey: "stdDeviation",
	},
	{
		name: computed(() => t('results.variance')),
		accessKey: "variance",
	},
	{
		name: computed(() => t('results.typDeviation')),
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
		name: computed(() => t('results.bias')),
		accessKey: "bias",
	},
	{
		name: computed(() => t('results.skewness')),
		accessKey: "kurtosis",
	}
] as const

const store = useStatisticsStore()
const results = computed(() => store.getResultValues)

</script>

<template>
	<div class="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Card v-for="card in resultCards" :key="card.accessKey" class="flex flex-col text-center">
			<CardHeader>
				<CardTitle>{{ card.name.value }}</CardTitle>
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