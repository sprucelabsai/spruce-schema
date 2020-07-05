import Schema from '../Schema'
import { ISchemaDefinition } from '../schemas.static.types'

/** Builds a schema definition */
export default function buildSchemaDefinition<T extends ISchemaDefinition>(
	definition: T
): T {
	Schema.trackDefinition(definition)
	return definition
}
