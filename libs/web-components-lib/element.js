/**
 * @module KoiElement
 * Prototype of a universal web component
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiState, KoiStateCapable }  from './state.js';
import { KoiData }  from './data.js';

class KoiElementStencil extends HTMLElement {

	isSomethingChanged(){
		
	}

	_setNothingChanged(){

	}

	_updateOwnDataWhenConnected(){

	}

	_updateStateCodeWhenConnected(){

	}

	_updateSomethingWhenConnected(){
		this._updateOwnDataWhenConnected();
		this._updateStateCodeWhenConnected();
	}

	_handleSomethingChangedWhenAfterConnected(){

	}

	_handleSomethingChanged(){

	}

	_onAfterChanged(){
		if(this.isSomethingChanged()){
			this._handleSomethingChanged();
			this._setNothingChanged();
		}
	}

	_subscribeToEvents(){
		// This should call addEventListener for every event the component has to be subscribed on
	}

	_unsubscribeFromEvents(){
		// This should call removeEventListener for every event the component had been subscribed on
	}

	_onConstructed(){
		
	}

	_onBeforeConnected(){
		
	}

	_onConnected(){
		this._updateSomethingWhenConnected();
	}

	_onAfterConnected(){
		if(this.isSomethingChanged()){
			this._handleSomethingChangedWhenAfterConnected();
			this._setNothingChanged();
		}
		this._subscribeToEvents();
	}

	_onDisconnected(){
		this._unsubscribeFromEvents();
	}

	constructor() {
		super();
		this._onConstructed();
	}

	connectedCallback() {
		this._onBeforeConnected();
		this._onConnected();
		this._onAfterConnected();
	}

	disconnectedCallback(){
		this._onDisconnected();
	}

}

export const KoiDebuggable = Sup => class extends Sup {

	_getLogColor(){
		return '#2274A5';
	}

	_log(str){
		if(!this._debug_mode){
			return;
		}
		console.log('%c ' + this.id + ' ', 'color: white; background-color: ' + this._getLogColor(), str);
	}

	_prepareDebugModeFromAttributes(){
		this._debug_mode = (this.getAttribute('debug_mode') === 'true');
	}

	_onConstructed(){
		super._onConstructed();
		this._prepareDebugModeFromAttributes();
	}

}

export class KoiBaseElement extends KoiStateCapable(
	KoiDebuggable(
		KoiElementStencil
	)
) {

	static getTag({element_id, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + 
			' id="' + element_id + 
			'" ' + str_debug_mode + 
			' ' + str_element_class + 
			'></' + tag_name + '>';
	}

	_determineStateCode(){
		return KoiState.getReadyCode();
	}

}
