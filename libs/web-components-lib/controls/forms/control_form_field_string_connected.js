/**
 * @module KoiConnectedFormFieldString
 * Displays an edit field in forms
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * This edit field is initialized with connector's data and
 * reinitializes when connector's data changes.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../data_element.js"
import { KoiFormFieldString } from "./control_form_field_string.js";
import { KoiControlConnectorInteractable } from "../control.js";
import { KoiOperationDataConnectorInitializable } from "../../data_object_operation.js";

export class KoiConnectedFormFieldString extends KoiControlConnectorInteractable(
	KoiFormFieldString
) {

	static getTagName(){
		return 'koi-connected-form-field-string';
	}

	static getTag({element_id, field_name, field_value, provider_id, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_field_name = field_name ? 'field_name="' + field_name + '"' : '';
		let str_field_value = KoiDataElementString.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementString.convertToAttribute(field_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + str_field_name + 
			' ' + str_field_value + 
			' provider_id="' + provider_id + 
			'" placeholder="' + placeholder + 
			'" ' + str_debug_mode +
			' ' + str_element_class +
			'></' + tag_name + '>';
	}

	_setOwnDataInitialValueBasedOnConnectorData(connector_data){
		this.data.setFieldDefaultValue(
			connector_data.getValue()
		);
	}

	_makeBeforeDisplayNormalStateCallable(){
		this._callOnceBeforeDisplayNormalState = (function(){
			this._callOnceBeforeDisplayNormalState = function(){};
			this._beforeDisplayNormalState();
		}).bind(this);
	}

	_reinitializeComponentWhenConnectorDataChanged(event_detail){
		this._setOwnDataInitialValueBasedOnConnectorData(
			this._getConnectorDataFromEvent(event_detail)
		);
		this.data.clearFieldValue();
		this._makeBeforeDisplayNormalStateCallable();
	}

	_updateOwnDataWhenConnectorDataChanged(event_detail){
		super._updateOwnDataWhenConnectorDataChanged(event_detail);
		this._reinitializeComponentWhenConnectorDataChanged(event_detail);
	}

}

export class KoiOperationDataConnectorInitializableFormFieldString extends KoiOperationDataConnectorInitializable(
	KoiFormFieldString
) {

	static getTagName(){
		return 'koi-operation-data-connector-initializable-form-field-string';
	}

	static getTag({element_id, provider_id, field_name, field_value, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_field_name = field_name ? 'field_name="' + field_name + '"' : '';
		let str_field_value = KoiDataElementString.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementString.convertToAttribute(field_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + str_field_name + 
			' ' + str_field_value + 
			' provider_id="' + provider_id + 
			'" placeholder="' + placeholder + 
			'" ' + str_debug_mode +
			' ' + str_element_class +
			'></' + tag_name + '>';
	}

	_setOwnDataInitialValueBasedOnConnectorData(connector_data){
		this.data.setFieldDefaultValue(
			this._getValueFromConnectorData(connector_data)
		);
	}

}
