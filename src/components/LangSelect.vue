<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({
	useScope: 'global',
	messages: {
		es: {
			lang: 'Idioma',
			langs: {
				es: 'Español',
				en: 'Inglés'
			}
		},
		en: {
			lang: 'Language',
			langs: {
				es: 'Spanish',
				en: 'English'
			}
		}
	}
})

const changed = (value: string) => {
	locale.value = value as LocaleValue
}

const locales = [
	{ value: 'es', label: computed(() => t('langs.es')) },
	{ value: 'en', label: computed(() => t('langs.en')) },
] as const

type Locale = typeof locales[number];
type LocaleValue = Locale['value'];

</script>

<template>
	<Select :model-value="locale" @update:model-value="changed">
		<SelectTrigger>
			<SelectValue :placeholder="t('lang')" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>{{ t('lang') }}</SelectLabel>
				<SelectItem v-for="locale in locales" :key="locale.value" :value="locale.value">
					{{ locale.label.value }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>