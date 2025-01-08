/**
 * @module DocsSampleDialog
 * A panel with two buttons and a label. 
 * The label changes when you click the buttons.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDialogQuestion, KoiDialogQuestionSocket } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_question.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}

class DocsSampleDialogSocket extends KoiDialogQuestionSocket {

	_getMessageTemplate(){
		return KoiLabel.getTag({
			element_id: this.getID('input_board'),
			value: this._message,
			element_class: ''
		});
	}

	displayText(str){
		this._items['input_board'].attemptChangeValue(str);
	}

}

const DocsSampleDialogSocketConnectable = Sup => class extends Sup {

	_convertActionIntoDisplayableText(action){
		return 'Command ' + action + ' has been recieved';
	}

	_printCommandCodeInLabel(action){
		this.socket.displayText(
			this._convertActionIntoDisplayableText(action)
		);
	}

	_constructSocket(){
		return new DocsSampleDialogSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}

export class DocsSampleDialog extends DocsSampleDialogSocketConnectable(
	KoiDialogQuestion
) {

	static getTagName(){
		return 'docs-sample-dialog';
	}

	_applyOperationToSocket(operation_data){
		this._printCommandCodeInLabel(
			this._getItemActionFromOperationData(operation_data)
		);
	}

	_handleOperated(event_detail){
		super._handleOperated(event_detail);
		this._applyOperationToSocket(
			this._getOperationDataFromEvent(event_detail)
		);
	}

}
