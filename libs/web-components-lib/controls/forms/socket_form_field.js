/**
 * @module KoiFormFieldBaseSocket
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../socket.js";

export const KoiSocketInputEnablementToggleable = Sup => class extends Sup {

	disable(){
		this._item.setAttribute('disabled', 'disabled');
	}

	enable(){
		this._item.removeAttribute('disabled');
	}

	setReadonly(){
		this._item.setAttribute('readonly', 'readonly');
	}

	removeReadonly(){
		this._item.removeAttribute('readonly');
	}

}

export class KoiFormFieldBaseSocket extends KoiSocketInputEnablementToggleable(
	KoiSocketTemplateCapable(
		KoiSingleSocket
	)
) {

	_getTemplateForInput(){
		// Method should return something like this:
		// return '<input id="' + this.getID() + 
		//		'" value="" placeholder="' + this._placeholder + 
		//		'" class="form-control" type="text">';
	}

	_getLabelTemplate(){
		let label_id = this._holder.id + '_label';
		return '<label id="' + label_id + 
			'" for="' + this.getID() + 
			'" class="form-label">' + this._placeholder + '</label>';
	}

	_getErrorHolderTemplate(){
		return '<div id="' + this._error_holder_id + 
			'" class="invalid-feedback"></div>';
	}

	getTemplate(){
		return '<div class="form-floating">' +
			this._getTemplateForInput() +
			this._getLabelTemplate() +
			this._getErrorHolderTemplate() +
		'</div>';
	}

	displayError(str_error){
		this._error_holder.innerHTML = str_error;
		this._item.classList.add('is-invalid');
	}

	removeError(){
		this._item.classList.remove('is-invalid');
	}

	_collectLinksToHolders(){
		this._error_holder = document.getElementById(this._error_holder_id);
	}

	prepare(){
		super.prepare();
		this._collectLinksToHolders();
	}

	constructor({holder, id, placeholder}){
		super({holder, id});
		this._placeholder = placeholder;
		this._error_holder_id = this._holder.id + '_error';
	}

}

export const KoiSocketInputEnablementToggleableSocketConnectable = Sup => class extends Sup {

	setReadonly(){
		this.socket.setReadonly();
	}

	removeReadonly(){
		this.socket.removeReadonly();
	}

	disable() {
		this.socket.disable();
	}

	enable() {
		this.socket.enable();
	}

}

export const KoiFormFieldBaseSocketConnectable = Sup => class extends KoiSocketInputEnablementToggleableSocketConnectable(Sup) {

	_displayErrorMessage(str_error){
		this.socket.displayError(str_error);
	}

	_removeErrorMessage(){
		this.socket.removeError();
	}

	_getPlaceholderFromAttributes(){
		if(!this.hasAttribute('placeholder')){
			return '';
		}
		return this.getAttribute('placeholder');
	}

}

export class KoiFormFieldNativeInputSocket extends KoiFormFieldBaseSocket {

	displayOptions(initial_socket_state_settings){
		
	}

	displayInitialValue({initial_value, options}){
		this._item.value = initial_value;
	}

	displayInitialState(initial_socket_state_settings){
		this.displayOptions(initial_socket_state_settings);
		this.displayInitialValue(initial_socket_state_settings);
	}

	getValue(){
		let value = this._item.value;
		if((value === '') || (value === null)){
			return false;
		}
		return value;
	}

	displayValue(new_value, options){
		this._item.value = new_value;
	}

}

export const KoiFormFieldNativeInputSocketConnectable = Sup => class extends KoiFormFieldBaseSocketConnectable(Sup) {

	_displayInitialSocketState(initial_socket_state_settings) {
		this.socket.displayInitialState(initial_socket_state_settings);
	}

	_getInputValueFromSocket(){
		return this.socket.getValue();
	}

	_constructSocket(){
		return new KoiFormFieldNativeInputSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}

export class KoiFormFieldMinMaxableNativeInputSocket extends KoiFormFieldNativeInputSocket {

	setInitialMinMaxForInput({min_value, max_value}){
		if(min_value !== null){
			this._item.min = min_value;
		}
		if(max_value !== null){
			this._item.max = max_value;
		}
	}

}

export const KoiFormFieldMinMaxableNativeInputSocketConnectable = Sup => class extends KoiFormFieldNativeInputSocketConnectable(Sup) {

	_setInitialInputMinMax(initial_socket_state_settings){
		this.socket.setInitialMinMaxForInput(initial_socket_state_settings);
	}

	_displayInitialSocketState(initial_socket_state_settings){
		super._displayInitialSocketState(initial_socket_state_settings);
		this._setInitialInputMinMax(initial_socket_state_settings);
	}

}

export class KoiFormFieldNativeSwitchSocket extends KoiFormFieldBaseSocket {

	_getTemplateForInput(){
		return '<input id="' + this.getID() +
			'" class="form-check-input" type="checkbox">';
	}

	_getLabelTemplate(){
		let label_id = this._holder.id + '_label';
		return '<label id="' + label_id +
			'" for="' + this.getID() +
			'" class="form-check-label">' + this._placeholder + '</label>';
	}

	getTemplate() {
		return '<div class="form-floating">'+
			'<div class="form-check">' +
				this._getTemplateForInput() +
				this._getLabelTemplate() +
				this._getErrorHolderTemplate() +
			'</div>' +
		'</div>';
	}

	displayOptions(initial_socket_state_settings){
		
	}

	displayInitialChecked({initial_value}){
		this._item.checked = initial_value;
	}

	displayInitialState(initial_socket_state_settings){
		this.displayOptions(initial_socket_state_settings);
		this.displayInitialChecked(initial_socket_state_settings);
	}

	getChecked(){
		return this._item.checked;
	}

}

export const KoiFormFieldNativeSwitchSocketConnectable = Sup => class extends KoiFormFieldBaseSocketConnectable(Sup) {

	_displayInitialSocketState(initial_socket_state_settings) {
		this.socket.displayInitialState(initial_socket_state_settings);
	}

	_getCheckedFromSocket(){
		return this.socket.getChecked();
	}

	_constructSocket(){
		return new KoiFormFieldNativeSwitchSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}
