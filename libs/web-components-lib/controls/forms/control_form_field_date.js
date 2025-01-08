/**
 * @module KoiFormFieldDate
 * Displays an edit field in forms
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementDate } from "../../data_element.js"
import { KoiFormFieldMinMaxableNativeInputSocket, KoiFormFieldMinMaxableNativeInputSocketConnectable } from "./socket_form_field.js";
import { KoiFormFieldStencil, KoiNativeInputDataCapable } from "./control_form_field_stencil.js";
import { KoiFormFieldDateDataCapable } from "./data_object_form_field_date.js";

class KoiFormFieldDateNativeInputSocket extends KoiFormFieldMinMaxableNativeInputSocket {

	_getTemplateForInput(){
		return '<input id="' + this.getID() + 
				'" value="" placeholder="' + this._placeholder + 
				'" class="form-control" type="date">';
	}

}

export const KoiFormFieldDateNativeInputSocketConnectable = Sup => class extends KoiFormFieldMinMaxableNativeInputSocketConnectable(Sup) {

	_constructSocket(){
		return new KoiFormFieldDateNativeInputSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}

export class KoiFormFieldDate extends KoiFormFieldDateNativeInputSocketConnectable(
	KoiFormFieldDateDataCapable(
		KoiNativeInputDataCapable(
			KoiFormFieldStencil
		)
	)
) {

	static getTagName(){
		return 'koi-form-field-date';
	}

	static getTag({element_id, field_name, field_value, min_value, max_value, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_field_value = KoiDataElementDate.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementDate.convertToAttribute(field_value) + '"' : '';
		let str_min_value = KoiDataElementDate.canConvertToAttribute(min_value) ? 
			'min_value="' + KoiDataElementDate.convertToAttribute(min_value) + '"' : '';
		let str_max_value = KoiDataElementDate.canConvertToAttribute(max_value) ? 
			'max_value="' + KoiDataElementDate.convertToAttribute(max_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" field_name="' + field_name + 
			'" ' + str_field_value + 
			' ' + str_min_value + 
			' ' + str_max_value + 
			' placeholder="' + placeholder + 
			'" ' + str_debug_mode +
			' ' + str_element_class +
			'></' + tag_name + '>';
	}

	_getInterceptableOperateEventCode(){
		return 'change';
	}

	_getOperationDataFromEvent(event_detail){
		// Unfortunately, standard components do not pass 
		// the value in the event. Therefore, let's take 
		// the value from the socket.
		this._native_input_data.setValue(
			this._getInputValueFromSocket()
		);
		return this._native_input_data;
	}

	_convertDataToInitialSocketSettings(data){
		return {
			initial_value: KoiDataElementDate.convertToAttribute(
				data.getFieldValue()
			),
			min_value: KoiDataElementDate.convertToAttribute(
				data.getMin()
			),
			max_value: KoiDataElementDate.convertToAttribute(
				data.getMax()
			)
		};
	}

	_applyOperationToOwnData(operation_data){
		this.data.setFieldValue(
			this._getItemValueFromOperationData(operation_data)
		);
	}

}
