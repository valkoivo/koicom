/**
 * @module DocsSamplePanelWithButtonStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how button can change its state.
 * It has a button and several buttons that change the state of the main button.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsSamplePanelWithButtonStatesSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getEnableButtonActionCode(){
		return 'enable';
	}

	static getDisableButtonActionCode(){
		return 'disable';
	}

	static getShowHourglassButtonActionCode(){
		return 'showHourglass';
	}

	static getHideHourglassButtonActionCode(){
		return 'hideHourglass';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_enable',
							item_action: DocsSamplePanelWithButtonStatesSocket.getEnableButtonActionCode(),
							btn_enabled: true,
							placeholder: 'Enable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_disable',
							item_action: DocsSamplePanelWithButtonStatesSocket.getDisableButtonActionCode(),
							btn_enabled: true,
							placeholder: 'Disable',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_show',
							item_action: DocsSamplePanelWithButtonStatesSocket.getShowHourglassButtonActionCode(),
							btn_enabled: true,
							placeholder: 'Show Hourglass',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_hide',
							item_action: DocsSamplePanelWithButtonStatesSocket.getHideHourglassButtonActionCode(),
							btn_enabled: true,
							placeholder: 'Hide Hourglass',
							btn_class: 'btn-primary d-block'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this.getID(),
							btn_enabled: true,
							placeholder: 'The Button',
							btn_class: 'btn-primary d-block'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_enableButton(){
		this._item.enable();
	}

	_disableButton(){
		this._item.disable();
	}

	_showHourglass(){
		this._item.showHourglass();
	}

	_hideHourglass(){
		this._item.hideHourglass();
	}

	displayButtonState(action){
		if(action === DocsSamplePanelWithButtonStatesSocket.getEnableButtonActionCode()){
			this._enableButton();
		}else if(action === DocsSamplePanelWithButtonStatesSocket.getDisableButtonActionCode()){
			this._disableButton();
		}else if(action === DocsSamplePanelWithButtonStatesSocket.getShowHourglassButtonActionCode()){
			this._showHourglass();
		}else if(action === DocsSamplePanelWithButtonStatesSocket.getHideHourglassButtonActionCode()){
			this._hideHourglass();
		}
	}

}

const DocsSamplePanelWithButtonStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayButtonState(action){
		this.socket.displayButtonState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithButtonStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithButtonStates extends DocsSamplePanelWithButtonStatesSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-panel-button-states';
	}

	_applyOperationToSocket(operation_data){
		this._displayButtonState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
