/**
 * @module KoiFormFieldCheckBoxes
 * This control includes a set of KoiSwitch controls.
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

import { KoiSwitch } from "../buttons/control_switch.js";
if (customElements.get(KoiSwitch.getTagName()) === undefined) {
	customElements.define(KoiSwitch.getTagName(), KoiSwitch);
}

export class KoiFormFieldCheckBoxesSocket extends KoiFormFieldSwitchesSocket {

	getTemplateForCheckbox({element_id, item_id, item_action, primary_action, secondary_action, placeholder}) {
		return KoiSwitch.getTag({
			element_id, 
			item_id, 
			item_action, 
			primary_action, 
			secondary_action, 
			placeholder,
			debug_mode: false
		});
	}

}

export class KoiFormFieldCheckBoxes extends KoiFormFieldSwitches {

	static getTagName(){
		return 'koi-form-field-check-boxes';
	}

	_constructSocket(){
		return new KoiFormFieldCheckBoxesSocket({
			holder: this,
			placeholder: this._getPlaceholderFromAttributes()
		});
	}

}
