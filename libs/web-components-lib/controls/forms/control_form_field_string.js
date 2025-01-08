/**
 * @module KoiFormFieldString
 * Displays an edit field in forms
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../data_element.js"
import { KoiFormFieldDataCapable } from "./data_object_form_field.js";
import { KoiFormFieldNativeInputSocket, KoiFormFieldNativeInputSocketConnectable } from "./socket_form_field.js";
import { KoiFormFieldStencil, KoiNativeInputDataCapable } from "./control_form_field_stencil.js";

export class KoiFormFieldStringNativeInputSocket extends KoiFormFieldNativeInputSocket {

	_getTemplateForInput(){
		return '<input id="' + this.getID() + 
			'" value="" placeholder="' + this._placeholder + 
			'" class="form-control" type="text">';
	}

}

export const KoiFormFieldStringNativeInputSocketConnectable = Sup => class extends KoiFormFieldNativeInputSocketConnectable(Sup) {

	_constructSocket(){
		return new KoiFormFieldStringNativeInputSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}

export class KoiFormFieldString extends KoiFormFieldStringNativeInputSocketConnectable(
	KoiFormFieldDataCapable(
		KoiNativeInputDataCapable(
			KoiFormFieldStencil
		)
	)
) {

	static getTagName(){
		return 'koi-form-field-string';
	}

	static getTag({element_id, field_name, field_value, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_field_name = field_name ? 'field_name="' + field_name + '"' : '';
		let str_field_value = KoiDataElementString.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementString.convertToAttribute(field_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + str_field_name + 
			' ' + str_field_value + 
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
			initial_value: data.getFieldValue()
		};
	}

	_applyOperationToOwnData(operation_data){
		this.data.setFieldValue(
			this._getItemValueFromOperationData(operation_data)
		);
	}

}
