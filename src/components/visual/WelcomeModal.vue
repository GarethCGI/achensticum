<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { forceSavePersistentStorage, usePersistentStorage } from '@/stores/PersistentStorage';

const { t } = useI18n({
	messages: {
		es: {
			open: "Acerca de esta aplicación",
			title: `Bienvenid{'@'}!`,
			description: `Te damos la bienvenida a Achensticum, una aplicación que te permite el cálculo de estadísticas para datos agrupados.
			Incluyendo medidas de tendencia central, dispersión, sesgo y curtosis.`,
			ok: "Aceptar",
		},
		en: {
			open: "About this app",
			title: "Welcome !",
			description: `Welcome to Achensticum, an application that allows you to calculate statistics for grouped data.
			Including measures of central tendency, dispersion, bias and kurtosis.`,
			ok: "Accept",
		}
	}
})
const persisentStorage = usePersistentStorage()

const open = ref(persisentStorage.firstWelcomeDone ? false : true)

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}

const doClose = () => {
	open.value = false
	// and scroll to top
	setTimeout(() => {
		scrollToTop()
	}, 200)

	persisentStorage.firstWelcomeDone = true
	forceSavePersistentStorage()
}

onMounted(() => {
	console.debug('First welcome done:', persisentStorage.firstWelcomeDone)
})

</script>

<template>
	<Dialog v-model:open="open">
		<DialogTrigger as-child>
			<Button variant="link">
				{{ t('open') }}
			</Button>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle class="title">
					{{ t('title') }}
				</DialogTitle>
				<DialogDescription class="description text-muted">
					{{ t('description') }}
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">

			</div>
			<DialogFooter>
				<Button variant="default" @click="doClose" class="w-full text-background">
					{{ t('ok') }}
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<style scoped>
.title {
	font-family: "WOOJOOAIDP";
	font-size: 2.3rem;
}

.description {
	font-family: "Sniglet";
	font-size: 1rem;
	text-align: justify;
}
</style>