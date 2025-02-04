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
			"totalFrequency": "Total Frequency (n)",
			"median": "Median (Me)",
			"mode": "Mode (Mo)",
			"multimodal": "Multi\nmodality",
			"average": "Average",
			"stdDeviation": "Mean Deviation",
			"variance": "Variance",
			"typDeviation": "Typical Deviation",
			"bias": "Bias",
			"skewness": "Skewness",
			"range": "Range (R)",
			"intervals": "Intervals (K)",
			"interval.amplitude": "Interval Amplitude (A/i)",
		},
		es: {
			"totalFrequency": "Frecuencia Total (n)",
			"median": "Mediana (Me)",
			"mode": "Moda (Mo)",
			"multimodal": "Multi\nmodalidad",
			"average": "Media Aritmetica (x̄)", // Promedio, Media Aritmetica
			"stdDeviation": "Desviación Media (𝜎)",
			"variance": "Varianza (S²)",
			"typDeviation": "Desviación Típica",
			"bias": "Sesgo (B)",
			"skewness": "Asimetría (A)",
			"range": "Rango (R)",
			"intervals": "Intervalos (K)",
			"interval.amplitude": "Amplitud de Intervalo (A/i)",
		},
	}
})

const baseResultCards = [
	{
		name: computed(() => t('totalFrequency')),
		accessKey: "totalFrequency",
		criteria: () => true,
	},
	{
		name: computed(() => t('range')),
		accessKey: "range",
		criteria: () => true,
	},
	{
		name: computed(() => t('intervals')),
		accessKey: "intervals",
		criteria: () => true,
	},
	{
		name: computed(() => t('interval.amplitude')),
		accessKey: "intervalAmplitude",
		criteria: () => true,
	},
	{
		name: computed(() => t('median')),
		accessKey: "median",
		criteria: () => true,
	},
	{
		name: computed(() => t('mode')),
		accessKey: "mode",
		criteria: () => true,
	},
	{
		name: computed(() => t('multimodal')),
		accessKey: "modesQuantity",
		criteria: (r: { value: { modesQuantity: number } }) => {
			r.value.modesQuantity <= 1
		},
	},
	{
		name: computed(() => t('average')),
		accessKey: "average",
		criteria: () => true,
	},
	{
		name: computed(() => t('stdDeviation')),
		accessKey: "meanDeviation",
		criteria: () => true,
	},
	{
		name: computed(() => t('variance')),
		accessKey: "variance",
		criteria: () => true,
	},
	{
		name: computed(() => t('typDeviation')),
		accessKey: "typicalDeviation",
		criteria: () => true,
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
		criteria: () => true,
	},
	{
		name: computed(() => t('skewness')),
		accessKey: "kurtosis",
		criteria: () => true,
	},
] as const


const store = useStatisticsStore()
const results = computed(() => store.getResultValues)
const resultCards = computed(() => {
	return baseResultCards.filter((card) => card.criteria(results))
})

</script>

<template>
	<div class="container grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 p-0">
		<Card v-for="card in resultCards" :key="card.accessKey" class="flex flex-col text-center col-span-1">
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
	font-family: "Chakra Petch";
	font-weight: normal;
	font-size: large;
}

.content {
	font-family: "Genos";
}
</style>