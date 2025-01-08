/**
 * @module CRUDSampleItemDeleteDialog
 * A simple component for the CRUD panel, designed 
 * to allow the user to choose between two commands: 
 * delete the record or cancel the deletion.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDialogQuestion, KoiDialogQuestionSocket } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_question.js";

export class CRUDSampleItemDeleteDialogSocket extends KoiDialogQuestionSocket {

	getTemplate(){
		return '<div class="mb-3">' +
				this._getMessageTemplate() +
			'</div>' +
		this._getApplyButtonTemplate() +
		this._getCancelButtonTemplate();
	}

}

export class CRUDSampleItemDeleteDialog extends KoiDialogQuestion {

	static getApplyActionCode(){
		return 'delete_item';
	}

	static getCancelActionCode(){
		return 'cancel';
	}

	static getTagName(){
		return 'crud-sample-item-delete-dialog';
	}

	_constructSocket(){
		return new CRUDSampleItemDeleteDialogSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}
