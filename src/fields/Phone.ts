import { IFieldBaseDefinition } from './Base'
import { FieldType } from './types'
import FieldText from './Text'
import PhoneNumber from '../utilities/PhoneNumber'

export interface IFieldPhoneDefinition extends IFieldBaseDefinition {
	type: FieldType.Phone
	value?: string
	defaultValue?: string
	options?: {
		/** the format we should use, defaults to +1 (555)-555-5555 */
		phoneNumberFormat?: string
	}
}

export default class FieldPhone extends FieldText<IFieldPhoneDefinition> {
	public static templateDetails() {
		return {
			definitionInterface: 'IFieldPhoneDefinition',
			valueType: 'string'
		}
	}

	public toValueType(value: any): string {
		// TODO format as phone number
		const stringValue = super.toValueType(value)
		const phoneNumber = PhoneNumber.format(stringValue)
		return phoneNumber
	}

	public validate(value: any) {
		// debugger
		const errors = super.validate(value)

		// don't validate if somethin already happened
		if (errors.length > 0) {
			return errors
		}

		try {
			PhoneNumber.format(value, false)
		} catch (err) {
			errors.push('invalid_phone_number')
		}

		return errors
	}
}
