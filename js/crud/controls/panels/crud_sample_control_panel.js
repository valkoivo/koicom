/**
 * @module CRUDSampleControlPanel
 * A simple control panel for the CRUD panel, designed to provide 
 * the user with tools to manage records. It contains an action 
 * selection dialog, a dialog that allows the user to issue a command 
 * to delete a record, and a dialog that allows the user to issue 
 * a command to change the record's name. These two commands are 
 * passed through the control panel. Other commands, intended for 
 * switching between dialog components, are executed by the panel 
 * itself, which manages the visibility of the dialogs.
 * 
 * Since one of the dialogs needs to know the provider's identifier 
 * in order to display the initial record name, the panel has 
 * a provider_id attribute and passes its value to the dialog.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiOperationsInterceptable } from "../../../../libs/web-components-lib/event_operated.js";
import { KoiPanel } from "../../../../libs/web-components-lib/controls/panels/control_panel.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";

import { CRUDSampleItemActionsDialog } from "../dialogs/crud_sample_item_actions_dialog.js";
if (customElements.get(CRUDSampleItemActionsDialog.getTagName()) === undefined) {
	customElements.define(CRUDSampleItemActionsDialog.getTagName(), CRUDSampleItemActionsDialog);
}
import { CRUDSampleItemDeleteDialog } from "../dialogs/crud_sample_item_delete_dialog.js";
if (customElements.get(CRUDSampleItemDeleteDialog.getTagName()) === undefined) {
	customElements.define(CRUDSampleItemDeleteDialog.getTagName(), CRUDSampleItemDeleteDialog);
}
import { CRUDSampleItemEditDialog } from "../dialogs/crud_sample_item_edit_dialog.js";
if (customElements.get(CRUDSampleItemEditDialog.getTagName()) === undefined) {
	customElements.define(CRUDSampleItemEditDialog.getTagName(), CRUDSampleItemEditDialog);
}

export class CRUDSampleControlPanelSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	getTemplate(){
		return CRUDSampleItemActionsDialog.getTag({
			element_id: this.getID('buttons'),
			message: '',
			apply_caption: 'Edit',
			cancel_caption: 'Delete',
			element_class: ''
		}) +
		CRUDSampleItemDeleteDialog.getTag({
			element_id: this.getID('delete_dialog'),
			message: 'Do you want to delete this record?',
			apply_caption: 'Yes',
			cancel_caption: 'No',
			element_class: 'd-none'
		}) +
		CRUDSampleItemEditDialog.getTag({
			element_id: this.getID('edit_dialog'),
			provider_id: this._provider_id,
			message: 'Enter new name:',
			apply_caption: 'Apply',
			cancel_caption: 'Cancel',
			element_class: 'd-none'
		});
	}

	showButtons(){
		this._show('buttons');
		this._hide('edit_dialog');
		this._hide('delete_dialog');
	}

	showEditDialog(){
		this._hide('buttons');
		this._show('edit_dialog');
		this._hide('delete_dialog');
	}

	showDeleteDialog(){
		this._hide('buttons');
		this._hide('edit_dialog');
		this._show('delete_dialog');
	}

	_getEmptySchemaIds(){
		return {
			buttons: this._holder.id + '_buttons',
			edit_dialog: this._holder.id + '_edit_dialog',
			delete_dialog: this._holder.id + '_delete_dialog'
		};
	}

	constructor({holder, provider_id}){
		super({holder});
		this._provider_id = provider_id;
	}

}

const CRUDSampleControlPanelSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_constructSocket(){
		return new CRUDSampleControlPanelSocket({
			holder: this,
			provider_id: this.getAttribute('provider_id')
		});
	}

	_showButtons(){
		this.socket.showButtons();
	}

	_showEditDialog(){
		this.socket.showEditDialog();
	}

	_showDeleteDialog(){
		this.socket.showDeleteDialog();
	}
}

export class CRUDSampleControlPanel extends CRUDSampleControlPanelSocketConnectable(
	KoiOperationsInterceptable(
		KoiPanel
	)
) {

	static getTagName(){
		return 'crud-sample-control-panel';
	}

	static getTag({element_id, provider_id, debug_mode}){
		let tag_name = this.getTagName();
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" provider_id="' + provider_id + 
			'" ' + str_debug_mode + 
			'></' + tag_name + '>';
	}

	_stopPropagationWhenOperated(event){
		if(event.detail.data.getAction() == CRUDSampleItemActionsDialog.getApplyActionCode()){
			event.stopPropagation();
		}else if(event.detail.data.getAction() == CRUDSampleItemActionsDialog.getCancelActionCode()){
			event.stopPropagation();
		}else if(event.detail.data.getAction() == CRUDSampleItemEditDialog.getCancelActionCode()){
			event.stopPropagation();
		}else if(event.detail.data.getAction() == CRUDSampleItemDeleteDialog.getCancelActionCode()){
			event.stopPropagation();
		}
	}

	_handleOperated(event_detail){
		if(event_detail.data.getAction() == CRUDSampleItemActionsDialog.getApplyActionCode()){
			this._showEditDialog();
		}else if(event_detail.data.getAction() == CRUDSampleItemActionsDialog.getCancelActionCode()){
			this._showDeleteDialog();
		}else{
			this._showButtons();
		}
	}

}
