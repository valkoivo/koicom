/**
 * @module KoiFormFieldBinaryData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiBinary, KoiDataElementString } from "../../data_element.js"
import { KoiFormFieldData, KoiFormFieldDataCapable } from "./data_object_form_field.js";

export class KoiFormFieldBinaryData extends KoiFormFieldData {

	setOptionsFromAttributes({primary_option, secondary_option}){
		this._properties['field_value'].setPrimaryOptionFromAttributeValue(primary_option);
		this._properties['field_value'].setSecondaryOptionFromAttributeValue(secondary_option);
	}

	isPrimaryOptionSelected(){
		return this._properties['field_value'].isPrimaryOptionSet();
	}

	getPrimaryOption(){
		return this._properties['field_value'].getPrimaryOption();
	}

	getSecondaryOption(){
		return this._properties['field_value'].getSecondaryOption();
	}

	getOptions(){
		return {
			primary_option: this._properties['field_value'].getPrimaryOption(),
			secondary_option: this._properties['field_value'].getSecondaryOption()
		};
	}

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new (KoiBinary(KoiDataElementString))({
				localized_name: 'field_value',
				default_value: '',
				allow_empty: true,
				primary_option: '',
				secondary_option: ''
			})
		};
	}

}

export const KoiFormFieldBinaryDataCapable = Sup => class extends KoiFormFieldDataCapable(Sup) {

	_setOwnDataOptions(options){
		this.data.setOptionsFromAttributes(options);
	}

	_prepareDataOptionsFromAttributes(){
		this._setOwnDataOptions({
			primary_option: this.getAttribute('checked_value'),
			secondary_option: this.getAttribute('not_checked_value')
		});
	}

	_prepareDefaultDataValuesFromAttributes(){
		super._prepareDefaultDataValuesFromAttributes();
		this._prepareDataOptionsFromAttributes();
	}

	_constructData(){
		return new KoiFormFieldBinaryData();
	}

}
