<script setup lang="ts">
import { Ref, ref } from 'vue';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'

const POSITION = {
	LEFT: 1,
	RIGHT: 2,
	NONE: 0
} as const;

type Position = typeof POSITION[keyof typeof POSITION];

const position: Ref<Position> = ref(POSITION.NONE)

const handleMouseMove = (event: MouseEvent) => {
	const rect = (event.target as HTMLElement)?.getBoundingClientRect();
	// if not hovering, none
	if (!rect) {
		position.value = POSITION.NONE;
		return;
	}

	const x = event.clientX - rect.left;
	const half = rect.width / 2;

	if (x < half) {
		position.value = POSITION.RIGHT;
	} else {
		position.value = POSITION.LEFT;
	}
};
</script>

<template>
	<div class="center-title" @mousemove="handleMouseMove" @mouseleave="position = POSITION.NONE">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<h2 class="text-2xl font-bold tracking-tight 
					left-title" :class="{ 'hide-title': position === POSITION.LEFT }">Achenwall</h2>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Gottfried <strong>Achen</strong>wall is considered the founder of statistics. He was a
						German
						philosopher.
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<h2 class="text-2xl font-bold tracking-tight
					right-title" :class="{ 'hide-title': position === POSITION.RIGHT }">Statisticum</h2>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Stati<strong>sticum</strong> is a Latin word meaning "of the state". And thus is a precursor
						to the
						modern term
						"statistics".
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
		<div class="mask dark:bg-background bg-white" :class="{
			'left': position === POSITION.LEFT, 'right': position === POSITION.RIGHT
		}">
		</div>
		<div class="diagonal bg-black dark:bg-white"
			:class="{ 'left-diagonal': position === POSITION.LEFT, 'right-diagonal': position === POSITION.RIGHT }">
		</div>
		<h2 class="text-2xl font-bold tracking-tight"
			:class="{ 'hide-title': position !== POSITION.NONE, 'show-title': position === POSITION.NONE }"
			style="position: absolute;">
			Achensticum</h2>
	</div>
</template>

<style scoped>
.center-title {
	position: absolute;
	left: calc(50% - 50px);
	display: flex;
	justify-content: center;
	align-items: center;
}

.diagonal {
	width: 0.2rem;
	height: 3rem;
	z-index: 5;
	left: 50%;
	position: absolute;
	rotate: 25deg;
	transition: all 0.1s;
}

.left-diagonal {
	transform: translate3d(-5rem, 2rem, 0) rotate(-5deg);
}

.right-diagonal {
	transform: translate3d(5rem, -2rem, 0) rotate(5deg);
}

.left-title {
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(40%) translateY(-1rem);
}

.right-title {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-40%) translateY(-1rem);
}

h2 {
	font-size: 2rem;
	color: theme('colors.primary.DEFAULT');
}

.mask {
	height: 3rem;
	width: 12rem;
	position: absolute;
	z-index: 3;
	transition: all 1ms 1ms;
}

.mask.left {
	transform: translateX(-10rem);
}

.mask.right {
	transform: translateX(10rem);
}

.hide-title {
	z-index: -1;
	opacity: 0;
}

.show-title {
	z-index: 10;
	opacity: 1;
}
</style>