<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useI18n } from 'vue-i18n';

const mode = useColorMode()
const { t } = useI18n({
	messages: {
		es: {
			toggle: 'Alternar tema',
			dark: 'Oscuro',
			light: 'Claro',
			auto: 'Sistema'
		},
		en: {
			toggle: 'Toggle theme',
			dark: 'Dark',
			light: 'Light',
			auto: 'System'
		}
	}
})

</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				<Icon icon="radix-icons:moon"
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Icon icon="radix-icons:sun"
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span class="sr-only">
					{{ t('toggle') }}
				</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="bg-white dark:bg-gray-950">
			<DropdownMenuItem @click="mode = 'light'">
				{{ t('light') }}
			</DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'dark'">
				{{ t('dark') }}
			</DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'auto'">
				{{ t('auto') }}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>