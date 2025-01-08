/**
 * @module DocsSamplePanelWithSwitchStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiSwitch can change its state.
 * The panel has an input and several buttons that change the state of the input.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiSwitch } from "../../../../libs/web-components-lib/controls/buttons/control_switch.js";
if (customElements.get(KoiSwitch.getTagName()) === undefined) {
	customElements.define(KoiSwitch.getTagName(), KoiSwitch);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsSamplePanelWithSwitchStatesSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	static getPrimaryActionCode(){
		return 'primary';
	}

	static getSecondaryActionCode(){
		return 'secondary';
	}

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

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_setReadonly',
							item_action: DocsSamplePanelWithSwitchStatesSocket.getSetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'setReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_removeReadonly',
							item_action: DocsSamplePanelWithSwitchStatesSocket.getUnsetReadonlyActionCode(),
							btn_enabled: true,
							placeholder: 'removeReadonly',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithSwitchStatesSocket.getDisableActionCode(),
							btn_enabled: true,
							placeholder: 'disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithSwitchStatesSocket.getEnableActionCode(),
							btn_enabled: true,
							placeholder: 'enable',
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
						KoiSwitch.getTag({
							element_id: this.getID('switch'),
							item_id: 'some_id',
							item_action: DocsSamplePanelWithSwitchStatesSocket.getPrimaryActionCode(),
							primary_action: DocsSamplePanelWithSwitchStatesSocket.getPrimaryActionCode(),
							secondary_action: DocsSamplePanelWithSwitchStatesSocket.getSecondaryActionCode(),
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

	_setInputReadonly(){
		this._items['switch'].setReadonly();
	}

	_removeInputReadonly(){
		this._items['switch'].removeReadonly();
	}

	_disableInput(){
		this._items['switch'].disable();
	}

	_enableInput(){
		this._items['switch'].enable();
	}

	_displayLabelText(new_text){
		this._setLabelText(new_text);
	}

	displayPanelState(action){
		if(action === DocsSamplePanelWithSwitchStatesSocket.getSetReadonlyActionCode()){
			this._setInputReadonly();
		}else if(action === DocsSamplePanelWithSwitchStatesSocket.getUnsetReadonlyActionCode()){
			this._removeInputReadonly();
		}else if(action === DocsSamplePanelWithSwitchStatesSocket.getDisableActionCode()){
			this._disableInput();
		}else if(action === DocsSamplePanelWithSwitchStatesSocket.getEnableActionCode()){
			this._enableInput();
		}else if(action === DocsSamplePanelWithSwitchStatesSocket.getPrimaryActionCode()){
			this._displayLabelText('Action: ' + action);
		}else if(action === DocsSamplePanelWithSwitchStatesSocket.getSecondaryActionCode()){
			this._displayLabelText('Action: ' + action);
		}
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'switch': this._holder.id + '_switch'
		};
	}

}

const DocsSamplePanelWithSwitchStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayFormFieldState(action){
		this.socket.displayPanelState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithSwitchStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithSwitchStates extends DocsSamplePanelWithSwitchStatesSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-switch-states';
	}

	_applyOperationToSocket(operation_data){
		this._displayFormFieldState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
