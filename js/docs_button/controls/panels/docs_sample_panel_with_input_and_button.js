/**
 * @module DocsSamplePanelWithInputAndButton
 * A simple panel to give an example in the documentation.
 * This button watches after the state of a string input
 * and updates its own state based on the input's data.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";

import { KoiFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string.js";
if (customElements.get(KoiFormFieldString.getTagName()) === undefined) {
	customElements.define(KoiFormFieldString.getTagName(), KoiFormFieldString);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsSamplePanelWithInputAndButtonSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body d-grid gap-3">' +
						KoiFormFieldString.getTag({
							element_id: this._holder.id + '_input',
							field_name: 'some_value',
							placeholder: 'Input any value here'
						}) +
						KoiIdButton.getTag({
							element_id: this.getID(),
							btn_enabled: false,
							placeholder: 'Some Button'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_enableButton(){
		this._item.enable();
	}

	_disableButton(){
		this._item.disable();
	}

	displayButtonState(bool_enable){
		if(bool_enable){
			this._enableButton();
		}else{
			this._disableButton();
		}
	}

}

const DocsSamplePanelWithInputAndButtonSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayButtonState(bool_enable){
		this.socket.displayButtonState(bool_enable);
	}

	_constructSocket(){
		return new DocsSamplePanelWithInputAndButtonSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithInputAndButton extends KoiFormFieldChangesInterceptable(
	DocsSamplePanelWithInputAndButtonSocketConnectable(
		DocsSamplePanel
	)
) {

	static getTagName(){
		return 'docs-panel-with-input-and-button';
	}

	_handleSocketChanged(event_detail){
		let bool_enable = false;
		if(this._getFormFieldValueFromEvent(event_detail)){
			bool_enable = true;
		}
		this._displayButtonState(bool_enable);
	}

}
