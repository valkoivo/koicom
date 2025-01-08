/**
 * @module KoiFormFieldBinary
 * Displays a boolean value edit field in forms
 *
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 *
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../data_element.js"
import { KoiFormFieldNativeSwitchSocketConnectable } from "./socket_form_field.js";
import { KoiFormFieldStencil, KoiNativeInputDataCapable } from "./control_form_field_stencil.js";
import { KoiFormFieldBinaryDataCapable } from "./data_object_form_field_binary.js";

export class KoiFormFieldBinary extends KoiFormFieldNativeSwitchSocketConnectable(
	KoiFormFieldBinaryDataCapable(
		KoiNativeInputDataCapable(
			KoiFormFieldStencil
		)
	)
) {

	static getTagName(){
		return 'koi-form-field-binary';
	}

	static getTag({element_id, field_name, field_value, checked_value, not_checked_value, placeholder, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_field_value = KoiDataElementString.canConvertToAttribute(field_value) ?
			'field_value="' + KoiDataElementString.convertToAttribute(field_value) + '"' : '';
		let str_checked_value = KoiDataElementString.canConvertToAttribute(checked_value) ?
			'checked_value="' + KoiDataElementString.convertToAttribute(checked_value) + '"' : '';
		let str_not_checked_value = KoiDataElementString.canConvertToAttribute(not_checked_value) ?
			'not_checked_value="' + KoiDataElementString.convertToAttribute(not_checked_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id +
			'" field_name="' + field_name +
			'" ' + str_field_value +
			' ' + str_checked_value +
			' ' + str_not_checked_value +
			' ' + str_debug_mode +
			' ' + str_element_class +
			' placeholder="' + placeholder +
			'"></' + tag_name + '>';
	}

	_getInterceptableOperateEventCode(){
		return 'change';
	}

	_getOperationDataFromEvent(event_detail){
		// Unfortunately, standard components do not pass 
		// the value in the event. Therefore, let's take 
		// the value from the socket.
		let value = this._getCheckedFromSocket() ? this.data.getPrimaryOption() : this.data.getSecondaryOption();
		this._native_input_data.setValue(value);
		return this._native_input_data;
	}

	_convertDataToInitialSocketSettings(data){
		return {
			initial_value: data.isPrimaryOptionSelected()
		};
	}

	_applyOperationToOwnData(operation_data){
		this.data.setFieldValue(
			this._getItemValueFromOperationData(operation_data)
		);
	}

}
