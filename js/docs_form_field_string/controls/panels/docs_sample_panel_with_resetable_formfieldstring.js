/**
 * @module DocsSamplePanelWithResetableFormFieldString
 * A simple panel to give an example in the documentation.
 * The goal is to show how a FormFieldString can reset its value.
 * The panel has an input and a button that resets the input.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string.js";
if (customElements.get(KoiFormFieldString.getTagName()) === undefined) {
	customElements.define(KoiFormFieldString.getTagName(), KoiFormFieldString);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsResetableFormFieldString extends KoiFormFieldString {

	static getTagName(){
		return 'docs-resetable-form-field-string';
	}

	_makeBeforeDisplayNormalStateCallable(){
		this._callOnceBeforeDisplayNormalState = (function(){
			this._callOnceBeforeDisplayNormalState = function(){};
			this._beforeDisplayNormalState();
		}).bind(this);
	}

	attemptReinitializeComponent(){
		this.data.clearFieldValue();
		this._makeBeforeDisplayNormalStateCallable();
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

}

if (customElements.get(DocsResetableFormFieldString.getTagName()) === undefined) {
	customElements.define(DocsResetableFormFieldString.getTagName(), DocsResetableFormFieldString);
}

class DocsSamplePanelWithResetableFormFieldStringSocket extends KoiSocketTemplateCapable(
	KoiSingleSocket
) {

	static getResetActionCode(){
		return 'change';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body">' +
						DocsResetableFormFieldString.getTag({
							element_id: this.getID(),
							field_name: 'some_value',
							field_value: 'some_initial_value',
							placeholder: 'some_hint'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_reset',
							item_action: DocsSamplePanelWithResetableFormFieldStringSocket.getResetActionCode(),
							btn_enabled: true,
							placeholder: 'resetInput',
							btn_class: 'btn-primary'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_resetInput(){
		this._item.attemptReinitializeComponent();
	}

	displayFormFieldState(action, new_text){
		if(action === DocsSamplePanelWithResetableFormFieldStringSocket.getResetActionCode()){
			this._resetInput();
		}
	}

}

const DocsSamplePanelWithResetableFormFieldStringSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayFormFieldState(action){
		this.socket.displayFormFieldState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithResetableFormFieldStringSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithResetableFormFieldString extends DocsSamplePanelWithResetableFormFieldStringSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-resetable-form-field-string';
	}

	_applyOperationToSocket(operation_data){
		this._displayFormFieldState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
