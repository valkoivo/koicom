/**
 * @module DocsSamplePanelWithConnectedFormFieldSingleChoice
 * A simple panel to give an example in the documentation.
 * The goal is to show how DocsConnectedFormFieldSingleChoice can get
 * it's default_value from connector.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiStringDataCapable } from "../../../../libs/web-components-lib/data_objects.js";
import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js"
import { KoiState } from "../../../../libs/web-components-lib/state.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiFormFieldSingleChoice } from "../../../../libs/web-components-lib/controls/forms/control_form_field_single_choice.js";
import { KoiDataElementOptionableString } from "../../../../libs/web-components-lib/controls/forms/data_object_form_field_options.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { DocsSampleStringsProvider, DocsSampleStringsDataConnectorInteractable } from "../../../../js/docs/providers/docs_sample_strings_provider.js";
if (customElements.get(DocsSampleStringsProvider.getTagName()) === undefined) {
	customElements.define(DocsSampleStringsProvider.getTagName(), DocsSampleStringsProvider);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsConnectedFormFieldSingleChoice extends DocsSampleStringsDataConnectorInteractable(
	KoiFormFieldSingleChoice
) {

	static getTagName(){
		return 'docs-connected-form-field-single-choice';
	}

	static getTag({element_id, field_name, field_value, options, provider_id, placeholder, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_options = KoiDataElementOptionableString.canConvertOptionsToAttribute(options)? 
			' options="' + KoiDataElementOptionableString.convertOptionsToAttribute(options) + '" ' : '';
		let str_field_value = KoiDataElementString.canConvertToAttribute(field_value) ? 
			'field_value="' + KoiDataElementString.convertToAttribute(field_value) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + ' id="' + element_id +
			'" field_name="' + field_name + 
			'" ' + str_field_value +
			' ' + str_options + 
			' provider_id="' + provider_id + 
			'" ' + str_debug_mode + 
			' ' + str_element_class + 
			' placeholder="' + placeholder + 
			'"></' + tag_name + '>';
	}

	_setOwnDataInitialValueBasedOnConnectorData(connector_data){
		this.data.setFieldDefaultValue(
			connector_data.getFirstValue()
		);
		this._setOwnDataOptions(
			[connector_data.getFirstValue(), connector_data.getSecondValue()]
		);
	}

	_reinitializeComponentWhenConnectorDataChanged(event_detail){
		this._setOwnDataInitialValueBasedOnConnectorData(
			this._getConnectorDataFromEvent(event_detail)
		);
		this.data.clearFieldValue();
		this._callOnceBeforeDisplayNormalState = (function(){
			this._callOnceBeforeDisplayNormalState = function(){};
			this._beforeDisplayNormalState();
		}).bind(this);
	}

	_updateOwnDataWhenConnectorDataChanged(event_detail){
		super._updateOwnDataWhenConnectorDataChanged(event_detail);
		this._reinitializeComponentWhenConnectorDataChanged(event_detail);
	}

}

if (customElements.get(DocsConnectedFormFieldSingleChoice.getTagName()) === undefined) {
	customElements.define(DocsConnectedFormFieldSingleChoice.getTagName(), DocsConnectedFormFieldSingleChoice);
}

class DocsSamplePanelWithConnectedFormFieldSingleChoiceSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	static getSetProviderErrorStateActionCode(){
		return 'set_error_state';
	}

	static getSetProviderReadyStateActionCode(){
		return 'set_ready_state';
	}

	getTemplate(){
		let form_field_id = this._holder.id + '_input';
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col-4">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_ready_state',
							item_action: DocsSamplePanelWithConnectedFormFieldSingleChoiceSocket.getSetProviderReadyStateActionCode(),
							btn_enabled: true,
							placeholder: 'Set Ready State',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_error_state',
							item_action: DocsSamplePanelWithConnectedFormFieldSingleChoiceSocket.getSetProviderErrorStateActionCode(),
							btn_enabled: true,
							placeholder: 'Set Error State',
							btn_class: 'btn-primary d-block mb-1'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col-8">' +
					'<div class="card-body d-grid">' +
						KoiLabel.getTag({
							element_id: this.getID('label'), 
							value: 'This label receives input values'
						}) +
						DocsConnectedFormFieldSingleChoice.getTag({
							element_id: form_field_id,
							field_name: 'some_value',
							provider_id: this.getID('provider'),
							placeholder: 'Options are obtained from the provider',
							debug_mode: false
						}) +
						DocsSampleStringsProvider.getTag({
							element_id: this.getID('provider'),
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

	_setProviderState(new_state){
		this._items['provider'].attemptSetStateCode(new_state);
	}

	displayProviderState(action){
		if(action === DocsSamplePanelWithConnectedFormFieldSingleChoiceSocket.getSetProviderReadyStateActionCode()){
			this._setProviderState(KoiState.getReadyCode());
		}else if(action === DocsSamplePanelWithConnectedFormFieldSingleChoiceSocket.getSetProviderErrorStateActionCode()){
			this._setProviderState(KoiState.getErrorCode());
		}
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'provider': this._holder.id + '_provider'
		};
	}

}

const DocsSamplePanelWithConnectedFormFieldSingleChoiceSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelText(new_text){
		this.socket.displayLabelText(new_text);
	}

	_displayProviderState(action){
		this.socket.displayProviderState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithConnectedFormFieldSingleChoiceSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithConnectedFormFieldSingleChoice extends DocsSamplePanelWithConnectedFormFieldSingleChoiceSocketConnectable(
	KoiFormFieldChangesInterceptable(
		KoiStringDataCapable(
			DocsSamplePanelWithButtons
		)
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-connected-form-field-single-choice';
	}

	_applyOperationToSocket(operation_data){
		this._displayProviderState(
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
