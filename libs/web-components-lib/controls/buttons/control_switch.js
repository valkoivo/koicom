/**
 * @module KoiSwitch
 * The KoiSwitch component is a toggle button that sends different 
 * commands in the event depending on its internal state.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../data_element.js"
import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../socket.js";
import { KoiSocketInputEnablementToggleable, KoiSocketInputEnablementToggleableSocketConnectable } from "../forms/socket_form_field.js";
import { KoiButtonStencil } from "./control_button_stencil.js";
import { KoiSwitchDataCapable } from "./data_object_button.js";

export class KoiSwitchStencil extends KoiButtonStencil {

	_isOwnDataInitialActionPrimary() {
		
	}

	_displayInitialSocketState(checked) {

	}

	_displaySocket() {
		super._displaySocket();
		this._displayInitialSocketState(
			this._isOwnDataInitialActionPrimary()
		);
	}

	_selectOwnDataAction(primary){

	}

	_isPrimaryActionRequestedInEvent(event_detail){

	}

	_updateOwnDataWhenOperated(event_detail){
		this._selectOwnDataAction(
			this._isPrimaryActionRequestedInEvent(event_detail)
		);
	}

}

export class KoiBaseSwitch extends KoiSwitchDataCapable(
	KoiSwitchStencil
) {

	static getTag({element_id, item_id, item_action, primary_action, secondary_action, placeholder, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_initial_value = KoiDataElementString.canConvertToAttribute(item_action) ? 
			'item_action="' + KoiDataElementString.convertToAttribute(item_action) + '"' : '';
		let str_primary_action = KoiDataElementString.canConvertToAttribute(primary_action) ? 
			'primary_action="' + KoiDataElementString.convertToAttribute(primary_action) + '"' : '';
		let str_secondary_action = KoiDataElementString.canConvertToAttribute(secondary_action) ? 
			'secondary_action="' + KoiDataElementString.convertToAttribute(secondary_action) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" item_id="' + item_id + 
			'" ' + str_initial_value + 
			' ' + str_primary_action + 
			' ' + str_secondary_action + 
			' ' + str_debug_mode + 
			' ' + str_element_class + 
			' placeholder="' + placeholder + 
			'"></' + tag_name + '>';
	}

	_isOwnDataInitialActionPrimary() {
		return this._isOwnDataActionPrimary();
	}

	_selectOwnDataAction(primary){
		if(primary){
			this._selectPrimaryAction();
		}else{
			this._selectSecondaryAction();
		}
	}

}

export class KoiSwitchNativeBaseSocket extends KoiSocketInputEnablementToggleable(
	KoiSocketTemplateCapable(
		KoiSingleSocket
	)
) {

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
			'</div>' +
		'</div>';
	}

	getChecked(){
		return this._item.checked;
	}

	setChecked(checked){
		this._item.checked = checked;
	}

	constructor({holder, id, placeholder}){
		super({holder, id});
		this._placeholder = placeholder;
	}

}

export const KoiSwitchNativeBaseSocketConnectable = Sup => class extends KoiSocketInputEnablementToggleableSocketConnectable(Sup) {

	_displayInitialSocketState(checked) {
		return this.socket.setChecked(checked);
	}

	_getPlaceholderFromAttributes(){
		if(!this.hasAttribute('placeholder')){
			return '';
		}
		return this.getAttribute('placeholder');
	}

}

export class KoiSwitchNativeCheckboxSocket extends KoiSwitchNativeBaseSocket {

}

export const KoiSwitchNativeCheckboxSocketConnectable = Sup => class extends KoiSwitchNativeBaseSocketConnectable(Sup) {

	_constructSocket(){
		return new KoiSwitchNativeCheckboxSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}

export class KoiSwitch extends KoiSwitchNativeCheckboxSocketConnectable(
	KoiBaseSwitch
) {

	static getTagName(){
		return 'koi-switch';
	}

	_getInterceptableOperateEventCode(){
		return 'change';
	}

	_isPrimaryActionRequestedInEvent(event_detail) {
		// Unfortunately, standard components do not pass 
		// values in the event. Therefore, let's take 
		// the action value from the socket.
		return this.socket.getChecked();
	}

}

export class KoiSwitchNativeButtonSocket extends KoiSwitchNativeBaseSocket {

	_getTemplateForInput(){
		return '<input id="' + this.getID() + 
			'" class="btn-check" type="checkbox" autocomplete="off">';
	}

	_getLabelTemplate(){
		let label_id = this.getID() + '_label';
		return '<label id="' + label_id + 
			'" for="' + this.getID() + 
			'" class="btn btn-outline-primary">' + this._placeholder + '</label>';
	}

	getTemplate() {
		return this._getTemplateForInput() +
			this._getLabelTemplate();
	}

}

export const KoiSwitchNativeButtonSocketConnectable = Sup => class extends KoiSwitchNativeBaseSocketConnectable(Sup) {

	_constructSocket(){
		return new KoiSwitchNativeButtonSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}

export class KoiCheckButton extends KoiSwitchNativeButtonSocketConnectable(
	KoiBaseSwitch
) {

	static getTagName(){
		return 'koi-check-button';
	}

	_getInterceptableOperateEventCode(){
		return 'change';
	}

	_isPrimaryActionRequestedInEvent(event_detail) {
		// Unfortunately, standard components do not pass 
		// values in the event. Therefore, let's take 
		// the action value from the socket.
		return this.socket.getChecked();
	}

}
