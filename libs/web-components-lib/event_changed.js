/**
 * @module KoiChangedEventDispatchable
 * Behavior that allows a provider to fire a koi-changed event. 
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

export class KoiEventDetails {

	static getLoadingDetails(element_id){
		let settings = {
			element_id: element_id,
			state: new KoiState(KoiState.getLoadingCode()),
			data: null
		};
		return new KoiEventDetails(settings);
	}

	static getBadConnectionDetails(){
		let settings = {
			element_id: null,
			state: new KoiState(KoiState.getBadConnectionCode()),
			data: null
		};
		return new KoiEventDetails(settings);
	}

	static constructEventDetails(){
		if(typeof(this.data) == 'undefined'){
			return new KoiEventDetails({
				element_id: this.id,
				state: this._state
			});
		}
		return new KoiEventDetails({
			element_id: this.id,
			state: this._state,
			data: this.data
		});
	}

	constructor({element_id, state, data}){
		this.element_id = element_id;
		this.state = state;
		this.data = data;
	}

}

export const KoiChangedEventDispatchable = Sup => class extends Sup {

	getChangedEventDetails(){
		return this._changed_event_details;
	}

	_dispatchChangedEvent(){
		this._log('_dispatchChangedEvent: ' + this._state.getCode());
		this.dispatchEvent(this._changed_event);
	}

	_dispatchChangedEventWhenChanged(){
		this._dispatchChangedEvent();
	}

	_handleSomethingChanged(){
		super._handleSomethingChanged();
		this._dispatchChangedEventWhenChanged();
	}

	_dispatchChangedEventWhenAfterConnected(){
		this._dispatchChangedEvent();
	}

	_handleSomethingChangedWhenAfterConnected(){
		super._handleSomethingChangedWhenAfterConnected();
		this._dispatchChangedEventWhenAfterConnected();
	}

	_constructChangedEvent(){
		return new CustomEvent('koi-changed', {
			bubbles: false,
			composed: false,
			detail: this._changed_event_details
		});
	}

	_onBeforeConnected() {
		super._onBeforeConnected();
		this._changed_event_details = (KoiEventDetails.constructEventDetails.bind(this))();
		this._changed_event = this._constructChangedEvent();
	}

}
