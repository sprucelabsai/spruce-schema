import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import DynamicSchemaEntity from '../../DynamicSchemaEntity'
import EntityFactory from '../../factories/EntityFactory'
import SchemaEntity from '../../SchemaEntity'

export default class CreatingEntityInstancesTest extends AbstractSchemaTest {
	@test()
	protected static async canCreateStaticEntity() {
		const instance = EntityFactory.Entity({
			id: 'staticPerson',
			fields: {
				firstName: {
					type: 'text',
					isRequired: true,
				},
			},
		})

		assert.isTrue(instance instanceof SchemaEntity)
	}

	@test()
	protected static async typesStaticEntity() {
		const instance = EntityFactory.Entity(
			{
				id: 'staticPerson',
				fields: {
					firstName: {
						type: 'text',
						isRequired: true,
					},
				},
			},
			{
				firstName: 'Tay tay',
			}
		)

		const values = instance.getValues()

		assert.isExactType<typeof values, { firstName: string }>(true)
	}

	@test()
	protected static async canCreateDynamicEntity() {
		const instance = EntityFactory.Entity({
			id: 'staticPerson',
			dynamicFieldSignature: {
				type: 'boolean',
				keyName: 'key',
			},
		})

		assert.isTrue(instance instanceof DynamicSchemaEntity)
	}

	@test()
	protected static async typesDynamicEntity() {
		const instance = EntityFactory.Entity(
			{
				id: 'staticPerson',
				dynamicFieldSignature: {
					type: 'boolean',
					keyName: 'key',
				},
			},
			{
				pass: true,
				youSure: false,
			}
		)

		const values = instance.getValues()

		assert.isExactType<
			typeof values,
			{ [key: string]: boolean | undefined | null }
		>(true)
	}
}
