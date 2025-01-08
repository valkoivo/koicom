/**
 * @module DocsSamplePanelWithFormFieldSingleChoiceStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiFormFieldSingleChoice can change its state.
 * The panel has an input and several buttons that change the state of the input.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiStringDataCapable } from "../../../../libs/web-components-lib/data_objects.js";
import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiFormFieldSingleChoice } from "../../../../libs/web-components-lib/controls/forms/control_form_field_single_choice.js";
if (customElements.get(KoiFormFieldSingleChoice.getTagName()) === undefined) {
	customElements.define(KoiFormFieldSingleChoice.getTagName(), KoiFormFieldSingleChoice);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsErrorDisplayableKoiFieldSingleChoice extends KoiFormFieldSingleChoice {

	static getTagName(){
		return 'koi-error-displayable-form-field-single-choice';
	}

	displayError(){
		this.socket.displayError('Some error');
	}

	removeError(){
		this.socket.removeError();
	}

}

if (customElements.get(DocsErrorDisplayableKoiFieldSingleChoice.getTagName()) === undefined) {
	customElements.define(DocsErrorDisplayableKoiFieldSingleChoice.getTagName(), DocsErrorDisplayableKoiFieldSingleChoice);
}

class DocsSamplePanelWithFormFieldSingleChoiceStatesSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

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
							item_action: DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getSetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'setReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeReadonly',
							item_action: DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getUnsetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'removeReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getDisableActionCode(),
							btn_enabled: true,
							placeholder: 'disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getEnableActionCode(),
							btn_enabled: true,
							placeholder: 'enable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_displayError',
							item_action: DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getDisplayErrorActionCode(),
							btn_enabled: true,
							placeholder: 'displayInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeError',
							item_action: DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getRemoveErrorActionCode(),
							btn_enabled: true,
							placeholder: 'removeInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiLabel.getTag({
							element_id: this.getID('label'), 
							value: 'Some Label', 
							element_class: 'd-block mb-3'
						}) +
						DocsErrorDisplayableKoiFieldSingleChoice.getTag({
							element_id: this.getID('form_field_single_choice'),
							field_name: 'some_id',
							field_value: 'option 2',
							options: ['option 1', 'option 2', 'option 3', 'option 4'],
							placeholder: 'some_hint',
							debug_mode: false
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_setLabelText(new_text){
		this._items['label'].attemptChangeValue(new_text);
	}

	displayLabelText(new_text){
		this._setLabelText(new_text);
	}

	_setInputReadonly(){
		this._items['form_field_single_choice'].setReadonly();
	}

	_removeInputReadonly(){
		this._items['form_field_single_choice'].removeReadonly();
	}

	_disableInput(){
		this._items['form_field_single_choice'].disable();
	}

	_enableInput(){
		this._items['form_field_single_choice'].enable();
	}

	_displayError(){
		this._items['form_field_single_choice'].displayError();
	}

	_removeError(){
		this._items['form_field_single_choice'].removeError();
	}

	displayFormFieldState(action){
		if(action === DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getSetReadonlyActionCode()){
			this._setInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getUnsetReadonlyActionCode()){
			this._removeInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getDisableActionCode()){
			this._disableInput();
		}else if(action === DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getEnableActionCode()){
			this._enableInput();
		}else if(action === DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getDisplayErrorActionCode()){
			this._displayError();
		}else if(action === DocsSamplePanelWithFormFieldSingleChoiceStatesSocket.getRemoveErrorActionCode()){
			this._removeError();
		}
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'form_field_single_choice': this._holder.id + '_form_field_single_choice'
		};
	}

}

const DocsSamplePanelWithFormFieldSingleChoiceStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelText(new_text){
		this.socket.displayLabelText(new_text);
	}

	_displayFormFieldState(action){
		this.socket.displayFormFieldState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldSingleChoiceStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldSingleChoiceStates extends DocsSamplePanelWithFormFieldSingleChoiceStatesSocketConnectable(
	KoiFormFieldChangesInterceptable(
		KoiStringDataCapable(
			DocsSamplePanelWithButtons
		)
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-single-choice-states';
	}

	_applyOperationToSocket(operation_data){
		this._displayFormFieldState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

	_updateOwnDataWhenSocketChanged(event_detail){
		super._updateOwnDataWhenSocketChanged(event_detail);
		this.data.setValue(
			this._getFormFieldValueFromEvent(event_detail)
		);
	}

	_convertOwnDataValueIntoLabelText(){
		if(!this.data.hasAllValues()){
			return 'Value is not set';
		}
		return 'New value: ' + this.data.getValue();
	}

	_updateSocket(){
		this._displayLabelText(
			this._convertOwnDataValueIntoLabelText()
		);
	}

}
