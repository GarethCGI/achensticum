<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');


</script>

<template>
	<div class="container">
		<h1>Achensticum</h1>
		<p>Gottfried Achenwall + Statisticum</p>
		<main>
			<textarea v-model="input" placeholder="Enter your values here"></textarea>
		</main>
	</div>
</template>

<style scoped></style>
