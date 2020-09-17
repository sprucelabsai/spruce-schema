import { IFieldDefinition } from './field.static.types'

export type IIdFieldDefinition = IFieldDefinition<string> & {
	/** * .Id a field to hold a unique id (UUID4 in Spruce) */
	type: 'id'
	// eslint-disable-next-line @typescript-eslint/ban-types
	options?: {}
}
