/**
 * @module KoiFormFieldStencil
 * Stencil of a base form field component
 * 
 * The component uses an internal component to display an initial value obtained 
 * from its own data. The component then passes control of the internal 
 * component's value to the user. When the internal component's value 
 * changes, the koi-form-field-change event is fired.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiBaseControl, KoiSocketConnectable } from "../control.js";
import { KoiFormFieldChangedEventDispatchable } from "./event_form_field_change.js";
import { KoiOperationsInterceptable } from "../../event_operated.js";
import { KoiOperationData } from "../../data_object_operation.js";

export class KoiFormFieldStencil extends KoiOperationsInterceptable(
	KoiFormFieldChangedEventDispatchable(
		KoiSocketConnectable(
			KoiBaseControl
		)
	)
) {

	_getInitialData(){

	}

	_displayInitialSocketState(initial_socket_state_settings) {

	}

	_convertDataToInitialSocketSettings(data){

	}

	_displaySocket() {
		super._displaySocket();
		this._displayInitialSocketState(
			this._convertDataToInitialSocketSettings(
				this._getInitialData()
			)
		);
	}

	_getErrorCodeFromData(){
		// This should get error code from data provider
	}

	_displayErrorMessage(str_error){
		
	}

	_displayError(){
		super._displayError();
		this._displayErrorMessage(
			this._getErrorCodeFromData()
		);
	}

	_removeErrorMessage(){
		
	}

	_updateSocket(){
		super._updateSocket();
		this._removeErrorMessage();
	}

	_applyOperationToOwnData(operation_data){
		
	}

	_updateOwnDataWhenOperated(event_detail){
		this._applyOperationToOwnData(
			this._getOperationDataFromEvent(event_detail)
		);
	}

	_dispatchEventsWhenChangedAfterOperated(){
		super._dispatchEventsWhenChangedAfterOperated();
		this._dispatchFormFieldChangedEvent();
	}

}

export const KoiNativeInputDataCapable = Sup => class extends Sup {

	_constructInnerNativeComponentData(){
		return new KoiOperationData();
	}

	_onConstructed(){
		super._onConstructed();
		this._native_input_data = this._constructInnerNativeComponentData();
	}

}
