/**
 * @module DocsSamplePanelWithLabelStates
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiLabel can show and hide.
 * The panel has a label and two buttons that change the state of the label.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsSamplePanelWithLabelStatesSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getShowLabelActionCode(){
		return 'show';
	}

	static getHideLabelActionCode(){
		return 'hide';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col-4">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_show',
							item_action: DocsSamplePanelWithLabelStatesSocket.getShowLabelActionCode(),
							btn_enabled: true,
							placeholder: 'Show',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_hide',
							item_action: DocsSamplePanelWithLabelStatesSocket.getHideLabelActionCode(),
							btn_enabled: true,
							placeholder: 'Hide',
							btn_class: 'btn-primary d-block mb-1'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col-8">' +
					'<div class="card-body">' +
						KoiLabel.getTag({
							element_id: this.getID(), 
							value: 'Some Label', 
							element_class: 'd-block mb-3'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_hideLabel(){
		this._hide();
	}

	_showLabel(){
		this._show();
	}

	displayLabelState(action){
		if(action === DocsSamplePanelWithLabelStatesSocket.getShowLabelActionCode()){
			this._showLabel();
		}else if(action === DocsSamplePanelWithLabelStatesSocket.getHideLabelActionCode()){
			this._hideLabel();
		}
	}

}

const DocsSamplePanelWithLabelStatesSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_displayLabelState(action){
		this.socket.displayLabelState(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithLabelStatesSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithLabelStates extends DocsSamplePanelWithLabelStatesSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-label-states';
	}

	_applyOperationToSocket(operation_data){
		this._displayLabelState(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
