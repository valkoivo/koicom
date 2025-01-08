/**
 * @module CRUDSampleAppendItemDialog
 * This is a simple dialog component needed for a CRUD panel. 
 * It is used to obtain the name of a new entry from the user 
 * and the command to add it. The component includes an input 
 * field and an "Add" button. Since the component does not require 
 * any commands other than the "Add" command, it hides the second 
 * button provided by the base class. 
 * 
 * The component also has an additional feature. Occasionally, 
 * it is necessary to add two records with the same name. When 
 * the text in the input field remains unchanged, the component’s 
 * data remains unchanged as well, meaning that clicking the "Add" 
 * button again does not trigger the event. This makes it impossible 
 * to add a second record with the same name. To address this issue, 
 * the component calls the _state.setChanged() method each time it 
 * processes the "Add" button clicks.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js"
import { KoiDialogString, KoiDialogStringSocket } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_string.js";
import { KoiSingleConnectorInitializable } from "../../../../libs/web-components-lib/connector.js";

import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

export class CRUDSampleAppendItemDialogSocket extends KoiDialogStringSocket {

	_getHiddenCancelButtonTemplate(){
		return KoiIdButton.getTag({
			element_id: this.getID('second_button'),
			item_action: this._holder.constructor.getCancelActionCode(),
			btn_enabled: true,
			placeholder: this._cancel_caption,
			btn_class: 'd-none'
		});
	}

	_getCancelButtonTemplate(){
		return this._getHiddenCancelButtonTemplate();
	}

	getTemplate(){
		return '<div class="row">' +
			'<div class="col-6">' +
				this._getMessageTemplate() +
			'</div>' +
			'<div class="col-6">' +
				this._getApplyButtonTemplate() +
				this._getCancelButtonTemplate() +
			'</div>' +
		'</div>';
	}

}

export class CRUDSampleAppendItemDialog extends KoiDialogString {

	static getApplyActionCode(){
		return 'append_item';
	}

	static getTagName(){
		return 'crud-sample-append-item-dialog';
	}

	_makeEventDispatchableWhenTheSameDataIsSubmitted(){
		this._state.setChanged();
	}

	_updateStateCodeWhenOperated(event_detail){
		super._updateStateCodeWhenOperated(event_detail);
		this._makeEventDispatchableWhenTheSameDataIsSubmitted();
	}

	_constructSocket(){
		return new CRUDSampleAppendItemDialogSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}
