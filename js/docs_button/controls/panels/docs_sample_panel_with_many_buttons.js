/**
 * @module DocsSamplePanelWithManyButtons
 * A simple panel to give an example in the documentation.
 * The goal is to show how components can be added to DOM on runtime.
 * It has two buttons, label and a holder. 
 * One button adds buttons. Another button removes them.
 * All added buttons change the label's text.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiExpansionPanel, KoiEnumeratedCompositeSocket } from "../../../../libs/web-components-lib/controls/panels/control_expansion_panel.js";
import { KoiCompositeSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
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

class DocsSetOfButtonsSocket extends KoiEnumeratedCompositeSocket {

	_getTagForNewComponent({element_id}){
		return KoiIdButton.getTag({
			element_id,
			item_id: element_id,
			btn_class: 'btn-primary d-block mb-1', 
			btn_enabled: true,
			placeholder: element_id
		});
	}

	addButton(){
		this.expandSocket({});
	}

	_removeLastElement(){
		let key = this._components_enumeration.getLastKey();
		this._removeComponent(key);
	}

	removeButton(){
		this._removeLastElement();
	}

}

class DocsSetOfButtons extends KoiExpansionPanel {

	static getTagName(){
		return 'docs-set-of-buttons';
	}

	addButton(){
		this.socket.addButton();
	}

	removeButton(){
		this.socket.removeButton();
	}

	_constructSocket(){
		return new DocsSetOfButtonsSocket({
			holder: this
		});
	}

}

if (customElements.get(DocsSetOfButtons.getTagName()) === undefined) {
	customElements.define(DocsSetOfButtons.getTagName(), DocsSetOfButtons);
}

class DocsSamplePanelWithManyButtonsSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	static getAddButtonActionCode(){
		return 'add';
	}

	static getRemoveButtonActionCode(){
		return 'remove';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiLabel.getTag({
							element_id: this.getID('label'), 
							value: 'Some Label', 
							element_class: 'd-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn1',
							item_action: DocsSamplePanelWithManyButtonsSocket.getAddButtonActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'Add Button'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn2',
							item_action: DocsSamplePanelWithManyButtonsSocket.getRemoveButtonActionCode(),
							btn_class: 'btn-primary d-block', 
							btn_enabled: true,
							placeholder: 'Remove Button'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col">' +
					'<div class="card-body">' +
						DocsSetOfButtons.getTag({
							element_id: this.getID('hldr')
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	addButton(){
		this._items['hldr'].addButton();
	}

	removeButton(){
		this._items['hldr'].removeButton();
	}

	displayText(str){
		this._items['label'].attemptChangeValue(str);
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'hldr': this._holder.id + '_hldr'
		};
	}

}

export const DocsSamplePanelWithManyButtonsSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_changeSetOfButtons(button_name, action){
		if(action === DocsSamplePanelWithManyButtonsSocket.getAddButtonActionCode()){
			this.socket.addButton();
		}else if(action === DocsSamplePanelWithManyButtonsSocket.getRemoveButtonActionCode()){
			this.socket.removeButton();
		}else{
			this.socket.displayText(button_name);
		}
	}

	_constructSocket(){
		return new DocsSamplePanelWithManyButtonsSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithManyButtons extends DocsSamplePanelWithManyButtonsSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-panel-many-buttons';
	}

	_applyOperationToSocket(operation_data){
		this._changeSetOfButtons(
			this._getItemIdFromOperationData(operation_data),
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
