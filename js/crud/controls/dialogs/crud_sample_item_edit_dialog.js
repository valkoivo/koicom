/**
 * @module CRUDSampleItemEditDialog
 * A simple component for the CRUD panel, designed 
 * to allow the user to enter a new name for a record 
 * and issue a command to update the record's name 
 * to the value they entered. It contains an input 
 * field and two buttons: an "Add" button and a 
 * "Cancel Add" button. 
 * 
 * The cancel button does not modify the component's 
 * data, so pressing it again does not trigger an event. 
 * To ensure the button triggers an event, the method 
 * _state.setChanged() is called when it is pressed.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js"
import { KoiDialogString, KoiDialogStringSocket } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_string.js";
import { KoiSingleConnectorInitializable } from "../../../../libs/web-components-lib/connector.js";

export class CRUDSampleItemEditDialogSocket extends KoiDialogStringSocket {

	getTemplate(){
		return '<div class="mb-2">' +
			this._getMessageTemplate() +
		'</div>' +
		'<div>' +
			this._getApplyButtonTemplate() +
			this._getCancelButtonTemplate() +
		'</div>';
	}

}

export class CRUDSampleItemEditDialog extends KoiSingleConnectorInitializable(
	KoiDialogString
) {

	static getApplyActionCode(){
		return 'edit_item';
	}

	static getCancelActionCode(){
		return 'cancel';
	}

	static getTagName(){
		return 'crud-sample-item-edit-dialog';
	}

	static getTag({element_id, item_id, item_value, provider_id, message, apply_caption, cancel_caption, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let _item_id = item_id? 'item_id="' + item_id + '"' : '';
		let _item_value = KoiDataElementString.canConvertToAttribute(item_value) ? 
			'item_value="' + KoiDataElementString.convertToAttribute(item_value) + '"' : '';
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + _item_id + 
			' ' + _item_value + 
			' ' + str_element_class + 
			' provider_id="' + provider_id + 
			'" message="' + message + 
			'" apply_caption="' + apply_caption + 
			'" cancel_caption="' + cancel_caption + 
			'" ' + str_debug_mode + 
			'></' + tag_name + '>';
	}

	_setOwnDataInitialValueBasedOnConnectorData(connector_data){
		this.data.setDefaultValue(
			connector_data.getItemName()
		);
	}

	_makeEventDispatchableWhenTheSameDataIsSubmitted(){
		this._state.setChanged();
	}

	_updateStateCodeWhenOperated(event_detail){
		super._updateStateCodeWhenOperated(event_detail);
		this._makeEventDispatchableWhenTheSameDataIsSubmitted();
	}

	_constructSocket(){
		return new CRUDSampleItemEditDialogSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}
