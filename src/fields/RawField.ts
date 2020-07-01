import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { IFieldDefinition } from '../schema.types'
import { IFieldTemplateDetailOptions } from '../template.types'
import AbstractField from './AbstractField'

export type IRawFieldDefinition = IFieldDefinition<any> & {
	/** * .Raw - Deprecated, don't use */
	type: FieldType.Raw
	options: {
		valueType: string
	}
}

export default class RawField extends AbstractField<IRawFieldDefinition> {
	public static get description() {
		return 'Deprecated. For internal purposes only (will be deleted soon)'
	}
	public static generateTemplateDetails(
		options: IFieldTemplateDetailOptions<IRawFieldDefinition>
	) {
		return {
			valueType: `(${options.definition.options.valueType})${
				options.definition.isArray ? '[]' : ''
			}`
		}
	}
}
