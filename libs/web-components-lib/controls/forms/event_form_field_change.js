/**
 * @module KoiFormFieldChangedEventDispatchable
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiEventDetails } from "../../event_changed.js";

export const KoiFormFieldChangedEventDispatchable = Sup => class extends Sup {

	_getDispatchableChangeEventCode(){
		return 'koi-form-field-change';
	}

	_dispatchFormFieldChangedEvent(){
		this._log('_dispatchFormFieldChangedEvent()');
		this.dispatchEvent(this._form_field_changed_event);
	}

	_constructFormFieldChangedEvent(){
		return new CustomEvent(this._getDispatchableChangeEventCode(), {
			bubbles: true,
			cancelable: true,
			composed: false,
			detail: this._form_field_changed_event_details
		});
	}

	_onBeforeConnected(){
		super._onBeforeConnected();
		this._form_field_changed_event_details = (KoiEventDetails.constructEventDetails.bind(this))();
		this._form_field_changed_event = this._constructFormFieldChangedEvent();
	}

}

export const KoiFormFieldChangesInterceptable = Sup => class extends Sup {

	_getFormFieldNameFromEvent(event_detail){
		return event_detail.data.getFieldName();
	}

	_getFormFieldValueFromEvent(event_detail){
		return event_detail.data.getFieldValue();
	}

	_updateStateCodeWhenSocketChanged(event_detail){
		this._setStateCode(
			this._determineStateCode()
		);
	}

	_updateOwnDataWhenSocketChanged(event_detail){
		
	}

	_updateSomethingWhenSocketChanged(event_detail){
		this._updateOwnDataWhenSocketChanged(event_detail);
		this._updateStateCodeWhenSocketChanged(event_detail);
	}

	_dispatchEventsWhenChangedAfterSocketChanged(){

	}

	_handleSomethingChangedWhenSocketChanged(){
		this._dispatchEventsWhenChangedAfterSocketChanged();
		this._updateAppearance();
	}

	_handleSocketChanged(event_detail){

	}

	_onAfterSocketChanged(event_detail){
		if(this.isSomethingChanged()){
			this._handleSomethingChangedWhenSocketChanged();
			this._setNothingChanged();
		}
		this._handleSocketChanged(event_detail);
	}

	_getInterceptableChangeEventCode(){
		return 'koi-form-field-change';
	}

	_isOwnChangeEvent(event){
		return (event.type == this._getInterceptableChangeEventCode()) && 
			event.hasOwnProperty('detail') && 
			(event.detail.element_id === this.id);
	}

	_attemptApplySocketChange(event){
		this._log('attemptApplySocketChange()');
		if(!event){
			return;
		}
		if(this._isOwnChangeEvent(event)){
			return;
		}
		event.stopPropagation();
		this._updateSomethingWhenSocketChanged(event.detail);
		this._onAfterSocketChanged(event.detail);
	}

	_subscribeToChangeEvent(){
		this._attemptApplySocketChangeBinded = this._attemptApplySocketChange.bind(this);
		this.addEventListener(this._getInterceptableChangeEventCode(), this._attemptApplySocketChangeBinded);
	}

	_unsubscribeFromChangeEvent(){
		this.removeEventListener(this._getInterceptableChangeEventCode(), this._attemptApplySocketChangeBinded);
	}

	_subscribeToEvents(){
		super._subscribeToEvents();
		this._subscribeToChangeEvent();
	}

	_unsubscribeFromEvents(){
		super._unsubscribeFromEvents();
		this._unsubscribeFromChangeEvent();
	}

}
