<script setup lang="ts">
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { Switch } from '@/components/ui/switch'
import { useStatisticsStore } from '@/stores/Statistics'

const { t } = useI18n({
	messages: {
		es: {
			"open": "Configurar",
			"cancel": "Cancelar",
			"title": "Configurar",
			"description": "Configura la computación",
			"config": {
				"newRange": "Nuevo rango",
				"semiopenRanges": "Rangos Semiabiertos",
				"groupedMode": "Modo Agrupado"
			}
		},
		en: {
			"open": "Configure",
			"cancel": "Cancel",
			"title": "Configure",
			"description": "Configure the computation",
			"config": {
				"newRange": "New range",
				"semiopenRanges": "Semi-Open Ranges",
				"groupedMode": "Grouped Mode"
			}
		}
	}
})

const statisticsStore = useStatisticsStore()

const setNewRange = (value: boolean) => {
	statisticsStore.isUsingNewrange = value
}
const setSemiOpenRanges = (value: boolean) => {
	statisticsStore.isUsingSemiOpenRanges = value
}
const setGroupedMode = (value: boolean) => {
	statisticsStore.isGroupedMode = value ? 'grouped' : 'ungrouped'
}

</script>

<template>
	<Drawer>
		<DrawerTrigger>
			<Button variant="outline" class="flex justify-between space-x-2 w-full">
				<Icon icon="mdi:cog" width="24" height="24" />
				{{ t('open') }}
				<div></div>
			</Button>
		</DrawerTrigger>
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle class="title">
					{{ t('title') }}
				</DrawerTitle>
				<DrawerDescription class="description">
					{{ t('description') }}
				</DrawerDescription>
			</DrawerHeader>
			<div class="flex
			gap-2 px-4
			flex-col
			md:flex-row
			md:justify-start
			md:items-start
			">
				<div class="flex flex-row items-center justify-center gap-x-2 w-fit">
					<Switch id="groupedMode" :checked="statisticsStore.isGroupedMode === 'grouped'"
						@update:checked="setGroupedMode" />
					<Label for="groupedMode">{{ t('config.groupedMode') }}</Label>
				</div>
				<div class="flex flex-row items-center justify-center gap-x-2 w-fit">
					<Switch id="newRange" :checked="statisticsStore.isUsingNewrange" @update:checked="setNewRange"
						disabled />
					<Label for="newRange">{{ t('config.newRange') }}</Label>
				</div>
				<div class="flex flex-row items-center justify-center gap-x-2 w-fit">
					<Switch id="semiOpenRanges" :checked="statisticsStore.isUsingSemiOpenRanges"
						@update:checked="setSemiOpenRanges" disabled />
					<Label for="semiOpenRanges">{{ t('config.semiopenRanges') }}</Label>
				</div>
			</div>
			<DrawerFooter class="flex space-x-4 flex-row-reverse">
				<DrawerClose>
					<Button variant="outline">
						{{ t('cancel') }}
					</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
</template>
<style scoped>
Button {
	font-family: 'Axis';
}

.title {
	font-family: 'WOOJOOAIDP';
	font-size: 1.7rem;
	font-weight: normal;
}

.description {
	font-family: 'Sniglet';
}

Input {
	font-family: 'Carter One';
}
</style>