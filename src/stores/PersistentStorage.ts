import { defineStore } from "pinia";
import { getStoreState, saveAllNow } from "tauri-plugin-pinia";
import { computed, ref } from "vue";

type SaveSlotData = {
	id: number,
	name: string,
	date: number,
	data: number[]
}

export const usePersistentStorage = defineStore("persistent", () => {
	// QoL
	const firstWelcomeDone = ref(false)
	// AutoSaved
	const lastRawData = ref<number[]>([])

	const saveSlots = ref<SaveSlotData[]>([])

	const addSaveSlot = (name: string, data: number[]) => {
		saveSlots.value.push({
			id: saveSlots.value.length,
			name,
			date: Date.now(),
			data
		})
	}

	const getSaveSlot = (id: number) => {
		return saveSlots.value.find(slot => slot.id === id)
	}

	const removeSaveSlot = (id: number) => {
		saveSlots.value = saveSlots.value.filter(slot => slot.id !== id)
	}

	const updateSaveSlot = (id: number, name: string, data: number[]) => {
		const slot = getSaveSlot(id)
		if (slot) {
			slot.name = name
			slot.data = data
		}
	}

	const saveSlotIndex = computed(() => {
		return saveSlots.value.map(slot => {
			return {
				id: slot.id,
				name: slot.name,
				date: slot.date
			}
		})
	})

	return {
		firstWelcomeDone,
		lastRawData,
		saveSlotIndex,
		addSaveSlot,
		getSaveSlot,
		removeSaveSlot,
		updateSaveSlot
	}
}, {
	tauri: {
		saveOnChange: true,
	}
})

export const forceSavePersistentStorage = async () => {
	saveAllNow()
	console.info("Persistent store saved")
	getStoreState("persistent").then((state) => {
		console.debug("State is now", state)
	})
}