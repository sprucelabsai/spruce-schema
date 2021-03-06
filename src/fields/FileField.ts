import { InvalidFieldError } from '../errors/error.types'
import SpruceError from '../errors/SpruceError'
import {
	FieldTemplateDetailOptions,
	FieldTemplateDetails,
} from '../types/template.types'
import AbstractField from './AbstractField'
import { ToValueTypeOptions, ValidateOptions } from './field.static.types'
import { FileFieldDefinition, FileFieldValue } from './FileField.types'

let mimeInstance: any

function mime() {
	if (!mimeInstance) {
		const mimeDb = require('mime-db')
		const Mime = require('mime-type').default
		mimeInstance = new Mime(mimeDb, 2)
		mimeInstance.define('application/typescript', {
			source: 'spruce',
			extensions: ['ts', 'tsx'],
		})
	}

	return mimeInstance
}

export default class FileField extends AbstractField<FileFieldDefinition> {
	public static get description() {
		return 'A way to handle files. Supports mime-type lookups.'
	}

	public static generateTemplateDetails(
		options: FieldTemplateDetailOptions<FileFieldDefinition>
	): FieldTemplateDetails {
		return {
			valueType: `${options.importAs}.IFileFieldValue${
				options.definition.isArray ? '[]' : ''
			}`,
		}
	}

	public validate(
		value: any,
		_?: ValidateOptions<FileFieldDefinition>
	): InvalidFieldError[] {
		const errors: InvalidFieldError[] = []
		try {
			const file = this.toValueType(value)
			if (!file.ext && file.path) {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const fsUtil = require('fs')
				// if this file has no extension, lets see if it's a directory
				const isDirExists =
					fsUtil.existsSync(file.path) &&
					fsUtil.lstatSync(file.path).isDirectory()

				if (isDirExists) {
					errors.push({
						code: 'invalid_value',
						friendlyMessage: `${file.path} is not a directory!`,
						name: this.name,
					})
				}
			}
		} catch (err) {
			errors.push({ code: 'invalid_value', error: err, name: this.name })
		}

		return errors
	}

	/** Take a range of possible values and transform it into a IFileFieldValue */
	public toValueType<C extends boolean>(
		value: any,
		options?: ToValueTypeOptions<FileFieldDefinition, C>
	): FileFieldValue {
		let stringValue =
			typeof value === 'string' || value.toString ? value.toString() : undefined

		const relativeTo = options?.relativeTo

		let path: string | undefined
		let name: string | undefined
		let ext: string | undefined
		let type: string | undefined

		if (typeof value === 'object') {
			path = typeof value.path === 'string' ? value.path : undefined
			name = typeof value.name === 'string' ? value.name : undefined
			ext = typeof value.ext === 'string' ? value.ext : undefined
			type = typeof value.type === 'string' ? value.type : undefined

			// Use the name, fallback to path for looking up additional details
			stringValue = name || path
		}

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const pathUtil = require('path')
		const dirname =
			pathUtil.sep === '/' ? pathUtil.dirname : pathUtil.win32.dirname

		// Check if path is the full file path
		if (path) {
			const parts = pathUtil.parse(path)
			// If it is then we should just get the directory name and set it to path
			if (parts.ext.length > 0) {
				path = dirname(path)
			}
		} else if (!path) {
			// Try to pull the path off the value
			path =
				stringValue.indexOf(pathUtil.sep) > -1
					? dirname(stringValue)
					: undefined
		}

		name = name ?? stringValue.replace(path, '').replace(pathUtil.sep, '')

		if (!name) {
			throw new SpruceError({
				code: 'TRANSFORMATION_ERROR',
				fieldType: 'file',
				incomingTypeof: typeof value,
				incomingValue: value,
				name: this.name,
			})
		}

		ext = ext ?? pathUtil.extname(name)

		if (!type) {
			const m = mime()
			const lookupResults = m.lookup(name)

			if (Array.isArray(lookupResults)) {
				type = lookupResults.pop()
			} else {
				type = lookupResults
			}
		}

		if (relativeTo && path) {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const pathUtil = require('path')
			path = (pathUtil.relative(relativeTo, path) as string) || path
		}

		return {
			name,
			path,
			type,
			ext,
		}
	}
}
