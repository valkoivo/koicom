/**
 * @module KoiFormFieldData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString }  from '../../data_element.js';
import { KoiData }  from '../../data.js';
import { KoiDataCapable }  from '../../data.js';

export class KoiFormFieldData extends KoiData {

	getFieldName(){
		return this._getValueOrDefaultValue('field_name');
	}

	getFieldValue(){
		return this._getValueOrDefaultValue('field_value');
	}

	applyTypeToAttributeValue(attribute_value){
		return this._properties['field_value'].applyTypeToAttributeValue(attribute_value);
	}

	getFieldErrorCode(){
		return this._properties['field_value'].getErrorCode();
	}

	setFieldValue(new_value){
		this._properties['field_value'].setValue(new_value);
	}

	clearFieldValue(){
		this._properties['field_value'].clearValue();
	}

	setFieldDefaultValue(initial_value){
		this._properties['field_value'].setDefaultValue(initial_value);
	}

	getOptions(){

	}

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementString({
				localized_name: 'field_value',
				default_value: '',
				allow_empty: true
			})
		};
	}

}

export const KoiFormFieldDataCapable = Sup => class extends KoiDataCapable(Sup) {

	_getInitialData(){
		return this.data;
	}

	_getErrorCodeFromData(){
		return this.data.getFieldErrorCode();
	}

	_constructData(){
		return new KoiFormFieldData();
	}

}
