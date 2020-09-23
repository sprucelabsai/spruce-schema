import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import FieldFactory from '../../factories/FieldFactory'
import { buildDuration } from '../../fields'
import { IDurationFieldValue } from '../../fields/DurationField.types'

export default class DurationFieldTest extends AbstractSpruceTest {
	@test(
		'can get seconds from ms',
		{ ms: 2340 },
		{ ms: 340, seconds: 2, minutes: 0, hours: 0 }
	)
	@test(
		'can get minutes from ms and seconds',
		{ ms: 4500, seconds: 85 },
		{ ms: 500, seconds: 29, minutes: 1, hours: 0 }
	)
	@test(
		'can get minutes and seconds from part of an hour',
		{ hours: 2.52 },
		{ ms: 0, seconds: 12, minutes: 31, hours: 2 }
	)
	protected static async testCompletingDurationObject(
		partial: Partial<IDurationFieldValue>,
		expected: IDurationFieldValue
	) {
		const field = FieldFactory.Field('test', { type: 'duration' })
		const value = field.toValueType(partial)
		assert.isEqualDeep(
			value,
			expected,
			`Duration field did not map ${JSON.stringify(
				partial
			)} to ${JSON.stringify(expected)}`
		)

		// test build directly
		assert.isEqualDeep(
			buildDuration(partial),
			expected,
			`Duration field did not map ${JSON.stringify(
				partial
			)} to ${JSON.stringify(expected)}`
		)
	}
}