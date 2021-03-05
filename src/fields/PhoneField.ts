import {
	FieldTemplateDetailOptions,
	FieldTemplateDetails,
} from '../types/template.types'
import formatPhoneNumber, {
	isValidNumber,
} from '../utilities/formatPhoneNumber'
import AbstractField from './AbstractField'
import { ValidateOptions } from './field.static.types'
import { PhoneFieldDefinition } from './PhoneField.types'

export default class PhoneField extends AbstractField<PhoneFieldDefinition> {
	public static get description() {
		return 'Takes anything close to a phone number and formats it. Also great at validating numbers.'
	}

	public static generateTemplateDetails(
		options: FieldTemplateDetailOptions<PhoneFieldDefinition>
	): FieldTemplateDetails {
		return {
			valueType: `string${options.definition.isArray ? '[]' : ''}`,
		}
	}

	public toValueType(value: any): string {
		const stringValue = `${value}`
		const phoneNumber = formatPhoneNumber(stringValue)
		return phoneNumber
	}

	public validate(value: any, options?: ValidateOptions<PhoneFieldDefinition>) {
		const errors = super.validate(value, options)

		if (value && !isValidNumber(value)) {
			errors.push({ code: 'invalid_value', name: this.name })
		}

		return errors
	}
}
