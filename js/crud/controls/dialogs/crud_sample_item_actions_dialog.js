/**
 * @module CRUDSampleItemActionsDialog
 * A simple component for a CRUD panel. It is placed in 
 * each row of the table to allow the user to manage the record, 
 * offering a choice between editing or deleting the record. 
 * To accomplish this, the component displays two buttons, 
 * each corresponding to one of the actions.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDialogQuestion, KoiDialogQuestionSocket } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_question.js";

export class CRUDSampleItemActionsDialogSocket extends KoiDialogQuestionSocket {

	getTemplate(){
		return '<div class="d-none">' +
				this._getMessageTemplate() +
			'</div>' +
		this._getApplyButtonTemplate() +
		this._getCancelButtonTemplate();
	}

}

export class CRUDSampleItemActionsDialog extends KoiDialogQuestion {

	static getApplyActionCode(){
		return 'show_edit_dialog';
	}

	static getCancelActionCode(){
		return 'show_delete_dialog';
	}

	static getTagName(){
		return 'crud-sample-item-actions-dialog';
	}

	_constructSocket(){
		return new CRUDSampleItemActionsDialogSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}
