/**
 * @module KoiOperationEventDispatchable
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiEventDetails } from "./event_changed.js";

export const KoiOperationEventDispatchable = Sup => class extends Sup {

	getOperationEventDetails(){
		return this._operation_event_details;
	}

	_getDispatchableOperationEventCode(){
		return 'koi-operated';
	}

	_dispatchOperationEvent(){
		this._log('_dispatchOperationEvent()');
		this.dispatchEvent(this._operation_event);
	}

	_constructOperationEvent(){
		return new CustomEvent(this._getDispatchableOperationEventCode(), {
			bubbles: true,
			composed: false,
			detail: this._operation_event_details
		});
	}

	_onBeforeConnected(){
		super._onBeforeConnected();
		this._operation_event_details = (KoiEventDetails.constructEventDetails.bind(this))();
		this._operation_event = this._constructOperationEvent();
	}

}

export const KoiOperationsInterceptable = Sup => class extends Sup {

	_getOperationDataFromEvent(event_detail){
		return event_detail.data;
	}

	_getItemIdFromOperationData(operation_data){
		return operation_data.getItemId();
	}

	_getItemActionFromOperationData(operation_data){
		return operation_data.getAction();
	}

	_getItemValueFromOperationData(operation_data){
		return operation_data.getValue();
	}

	_updateStateCodeWhenOperated(event_detail){
		this._setStateCode(
			this._determineStateCode()
		);
	}

	_updateOwnDataWhenOperated(event_detail){
		
	}

	_updateSomethingWhenOperated(event_detail){
		this._updateOwnDataWhenOperated(event_detail);
		this._updateStateCodeWhenOperated(event_detail);
	}

	_dispatchEventsWhenChangedAfterOperated(){
		
	}

	_handleSomethingChangedWhenOperated(){
		this._dispatchEventsWhenChangedAfterOperated();
		this._updateAppearance();
	}

	_handleOperated(event_detail){

	}

	_onAfterOperated(event_detail){
		if(this.isSomethingChanged()){
			this._handleSomethingChangedWhenOperated();
			this._setNothingChanged();
		}
		this._handleOperated(event_detail);
	}

	_isOwnOperateEvent(event){
		return ('detail' in event) && 
			(event.detail.element_id === this.id);
	}

	_stopPropagationWhenOperated(event){
		event.stopPropagation();
	}

	_attemptApplyOperated(event){
		this._log('_attemptApplyOperated()');
		if(!event){
			return;
		}
		if(this._isOwnOperateEvent(event)){
			return;
		}
		this._stopPropagationWhenOperated(event);
		this._updateSomethingWhenOperated(event.detail);
		this._onAfterOperated(event.detail);
	}

	_getInterceptableOperateEventCode(){
		return 'koi-operated';
	}

	_subscribeToOperateEvent(){
		let interceptable_event_code = this._getInterceptableOperateEventCode();
		this._attemptApplyOperatedBinded = this._attemptApplyOperated.bind(this);
		if(Array.isArray(interceptable_event_code)){
			for(let i = 0; i < interceptable_event_code.length; i++){
				this.addEventListener(
					interceptable_event_code[i], 
					this._attemptApplyOperatedBinded
				);
			}
		}else{
			this.addEventListener(
				interceptable_event_code, 
				this._attemptApplyOperatedBinded
			);
		}
	}

	_unsubscribeFromOperateEvent(){
		let interceptable_event_code = this._getInterceptableOperateEventCode();
		if(Array.isArray(interceptable_event_code)){
			for(let i = 0; i < interceptable_event_code.length; i++){
				this.removeEventListener(
					interceptable_event_code[i], 
					this._attemptApplyOperatedBinded
				);
			}
		}else{
			this.removeEventListener(
				interceptable_event_code, 
				this._attemptApplyOperatedBinded
			);
		}
	}

	_subscribeToEvents(){
		super._subscribeToEvents();
		this._subscribeToOperateEvent();
	}

	_unsubscribeFromEvents(){
		super._unsubscribeFromEvents();
		this._unsubscribeFromOperateEvent();
	}

}
