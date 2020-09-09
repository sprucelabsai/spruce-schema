import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { IFieldDefinition } from './field.static.types'

export type IRawFieldDefinition = IFieldDefinition<any> & {
	/** * .Raw - Deprecated, don't use */
	type: FieldType.Raw
	options: {
		valueType: string
	}
}