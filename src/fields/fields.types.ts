// THIS FILE IS REPLACED BY A GENERATED FILE USING PATH ALIASING AND SHOULD ALWAYS BE IMPORTED AS 'spruce:schema/fields/fields.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
// GOAL: this import goes away
import { IField } from '../schema.types'
// GOAL: all these move to type files
import { IAddressFieldDefinition } from './AddressField'
import { IBooleanFieldDefinition } from './BooleanField'
import { IDateFieldDefinition } from './DateField'
import { IDateTimeFieldDefinition } from './DateTimeField'
import { IDirectoryFieldDefinition } from './DirectoryField'
import { IDurationFieldDefinition } from './DurationField'
import { IFileFieldDefinition } from './FileField'
import { IIdFieldDefinition } from './IdField'
import { INumberFieldDefinition } from './NumberField'
import { IPhoneFieldDefinition } from './PhoneField'
import { IRawFieldDefinition } from './RawField'
import { ISchemaFieldDefinition } from './SchemaField'
import { ISelectFieldDefinition } from './SelectField'
import { ITextFieldDefinition } from './TextField'

export type FieldDefinition =
	| IBooleanFieldDefinition
	| ISelectFieldDefinition
	| IDurationFieldDefinition
	| IIdFieldDefinition
	| ITextFieldDefinition
	| IAddressFieldDefinition
	| IPhoneFieldDefinition
	| ISchemaFieldDefinition
	| IRawFieldDefinition
	| INumberFieldDefinition
	| IDateTimeFieldDefinition
	| IFileFieldDefinition
	| IDateFieldDefinition
	| IDirectoryFieldDefinition

export type Field =
	| IField<IBooleanFieldDefinition>
	| IField<ISelectFieldDefinition>
	| IField<IDurationFieldDefinition>
	| IField<IIdFieldDefinition>
	| IField<ITextFieldDefinition>
	| IField<IAddressFieldDefinition>
	| IField<IPhoneFieldDefinition>
	| IField<ISchemaFieldDefinition>
	| IField<IRawFieldDefinition>
	| IField<INumberFieldDefinition>
	| IField<IDateTimeFieldDefinition>
	| IField<IFileFieldDefinition>
	| IField<IDateFieldDefinition>
	| IField<IDirectoryFieldDefinition>

export interface IFieldDefinitionMap {
	[FieldType.Boolean]: IBooleanFieldDefinition
	[FieldType.Select]: ISelectFieldDefinition
	[FieldType.Duration]: IDurationFieldDefinition
	[FieldType.Id]: IIdFieldDefinition
	[FieldType.Text]: ITextFieldDefinition
	[FieldType.Address]: IAddressFieldDefinition
	[FieldType.Phone]: IPhoneFieldDefinition
	[FieldType.Schema]: ISchemaFieldDefinition
	[FieldType.Raw]: IRawFieldDefinition
	[FieldType.Number]: INumberFieldDefinition
	[FieldType.DateTime]: IDateTimeFieldDefinition
	[FieldType.File]: IFileFieldDefinition
	[FieldType.Date]: IDateFieldDefinition
	[FieldType.Directory]: IDirectoryFieldDefinition
}

export interface IFieldMap {
	[FieldType.Boolean]: IField<IBooleanFieldDefinition>
	[FieldType.Select]: IField<ISelectFieldDefinition>
	[FieldType.Duration]: IField<IDurationFieldDefinition>
	[FieldType.Id]: IField<IIdFieldDefinition>
	[FieldType.Text]: IField<ITextFieldDefinition>
	[FieldType.Address]: IField<IAddressFieldDefinition>
	[FieldType.Phone]: IField<IPhoneFieldDefinition>
	[FieldType.Schema]: IField<ISchemaFieldDefinition>
	[FieldType.Raw]: IField<IRawFieldDefinition>
	[FieldType.Number]: IField<INumberFieldDefinition>
	[FieldType.DateTime]: IField<IDateTimeFieldDefinition>
	[FieldType.File]: IField<IFileFieldDefinition>
	[FieldType.Date]: IField<IDateFieldDefinition>
	[FieldType.Directory]: IField<IDirectoryFieldDefinition>
}
