<script setup lang="ts">
import { Ref, ref } from 'vue';
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
	<div class="center-title 
	w-1/12">
		<!-- 	<TooltipProvider>
			ml-20 sm:ml-40 md:ml-96 xl:ml-[48rem] 
			<Tooltip>
				<TooltipTrigger> -->
		<h2 class="text-2xl font-bold tracking-tight 
					left-title" :class="{ 'hide-title': position === POSITION.LEFT }">ACHENWALL</h2>
		<!-- 	</TooltipTrigger>
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
				<TooltipTrigger> -->
		<h2 class="text-2xl font-bold tracking-tight
					right-title" :class="{ 'hide-title': position === POSITION.RIGHT }">STATISTICUM</h2>
		<!-- </TooltipTrigger>
				<TooltipContent>
					<p>
						Stati<strong>sticum</strong> is a Latin word meaning "of the state". And thus is a precursor
						to the
						modern term
						"statistics".
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider> -->
		<div class="mask bg-background" :class="{
			'left': position === POSITION.LEFT, 'right': position === POSITION.RIGHT
		}">
		</div>
		<div class="diagonal bg-foreground dark:bg-white"
			:class="{ 'left-diagonal': position === POSITION.LEFT, 'right-diagonal': position === POSITION.RIGHT }">
		</div>
		<h2 class="text-2xl font-bold tracking-tight"
			:class="{ 'hide-title': position !== POSITION.NONE, 'show-title': position === POSITION.NONE }"
			style="position: absolute;" @mousemove="handleMouseMove" @mouseleave="position = POSITION.NONE">ACHENSTICUM
		</h2>

	</div>
</template>

<style scoped>
.center-title {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
}

.diagonal {
	width: 0.2rem;
	height: 3rem;
	z-index: 50;
	left: 40%;
	position: absolute;
	rotate: 10deg;
	transition: all 100ms;
}

.left-diagonal {
	transform: translate3d(-10rem, 1.7rem, 0);
}

.right-diagonal {
	transform: translate3d(10rem, -1.7rem, 0);
}

.left-title {
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(3.35rem) translateY(-1rem);
	z-index: -3;
}

.right-title {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-3.75rem) translateY(-1rem);
	z-index: -3;
}

h2 {
	font-size: 2rem;
	font-family: "Axis";
	color: theme('colors.primary.DEFAULT');
}

.mask {
	height: 3rem;
	width: 20rem;
	position: absolute;
	z-index: -1;
	transition: all 1ms 1ms;
	/* opacity: 0.5; */
}

.mask.left {
	transform: translateX(-20rem);
}

.mask.right {
	transform: translateX(20rem);
}

.hide-title {
	opacity: 0;
}

.show-title {
	z-index: 10;
	opacity: 1;
}
</style>