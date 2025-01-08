/**
 * @module KoiFormFieldInteger
 * Displays an edit field in forms
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementNumeric } from "../../data_element.js"
import { KoiFormFieldMinMaxableNativeInputSocket, KoiFormFieldMinMaxableNativeInputSocketConnectable } from "./socket_form_field.js";
import { KoiFormFieldStencil, KoiNativeInputDataCapable } from "./control_form_field_stencil.js";
import { KoiFormFieldMinMaxableDataCapable, KoiFormFieldIntegerData,
	KoiFormFieldFloatData } from "./data_object_form_field_numeric.js";
import { KoiNativeNumericSocketWheelAndKeyEventsSubscribeable,
	KoiNumericInputWheelAndKeyEventsInterceptable } from "./event_form_field_numeric_wheel.js";

class KoiFormFieldNumericNativeInputSocket extends KoiNativeNumericSocketWheelAndKeyEventsSubscribeable(
	KoiFormFieldMinMaxableNativeInputSocket
) {

	_getTemplateForInput(){
		return '<input id="' + this.getID() + 
				'" value="" placeholder="' + this._placeholder + 
				'" class="form-control" type="number" step="' + this._step + '">';
	}

	constructor({holder, id, placeholder, step}){
		super({holder, id, placeholder});
		this._step = step;
	}

}

export const KoiFormFieldNumericNativeInputSocketConnectable = Sup => class extends KoiFormFieldMinMaxableNativeInputSocketConnectable(Sup) {

	_getDefaultStep(){

	}

	_convertAttributeIntoStep(attribute_value){

	}

	_prepareStepFromAttributes(){
		if(!this.hasAttribute('step')){
			return this._getDefaultStep();
		}
		return this._convertAttributeIntoStep(
			this.getAttribute('step')
		);
	}

	_constructSocket(){
		return new KoiFormFieldNumericNativeInputSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes(),
			step: this._prepareStepFromAttributes()
		});
	}

}

export class KoiNativeNumericInput extends KoiFormFieldNumericNativeInputSocketConnectable(
	KoiFormFieldMinMaxableDataCapable(
		KoiNumericInputWheelAndKeyEventsInterceptable(
			KoiNativeInputDataCapable(
				KoiFormFieldStencil
			)
		)
	)
) {

	static getTag({element_id, field_name, field_value, min_value, max_value, placeholder, step, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_field_value = KoiDataElementNumeric.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementNumeric.convertToAttribute(field_value) + '"' : '';
		let str_min_value = KoiDataElementNumeric.canConvertToAttribute(min_value) ? 
			'min_value="' + KoiDataElementNumeric.convertToAttribute(min_value) + '"' : '';
		let str_max_value = KoiDataElementNumeric.canConvertToAttribute(max_value) ? 
			'max_value="' + KoiDataElementNumeric.convertToAttribute(max_value) + '"' : '';
		let str_step = ((step !== undefined) && step) ? ' step="' + step + '" ' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" field_name="' + field_name + 
			'" ' + str_field_value + 
			' ' + str_min_value + 
			' ' + str_max_value + 
			' ' + str_step + 
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
			initial_value: KoiDataElementNumeric.convertToAttribute(
				data.getFieldValue()
			),
			min_value: KoiDataElementNumeric.convertToAttribute(
				data.getMin()
			),
			max_value: KoiDataElementNumeric.convertToAttribute(
				data.getMax()
			)
		};
	}

	_applyOperationToOwnData(operation_data){
		this.data.setFieldValue(
			this._getItemValueFromOperationData(operation_data)
		);
	}

	_changeInputValueWhenKeydownPressed(new_value){
		this.data.setFieldValue(new_value);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
		this.socket.displayValue(new_value);
	}

	_increaseInputValueWhenKeydownPressed(old_value){
		this._changeInputValueWhenKeydownPressed(old_value + 10);
	}

	_decreaseInputValueWhenKeydownPressed(old_value){
		this._changeInputValueWhenKeydownPressed(old_value - 10);
	}

}

export class KoiFormFieldInteger extends KoiNativeNumericInput {

	static getTagName(){
		return 'koi-form-field-integer';
	}

	getPatternForKeysAllowedToPress(){
		return /^[0-9-]$/i;
	}

	_getDefaultStep(){
		return 1;
	}

	_convertAttributeIntoStep(attribute_value){
		return parseInt(attribute_value);
	}

	_constructData(){
		return new KoiFormFieldIntegerData();
	}

}

export class KoiFormFieldFloat extends KoiNativeNumericInput {

	static getTagName(){
		return 'koi-form-field-float';
	}

	getPatternForKeysAllowedToPress(){
		return /^[0-9-.]$/i;
	}

	_getDefaultStep(){
		return 0.1;
	}

	_convertAttributeIntoStep(attribute_value){
		return parseFloat(attribute_value);
	}

	_constructData(){
		return new KoiFormFieldFloatData();
	}

}
