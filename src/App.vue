<script setup lang="ts">
import DarkMode from '@/components/DarkMode.vue';
import Title from '@/components/visual/Title.vue';
import { ref } from 'vue';

const input = ref('');


</script>

<template>
	<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Title />
			</div>
			<div class="flex items-center space-x-2">
				<DarkMode />
			</div>
		</div>
		<div class="space-y-4">
			<textarea v-model="input" class="w-full h-48 p-4 text-lg bg-gray-100 dark:bg-gray-800 rounded-lg"
				style="resize: none;" placeholder="Introduce your number set here..."></textarea>
				
		</div>
	</div>
</template>

<style scoped></style>
