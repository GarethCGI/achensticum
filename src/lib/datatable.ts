import { TableColumn, TableMode } from '@/stores/Statistics'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export const columns: ColumnDef<TableColumn<TableMode>>[] = [
	{
		accessorKey: 'interval',
		header: () => h('div', { class: 'text-right' }, 'Interval'),
		cell: ({ row }) => {
			const interval: [number, number] = row.getValue('interval')

			return h('div', { class: 'text-right font-medium' }, `${interval[0]} - ${interval[1]}`)
		},
	},
	{
		accessorKey: 'realLimits',
		header: () => h('div', { class: 'text-right' }, 'Real Limits'),
		cell: ({ row }) => {
			const realLimits: [number, number] = row.getValue('realLimits')

			return h('div', { class: 'text-right font-medium' }, `${realLimits[0]} - ${realLimits[1]}`)
		},
	},
	{
		accessorKey: 'frequency',
		header: () => h('div', { class: 'text-right' }, 'Frequency'),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue('frequency'))

			return h('div', { class: 'text-right font-medium' }, amount.toFixed(2))
		},
	},
	{
		accessorKey: 'acummulatedFrequency',
		header: () => h('div', { class: 'text-right' }, 'Acummulated Frequency'),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue('acummulatedFrequency'))

			return h('div', { class: 'text-right font-medium' }, amount.toFixed(2))
		},
	},
	{
		accessorKey: 'relativeFrequency',
		header: () => h('div', { class: 'text-right' }, 'Relative Frequency'),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue('relativeFrequency'))

			return h('div', { class: 'text-right font-medium' }, `${amount.toFixed(2)} %`)
		},
	},
	{
		accessorKey: 'acummulatedRelativeFrequency',
		header: () => h('div', { class: 'text-right' }, 'Acummulated Relative Frequency'),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue('acummulatedRelativeFrequency'))

			return h('div', { class: 'text-right font-medium' }, `${amount.toFixed(2)} %`)
		},
	},
	{
		accessorKey: 'classMark',
		header: () => h('div', { class: 'text-right' }, 'Class Mark'),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue('classMark'))

			return h('div', { class: 'text-right font-medium' }, amount.toFixed(2))
		},
	}
]