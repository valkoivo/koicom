/**
 * @module KoiFormFieldSingleChoice
 * Displays the select input in forms
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../data_element.js"
import { KoiFormFieldStencil, KoiNativeInputDataCapable } from "./control_form_field_stencil.js";
import { KoiFormFieldSingleChoiceDataCapable, KoiDataElementOptionableString } from "./data_object_form_field_options.js";
import { KoiFormFieldNativeSelectSocketConnectable } from "./socket_form_field_single_choice.js";

export class KoiFormFieldSingleChoice extends KoiFormFieldNativeSelectSocketConnectable(
	KoiFormFieldSingleChoiceDataCapable(
		KoiNativeInputDataCapable(
			KoiFormFieldStencil
		)
	)
) {

	static getTagName(){
		return 'koi-form-field-single-choice';
	}

	static getTag({element_id, field_name, field_value, options, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_options = KoiDataElementOptionableString.canConvertOptionsToAttribute(options)? 
			' options="' + KoiDataElementOptionableString.convertOptionsToAttribute(options) + '" ' : '';
		let str_field_value = KoiDataElementString.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementString.convertToAttribute(field_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id +
			'" field_name="' + field_name + 
			'" ' + str_field_value +
			' ' + str_options + 
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
		this._native_input_data.setValue(
			this._getInputValueFromSocket()
		);
		return this._native_input_data;
	}

	_convertDataToInitialSocketSettings(data){
		return {
			initial_value: data.getFieldValue(),
			options: data.getOptions()
		};
	}

	_applyOperationToOwnData(operation_data){
		this.data.setFieldValue(
			this._getItemValueFromOperationData(operation_data)
		);
	}

}
