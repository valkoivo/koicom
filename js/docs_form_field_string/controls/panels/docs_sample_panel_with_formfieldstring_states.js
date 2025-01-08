/**
 * @module DocsSamplePanelWithFormFieldStringStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a FormFieldString can change its state.
 * The panel has an input and several buttons that change the state of the input.
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

class DocsErrorDisplayableFormFieldString extends KoiFormFieldString {

	static getTagName(){
		return 'docs-error-displayable-form-field-string';
	}

	displayError(){
		this._displayErrorMessage('some error');
	}

	removeError(){
		this._removeErrorMessage();
	}

}

if (customElements.get(DocsErrorDisplayableFormFieldString.getTagName()) === undefined) {
	customElements.define(DocsErrorDisplayableFormFieldString.getTagName(), DocsErrorDisplayableFormFieldString);
}

class DocsSamplePanelWithFormFieldStringStatesSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getSetReadonlyActionCode(){
		return 'setReadonly';
	}

	static getUnsetReadonlyActionCode(){
		return 'removeReadonly';
	}

	static getDisableActionCode(){
		return 'disable';
	}

	static getEnableActionCode(){
		return 'enable';
	}

	static getDisplayErrorActionCode(){
		return 'displayInputError';
	}

	static getRemoveErrorActionCode(){
		return 'removeInputError';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_setReadonly',
							item_action: DocsSamplePanelWithFormFieldStringStatesSocket.getSetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'setReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeReadonly',
							item_action: DocsSamplePanelWithFormFieldStringStatesSocket.getUnsetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'removeReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithFormFieldStringStatesSocket.getDisableActionCode(),
							btn_enabled: true,
							placeholder: 'disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithFormFieldStringStatesSocket.getEnableActionCode(),
							btn_enabled: true,
							placeholder: 'enable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_displayError',
							item_action: DocsSamplePanelWithFormFieldStringStatesSocket.getDisplayErrorActionCode(),
							btn_enabled: true,
							placeholder: 'displayInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeError',
							item_action: DocsSamplePanelWithFormFieldStringStatesSocket.getRemoveErrorActionCode(),
							btn_enabled: true,
							placeholder: 'removeInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col">' +
					'<div class="card-body">' +
						DocsErrorDisplayableFormFieldString.getTag({
							element_id: this.getID(),
							field_name: 'some_value',
							field_value: 'some_initial_value',
							placeholder: 'some_hint'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_setInputReadonly(){
		this._item.setReadonly();
	}

	_removeInputReadonly(){
		this._item.removeReadonly();
	}

	_disableInput(){
		this._item.disable();
	}

	_enableInput(){
		this._item.enable();
	}

	_displayError(){
		this._item.displayError();
	}

	_removeError(){
		this._item.removeError();
	}

	displayFormFieldState(action){
		if(action === DocsSamplePanelWithFormFieldStringStatesSocket.getSetReadonlyActionCode()){
			this._setInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldStringStatesSocket.getUnsetReadonlyActionCode()){
			this._removeInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldStringStatesSocket.getDisableActionCode()){
			this._disableInput();
		}else if(action === DocsSamplePanelWithFormFieldStringStatesSocket.getEnableActionCode()){
			this._enableInput();
		}else if(action === DocsSamplePanelWithFormFieldStringStatesSocket.getDisplayErrorActionCode()){
			this._displayError();
		}else if(action === DocsSamplePanelWithFormFieldStringStatesSocket.getRemoveErrorActionCode()){
			this._removeError();
		}
	}

}

const DocsSamplePanelWithFormFieldStringStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayFormFieldState(action){
		this.socket.displayFormFieldState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldStringStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldStringStates extends DocsSamplePanelWithFormFieldStringStatesSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-string-states';
	}

	_applyOperationToSocket(operation_data){
		this._displayFormFieldState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
