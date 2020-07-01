import { FieldDefinition } from '#spruce/schemas/fields/fields.types'

/** Build a field type for use in your skill */
export default function buildFieldDefinition<T extends FieldDefinition>(
	definition: T
): T {
	return definition
}
