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
import {
	NumberField,
	NumberFieldContent,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
} from '@/components/ui/number-field'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';
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
				"semiopenRanges": "Rangos Semiabiertos"
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
			}
		}
	}
})

const statisticsStore = useStatisticsStore()

</script>

<template>
	<Drawer>
		<DrawerTrigger>
			<Button variant="outline">
				<Icon icon="mdi:cog" width="24" height="24" />
				{{ t('open') }}
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
			<div class="flex sm:flex-row 
			sm:space-x-4 sm:space-y-0
			justify-start
			flex-col space-y-4 px-4">
				<div class="flex flex-row items-center justify-center gap-x-2">
					<Switch id="newRange" :value="statisticsStore.isUsingNewrange" />
					<Label for="newRange">{{ t('config.newRange') }}</Label>
				</div>
				<div class="flex flex-row items-center justify-center gap-x-2">
					<Switch id="semiOpenRanges" />
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