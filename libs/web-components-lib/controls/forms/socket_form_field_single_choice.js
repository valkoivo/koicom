/**
 * @module KoiFormFieldNativeSelectSocket
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiFormFieldNativeInputSocket, KoiFormFieldNativeInputSocketConnectable } from "./socket_form_field.js";

export class KoiFormFieldNativeSelectSocket extends KoiFormFieldNativeInputSocket {

	_getTemplateForInput(){
		return '<select id="' + this.getID() + 
				'" placeholder="' + this._placeholder + 
				'" class="form-select"></select>';
	}

	_getTemplateForOption({option_value, option_title, enabled, selected}){
		let str_enabled = enabled ? '' : ' disabled ';
		let str_selected = selected ? ' selected="selected" ' : '';
		return '<option ' + str_enabled + 
			' value="' + option_value + 
			'" ' + str_selected + 
			'>' + 
			option_title + 
		'</option>';
	}

	_convertOptionDataIntoOptionTemplateSettings({initial_value, option_data}){
		let option_value = Array.isArray(option_data) ? option_data[0] : option_data;
		let option_title = Array.isArray(option_data) ? option_data[1] : option_data;
		return {
			option_value, 
			option_title, 
			enabled: true, 
			selected: (initial_value == option_value)
		};
	}

	_getTemplateForAllOptions({initial_value, options}){
		let template = '';
		template += this._getTemplateForOption({
			option_value: '', 
			option_title: ' -- select an option -- ', 
			enabled: false, 
			selected: (initial_value === null)
		});
		for(let option_index = 0; option_index < options.length; option_index++) {
			template += this._getTemplateForOption(
				this._convertOptionDataIntoOptionTemplateSettings({
					initial_value,
					option_data: options[option_index]
				})
			);
		}
		return template;
	}

	_displayOptionsTemplate(template){
		this._setInnerHTML(template);
	}

	displayOptions(initial_socket_state_settings){
		this._displayOptionsTemplate(
			this._getTemplateForAllOptions(initial_socket_state_settings)
		);
	}

	disableOptions(options_to_disable){
		this._item.querySelectorAll('option').forEach(opt => {
			for(let i=0; i<options_to_disable.length; i++){
				if (options_to_disable[i].toString() == opt.value) {
					opt.disabled = true;
				}
			}
		});
	}

	enableOptions(options_to_enable){
		this._item.querySelectorAll('option').forEach(opt => {
			for(let i=0; i<options_to_enable.length; i++){
				if (options_to_enable[i].toString() == opt.value) {
					opt.disabled = false;
				}
			}
		});
	}

	showOptions(options_to_show){
		this._item.querySelectorAll('option').forEach(opt => {
			if(options_to_show.includes(opt.value)){
				opt.classList.remove('d-none');
			}else{
				opt.classList.add('d-none');
			}
		});
	}

	getFirstVisibleOptionValue(){
		return this._item.querySelector('option:not(.d-none)').value;
	}

}

export const KoiFormFieldNativeSelectSocketConnectable = Sup => class extends KoiFormFieldNativeInputSocketConnectable(Sup) {

	disableOptions(options_to_disable){
		this.socket.disableOptions(options_to_disable);
	}

	enableOptions(options_to_enable){
		this.socket.enableOptions(options_to_enable);
	}

	_constructSocket(){
		return new KoiFormFieldNativeSelectSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}
