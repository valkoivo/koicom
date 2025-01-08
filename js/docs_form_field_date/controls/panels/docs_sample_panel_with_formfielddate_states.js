/**
 * @module DocsSamplePanelWithFormFieldDateStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiFormFieldDate can change its state.
 * The panel has an input and several buttons that change the state of the input.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiData, KoiDataCapable } from "../../../../libs/web-components-lib/data.js";
import { KoiDateDataCapable } from "../../../../libs/web-components-lib/data_objects.js";
import { KoiDataElementDate } from "../../../../libs/web-components-lib/data_element.js";
import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiFormFieldData } from "../../../../libs/web-components-lib/controls/forms/data_object_form_field.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiFormFieldDate } from "../../../../libs/web-components-lib/controls/forms/control_form_field_date.js";
if (customElements.get(KoiFormFieldDate.getTagName()) === undefined) {
	customElements.define(KoiFormFieldDate.getTagName(), KoiFormFieldDate);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsErrorDisplayableFormFieldDate extends KoiFormFieldDate {

	static getTagName(){
		return 'koi-error-displayable-form-field-date';
	}

	displayError(){
		this.socket.displayError('Some error');
	}

	removeError(){
		this.socket.removeError();
	}

}

if (customElements.get(DocsErrorDisplayableFormFieldDate.getTagName()) === undefined) {
	customElements.define(DocsErrorDisplayableFormFieldDate.getTagName(), DocsErrorDisplayableFormFieldDate);
}

class DocsSamplePanelWithFormFieldDateStatesSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

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
							item_action: DocsSamplePanelWithFormFieldDateStatesSocket.getSetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'setReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeReadonly',
							item_action: DocsSamplePanelWithFormFieldDateStatesSocket.getUnsetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'removeReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithFormFieldDateStatesSocket.getDisableActionCode(),
							btn_enabled: true,
							placeholder: 'disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithFormFieldDateStatesSocket.getEnableActionCode(),
							btn_enabled: true,
							placeholder: 'enable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_displayError',
							item_action: DocsSamplePanelWithFormFieldDateStatesSocket.getDisplayErrorActionCode(),
							btn_enabled: true,
							placeholder: 'displayInputError',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeError',
							item_action: DocsSamplePanelWithFormFieldDateStatesSocket.getRemoveErrorActionCode(),
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
						DocsErrorDisplayableFormFieldDate.getTag({
							element_id: this.getID('form_field_date'),
							field_name: 'some_id',
							field_value: new Date('2024-05-01'),
							min_value: new Date('2024-04-20'),
							max_value: new Date('2024-06-10'),
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
		this._items['form_field_date'].setReadonly();
	}

	_removeInputReadonly(){
		this._items['form_field_date'].removeReadonly();
	}

	_disableInput(){
		this._items['form_field_date'].disable();
	}

	_enableInput(){
		this._items['form_field_date'].enable();
	}

	_displayError(){
		this._items['form_field_date'].displayError();
	}

	_removeError(){
		this._items['form_field_date'].removeError();
	}

	displayFormFieldState(action){
		if(action === DocsSamplePanelWithFormFieldDateStatesSocket.getSetReadonlyActionCode()){
			this._setInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldDateStatesSocket.getUnsetReadonlyActionCode()){
			this._removeInputReadonly();
		}else if(action === DocsSamplePanelWithFormFieldDateStatesSocket.getDisableActionCode()){
			this._disableInput();
		}else if(action === DocsSamplePanelWithFormFieldDateStatesSocket.getEnableActionCode()){
			this._enableInput();
		}else if(action === DocsSamplePanelWithFormFieldDateStatesSocket.getDisplayErrorActionCode()){
			this._displayError();
		}else if(action === DocsSamplePanelWithFormFieldDateStatesSocket.getRemoveErrorActionCode()){
			this._removeError();
		}
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'form_field_date': this._holder.id + '_form_field_date'
		};
	}

}

const DocsSamplePanelWithFormFieldDateStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelText(new_text){
		this.socket.displayLabelText(new_text);
	}

	_displayFormFieldState(action){
		this.socket.displayFormFieldState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldDateStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldDateStates extends DocsSamplePanelWithFormFieldDateStatesSocketConnectable(
	KoiFormFieldChangesInterceptable(
		KoiDateDataCapable(
			DocsSamplePanelWithButtons
		)
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-date-states';
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
