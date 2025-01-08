/**
 * @module KoiSingleConnector
 * Prototype of an array of links to data providers.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiEventDetails }  from './event_changed.js';
import { KoiState }  from './state.js';
import { KoiSingleSocket, KoiCompositeSocket }  from './socket.js';

export class KoiSingleConnector extends KoiSingleSocket {

	getStateCode(){
		if (!this.isLinked()) {
			return KoiState.getLoadingCode();
		}
		return this._item.getStateCode();
	}

	_getEventDetails(){
		if(!this.canProvideData()){
			return undefined;
		}
		return this._item.getChangedEventDetails();
	}

	getEventDetails(){
		return this._getEventDetails();
	}

	canProvideData(){
		return this.isLinked() && this._item.isReady();
	}

	isSomethingChanged(){
		return this._item.isSomethingChanged();
	}

	subscribe(callback){
		this._item.addEventListener('koi-changed', callback);
	}

	unsubscribe(callback){
		this._item.removeEventListener('koi-changed', callback);
	}

	addEventListener(event_name, callback){
		this._item.addEventListener(event_name, callback);
	}

	removeEventListener(event_name, callback){
		this._item.removeEventListener(event_name, callback);
	}

}

export class KoiCompositeConnector extends KoiCompositeSocket {

	getStateCode(){
		if (!this.isLinked()) {
			return KoiState.getLoadingCode();
		}
		let worst_code = KoiState.getReadyCode();
		for(let key in this._ids){
			worst_code = KoiState.getWorstCode(
				worst_code,
				this._items[key].getStateCode()
			);
		}
		return worst_code;
	}

	_getEventDetails(){
		if(!this.isLinked()){
			return KoiEventDetails.getLoadingDetails(this._id);
		}
		if(!this._composite_event_details){
			this._constructEventAndDetails();
		}
		return this._composite_event_details;
	}

	getEventDetails(){
		return this._getEventDetails();
	}

	isSomethingChanged(){
		for(let key in this._ids){
			if(this._items[key].isSomethingChanged()){
				return true;
			}
		}
		return false;
	}

	callback(event){
		if(!this.isLinked()){
			return;
		}
		if(!this._composite_event_details){
			this._constructEventAndDetails();
		}
		this._element_callback(this._composite_event);
	}

	subscribe(element_callback){
		this._element_callback = element_callback;
		this._callbackBinded = this.callback.bind(this);
		for(let key in this._ids){
			this._items[key].addEventListener('koi-changed', this._callbackBinded);
		}
	}

	unsubscribe(element_callback){
		for(let key in this._ids){
			this._items[key].removeEventListener('koi-changed', this._callbackBinded);
		}
		this._element_callback = null;
	}

	_constructCompositeEventDetails(){
		let event_details = {};
		for(let key in this._ids){
			event_details[key] = this._items[key].getChangedEventDetails();
		}
		return event_details;
	}

	_constructChangedEvent(){
		return new CustomEvent('koi-changed', {
			bubbles: false,
			composed: false,
			detail: this._composite_event_details
		});
	}

	_constructEventAndDetails(){
		this._composite_event_details = this._constructCompositeEventDetails();
		this._composite_event = this._constructChangedEvent();
	}

	constructor({holder}){
		super({holder});
		this._composite_event_details = null;
		this._composite_event = null;
	}

}

export const KoiConnectorInitializable = Sup => class extends Sup {

	_determineStateCode(){
		return KoiState.getWorstCode(
			super._determineStateCode(), 
			this._connector.getStateCode()
		);
	}

	_getConnectorEventDetail(){
		return this._connector.getEventDetails();
	}

	_setOwnDataInitialValueBasedOnConnectorData(connector_data){

	}

	_getConnectorDataFromEvent(event_detail){
		return event_detail.data;
	}

	_setOwnDataInitialValueBasedOnConnectorEvent(event_detail){
		if(!event_detail){
			return;
		}
		this._setOwnDataInitialValueBasedOnConnectorData(
			this._getConnectorDataFromEvent(event_detail)
		);
	}

	_updateOwnDataWhenConnected(){
		super._updateOwnDataWhenConnected();
		this._setOwnDataInitialValueBasedOnConnectorEvent(
			this._getConnectorEventDetail()
		);
	}

	_constructConnector(){
		// This should return a connector object
	}

	_prepareConnector(){
		this._connector.prepare();
	}

	_onConstructed(){
		super._onConstructed();
		this._connector = this._constructConnector();
		this._prepareConnector();
	}

}

export const KoiSingleConnectorInitializable = Sup => class extends KoiConnectorInitializable(Sup) {

	_getProviderId(){
		return this.getAttribute('provider_id');
	}

	_constructConnector(){
		return new KoiSingleConnector({
			holder: this, 
			id: this._getProviderId()
		});
	}

}

export const KoiConnectorInteractable = Sup => class extends KoiConnectorInitializable(Sup) {

	_updateStateCodeWhenConnectorDataChanged(event_detail){
		this._setStateCode(
			this._determineStateCode()
		);
	}

	_updateOwnDataWhenConnectorDataChanged(event_detail){

	}

	_updateSomethingWhenConnectorDataChanged(event_detail){
		this._updateOwnDataWhenConnectorDataChanged(event_detail);
		this._updateStateCodeWhenConnectorDataChanged(event_detail);
	}

	_dispatchChangedEventWhenConnectorDataChanged(){
		
	}

	_handleSomethingChangedWhenConnectorDataChanged(){
		this._dispatchChangedEventWhenConnectorDataChanged();
	}

	_onAfterConnectorDataChanged(event_detail){
		if(this.isSomethingChanged()){
			this._handleSomethingChangedWhenConnectorDataChanged();
			this._setNothingChanged();
		}
	}

	_attemptApplyConnectorDataChanged(event){
		this._log('attemptApplyConnectorDataChanged()');
		this._updateSomethingWhenConnectorDataChanged(event.detail);
		this._onAfterConnectorDataChanged(event.detail);
	}

	_subscribeToEvents(){
		super._subscribeToEvents();
		this._attemptApplyConnectorDataChangedBinded = this._attemptApplyConnectorDataChanged.bind(this);
		this._connector.subscribe(this._attemptApplyConnectorDataChangedBinded);
	}

	_unsubscribeFromEvents(){
		super._unsubscribeFromEvents();
		this._connector.unsubscribe(this._attemptApplyConnectorDataChangedBinded);
	}

}

export const KoiSingleConnectorInteractable = Sup => class extends KoiConnectorInteractable(Sup) {

	_getProviderId(){
		return this.getAttribute('provider_id');
	}

	_constructConnector(){
		return new KoiSingleConnector({
			holder: this, 
			id: this._getProviderId()
		});
	}

}

export const KoiCompositeConnectorInteractable = Sup => class extends KoiConnectorInteractable(Sup) {

	_constructConnector(){
		return new KoiCompositeConnector({
			holder: this
		});
	}

}
