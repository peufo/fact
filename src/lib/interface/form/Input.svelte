<script lang="ts" context="module">
	import {
		InputText,
		InputTextarea,
		InputBoolean,
		InputDate,
		InputDatetime,
		InputNumber,
		InputPassword,
		InputRadio,
		InputSelect,
		InputRelation,
		InputRelations
	} from 'fuma'
	import type { ComponentProps } from 'svelte'

	const inputs = {
		text: InputText,
		textarea: InputTextarea,
		boolean: InputBoolean,
		date: InputDate,
		datetime: InputDatetime,
		number: InputNumber,
		password: InputPassword,
		radio: InputRadio,
		select: InputSelect,
		relation: InputRelation,
		relations: InputRelations
	} as const

	export type Inputs = typeof inputs
	export type InputsType = keyof Inputs
	export type InputProps<T extends InputsType> = { type: T } & ComponentProps<
		InstanceType<Inputs[T]>
	>
	export type InputsProps = { [T in InputsType]: InputProps<T> }
	export const inputsType = Object.keys(inputs) as InputsType[]

	//
</script>

<script lang="ts">
	type InputType = $$Generic<InputTypes>
	type $$Props = InputProps<InputType>

	$: ({ type: inputType, ...props } = $$props as $$Props)
</script>

<svelte:component this={inputs[inputType]} {...props} />
