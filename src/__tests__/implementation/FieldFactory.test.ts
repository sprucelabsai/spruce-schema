import BaseTest, { test, assert } from '@sprucelabs/test'
import FieldFactory from '../../factories/FieldFactory'
import { ISelectFieldDefinitionChoice } from '../../fields'
import { FieldDefinition } from '#spruce:schema/fields/fields.types'
import FieldType from '#spruce:schema/fields/fieldType'

const choices: ISelectFieldDefinitionChoice[] = [
	{ value: 'foo', label: 'Foo' },
	{ value: 'bar', label: 'Bar' }
]

export default class TextFieldTest extends BaseTest {
	@test(
		'create select and get choices',
		{ type: FieldType.Select, options: { choices } },
		choices
	)
	protected static async transformTests(
		definition: FieldDefinition,
		expectedValue: any
	) {
		const field = FieldFactory.field('test', definition)
		switch (field.definition.type) {
			case FieldType.Select:
				assert.isEqualDeep(field.definition.options.choices, expectedValue)
				break
		}
	}
}
