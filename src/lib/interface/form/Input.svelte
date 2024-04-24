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

	export const inputs = {
		text: InputText,
		textarea: InputTextarea,
		boolean: InputBoolean,
		date: InputDate,
		datetime: InputDatetime,
		number: InputNumber,
		password: InputPassword,
		radio: InputRadio,
		select: InputSelect,
		relation: InputRelation as typeof InputRelation<any>,
		relations: InputRelations as typeof InputRelations<any>
	} as const

	export type Inputs = typeof inputs
	export type InputsType = keyof Inputs
	export type InputProps<T extends InputsType> = ComponentProps<InstanceType<Inputs[T]>>
	export type InputsProps = { [T in InputsType]: InputProps<T> }

	export const inputsType = Object.keys(inputs) as InputsType[]
	export function relationProps<Item extends { id: string }>(
		props: ComponentProps<InstanceType<typeof InputRelation<Item>>>
	) {
		return props
	}
	export function relationsProps<Item extends { id: string }>(
		props: ComponentProps<InstanceType<typeof InputRelations<Item>>>
	) {
		return props
	}
</script>

<script lang="ts">
	type InputType = $$Generic<InputTypes>
	type $$Props = InputProps<InputType> & { type: InputType }

	$: ({ type: inputType, ...props } = $$props as $$Props)

	$: if (props.value) console.log(props.value)
</script>

<svelte:component this={inputs[inputType]} {...props} />
