/**
 * @module KoiFormFieldCheckButtons
 * This control includes a set of KoiCheckButton controls.
 * 
 * The user can change the value of the edit field.
 * Fires the koi-form-field-change event, passing a key-value pair
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiFormFieldSwitches } from "./control_form_field_switches.js";
import { KoiFormFieldSwitchesSocket } from "./socket_form_field_switches.js";

import { KoiCheckButton } from "../buttons/control_switch.js";
if (customElements.get(KoiCheckButton.getTagName()) === undefined) {
	customElements.define(KoiCheckButton.getTagName(), KoiCheckButton);
}

export class KoiFormFieldCheckButtonsSocket extends KoiFormFieldSwitchesSocket {

	_getTemplateForInput(){
		return '<div id="' + this._inputs_holder_id + '" class="btn-group"></div>';
	}

	getTemplateForCheckbox({element_id, item_id, item_action, primary_action, secondary_action, placeholder}) {
		return KoiCheckButton.getTag({
			element_id, 
			item_id, 
			item_action, 
			primary_action, 
			secondary_action, 
			placeholder,
			element_class: 'btn-group'
		});
	}

}

export class KoiFormFieldCheckButtons extends KoiFormFieldSwitches {

	static getTagName(){
		return 'koi-form-field-check-buttons';
	}

	_constructSocket(){
		return new KoiFormFieldCheckButtonsSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}
