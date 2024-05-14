<script setup lang="ts">
import { computed, ref } from 'vue'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Toggle } from '@/components/ui/toggle'
import { ArrowLeftRightIcon } from 'lucide-vue-next'

import { useStatisticsStore } from '@/stores/Statistics'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
	messages: {
		es: {
			open: "Mostrar datos",
			close: "Ocultar datos",
			toggleReverse: "Revertir orden",
		},
		en: {
			open: "Show data",
			close: "Hide data",
			toggleReverse: "Reverse order",
		},
	},
})

const store = useStatisticsStore()

const isOpen = ref(false)
const isReversed = ref(false)

const shownValues = computed(() => {
	if (isReversed.value) {
		return store.getRawData.slice().reverse()
	}
	return store.getRawData
})
</script>

<template>
	<Collapsible v-model:open="isOpen">
		<CollapsibleTrigger>{{ t(isOpen ? "close" : "open") }}</CollapsibleTrigger>
		<CollapsibleContent class="flex items-center space-x-6">
			<div>
				{{ shownValues.join(', ') }}
			</div>
			<Toggle :aria-label="t('toggleReverse')" @update:pressed="isReversed = !isReversed">
				<ArrowLeftRightIcon />
			</Toggle>
		</CollapsibleContent>
	</Collapsible>
</template>