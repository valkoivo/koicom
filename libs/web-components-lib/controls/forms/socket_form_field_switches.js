/**
 * @module KoiFormFieldBaseCompositeSocket
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiCompositeSocket, KoiSocketTemplateCapable } from "../../socket.js";
import { KoiFormFieldBaseSocketConnectable } from "./socket_form_field.js";

export const KoiCompositeSocketInputEnablementToggleable = Sup => class extends Sup {

	disable(){
		for(let key in this._ids){
			this._items[key].disable();
		}
	}

	enable(){
		for(let key in this._ids){
			this._items[key].enable();
		}
	}

	setReadonly(){
		for(let key in this._ids){
			this._items[key].setReadonly();
		}
	}

	removeReadonly(){
		for(let key in this._ids){
			this._items[key].removeReadonly();
		}
	}

}

export class KoiFormFieldBaseCompositeSocket extends KoiCompositeSocketInputEnablementToggleable(
	KoiSocketTemplateCapable(
		KoiCompositeSocket
	)
) {

	_getTemplateForInput(){
		return '<div id="' + this._inputs_holder_id + '"></div>';
	}

	_getLabelTemplate(){
		let label_id = this._holder.id + '_label';
		return '<legend id="' + label_id + 
			'">' + this._placeholder + '</legend>';
	}

	_getErrorHolderTemplate(){
		return '<div id="' + this._error_holder_id + 
			'" class="invalid-feedback"></div>';
	}

	getTemplate(){
		return '<fieldset>' +
			this._getLabelTemplate() +
			this._getTemplateForInput() +
			this._getErrorHolderTemplate() +
		'</fieldset>';
	}

	displayError(str_error){
		this._error_holder.innerHTML = str_error;
		this._inputs_holder.classList.add('is-invalid');
	}

	removeError(){
		this._error_holder.innerHTML = '';
		this._inputs_holder.classList.remove('is-invalid');
	}

	_collectLinksToHolders(){
		this._error_holder = document.getElementById(this._error_holder_id);
		this._inputs_holder = document.getElementById(this._inputs_holder_id);
	}

	prepare(){
		super.prepare();
		this._collectLinksToHolders();
	}

	constructor({holder, placeholder}){
		super({holder});
		this._placeholder = placeholder;
		this._error_holder_id = this._holder.id + '_error';
		this._inputs_holder_id = this._holder.id + '_inputs_holder';
	}

}

export class KoiFormFieldSwitchesSocket extends KoiFormFieldBaseCompositeSocket {

	static getCheckedCode(){
		return 'add';
	}

	static getNotCheckedCode(){
		return 'remove';
	}

	_getCheckboxElementID(key){
		return this._holder.id + '_input_' + String(key);
	}

	getTemplateForCheckbox({element_id, item_id, item_action, primary_action, secondary_action, placeholder}) {

	}

	_convertOptionDataIntoCheckboxTemplateSettings({option_data, initial_values, key}){
		// The component value can be ['option 1', 'option 2'] or [['index 1', 'option 1'], ['index 2', 'option 2']]
		// Thus option_data can be 'option 1' or ['index 1', 'option 1']
		// The checkbox should return 'option 1' or 'index 1' in it's event
		// so that the component can determine the item to be added or removed.
		let data_item_identifier = Array.isArray(option_data) ? option_data[0] : option_data;
		let item_id = String(data_item_identifier);
		let placeholder = Array.isArray(option_data) ? option_data[1] : option_data ? option_data : 'unknown';
		let item_action = initial_values.includes(data_item_identifier) ? KoiFormFieldSwitchesSocket.getCheckedCode() : KoiFormFieldSwitchesSocket.getNotCheckedCode();
		return {
			element_id: this._getCheckboxElementID(key),
			item_id,
			item_action, 
			primary_action: KoiFormFieldSwitchesSocket.getCheckedCode(), 
			secondary_action: KoiFormFieldSwitchesSocket.getNotCheckedCode(),
			placeholder
		};
	}

	_getTemplateForAllCheckboxes(initial_values, options){
		let template = '';
		for(let key = 0; key < options.length; key++) {
			template += this.getTemplateForCheckbox(
				this._convertOptionDataIntoCheckboxTemplateSettings({
					option_data: options[key],
					initial_values,
					key
				})
			);
		}
		return template;
	}

	_addAndPrepareSocketForCheckboxes(options){
		for(let key = 0; key < options.length; key++) {
			this._addAndPrepare({
				key, 
				element_id: this._getCheckboxElementID(key)
			});
		}
	}

	_displayOptionsTemplate(template){
		this._inputs_holder.innerHTML = template;
	}

	displayOptions({initial_value, options}){
		this._displayOptionsTemplate(
			this._getTemplateForAllCheckboxes(initial_value, options)
		);
		this._addAndPrepareSocketForCheckboxes(options);
	}

	displayInitialValue(initial_socket_state_settings){
		// Already done in displayOptions
	}

	displayInitialState(initial_socket_state_settings){
		this.displayOptions(initial_socket_state_settings);
		this.displayInitialValue(initial_socket_state_settings);
	}

}

export const KoiFormFieldSwitchesSocketConnectable = Sup => class extends KoiFormFieldBaseSocketConnectable(Sup) {

	_displayInitialSocketState(initial_socket_state_settings) {
		this.socket.displayInitialState(initial_socket_state_settings);
	}

	_constructSocket(){
		return new KoiFormFieldSwitchesSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}
