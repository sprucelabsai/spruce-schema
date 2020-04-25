import '@sprucelabs/path-resolver/register'
import BaseTest, { test, assert } from '@sprucelabs/test'
import Schema, { buildSchemaDefinition } from '..'
import { FieldType } from './fieldType'

interface IUserDefinition {
	id: 'select-union-test'
	name: 'select union test'
	fields: {
		favoriteColor: {
			type: FieldType.Select
			options: {
				choices: [
					{
						value: 'blue'
						label: 'Blue'
					},
					{
						value: 'red'
						label: 'Red'
					}
				]
			}
		}
	}
}

export default class SelectFieldTest extends BaseTest {
	private static userDefinition = buildSchemaDefinition<IUserDefinition>({
		id: 'select-union-test',
		name: 'select union test',
		fields: {
			favoriteColor: {
				type: FieldType.Select,
				options: {
					choices: [
						{
							value: 'blue',
							label: 'Blue'
						},
						{
							value: 'red',
							label: 'Red'
						}
					]
				}
			}
		}
	})
	@test('Makes select options a union (test passes, lint will fail)')
	protected static async canAccessVarsFromDecorator() {
		const user = new Schema(SelectFieldTest.userDefinition, {
			favoriteColor: 'blue'
		})
		const favColor = user.get('favoriteColor')
		assert.expectType<'blue' | 'red'>(favColor)
	}
}
