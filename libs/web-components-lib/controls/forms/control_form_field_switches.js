/**
 * @module KoiFormFieldSwitches
 * This control includes a set of switches.
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiFormFieldStencil } from "./control_form_field_stencil.js";
import { KoiDataElementCategoricalList, KoiFormFieldOptionsDataCapable } from "./data_object_form_field_options.js";
import { KoiFormFieldSwitchesSocketConnectable } from "./socket_form_field_switches.js";

export class KoiFormFieldSwitches extends KoiFormFieldSwitchesSocketConnectable(
	KoiFormFieldOptionsDataCapable(
		KoiFormFieldStencil
	)
) {

	static getTag({element_id, field_name, field_value, options, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_options = KoiDataElementCategoricalList.canConvertOptionsToAttribute(options)? 
			' options="' + KoiDataElementCategoricalList.convertOptionsToAttribute(options) + '" ' : '';
		let str_field_value = KoiDataElementCategoricalList.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementCategoricalList.convertToAttribute(field_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + 
			' id="' + element_id + 
			'" field_name="' + field_name + 
			'" ' + str_field_value +
			' ' + str_options + 
			' ' + str_debug_mode + 
			' ' + str_element_class + 
			' placeholder="' + placeholder + 
			'"></' + tag_name + '>';
	}

	_convertDataToInitialSocketSettings(data){
		return {
			initial_value: data.getFieldValue(),
			options: data.getOptions()
		};
	}

	_applyOperationToOwnData(operation_data){
		if(operation_data.isActionPrimary()){
			this.data.addOptionToValue(
				operation_data.getItemId()
			);
		}else{
			this.data.removeOptionFromValue(
				operation_data.getItemId()
			);
		}
	}

}
