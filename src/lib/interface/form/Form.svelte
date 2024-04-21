<script lang="ts">
	import { onMount, createEventDispatcher, type ComponentProps } from 'svelte'
	import type { z } from 'zod'
	import debounce from 'debounce'
	import { fade } from 'svelte/transition'
	import type { FormEventHandler } from 'svelte/elements'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'

	import Input from './Input.svelte'
	import FormSection from './FormSection.svelte'

	type Shema = $$Generic<z.ZodRawShape>
	type Data = Partial<z.infer<z.ZodObject<Shema>>>
	type BoolOrFunction = boolean | ((data: Data) => unknown)

	type FieldDef = {
		key: string & keyof Shema
		/** Default value */
		value?: string | number | boolean | Date
		/** overide shema.description */
		label?: string
		/** hint message include to input*/
		hint?: string
		/** number col used by field */
		colSpan?: number
		/** hide field if true */
		hide?: BoolOrFunction

		input?: ComponentProps<Input<any>>['input']
	}

	type SectionDef = {
		title?: string
		/** Section is open */
		active?: boolean
		/** Section is always open*/
		activable?: boolean
		/** hide group if true */
		hide?: BoolOrFunction
	}

	let klass = ''
	export { klass as class }
	export let shema: z.ZodObject<Shema>
	export let fields: FieldDef[][] = []
	export let sections: SectionDef[] = [{}]
	export let data: Data = fields.flat().reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
	export let errors: Record<string, string> = {}
	/** Include fields from shema without fieldDef (util for dev) */
	export let includeGenericFields = false
	export let dark = false

	export let action = ''
	export let actionDelete = ''

	export let messageSuccess = 'Valider avec succès'
	export let messageDelete = 'Supprimer avec succès'
	export let successGoto = '' // TODO: handled in action redirect ?

	export function set<K extends keyof Data>(key: K, value: Data[K]) {
		data[key] = value
	}

	onMount(lookupValueFromParams)

	const notify = useNotify()
	const dispatch = createEventDispatcher<{ success: Data; delete: void }>()

	function lookupValueFromParams() {
		fields.flat().forEach(({ key }) => {
			if (data[key]) return
			const value = $page.url.searchParams.get(key)
			if (value) data[key] = value
		})
	}

	const getBoolean = (bool?: BoolOrFunction) => (_data: Data) =>
		typeof bool === 'boolean' || bool === undefined ? !!bool : !!bool(_data)

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
		if (!shema.shape[name]) return
		const res = shema.shape[name].safeParse(v)
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

	function handleFailure(issues: z.ZodIssue[]) {
		errors = issues.reduce(
			(acc, cur) => ({
				...acc,
				[cur.path[0]]: cur.message
			}),
			{}
		)
		const keys = fields.flat().map((f) => f.key)
		const unknownError = Object.entries(errors).find(([key]) => !keys.includes(key))
		if (unknownError) {
			console.error('Unknow path leave an error', { [unknownError[0]]: unknownError[1] })
		}
	}

	const submitFunction: SubmitFunction<Data> = ({ action }) => {
		return async ({ result }) => {
			if (result.type === 'error') {
				notify.error('Oups, erreur non gerée')
				return
			}

			if (result.type === 'failure') {
				handleFailure(result.data?.issues)
				notify.warning('Le formulaire est invalide')
				return
			}

			if (result.type === 'success') {
				const isActionDelete = basePath + actionDelete === action.pathname + action.search
				if (isActionDelete) {
					notify.success(messageDelete)
					dispatch('delete')
				} else {
					notify.success(messageSuccess)
					dispatch('success', result.data)
				}
				if (successGoto) goto(successGoto)
			}
		}
	}
</script>

<form
	method="post"
	action="{basePath}{action}"
	enctype="multipart/form-data"
	class="{klass} flex flex-col gap-4 p-4"
	use:enhance={submitFunction}
	on:input={handleInput}
>
	{#if data.id}
		<input type="hidden" name="id" value={data.id} />
	{/if}

	{#each fields as groupFields, groupIndex}
		{@const section = sections[groupIndex] || {}}
		{#if !getBoolean(section?.hide)(data)}
			<div class="contents" in:fade|local={{ duration: 200 }}>
				<FormSection
					{dark}
					persistent
					title={section.title}
					active={section.active}
					activable={section.activable !== false}
					class="min-w-[480px]"
				>
					<div class="grid grid-cols-4 gap-x-4 gap-y-2">
						{#each groupFields as field (field.key)}
							{#if !getBoolean(field.hide)(data)}
								<div
									style={`grid-column: span ${field.colSpan || 2};`}
									in:fade|local={{ duration: 200 }}
								>
									<Input
										on:blur={addError.flush}
										{dark}
										key={field.key}
										input={field.input || { type: 'text' }}
										hint={field.hint}
										error={errors[field.key]}
										label={field.label || shema.shape[field.key].description || field.key}
										value={data[field.key]}
										bind:_value={data[field.key]}
									/>
								</div>
							{/if}
						{/each}
					</div>
				</FormSection>
			</div>
		{/if}
	{/each}

	{#if includeGenericFields}
		{@const keys = fields.flat().map((f) => f.key)}
		{@const genericFields = Object.entries(shema.shape).filter(([key]) => !keys.includes(key))}
		<section class="border-primary-lighter rounded-md border">
			<div class="grid grid-cols-2 gap-x-4 gap-y-2 p-4">
				<!-- Full generic method -->
				{#each genericFields as [key, fieldShap]}
					<Input
						{key}
						{dark}
						label={fieldShap.description || key}
						error={errors[key]}
						on:blur={addError.flush}
					/>
				{:else}
					Tout les champs sont gérés
				{/each}
			</div>
		</section>
	{/if}

	<div class="col-span-full flex">
		{#if actionDelete}
			<Button {dark} text attributs={{ formaction: `${basePath}${actionDelete}`, type: 'button' }}>
				Supprimer
			</Button>
		{/if}
		<div class="grow" />
		<Button {dark}>Valider</Button>
	</div>
</form>
