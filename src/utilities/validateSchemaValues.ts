import Schema from '../Schema'
import {
	ISchemaDefinition,
	ISchemaValidateOptions,
	SchemaDefinitionPartialValues,
} from '../schemas.static.types'

export default function validateSchemaValues<S extends ISchemaDefinition>(
	definition: S,
	values: SchemaDefinitionPartialValues<S>,
	options?: ISchemaValidateOptions<S>
) {
	const instance = new Schema(definition, values)
	instance.validate(options)
}
