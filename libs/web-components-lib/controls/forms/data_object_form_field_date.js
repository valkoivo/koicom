/**
 * @module KoiFormFieldDateData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString, KoiDataElementDate } from "../../data_element.js"
import { KoiFormFieldData } from "./data_object_form_field.js";
import { KoiFormFieldDataMinMaxable, KoiFormFieldMinMaxableDataCapable } from "./data_object_form_field_numeric.js";

class KoiFormFieldDateData extends KoiFormFieldDataMinMaxable(KoiFormFieldData) {

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementDate({
				localized_name: 'field_value',
				default_value: null,
				allow_empty: true
			})
		};
	}

}

export const KoiFormFieldDateDataCapable = Sup => class extends KoiFormFieldMinMaxableDataCapable(Sup) {

	_constructData(){
		return new KoiFormFieldDateData();
	}

}
