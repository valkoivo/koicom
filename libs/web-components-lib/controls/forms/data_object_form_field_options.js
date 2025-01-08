/**
 * @module KoiFormFieldOptionsData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiJSONable, KoiCategorical, KoiOptionable, KoiDataElementString, KoiDataElementList } from "../../data_element.js"
import { KoiFormFieldData, KoiFormFieldDataCapable } from "./data_object_form_field.js";

export class KoiDataElementCategoricalList extends KoiCategorical(KoiJSONable(KoiDataElementList)) {

}

export class KoiFormFieldOptionsData extends KoiFormFieldData {

	setOptionsFromAttributes(options){
		this._properties['field_value'].setOptions(options);
	}

	getOptions(){
		return this._properties['field_value'].getOptions();
	}

	addOptionToValue(option){
		this._properties['field_value'].selectOption(option);
	}

	removeOptionFromValue(option){
		this._properties['field_value'].deselectOption(option);
	}

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementCategoricalList({
				localized_name: 'field_value',
				default_value: [],
				allow_empty: true
			})
		};
	}

}

export const KoiFormFieldOptionsDataCapable = Sup => class extends KoiFormFieldDataCapable(Sup) {

	_setOwnDataOptions(options){
		this.data.setOptionsFromAttributes(options);
	}

	_convertOptionsAttributeToDataOptions(options){
		return this.data.applyTypeToAttributeValue(options);
	}

	_prepareDataOptionsFormAttributes(){
		this._setOwnDataOptions(
			this._convertOptionsAttributeToDataOptions(
				this.getAttribute('options')
			)
		);
	}

	_prepareDefaultDataValuesFromAttributes(){
		super._prepareDefaultDataValuesFromAttributes();
		this._prepareDataOptionsFormAttributes();
	}

	_constructData(){
		return new KoiFormFieldOptionsData();
	}

}

export class KoiDataElementOptionableString extends KoiOptionable(KoiDataElementString) {

}

export class KoiFormFieldSingleChoiceData extends KoiFormFieldData {

	applyTypeToOptionsAttributeValue(options_attribute_value){
		return JSON.parse(decodeURIComponent(options_attribute_value));
	}

	setOptionsFromAttributes(options){
		this._properties['field_value'].setOptions(options);
	}

	getOptions(){
		return this._properties['field_value'].getOptions();
	}

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementOptionableString({
				localized_name: 'field_value',
				default_value: '',
				allow_empty: true
			})
		};
	}

}

export const KoiFormFieldSingleChoiceDataCapable = Sup => class extends KoiFormFieldDataCapable(Sup) {

	_setOwnDataOptions(options){
		this.data.setOptionsFromAttributes(options);
	}

	_convertOptionsAttributeToDataOptions(options){
		return this.data.applyTypeToOptionsAttributeValue(options);
	}

	_prepareDataOptionsFormAttributes(){
		this._setOwnDataOptions(
			this._convertOptionsAttributeToDataOptions(
				this.getAttribute('options')
			)
		);
	}

	_prepareDefaultDataValuesFromAttributes(){
		super._prepareDefaultDataValuesFromAttributes();
		this._prepareDataOptionsFormAttributes();
	}

	_constructData(){
		return new KoiFormFieldSingleChoiceData();
	}

}
