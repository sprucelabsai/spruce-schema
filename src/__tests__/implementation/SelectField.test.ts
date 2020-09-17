import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import SchemaEntity from '../../SchemaEntity'
import buildSchema from '../../utilities/buildSchema'

interface IUserSchema {
	id: 'select-union-test'
	name: 'select union test'
	fields: {
		favoriteColor: {
			type: 'select'
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
		favoriteColorRequired: {
			type: 'select'
			isRequired: true
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

export default class SelectFieldTest extends AbstractSpruceTest {
	private static userSchema = buildSchema<IUserSchema>({
		id: 'select-union-test',
		name: 'select union test',
		fields: {
			favoriteColor: {
				type: 'select',
				options: {
					choices: [
						{
							value: 'blue',
							label: 'Blue',
						},
						{
							value: 'red',
							label: 'Red',
						},
					],
				},
			},
			favoriteColorRequired: {
				type: 'select',
				isRequired: true,
				options: {
					choices: [
						{
							value: 'blue',
							label: 'Blue',
						},
						{
							value: 'red',
							label: 'Red',
						},
					],
				},
			},
		},
	})
	@test('Makes select options a union (test passes, lint will fail)')
	protected static async canMakeSelectOptionsUnion() {
		const user = new SchemaEntity(this.userSchema, {
			favoriteColor: 'blue',
			favoriteColorRequired: 'blue',
		})
		const favColor = user.get('favoriteColor')
		const favoriteColorRequired = user.get('favoriteColorRequired')

		assert.isType<'blue' | 'red' | undefined | null>(favColor)
		assert.isType<'blue' | 'red'>(favoriteColorRequired)
	}
}
