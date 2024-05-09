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

let timedOut = false;

const handleMouseMove = (event: MouseEvent) => {
	const rect = (event.target as HTMLElement)?.getBoundingClientRect();
	// if not hovering, none
	if (!rect) {
		position.value = POSITION.NONE;
		return;
	}

	if (timedOut) {
		return;
	}
	timedOut = true;

	const x = event.clientX - rect.left;
	const thirds = rect.width / 3;

	if (x < thirds) {
		position.value = POSITION.RIGHT;
	} else if (x > thirds * 2) {
		position.value = POSITION.LEFT;
	} else {
		position.value = POSITION.NONE;
	}

	setTimeout(() => {
		timedOut = false;
	}, 100);
};
</script>

<template>
	<div class="center-title" @mousemove="handleMouseMove" @mouseleave="position = POSITION.NONE">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<h2 class="text-2xl font-bold tracking-tight 
					left-title" :class="{ 'hide-title': position === POSITION.LEFT }">ACHENWALL</h2>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Gottfried <strong>Achen</strong>wall is considered the founder of statistics. He was a German philosopher.
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<h2 class="text-2xl font-bold tracking-tight
					right-title" :class="{ 'hide-title': position === POSITION.RIGHT }">STATISTICUM</h2>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						Stati<strong>sticum</strong> is a Latin word meaning "of the state". And thus is a precursor
						to the modern term "statistics".
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
			ACHENSTICUM</h2>
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
	height: 3.5rem;
	z-index: 5;
	right: 0.22rem;
	position: absolute;
	rotate: 25deg;
	transition: all 0.1s;
	background-color: theme('colors.primary.DEFAULT');
}

.left-diagonal {
	transform: translate3d(-5.6rem, 2.5rem, 0) rotate(-5deg);
}

.right-diagonal {
	transform: translate3d(6rem, -2.5rem, 0) rotate(5deg);
}

.left-title {
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(5.84rem) translateY(-1rem);
}

.right-title {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-6.23rem) translateY(-1rem);
}

h2 {
	font-size: 2rem;
	color: theme('colors.primary.DEFAULT');
	font-family: 'Axis'
}

.mask {
	height: 3rem;
	width: 15.1rem;
	position: absolute;
	z-index: 3;
	transition: all 1ms 1ms;
}

.mask.left {
	transform: translateX(-14rem);
}

.mask.right {
	transform: translateX(13.75rem);
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