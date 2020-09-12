import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import SchemaEntity from '../../SchemaEntity'
import { ISchema } from '../../schemas.static.types'
import buildSchema from '../../utilities/buildSchema'

// turn off duplicate checks because tests all run in the same runtime
SchemaEntity.enableDuplicateCheckWhenTracking = false

export interface ICarV1Definition extends ISchema {
	id: 'car'
	name: 'car'
	fields: {
		name: {
			type: FieldType.Text
			isRequired: true
		}
		onlyOnCar: {
			type: FieldType.Text
		}
	}
}

export interface ICarV2Definition extends ISchema {
	id: 'car'
	name: 'car'
	fields: {
		name: {
			type: FieldType.Text
			isRequired: true
		}
		newRequiredOnCar: {
			type: FieldType.Text
			isRequired: true
		}
	}
}

export interface ITruckV1Definition extends ISchema {
	id: 'truck'
	name: 'Truck'
	fields: {
		name: {
			type: FieldType.Text
			isRequired: true
		}
		onlyOnTruck: {
			type: FieldType.Text
		}
	}
}

export interface IPersonV1Definition extends ISchema {
	id: 'person'
	name: 'user schema test'
	fields: {
		name: {
			type: FieldType.Text
			isArray: false
			value: 'tay'
		}
		requiredCar: {
			type: FieldType.Schema
			isRequired: true
			options: {
				schema: ICarV1Definition
			}
		}
		optionalCar: {
			type: FieldType.Schema
			options: {
				schema: ICarV1Definition
			}
		}
		optionalCarWithCallback: {
			type: FieldType.Schema
			options: {
				schemasCallback: () => [ICarV1Definition]
			}
		}
		optionalIsArrayCars: {
			type: FieldType.Schema
			isArray: true
			options: {
				schema: ICarV1Definition
			}
		}
		requiredIsArrayCars: {
			type: FieldType.Schema
			isArray: true
			isRequired: true
			options: {
				schema: ICarV1Definition
			}
		}
		optionalCarOrTruck: {
			type: FieldType.Schema
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		optionalIsArrayCarOrTruck: {
			type: FieldType.Schema
			isArray: true
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		requiredIsArrayCarOrTruck: {
			type: FieldType.Schema
			isArray: true
			isRequired: true
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		optionalSelect: {
			type: FieldType.Select
			options: {
				choices: [
					{ value: 'foo'; label: 'Foo' },
					{ value: 'bar'; label: 'Bar' }
				]
			}
		}
		optionalSelectWithDefaultValue: {
			type: FieldType.Select
			defaultValue: 'hello'
			options: {
				choices: [
					{ value: 'hello'; label: 'world' },
					{ value: 'goodbye'; label: 'darling' }
				]
			}
		}
		optionalTextWithDefaultValue: {
			type: FieldType.Text
			defaultValue: 'world'
		}
		optionalCarWithDefaultValue: {
			type: FieldType.Schema
			defaultValue: { name: 'fast car' }
			options: {
				schema: ICarV1Definition
			}
		}
		optionalIsArrayCarOrTruckWithDefaultValue: {
			type: FieldType.Schema
			isArray: true
			defaultValue: [{ schemaId: 'car'; values: { name: 'fast car' } }]
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		optionalCarOrTruckWithDefaultValue: {
			type: FieldType.Schema
			defaultValue: { schemaId: 'car'; values: { name: 'fast car' } }
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
	}
}

export interface IPersonV2Definition extends ISchema {
	id: 'person'
	name: 'user schema test'
	fields: {
		name: {
			type: FieldType.Text
			isArray: false
			value: 'tay'
		}
		requiredCar: {
			type: FieldType.Schema
			isRequired: true
			options: {
				schema: ICarV2Definition
			}
		}
		optionalCar: {
			type: FieldType.Schema
			options: {
				schema: ICarV2Definition
			}
		}
		optionalCarWithCallback: {
			type: FieldType.Schema
			options: {
				schemasCallback: () => [
					ICarV1Definition,
					ICarV2Definition,
					ITruckV1Definition
				]
			}
		}
		optionalIsArrayCars: {
			type: FieldType.Schema
			isArray: true
			options: {
				schema: ICarV1Definition
			}
		}
		requiredIsArrayCars: {
			type: FieldType.Schema
			isArray: true
			isRequired: true
			options: {
				schema: ICarV1Definition
			}
		}
		optionalCarOrTruck: {
			type: FieldType.Schema
			options: {
				schemas: [ICarV1Definition, ICarV2Definition, ITruckV1Definition]
			}
		}
		optionalIsArrayCarOrTruck: {
			type: FieldType.Schema
			isArray: true
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		requiredIsArrayCarOrTruck: {
			type: FieldType.Schema
			isArray: true
			isRequired: true
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		optionalSelect: {
			type: FieldType.Select
			options: {
				choices: [
					{ value: 'foo'; label: 'Foo' },
					{ value: 'bar'; label: 'Bar' }
				]
			}
		}
		optionalSelectWithDefaultValue: {
			type: FieldType.Select
			defaultValue: 'hello'
			options: {
				choices: [
					{ value: 'hello'; label: 'world' },
					{ value: 'goodbye'; label: 'darling' }
				]
			}
		}
		optionalTextWithDefaultValue: {
			type: FieldType.Text
			defaultValue: 'world'
		}
		optionalCarWithDefaultValue: {
			type: FieldType.Schema
			defaultValue: { name: 'fast car' }
			options: {
				schema: ICarV1Definition
			}
		}
		optionalIsArrayCarOrTruckWithDefaultValue: {
			type: FieldType.Schema
			isArray: true
			defaultValue: [{ schemaId: 'car'; values: { name: 'fast car' } }]
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
		optionalCarOrTruckWithDefaultValue: {
			type: FieldType.Schema
			defaultValue: { schemaId: 'car'; values: { name: 'fast car' } }
			options: {
				schemas: [ICarV1Definition, ITruckV1Definition]
			}
		}
	}
}
const buildVersionedPersonWithCars = () => {
	const carV1Schema = buildSchema<ICarV1Definition>({
		id: 'car',
		name: 'car',
		version: 'v1',
		fields: {
			name: {
				type: FieldType.Text,
				isRequired: true,
			},
			onlyOnCar: {
				type: FieldType.Text,
			},
		},
	})

	const carV2Schema = buildSchema<ICarV2Definition>({
		id: 'car',
		name: 'car',
		version: 'v2',
		fields: {
			name: {
				type: FieldType.Text,
				isRequired: true,
			},
			newRequiredOnCar: {
				type: FieldType.Text,
				isRequired: true,
			},
		},
	})

	const truckV1Definition = buildSchema<ITruckV1Definition>({
		id: 'truck',
		name: 'Truck',
		fields: {
			name: {
				type: FieldType.Text,
				isRequired: true,
			},
			onlyOnTruck: {
				type: FieldType.Text,
			},
		},
	})

	const personV1Schema = buildSchema<IPersonV1Definition>({
		id: 'person',
		name: 'user schema test',
		version: 'v1',
		fields: {
			name: {
				type: FieldType.Text,
				isArray: false,
				value: 'tay',
			},
			requiredCar: {
				type: FieldType.Schema,
				isRequired: true,
				options: {
					schema: carV1Schema,
				},
			},
			optionalCar: {
				type: FieldType.Schema,
				options: {
					schema: carV1Schema,
				},
			},
			optionalCarWithCallback: {
				type: FieldType.Schema,
				options: {
					schemasCallback: () => [carV1Schema],
				},
			},
			optionalIsArrayCars: {
				type: FieldType.Schema,
				isArray: true,
				options: {
					schema: carV1Schema,
				},
			},
			requiredIsArrayCars: {
				type: FieldType.Schema,
				isArray: true,
				isRequired: true,
				options: {
					schema: carV1Schema,
				},
			},
			optionalCarOrTruck: {
				type: FieldType.Schema,
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			optionalIsArrayCarOrTruck: {
				type: FieldType.Schema,
				isArray: true,
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			requiredIsArrayCarOrTruck: {
				type: FieldType.Schema,
				isArray: true,
				isRequired: true,
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			optionalSelect: {
				type: FieldType.Select,
				options: {
					choices: [
						{ value: 'foo', label: 'Foo' },
						{ value: 'bar', label: 'Bar' },
					],
				},
			},
			optionalSelectWithDefaultValue: {
				type: FieldType.Select,
				defaultValue: 'hello',
				options: {
					choices: [
						{ value: 'hello', label: 'world' },
						{ value: 'goodbye', label: 'darling' },
					],
				},
			},
			optionalTextWithDefaultValue: {
				type: FieldType.Text,
				defaultValue: 'world',
			},
			optionalCarWithDefaultValue: {
				type: FieldType.Schema,
				defaultValue: { name: 'fast car' },
				options: {
					schema: carV1Schema,
				},
			},
			optionalIsArrayCarOrTruckWithDefaultValue: {
				type: FieldType.Schema,
				isArray: true,
				defaultValue: [{ schemaId: 'car', values: { name: 'fast car' } }],
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			optionalCarOrTruckWithDefaultValue: {
				type: FieldType.Schema,
				defaultValue: { schemaId: 'car', values: { name: 'fast car' } },
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
		},
	})

	const personV2Schema = buildSchema<IPersonV2Definition>({
		id: 'person',
		name: 'user schema test',
		version: 'v2',
		fields: {
			name: {
				type: FieldType.Text,
				isArray: false,
				value: 'tay',
			},
			requiredCar: {
				type: FieldType.Schema,
				isRequired: true,
				options: {
					schema: carV2Schema,
				},
			},
			optionalCar: {
				type: FieldType.Schema,
				options: {
					schema: carV2Schema,
				},
			},
			optionalCarWithCallback: {
				type: FieldType.Schema,
				options: {
					schemasCallback: () => [carV1Schema, carV2Schema, truckV1Definition],
				},
			},
			optionalIsArrayCars: {
				type: FieldType.Schema,
				isArray: true,
				options: {
					schema: carV1Schema,
				},
			},
			requiredIsArrayCars: {
				type: FieldType.Schema,
				isArray: true,
				isRequired: true,
				options: {
					schema: carV1Schema,
				},
			},
			optionalCarOrTruck: {
				type: FieldType.Schema,
				options: {
					schemas: [carV1Schema, carV2Schema, truckV1Definition],
				},
			},
			optionalIsArrayCarOrTruck: {
				type: FieldType.Schema,
				isArray: true,
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			requiredIsArrayCarOrTruck: {
				type: FieldType.Schema,
				isArray: true,
				isRequired: true,
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			optionalSelect: {
				type: FieldType.Select,
				options: {
					choices: [
						{ value: 'foo', label: 'Foo' },
						{ value: 'bar', label: 'Bar' },
					],
				},
			},
			optionalSelectWithDefaultValue: {
				type: FieldType.Select,
				defaultValue: 'hello',
				options: {
					choices: [
						{ value: 'hello', label: 'world' },
						{ value: 'goodbye', label: 'darling' },
					],
				},
			},
			optionalTextWithDefaultValue: {
				type: FieldType.Text,
				defaultValue: 'world',
			},
			optionalCarWithDefaultValue: {
				type: FieldType.Schema,
				defaultValue: { name: 'fast car' },
				options: {
					schema: carV1Schema,
				},
			},
			optionalIsArrayCarOrTruckWithDefaultValue: {
				type: FieldType.Schema,
				isArray: true,
				defaultValue: [{ schemaId: 'car', values: { name: 'fast car' } }],
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
			optionalCarOrTruckWithDefaultValue: {
				type: FieldType.Schema,
				defaultValue: { schemaId: 'car', values: { name: 'fast car' } },
				options: {
					schemas: [carV1Schema, truckV1Definition],
				},
			},
		},
	})

	return {
		personV1Schema,
		carV1Schema,
		carV2Schema,
		truckV1Definition,
		personV2Schema,
	}
}

export default buildVersionedPersonWithCars