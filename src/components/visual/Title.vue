<script setup lang="ts">
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const POSITION = {
	LEFT: 1,
	RIGHT: 2,
	NONE: 0
} as const;

type Position = typeof POSITION[keyof typeof POSITION];

const position: Ref<Position> = ref(POSITION.NONE)
const showTooltip = ref(false)

let timedOut = false;

const handleMouseMove = (event: MouseEvent) => {
	const rect = (event.target as HTMLElement)?.getBoundingClientRect();
	// if not hovering, none
	if (!rect) {
		position.value = POSITION.NONE;
		showTooltip.value = false;
		return;
	}

	if (timedOut) {
		return;
	}
	timedOut = true;

	const x = event.clientX - rect.left;
	const thirds = rect.width / 3;

	showTooltip.value = true;
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

const handleClose = () => {
	position.value = POSITION.NONE;
	showTooltip.value = false;
};

const { t } = useI18n({

	messages: {
		es: {
			achen: "Gottfried Achenwall es considerado el fundador de la estadística. Fue un filósofo alemán.",
			sticum: "Statisticum es una palabra en latín que significa 'del estado'. Y por ende es un precursor del término moderno 'estadística'.",
			both: "Achensticum es un acrónimo de las dos palabras, y es un tributo a los cimientos de la estadística."
		},
		en: {
			achen: "Gottfried Achenwall is considered the founder of statistics. He was a German philosopher.",
			sticum: "Statisticum is a Latin word meaning 'of the state'. And thus is a precursor to the modern term 'statistics'.",
			both: "Achensticum is a portmanteau of the two words, and is a tribute to the foundations of statistics."
		}
	}
})
</script>

<template>
	<div class="center-title 
	w-1/12">
		<TooltipProvider>
			<Tooltip :open="showTooltip">
				<TooltipTrigger></TooltipTrigger>
				<TooltipContent>
					<template v-if="position === POSITION.RIGHT">
						<p class="info">
							{{ t('achen') }}
						</p>
					</template>
					<template v-else-if="position === POSITION.LEFT">
						<p class="info">
							{{ t('sticum') }}
						</p>
					</template>
					<template v-else>
						<p class="info">
							{{ t('both') }}
						</p>
					</template>

				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
		<h2 class="text-2xl font-bold tracking-tight 
						left-title" :class="{ 'hide-title': position === POSITION.LEFT }">ACHENWALL</h2>
		<h2 class="text-2xl font-bold tracking-tight
						right-title" :class="{ 'hide-title': position === POSITION.RIGHT }">STATISTICUM</h2>
		<div class="mask bg-background" :class="{
			'left': position === POSITION.LEFT, 'right': position === POSITION.RIGHT
		}">
		</div>
		<div class="diagonal bg-foreground"
			:class="{ 'left-diagonal': position === POSITION.LEFT, 'right-diagonal': position === POSITION.RIGHT }">
		</div>
		<h2 class="text-2xl font-bold tracking-tight"
			:class="{ 'hide-title': position !== POSITION.NONE, 'show-title': position === POSITION.NONE }"
			style="position: absolute;" @mousemove="handleMouseMove" @mouseleave="handleClose">
			ACHENSTICUM
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
	left: 46%;
	position: absolute;
	rotate: 10deg;
	transition: all 100ms;
}

.left-diagonal {
	transform: translate3d(-7rem, 1.7rem, 0);
}

.right-diagonal {
	transform: translate3d(7rem, -1.7rem, 0);
}

.left-title {
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(0.9rem) translateY(-1rem);
	z-index: -3;
}

.right-title {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-1.3rem) translateY(-1rem);
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

.info {
	font-family: "Sniglet";
}
</style>