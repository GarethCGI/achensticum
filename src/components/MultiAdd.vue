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
import { Input } from '@/components/ui/input'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';

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

</script>

<template>
  <Drawer>
    <DrawerTrigger>
			<Button variant="outline">
				{{ t('open') }}
			</Button>
	</DrawerTrigger>
    <DrawerContent class="bg-white dark:bg-gray-800">
      <DrawerHeader>
        <DrawerTitle>
				{{ t('title') }}
		</DrawerTitle>
        <DrawerDescription>
			{{ t('description') }}
		</DrawerDescription>
      </DrawerHeader>
	  <div class="flex flex-col space-y-4 px-4">
		  <Input :placeholder="t('value')" type="number" v-model="val" />
		  <Input :placeholder="t('quantity')" type="number" v-model="qty" />
	  </div>
      <DrawerFooter class="flex space-x-4 flex-row-reverse">
        <Button @click="add" variant="outline">
			{{ t('add') }}
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