/**
 * @module DocsSamplePanelWithFormFieldCheckboxesStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiFormFieldCheckBoxes can change its state.
 * The panel has an input and several buttons that change the state of the input.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiListDataCapable } from "../../../../libs/web-components-lib/data_objects.js";
import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable, KoiBaseControl } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiFormFieldData } from "../../../../libs/web-components-lib/controls/forms/data_object_form_field.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiFormFieldCheckBoxes } from "../../../../libs/web-components-lib/controls/forms/control_form_field_check_boxes.js";
if (customElements.get(KoiFormFieldCheckBoxes.getTagName()) === undefined) {
	customElements.define(KoiFormFieldCheckBoxes.getTagName(), KoiFormFieldCheckBoxes);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsErrorDisplayableFormFieldCheckBoxes extends KoiFormFieldCheckBoxes {

	static getTagName(){
		return 'koi-error-displayable-form-field-check-boxes';
	}

	displayError(){
		this._displayErrorMessage('Some error');
	}

	removeError(){
		this._removeErrorMessage();
	}

}

if (customElements.get(DocsErrorDisplayableFormFieldCheckBoxes.getTagName()) === undefined) {
	customElements.define(DocsErrorDisplayableFormFieldCheckBoxes.getTagName(), DocsErrorDisplayableFormFieldCheckBoxes);
}

class DocsSamplePanelWithFormFieldCheckboxesStatesSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

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
							item_action: DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getSetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'setReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeReadonly',
							item_action: DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getUnsetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'removeReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getDisableActionCode(),
							btn_enabled: true,
							placeholder: 'disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getEnableActionCode(),
							btn_enabled: true,
							placeholder: 'enable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_displayError',
							item_action: DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getDisplayErrorActionCode(),
							btn_enabled: true,
							placeholder: 'displayInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeError',
							item_action: DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getRemoveErrorActionCode(),
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
						DocsErrorDisplayableFormFieldCheckBoxes.getTag({
							element_id: this.getID('form_field_checkboxes'),
							field_name: 'some_id',
							field_value: ['option 1', 'option 2', 'option 4'],
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
		this._items['form_field_checkboxes'].setReadonly();
	}

	_removeInputReadonly(){
		this._items['form_field_checkboxes'].removeReadonly();
	}

	_disableInput(){
		this._items['form_field_checkboxes'].disable();
	}

	_enableInput(){
		this._items['form_field_checkboxes'].enable();
	}

	_displayError(){
		this._items['form_field_checkboxes'].displayError();
	}

	_removeError(){
		this._items['form_field_checkboxes'].removeError();
	}

	displayFormFieldState(action){
		if(action === DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getSetReadonlyActionCode()){
			this._setInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getUnsetReadonlyActionCode()){
			this._removeInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getDisableActionCode()){
			this._disableInput();
		}else if(action === DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getEnableActionCode()){
			this._enableInput();
		}else if(action === DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getDisplayErrorActionCode()){
			this._displayError();
		}else if(action === DocsSamplePanelWithFormFieldCheckboxesStatesSocket.getRemoveErrorActionCode()){
			this._removeError();
		}
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'form_field_checkboxes': this._holder.id + '_form_field_checkboxes'
		};
	}

}

const DocsSamplePanelWithFormFieldCheckboxesStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelText(new_text){
		this.socket.displayLabelText(new_text);
	}

	_displayFormFieldState(action){
		this.socket.displayFormFieldState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldCheckboxesStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldCheckboxesStates extends DocsSamplePanelWithFormFieldCheckboxesStatesSocketConnectable(
	KoiFormFieldChangesInterceptable(
		KoiListDataCapable(
			DocsSamplePanelWithButtons
		)
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-checkboxes-states';
	}

	_applyOperationToSocket(operation_data){
		this._displayFormFieldState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

	_updateOwnDataWhenSocketChanged(event_detail){
		super._updateOwnDataWhenSocketChanged(event_detail);
		this.data.setItems(
			this._getFormFieldValueFromEvent(event_detail)
		);
	}

	_convertOwnDataValueIntoLabelText(){
		if(!this.data.hasAllValues()){
			return 'Value is not set';
		}
		return 'New value: ' + this.data.getItemsAsHTML();
	}

	_updateSocket(){
		this._displayLabelText(
			this._convertOwnDataValueIntoLabelText()
		);
	}

}
