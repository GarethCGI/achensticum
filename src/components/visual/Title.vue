<script setup lang="ts">
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
</script>

<template>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger>
				<h2 class="text-2xl font-bold tracking-tight">
					Achensticum
				</h2>
			</TooltipTrigger>
			<TooltipContent>
				<p>
					Gottfried <strong>Achen</strong>wall is considered the founder of statistics. He was a German
					philosopher.
					<br />
					Stati<strong>sticum</strong> is a Latin word meaning "of the state". And thus is a precursor to the
					modern term
					"statistics".
				</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>