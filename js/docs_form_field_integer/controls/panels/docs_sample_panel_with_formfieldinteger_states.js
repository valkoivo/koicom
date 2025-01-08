/**
 * @module DocsSamplePanelWithFormFieldIntegerStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiFormFieldInteger can change its state.
 * The panel has an input and several buttons that change the state of the input.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";
import { KoiIntegerDataCapable } from "../../../../libs/web-components-lib/data_objects.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiFormFieldInteger } from "../../../../libs/web-components-lib/controls/forms/control_form_field_integer.js";
if (customElements.get(KoiFormFieldInteger.getTagName()) === undefined) {
	customElements.define(KoiFormFieldInteger.getTagName(), KoiFormFieldInteger);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsErrorDisplayableKoiFormFieldInteger extends KoiFormFieldInteger {

	static getTagName(){
		return 'koi-error-displayable-form-field-integer';
	}

	displayError(){
		this._displayErrorMessage('Some error');
	}

	removeError(){
		this._removeErrorMessage();
	}

}

if (customElements.get(DocsErrorDisplayableKoiFormFieldInteger.getTagName()) === undefined) {
	customElements.define(DocsErrorDisplayableKoiFormFieldInteger.getTagName(), DocsErrorDisplayableKoiFormFieldInteger);
}

class DocsSamplePanelWithFormFieldIntegerStatesSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

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
							item_action: DocsSamplePanelWithFormFieldIntegerStatesSocket.getSetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'setReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeReadonly',
							item_action: DocsSamplePanelWithFormFieldIntegerStatesSocket.getUnsetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'removeReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithFormFieldIntegerStatesSocket.getDisableActionCode(),
							btn_enabled: true,
							placeholder: 'disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithFormFieldIntegerStatesSocket.getEnableActionCode(),
							btn_enabled: true,
							placeholder: 'enable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_displayError',
							item_action: DocsSamplePanelWithFormFieldIntegerStatesSocket.getDisplayErrorActionCode(),
							btn_enabled: true,
							placeholder: 'displayInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeError',
							item_action: DocsSamplePanelWithFormFieldIntegerStatesSocket.getRemoveErrorActionCode(),
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
						DocsErrorDisplayableKoiFormFieldInteger.getTag({
							element_id: this.getID('form_field_integer'),
							field_name: 'some_id',
							field_value: 6,
							min_value: -5,
							max_value: 15,
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
		this._items['form_field_integer'].setReadonly();
	}

	_removeInputReadonly(){
		this._items['form_field_integer'].removeReadonly();
	}

	_disableInput(){
		this._items['form_field_integer'].disable();
	}

	_enableInput(){
		this._items['form_field_integer'].enable();
	}

	_displayError(){
		this._items['form_field_integer'].displayError();
	}

	_removeError(){
		this._items['form_field_integer'].removeError();
	}

	displayFormFieldState(action){
		if(action === DocsSamplePanelWithFormFieldIntegerStatesSocket.getSetReadonlyActionCode()){
			this._setInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldIntegerStatesSocket.getUnsetReadonlyActionCode()){
			this._removeInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldIntegerStatesSocket.getDisableActionCode()){
			this._disableInput();
		}else if(action === DocsSamplePanelWithFormFieldIntegerStatesSocket.getEnableActionCode()){
			this._enableInput();
		}else if(action === DocsSamplePanelWithFormFieldIntegerStatesSocket.getDisplayErrorActionCode()){
			this._displayError();
		}else if(action === DocsSamplePanelWithFormFieldIntegerStatesSocket.getRemoveErrorActionCode()){
			this._removeError();
		}
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'form_field_integer': this._holder.id + '_form_field_integer'
		};
	}

}

const DocsSamplePanelWithFormFieldIntegerStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelText(new_text){
		this.socket.displayLabelText(new_text);
	}

	_displayFormFieldState(action){
		this.socket.displayFormFieldState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldIntegerStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldIntegerStates extends DocsSamplePanelWithFormFieldIntegerStatesSocketConnectable(
	KoiFormFieldChangesInterceptable(
		KoiIntegerDataCapable(
			DocsSamplePanelWithButtons
		)
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-integer-states';
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
		return 'New value: ' + this.data.getValueAsHTML();
	}

	_updateSocket(){
		this._displayLabelText(
			this._convertOwnDataValueIntoLabelText()
		);
	}

}
