/**
 * @module KoiBaseControl
 * Component that can be connected to a socket
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSingleSocket, KoiCompositeSocket } from "../socket.js"

import { KoiSingleConnectorInteractable } from "../connector.js";
import { KoiBaseElement } from "../element.js";

const KoiDisplayable = Sup => class extends Sup {

	show(){
		this.classList.remove("d-none");
	}

	hide(){
		this.classList.add("d-none");
	}

	_displayWaiting(){
		this._log('displayWaiting()');
	}

	_displayForbidden() {
		this._log('displayForbidden()');
	}

	_displayError() {
		this._log('displayError()');
	}

	_displayBadConnection() {
		this._log('displayBadConnection()');
	}

	_displayBadResponse() {
		this._log('displayBadResponse()');
	}

}

export class KoiBaseControl extends KoiDisplayable(KoiBaseElement) {

	_displayAbnormalState(){
		this._log('displayAbnormalState()');
		if(this._state.isLoading()){
			this._displayWaiting();
		}else if(!this._state.isAllowed()){
			this._displayForbidden();
		}else if(this._state.isError()){
			this._displayError();
		}else if(!this._state.isConnected()){
			this._displayBadConnection();
		}else{
			this._displayWaiting();
		}
	}

	_beforeDisplayNormalState(){
		this._log('beforeDisplayNormalState()');
		// This should output unchangeable data to the template (e.g. Table Headers)
	}

	_callOnceBeforeDisplayNormalState(){
		this._callOnceBeforeDisplayNormalState = function(){};
		this._beforeDisplayNormalState();
	}

	_displayNormalState(){
		this._log('displayNormalState()');
		// This should output dynamic data to the template (e.g. Table Rows)
	}

	_updateAppearance() {
		if(this.isStateAbnormal()){
			this._displayAbnormalState();
			return;
		}
		this._callOnceBeforeDisplayNormalState();
		this._displayNormalState();
	}

	_handleSomethingChanged(){
		super._handleSomethingChanged();
		this._updateAppearance();
	}

	_handleSomethingChangedWhenAfterConnected(){
		super._handleSomethingChangedWhenAfterConnected();
		this._updateAppearance();
	}

}

export const KoiSocketConnectable = Sup => class extends Sup {

	_prepareSocket(){
		this.socket.prepare();
	}

	_onBeforeConnected(){
		super._onBeforeConnected();
		this._prepareSocket();
	}

	_displaySocket(){

	}

	_beforeDisplayNormalState(){
		super._beforeDisplayNormalState();
		this._displaySocket();
	}

	_updateSocket(){

	}

	_displayNormalState(){
		super._displayNormalState();
		this._updateSocket();
	}

	_constructSocket(){
		throw new Error('Socket was not constructed for ' + this.id);
	}

	_onConstructed(){
		super._onConstructed();
		this.socket = this._constructSocket();
	}

}

export const KoiControlConnectorInteractable = Sup => class extends KoiSingleConnectorInteractable(Sup) {

	_handleSomethingChangedWhenConnectorDataChanged(){
		super._handleSomethingChangedWhenConnectorDataChanged();
		this._updateAppearance();
	}

}
