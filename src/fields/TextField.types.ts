import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { IFieldDefinition } from './field.static.types'

export type ITextFieldDefinition = IFieldDefinition<
	string,
	string,
	string[],
	string[]
> & {
	/** * Text field */
	type: FieldType.Text
	/** Options */
	options?: {
		/** The minimum length we'll allow of this field */
		minLength?: number
		/** The max length possible with this string */
		maxLength?: number
	}
}