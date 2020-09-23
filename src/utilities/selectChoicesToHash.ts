import {
	ISelectFieldDefinition,
	ISelectFieldDefinitionChoice,
} from '../fields/SelectField.types'
import { ISchema, ISchemaFields, PickFieldNames } from '../schemas.static.types'

/** Turn select options into a key/value pair */
export type SelectChoicesToHash<
	Options extends ISelectFieldDefinitionChoice[]
> = {
	[P in Options[number]['label']]: Extract<
		Options[number],
		{ value: P }
	>['value']
}

/** Pass the select options directly to create a value/label hash */
export function selectChoicesToHash<
	Options extends ISelectFieldDefinitionChoice[]
>(options: Options): SelectChoicesToHash<Options> {
	const partial: Partial<SelectChoicesToHash<Options>> = {}

	Object.keys(options).forEach((key) => {
		// @ts-ignore
		partial[options[key]] = key
	})

	return partial as SelectChoicesToHash<Options>
}

/** Take a definition and a field name and returns a value/label hash */
export function definitionChoicesToHash<
	S extends ISchema,
	F extends PickFieldNames<S, 'select'>
>(
	definition: S,
	fieldName: F
): S['fields'] extends ISchemaFields
	? S['fields'][F] extends ISelectFieldDefinition
		? S['fields'][F]['options'] extends ISelectFieldDefinition['options']
			? SelectChoicesToHash<S['fields'][F]['options']['choices']>
			: never
		: never
	: never {
	// @ts-ignore
	return selectChoicesToHash(
		// @ts-ignore
		definition.fields?.[fieldName]?.options?.choices ?? []
	)
}