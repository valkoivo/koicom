/**
 * @module DocsSamplePanelWithConnectedLabelStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiLabel can change its state based on connector's state.
 * The panel has a label and several buttons that change the state of the label.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiState } from "../../../../libs/web-components-lib/state.js";
import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { DocsConnectedLabel } from "../../../../js/docs/controls/labels/docs_label_connected.js";
if (customElements.get(DocsConnectedLabel.getTagName()) === undefined) {
	customElements.define(DocsConnectedLabel.getTagName(), DocsConnectedLabel);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}
import { DocsChangedEventDispatchableSampleLabel } from "../../../../js/docs/controls/labels/docs_label_event_dispatchable.js";
if (customElements.get(DocsChangedEventDispatchableSampleLabel.getTagName()) === undefined) {
	customElements.define(DocsChangedEventDispatchableSampleLabel.getTagName(), DocsChangedEventDispatchableSampleLabel);
}

class DocsSamplePanelWithConnectedLabelStatesSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getSetLabelFirstTextActionCode(){
		return 'first_button';
	}

	static getSetLabelSecondTextActionCode(){
		return 'second_button';
	}

	static getSetLabelReadyStateActionCode(){
		return 'state_ready';
	}

	static getSetLabelLoadingStateActionCode(){
		return 'state_loading';
	}

	getTemplate(){
		return '<div class="row">' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						DocsChangedEventDispatchableSampleLabel.getTag({
							element_id: this.getID(), 
							value: 'Initial value',
							debug_mode: false,
							element_class: 'd-block'
						}) +
					'</div>' +
					'<div class="card-footer">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn1',
							item_action: DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelFirstTextActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'First button'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn2',
							item_action: DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelSecondTextActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'Second button'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_ready',
							item_action: DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelReadyStateActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'State Ready'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_loading',
							item_action: DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelLoadingStateActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'State Loading'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						DocsConnectedLabel.getTag({
							element_id: this._holder.id + '_connected_label', 
							provider_id: this.getID(),
							debug_mode: false,
							element_class: 'd-block'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_setLabelText(new_text){
		this._item.attemptChangeValue(new_text);
	}

	_setLabelState(new_state){
		this._item.attemptSetStateCode(new_state);
	}

	changeLabel(action){
		if(action === DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelFirstTextActionCode()){
			this._setLabelText('First button');
		}else if(action === DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelSecondTextActionCode()){
			this._setLabelText('Second button');
		}else if(action === DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelReadyStateActionCode()){
			this._setLabelState(KoiState.getReadyCode());
		}else if(action === DocsSamplePanelWithConnectedLabelStatesSocket.getSetLabelLoadingStateActionCode()){
			this._setLabelState(KoiState.getLoadingCode());
		}
	}

}

export const DocsSamplePanelWithConnectedLabelStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_changeLabel(action){
		this.socket.changeLabel(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithConnectedLabelStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithConnectedLabelStates extends DocsSamplePanelWithConnectedLabelStatesSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-connected-label-states';
	}

	_applyOperationToSocket(operation_data){
		this._changeLabel(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
