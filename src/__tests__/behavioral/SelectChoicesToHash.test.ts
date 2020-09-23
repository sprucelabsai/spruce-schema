import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { PickFieldNames } from '../../schemas.static.types'
import {
	SelectChoicesToHash,
	selectChoicesToHash,
	definitionChoicesToHash,
} from '../../utilities/selectChoicesToHash'
import buildPersonWithCars from '../data/personWithCars'

export default class SelectOptionsToHashTest extends AbstractSpruceTest {
	@test('choice hashing')
	protected static async testCreatingOptionHashes() {
		const { personSchema } = buildPersonWithCars()
		const options = personSchema.fields.optionalSelect.options.choices

		type Test = SelectChoicesToHash<typeof options>
		const optionsHash = selectChoicesToHash(options)

		assert.isType<Test>(optionsHash)
		assert.isType<{ Foo: 'foo'; Bar: 'bar' }>(optionsHash)

		type SelectFields = PickFieldNames<typeof personSchema, 'select'>

		const optionsHash2 = definitionChoicesToHash(personSchema, 'optionalSelect')

		const optionsHash3 = definitionChoicesToHash(
			personSchema,
			'optionalSelectWithDefaultValue'
		)

		const fieldName: SelectFields = 'optionalSelectWithDefaultValue'
		const fieldName2: SelectFields = 'optionalSelect'

		assert.isType<'optionalSelect' | 'optionalSelectWithDefaultValue'>(
			fieldName
		)
		assert.isType<'optionalSelect' | 'optionalSelectWithDefaultValue'>(
			fieldName2
		)

		assert.isType<{ Foo: 'foo'; Bar: 'bar' }>(optionsHash2)
		assert.isType<{ world: 'hello'; darling: 'goodbye' }>(optionsHash3)
	}
}