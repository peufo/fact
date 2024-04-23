<script lang="ts" context="module">
	import type { z } from 'zod'
	import { inputsType, type InputsProps, type InputsType } from './Input.svelte'

	type Shape = z.ZodRawShape
	type Data<M extends Shape> = Partial<z.infer<z.ZodObject<M>>>
	type BoolOrFunction<M extends Shape> = boolean | ((data: Data<M>) => unknown)
	type PickOne<T> = {
		[P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>>
	}[keyof T]

	type FormField<M extends Shape> = {
		key: string & keyof M
		/** number col used by field */
		colSpan?: number
		/** hide field if true */
		hide?: BoolOrFunction<M>
	} & PickOne<InputsProps>

	type FormSectionProps<M extends Shape> = {
		title?: string
		/** Section is open */
		active?: boolean
		/** Section is always open*/
		activable?: boolean
		/** hide group if true */
		hide?: BoolOrFunction<M>
	}

	function initData<M extends Shape>(fields: FormField<M>[][]): Data<M> {
		// @ts-ignore
		return fields.flat().reduce((acc, cur) => {
			const inputType = getFieldType(cur)
			// @ts-ignore
			return { ...acc, [cur.key]: cur[inputType]?.value }
		})
	}

	function getFieldType<M extends Shape>(field: FormField<M>): InputsType {
		const inputType = inputsType.find((t) => field[t])
		if (!inputType) return 'text'
		return inputType
	}

	export type OnSuccess = (action: URL, data?: Data<Shape>) => any

	//
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import { useForm } from 'fuma'

	import Input from './Input.svelte'
	import FormSection from './FormSection.svelte'

	type Shape = $$Generic<z.ZodRawShape>
	let klass = ''
	export { klass as class }

	export let fields: FormField<Shape>[][] = []
	export let sections: FormSectionProps<Shape>[] = [{}]
	export let data: Data<Shape> = initData(fields)

	export let action = ''
	export let actionDelete = ''

	export function set<K extends keyof Shape>(key: K, value: Data<Shape>[K]) {
		data[key] = value
	}

	export let onSuccess: OnSuccess = () => {}
	const { enhance } = useForm<Data<Shape>>({
		onSuccess
	})

	onMount(lookupValueFromParams)

	function lookupValueFromParams() {
		fields.flat().forEach(({ key }) => {
			if (data[key]) return
			const value = $page.url.searchParams.get(key)
			if (value) data[key] = value
		})
	}

	const getBoolean = (bool?: BoolOrFunction<Shape>) => (_data: Data<Shape>) =>
		typeof bool === 'boolean' || bool === undefined ? !!bool : !!bool(_data)

	/* TODO include this features on fuma/useForm
	// export let model: z.ZodObject<Shape>
	const handleInput: FormEventHandler<HTMLFormElement> = ({ target }) => {
		if (!target) return
		data = data

		const { name, type, value, valueAsNumber, valueAsDate, checked } = target as HTMLInputElement
		const typeMapValue: Record<string, unknown> = {
			number: valueAsNumber,
			date: valueAsDate,
			text: value,
			checkbox: checked
		}
		const v = typeMapValue[type] ?? value
		if (v === undefined || name === undefined) return
		if (name === undefined) return
		if (!model.shape[name]) return
		const res = model.shape[name].safeParse(v)
		if (res.success) {
			addError.clear()
			delete errors[name]
			errors = errors
		} else {
			addError(name, res.error.issues[0].message)
		}
	}
	const addError = debounce((key: string, error: string) => {
		errors = { ...errors, [key]: error }
	}, 1500)
	*/
</script>

<form
	method="post"
	{action}
	enctype="multipart/form-data"
	class="{klass} flex flex-col gap-4 p-4"
	use:enhance
>
	{#if data.id}
		<input type="hidden" name="id" value={data.id} />
	{/if}

	{#each fields as groupFields, groupIndex}
		{@const section = sections[groupIndex] || {}}
		{#if !getBoolean(section?.hide)(data)}
			<div class="contents" in:fade|local={{ duration: 200 }}>
				<FormSection
					persistent
					title={section.title}
					active={section.active}
					activable={section.activable !== false}
					class="min-w-[480px]"
				>
					<div class="grid grid-cols-4 gap-x-4 gap-y-2">
						{#each groupFields as field (field.key)}
							{#if !getBoolean(field.hide)(data)}
								{@const inputType = getFieldType(field)}
								<div
									style={`grid-column: span ${field.colSpan || 2};`}
									in:fade|local={{ duration: 200 }}
								>
									<Input
										key={field.key}
										type={inputType}
										bind:value={data[field.key]}
										{...field[inputType]}
									/>
								</div>
							{/if}
						{/each}
					</div>
				</FormSection>
			</div>
		{/if}
	{/each}

	<div class="col-span-full flex gap-2">
		{#if actionDelete}
			<button class="btn btn-ghost" type="button" formaction={actionDelete}> Supprimer </button>
		{/if}
		<div class="grow" />
		<button class="btn"> Valider </button>
	</div>
</form>
