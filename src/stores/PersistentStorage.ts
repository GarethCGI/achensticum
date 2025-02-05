import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePersistentStorage = defineStore("persistent", () => {
	const lastRawData = ref<number[]>()

	const getLastRawData = computed(() => {
		return lastRawData.value
	})
	return {
		getLastRawData
	}
}, {
	tauri: {
		filterKeysStrategy: "pick",
		saveOnChange: true,
		saveOnExit: true,
		filterKeys: [
			"lastRawData"
		]
	}
})

export const forceSavePersistentStorage = async () => {
	await usePersistentStorage().$tauri.saveAllNow()
}