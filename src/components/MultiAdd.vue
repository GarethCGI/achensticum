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


const { t } = useI18n({
	messages: {
		es: {
			open: 'Añadir varios',
			add: 'Añadir',
			cancel: 'Cancelar',
			value: "Valor",
			quantity: "Cantidad",
			title: "Añadir múltiples valores",
			description: "Añade múltiples valores a la lista de datos"
		},
		en: {
			open: 'Multi Add',
			add: 'Add',
			cancel: 'Cancel',
			value: "Value",
			quantity: "Quantity",
			title: "Add multiple values",
			description: "Add multiple values to the data list"

		}
	}
})

const emit = defineEmits<{
	add: number[]
}>()

const val = ref(0)
const qty = ref(0)

const add = () => {
	const values = Array(qty.value).fill(val.value)
	emit('add', ...values)
}

const setVal = (v: number) => {
	val.value = v
}
const setQty = (v: number) => {
	qty.value = v
}

</script>

<template>
	<Drawer>
		<DrawerTrigger>
			<Button variant="outline">
				<Icon icon="mdi:plus" width="24" height="24" />
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
			sm:space-x-4 sm:space-y-0 sm:justify-center 
			justify-start
			flex-col space-y-4 px-4">
				<!-- <Input :placeholder="t('value')" type="number" v-model="val" />
				<Input :placeholder="t('quantity')" type="number" v-model="qty" /> -->

				<NumberField id="value" :default-value="0" :min="0" :model-value="val" @update:model-value="setVal">
					<Label for="value">{{ t('value') }}</Label>
					<NumberFieldContent>
						<NumberFieldDecrement />
						<NumberFieldInput />
						<NumberFieldIncrement />
					</NumberFieldContent>
				</NumberField>
				<NumberField id="quantity" :default-value="1" :min="0" :model-value="qty" @update:model-value="setQty">
					<Label for="quantity">{{ t('quantity') }}</Label>
					<NumberFieldContent>
						<NumberFieldDecrement />
						<NumberFieldInput />
						<NumberFieldIncrement />
					</NumberFieldContent>
				</NumberField>
			</div>
			<DrawerFooter class="flex space-x-4 flex-row-reverse">
				<Button @click="add" variant="outline" class="flex justify-center items-center">
					{{ t('add') }}
					<Icon icon="mdi:arrow-right" width="24" height="24" />
				</Button>
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