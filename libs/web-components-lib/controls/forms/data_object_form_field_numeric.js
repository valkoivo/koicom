/**
 * @module KoiFormFieldIntegerData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString, KoiDataElementInteger, KoiDataElementFloat } from "../../data_element.js"
import { KoiFormFieldData, KoiFormFieldDataCapable } from "./data_object_form_field.js";

export const KoiFormFieldDataMinMaxable = Sup => class extends Sup {

	setMinMaxFromAttributes(min_value, max_value){
		if(min_value !== null){
			this._properties['field_value'].setMin(min_value);
		}
		if(max_value !== null){
			this._properties['field_value'].setMax(max_value);
		}
	}

	getMin(){
		return this._properties['field_value'].getMin();
	}

	getMax(){
		return this._properties['field_value'].getMax();
	}

}

export const KoiFormFieldMinMaxableDataCapable = Sup => class extends KoiFormFieldDataCapable(Sup) {

	_prepareDataMinMaxFromAttributes(){
		this.data.setMinMaxFromAttributes(
			this.getAttribute('min_value'), 
			this.getAttribute('max_value')
		);
	}

	_prepareDefaultDataValuesFromAttributes(){
		super._prepareDefaultDataValuesFromAttributes();
		this._prepareDataMinMaxFromAttributes();
	}

}

export class KoiFormFieldIntegerData extends KoiFormFieldDataMinMaxable(KoiFormFieldData) {

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementInteger({
				localized_name: 'field_value',
				default_value: 0,
				allow_empty: false
			})
		};
	}

}

export class KoiFormFieldFloatData extends KoiFormFieldDataMinMaxable(KoiFormFieldData) {

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementFloat({
				localized_name: 'field_value',
				default_value: 0,
				allow_empty: false
			})
		};
	}

}
