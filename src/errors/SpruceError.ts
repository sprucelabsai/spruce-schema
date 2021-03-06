import AbstractSpruceError from '@sprucelabs/error'
import {
	InvalidFieldErrorOptions,
	SchemaErrorOptions,
	ValidationFailedErrorOptions,
} from './error.types'

export default class SpruceError extends AbstractSpruceError<SchemaErrorOptions> {
	public friendlyMessage(): string {
		const { options } = this

		let message: string | undefined

		switch (options?.code) {
			case 'DUPLICATE_SCHEMA':
				message = `Duplicate schema -> '${this.buildSchemaName(options)}'.`
				break
			case 'SCHEMA_NOT_FOUND':
				message = `Could not find schema -> '${this.buildSchemaName(options)}'.`
				break
			case 'INVALID_FIELD':
				message = this.generateNestedErrorMessage(options)
				break
			case 'TRANSFORMATION_ERROR':
				message = ''
				options.errors?.forEach((error) => {
					message += `Error on ${error.name}:\n`
					if (error.error) {
						message += `  ${error.error?.message}`
					}
				})

				if (message === '') {
					message = `Could not transform a(n) ${
						options.incomingTypeof
					} to the  ${options.fieldType}. The incoming value was ${
						(JSON.stringify(options.incomingValue), null, 2)
					}.`
				}

				break
			case 'NOT_IMPLEMENTED':
				message = `${options.code}: ${options.instructions}`
				break
			case 'INVALID_SCHEMA':
				message = `Invalid schema with id: ${options.schemaId}. ${
					options.errors.length > 0
						? `Errors are: \n\n${options.errors.join('\n')}\n\n`
						: ``
				}`

				break
			case 'INVALID_FIELD_OPTIONS':
				message = `Invalid field options for schemaId: "${options.schemaId}", fieldName: "${options.fieldName}"`
				message += !options.options
					? ' - **missing options**'
					: `\n\n${JSON.stringify(options.options, null, 2).substr(0, 2000)}`
				break

			case 'VALIDATION_FAILED':
				message = this.buildValidationFailedErrorMessage(options)

				break

			case 'MISSING_PARAMETERS':
				message = `${this.renderParamsPretty(options.parameters)} ${
					options.parameters.length === 1 ? 'is' : 'are'
				} missing!`
				break

			case 'UNEXPECTED_PARAMETERS':
				message = `You set ${this.renderParamsPretty(
					options.parameters
				)}, but ${
					options.parameters.length === 1 ? `it doesn't` : `they don't`
				} exist.`
				break

			case 'INVALID_PARAMETERS':
				message = `${this.renderParamsPretty(options.parameters)} ${
					options.parameters.length === 1 ? 'is' : 'are'
				} invalid.`
				break

			default:
				message = this.message
		}

		// Drop on code and friendly message
		const fullMessage = `${message}${
			options.friendlyMessage ? `\n\n${options.friendlyMessage}` : ''
		}`

		// Handle repeating text from original message by remove it
		return `${fullMessage}${
			this.originalError && this.originalError.message !== fullMessage
				? `\n\nOriginal error: ${this.originalError.message.replace(
						message,
						''
				  )}`
				: ''
		}`
	}
	private renderParamsPretty(parameters: string[]) {
		const str = '`' + parameters.join('`, `') + '`'

		return str
	}

	private buildValidationFailedErrorMessage(
		options: ValidationFailedErrorOptions
	): string {
		const totalErrors = options.errors.length

		let message = `Validating \`${
			options.schemaId
		}\` failed with ${totalErrors} error${totalErrors === 1 ? '' : 's'}.\n\n`

		let c = 0
		for (const err of options.errors) {
			message += `${++c}. ${err.friendlyMessage()}\n`
		}

		return message
	}

	private buildSchemaName(options: {
		schemaId: string
		version?: string
		namespace?: string
	}) {
		return `${options.namespace ? options.namespace + '.' : ''}${
			options.schemaId
		}${options.version ? `(version: ${options.version})` : ''}`
	}

	private generateNestedErrorMessage(
		options: InvalidFieldErrorOptions,
		messageOptions?: { indentDepth: number }
	) {
		let { indentDepth = 0 } = messageOptions || {}
		let indention = this.buildIndention(indentDepth)

		let message =
			indentDepth === 0
				? `${indention}${options.errors.length} error${
						options.errors.length === 1 ? '' : 's'
				  } for '${options.schemaId}'.\n`
				: ``

		indentDepth++
		indention = this.buildIndention(indentDepth)

		options.errors.forEach((fieldError) => {
			message += `${indention}- ${
				fieldError.friendlyMessage ?? `'${fieldError.name}': ${fieldError.code}`
			}\n`

			if (fieldError.error) {
				if (
					fieldError.error instanceof SpruceError &&
					fieldError.error.options.code === 'INVALID_FIELD'
				) {
					message +=
						fieldError.error.generateNestedErrorMessage(
							fieldError.error.options,
							{ indentDepth: indentDepth + 1 }
						) + '\n'
				} else {
					message += `${this.buildIndention(indentDepth + 1)}${
						fieldError.error.message
					}\n`
				}
			}
		})

		return message.trim()
	}

	private buildIndention(indentDepth: number) {
		let indention = ''
		for (let c = 0; c < indentDepth; c++) {
			indention += `   `
		}
		return indention
	}
}
