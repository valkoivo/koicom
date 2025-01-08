/**
 * @module DocsSamplePanelWithConnectedFormFieldString
 * A simple panel to give an example in the documentation.
 * The goal is to show how DocsConnectedFormFieldString can get
 * it's default_value from connector.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiState } from "../../../../libs/web-components-lib/state.js";
import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { DocsChangedEventDispatchableSampleLabel } from "../../../../js/docs/controls/labels/docs_label_event_dispatchable.js";
if (customElements.get(DocsChangedEventDispatchableSampleLabel.getTagName()) === undefined) {
	customElements.define(DocsChangedEventDispatchableSampleLabel.getTagName(), DocsChangedEventDispatchableSampleLabel);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}
import { KoiConnectedFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string_connected.js";
if (customElements.get(KoiConnectedFormFieldString.getTagName()) === undefined) {
	customElements.define(KoiConnectedFormFieldString.getTagName(), KoiConnectedFormFieldString);
}

class DocsSamplePanelWithConnectedFormFieldStringSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getSetLabelErrorStateActionCode(){
		return 'set_error_state';
	}

	static getSetLabelReadyStateActionCode(){
		return 'set_ready_state';
	}

	static getSetLabelFirstValueActionCode(){
		return 'set_first_value';
	}

	static getSetLabelSecondValueActionCode(){
		return 'set_second_value';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col-4">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_ready_state',
							item_action: DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelReadyStateActionCode(),
							btn_enabled: true,
							placeholder: 'Set Ready State',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_error_state',
							item_action: DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelErrorStateActionCode(),
							btn_enabled: true,
							placeholder: 'Set Error State',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_first_value',
							item_action: DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelFirstValueActionCode(),
							btn_enabled: true,
							placeholder: 'Set First Value',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_second_value',
							item_action: DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelSecondValueActionCode(),
							btn_enabled: true,
							placeholder: 'Set Second Value',
							btn_class: 'btn-primary d-block mb-1'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col-8">' +
					'<div class="card-body d-grid gap-3">' +
						KoiConnectedFormFieldString.getTag({
							element_id: this._holder.id + '_input',
							field_name: 'some_value',
							provider_id: this.getID(),
							placeholder: 'This value is obtained from the KoiLabel',
							debug_mode: false
						}) +
						DocsChangedEventDispatchableSampleLabel.getTag({
							element_id: this.getID(), 
							value: 'Initial value',
							debug_mode: false,
							element_class: 'd-block'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_setLabelState(new_state){
		this._item.attemptSetStateCode(new_state);
	}

	_setLabelText(action){
		this._item.attemptChangeValue(action);
	}

	displayLabelState(action){
		if(action === DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelReadyStateActionCode()){
			this._setLabelState(KoiState.getReadyCode());
		}else if(action === DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelErrorStateActionCode()){
			this._setLabelState(KoiState.getErrorCode());
		}else if(action === DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelFirstValueActionCode()){
			this._setLabelText(action);
		}else if(action === DocsSamplePanelWithConnectedFormFieldStringSocket.getSetLabelSecondValueActionCode()){
			this._setLabelText(action);
		}
	}

}

const DocsSamplePanelWithConnectedFormFieldStringSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelState(action){
		this.socket.displayLabelState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithConnectedFormFieldStringSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithConnectedFormFieldString extends DocsSamplePanelWithConnectedFormFieldStringSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-connected-form-field-string';
	}

	_applyOperationToSocket(operation_data){
		this._displayLabelState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
