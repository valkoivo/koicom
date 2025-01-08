/**
 * @module DocsSamplePanelWithDialogQuestion
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiDialogQuestion can show and hide.
 * The panel has a label. When user clicks a button in the dialog,
 * the label changes its text.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";
import { KoiDialogQuestion } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_question.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsSelfHidingDialogQuestion extends KoiDialogQuestion {

	static getTagName(){
		return 'docs-self-hiding-dialog-question';
	}

	_handleOperated(event_detail){
		super._handleOperated(event_detail);
		this.hide();
	}

}

if (customElements.get(DocsSelfHidingDialogQuestion.getTagName()) === undefined) {
	customElements.define(DocsSelfHidingDialogQuestion.getTagName(), DocsSelfHidingDialogQuestion);
}

class DocsSamplePanelWithDialogQuestionSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	static getShowDialogActionCode(){
		return 'show';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="card-body">' +
				KoiLabel.getTag({
					element_id: this.getID('label'), 
					value: 'Some Label', 
					element_class: 'd-block mb-3'
				}) +
				KoiIdButton.getTag({
					element_id: this.getID('btn'),
					item_action: DocsSamplePanelWithDialogQuestionSocket.getShowDialogActionCode(),
					btn_enabled: true,
					placeholder: 'Show dialog',
					btn_class: 'btn-primary d-block mb-3'
				}) +
				DocsSelfHidingDialogQuestion.getTag({
					element_id: this.getID('dialog'), 
					message: 'Choose a command:', 
					apply_caption: 'Apply',
					cancel_caption: 'Cancel',
					element_class: 'd-none'
				}) +
			'</div>' +
		'</div>';
	}

	_getEmptySchemaIds(){
		return {
			'label': this._holder.id + '_label',
			'btn': this._holder.id + '_btn',
			'dialog': this._holder.id + '_dialog'
		};
	}

	displayText(str){
		this._items['label'].attemptChangeValue(str);
	}

	showDialog(){
		this._items['dialog'].show();
	}

	showButton(){
		this._items['btn'].show();
	}

	hideButton(){
		this._items['btn'].hide();
	}

}

const DocsSamplePanelWithDialogQuestionSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_showDialog(){
		this.socket.showDialog();
	}

	_hideButton(){
		this.socket.hideButton();
	}

	_showButton(){
		this.socket.showButton();
	}

	_convertActionIntoDisplayableText(action){
		return 'Command ' + action + ' has been recieved';
	}

	_printCommandCodeInLabel(action){
		this.socket.displayText(
			this._convertActionIntoDisplayableText(action)
		);
	}

	_constructSocket(){
		return new DocsSamplePanelWithDialogQuestionSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithDialogQuestion extends DocsSamplePanelWithDialogQuestionSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-dialog-question';
	}

	_applyOperationToSocket(operation_data){
		let action = this._getItemActionFromOperationData(operation_data);
		if(action == DocsSamplePanelWithDialogQuestionSocket.getShowDialogActionCode()){
			this._showDialog();
			this._hideButton();
		}else{
			this._printCommandCodeInLabel(action);
			this._showButton();
		}
	}

}
