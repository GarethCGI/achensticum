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

const { t } = useI18n({
	messages: {
		en: {
			"median": "Median",
			"mode": "Mode",
			"multimodal": "Multi\nmodality",
			"average": "Average",
			"stdDeviation": "Standard Deviation",
			"variance": "Variance",
			"typDeviation": "Typical Deviation",
			"bias": "Bias",
			"skewness": "Skewness"
		},
		es: {
			"median": "Media",
			"mode": "Moda",
			"multimodal": "Multi\nmodalidad",
			"average": "Mediana",
			"stdDeviation": "Desviación Estándar",
			"variance": "Varianza",
			"typDeviation": "Desviación Típica",
			"bias": "Sesgo",
			"skewness": "Asimetría"
		},
	}
})

const resultCards = [
	{
		name: computed(() => t('median')),
		accessKey: "median",
	},
	{
		name: computed(() => t('mode')),
		accessKey: "mode",
	},
	{
		name: computed(() => t('multimodal')),
		accessKey: "modesQuantity",
	},
	{
		name: computed(() => t('average')),
		accessKey: "average",
	},
	{
		name: computed(() => t('stdDeviation')),
		accessKey: "stdDeviation",
	},
	{
		name: computed(() => t('variance')),
		accessKey: "variance",
	},
	{
		name: computed(() => t('typDeviation')),
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
		name: computed(() => t('bias')),
		accessKey: "bias",
	},
	{
		name: computed(() => t('skewness')),
		accessKey: "kurtosis",
	},
] as const

const store = useStatisticsStore()
const results = computed(() => store.getResultValues)

</script>

<template>
	<div class="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-0">
		<Card v-for="card in resultCards" :key="card.accessKey" class="flex flex-col text-center">
			<CardHeader>
				<CardTitle class="title">{{ card.name.value }}</CardTitle>
				<!-- <CardDescription>Card Description</CardDescription> -->
			</CardHeader>
			<CardContent class="content">
				{{ results[card.accessKey] }}
			</CardContent>
			<!-- <CardFooter>
				Card Footer
			</CardFooter> -->
		</Card>
	</div>
</template>

<style scoped>
.title {
	font-family: "WOOJOOAIDP";
	font-weight: normal;
}

.content {
	font-family: "Sniglet";
}
</style>