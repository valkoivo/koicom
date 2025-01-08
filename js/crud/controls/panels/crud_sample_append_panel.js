/**
 * @module CRUDSampleAppendPanel
 * A simple component for the CRUD panel, designed to provide 
 * the user with a tool for adding a new record. It contains 
 * a dialog component that allows the user to issue a command 
 * to add a record. To prevent the user from using the dialog 
 * component when the record-adding provider is busy, 
 * the component adjusts its display based on the provider's 
 * state, hiding the dialog component.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiCompositeSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
import { KoiPanel } from "../../../../libs/web-components-lib/controls/panels/control_panel.js";
import { KoiSocketConnectable, KoiControlConnectorInteractable } from "../../../../libs/web-components-lib/controls/control.js";

import { CRUDSampleAppendItemDialog } from "../../../../js/crud/controls/dialogs/crud_sample_append_item_dialog.js";
if (customElements.get(CRUDSampleAppendItemDialog.getTagName()) === undefined) {
	customElements.define(CRUDSampleAppendItemDialog.getTagName(), CRUDSampleAppendItemDialog);
}

export class CRUDSampleAppendPanelSocket extends KoiSocketTemplateCapable(
	KoiCompositeSocket
) {

	displayWaiting(){
		this._hide('dialog');
		this._hide('error');
		this._show('spinner');
	}

	displayError(){
		this._hide('dialog');
		this._show('error');
		this._hide('spinner');
	}

	displayNormalState(){
		this._show('dialog');
		this._hide('error');
		this._hide('spinner');
	}

	getTemplate(){
		return '<div class="d-none" id="' + this.getID('dialog') + '">' +
			CRUDSampleAppendItemDialog.getTag({
				element_id: this._holder.id + '_dialog',
				message: 'Append an Item',
				apply_caption: 'Append',
				cancel_caption: 'Cancel',
				element_class: ''
			}) +
		'</div>' +
		'<div class="alert alert-primary mb-0" role="alert" id="' + this.getID('spinner') + '">Loading...</div>' +
		'<div class="alert alert-danger d-none mb-0" role="alert" id="' + this.getID('error') + '">Error</div>';
	}

	_getEmptySchemaIds(){
		return {
			dialog: this._holder.id + '_dialog_holder',
			spinner: this._holder.id + '_spinner',
			error: this._holder.id + '_error'
		};
	}

}

export class CRUDSampleAppendPanel extends KoiControlConnectorInteractable(
	KoiSocketConnectable(
		KoiPanel
	)
) {

	static getTagName(){
		return 'crud-sample-append-panel';
	}

	static getTag({element_id, provider_id, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : 'class="mb-3 d-block"';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" provider_id="' + provider_id + 
			'" ' + str_element_class + 
			' ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_displayWaiting(){
		super._displayWaiting();
		this.socket.displayWaiting();
	}

	_displayError(){
		super._displayError();
		this.socket.displayError();
	}

	_updateSocket(){
		super._updateSocket();
		this.socket.displayNormalState();
	}

	_constructSocket(){
		return new CRUDSampleAppendPanelSocket({
			holder: this
		});
	}

}
