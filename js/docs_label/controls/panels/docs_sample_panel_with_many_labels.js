/**
 * @module DocsSamplePanelWithManyLabels
 * A simple panel to give an example in the documentation.
 * The goal is to show how components can be added to DOM on runtime.
 * It has two buttons and a holder. 
 * One button adds labels to the holder. Another button removes them.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiExpansionPanel, KoiEnumeratedCompositeSocket } from "../../../../libs/web-components-lib/controls/panels/control_expansion_panel.js";
import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
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

class DocsSetOfLabelsSocket extends KoiEnumeratedCompositeSocket {

	_getTagForNewComponent({element_id}){
		return KoiLabel.getTag({
			element_id, 
			value: element_id, 
			element_class: 'd-block mb-1'
		});
	}

	addLabel(){
		this.expandSocket({});
	}

	_removeLastElement(){
		let key = this._components_enumeration.getLastKey();
		this._removeComponent(key);
	}

	removeLabel(){
		this._removeLastElement();
	}

}

class DocsSetOfLabels extends KoiExpansionPanel {

	static getTagName(){
		return 'docs-set-of-labels';
	}

	static getTag({element_id}){
		let tag_name = this.getTagName();
		return '<' + tag_name + ' id="' + element_id + '"></' + tag_name + '>';
	}

	addLabel(){
		this.socket.addLabel();
	}

	removeLabel(){
		this.socket.removeLabel();
	}

	_constructSocket(){
		return new DocsSetOfLabelsSocket({
			holder: this
		});
	}

}

if (customElements.get(DocsSetOfLabels.getTagName()) === undefined) {
	customElements.define(DocsSetOfLabels.getTagName(), DocsSetOfLabels);
}

class DocsSamplePanelWithManyLabelsSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getAddLabelActionCode(){
		return 'add';
	}

	static getRemoveLabelActionCode(){
		return 'remove';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col-md-3">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn1',
							item_action: DocsSamplePanelWithManyLabelsSocket.getAddLabelActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'Add Label'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn2',
							item_action: DocsSamplePanelWithManyLabelsSocket.getRemoveLabelActionCode(),
							btn_class: 'btn-primary d-block', 
							btn_enabled: true,
							placeholder: 'Remove Label'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col-md-9">' +
					'<div class="card-body">' +
						DocsSetOfLabels.getTag({
							element_id: this.getID()
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_addLabel(){
		this._item.addLabel();
	}

	_removeLabel(){
		this._item.removeLabel();
	}

	changeSetOfLabels(action){
		if(action === DocsSamplePanelWithManyLabelsSocket.getAddLabelActionCode()){
			this._addLabel();
		}else if(action === DocsSamplePanelWithManyLabelsSocket.getRemoveLabelActionCode()){
			this._removeLabel();
		}
	}

}

export const DocsSamplePanelWithManyLabelsSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_changeSetOfLabels(action){
		this.socket.changeSetOfLabels(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithManyLabelsSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithManyLabels extends DocsSamplePanelWithManyLabelsSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-panel-many-labels';
	}

	_applyOperationToSocket(operation_data){
		this._changeSetOfLabels(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
