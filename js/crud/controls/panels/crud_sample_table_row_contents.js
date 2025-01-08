/**
 * @module CRUDSampleTableRowContents
 * A panel that represents a record as a table row within the CRUD panel. 
 * The table row displays the state of a single record's provider. It 
 * includes the record's data and a record management panel component. 
 * The row processes commands from the record management panel and 
 * forwards them to the single record's provider.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiCompositeSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
import { KoiPanel } from "../../../../libs/web-components-lib/controls/panels/control_panel.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { CRUDItemDataConnectorInteractable } from "../../crud_item_data_object.js";
import { KoiOperationsInterceptable } from "../../../../libs/web-components-lib/event_operated.js";
import { CRUDSampleItemDeleteDialog } from "../dialogs/crud_sample_item_delete_dialog.js";
import { CRUDSampleItemEditDialog } from "../dialogs/crud_sample_item_edit_dialog.js";

import { CRUDSampleControlPanel } from "../panels/crud_sample_control_panel.js";
if (customElements.get(CRUDSampleControlPanel.getTagName()) === undefined) {
	customElements.define(CRUDSampleControlPanel.getTagName(), CRUDSampleControlPanel);
}

export class CRUDSampleTableRowContentsSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	displayWaiting(){
		this._hide('row');
		this._hide('error');
		this._show('loading');
	}

	displayError(){
		this._hide('row');
		this._show('error');
		this._hide('loading');
	}

	displayNormalState(){
		this._show('row');
		this._hide('error');
		this._hide('loading');
	}

	getTemplate(){
		return '<div id="' + this.getID('row') + '" class="row">' +
			'<div id="' + this.getID('item_id') + '" class="col col-md-1 border-bottom">id</div>' +
			'<div id="' + this.getID('item_name') + '" class="col col-md-4 border-bottom">name</div>' +
			'<div id="' + this.getID('deleted') + '" class="col col-md-2 border-bottom">del</div>' +
			'<div id="' + this.getID('controls') + '" class="col col-md-5 border-bottom">' +
				CRUDSampleControlPanel.getTag({
					element_id: this._holder.id + '_control_panel',
					provider_id: this._holder._getProviderId()
				}) +
			'</div>' +
		'</div>' +
		'<div id="' + this.getID('loading') + '" class="row d-none">' +
			'<div class="col border-bottom p-3">' +
				'Loading...' +
			'</div>' +
		'</div>' +
		'<div id="' + this.getID('error') + '" class="row d-none">' +
			'<div class="col border-bottom p-3">' +
				'Error...' +
			'</div>' +
		'</div>';
	}

	displayItemProperties({item_id, item_name, deleted}){
		this._setInnerHTML('item_id', item_id);
		this._setInnerHTML('item_name', item_name);
		this._setInnerHTML('deleted', deleted);
		if(deleted){
			this._holder.hide();
		}
	}

	_getEmptySchemaIds(){
		return {
			row: this._holder.id + '_row',
			item_id: this._holder.id + '_item_id',
			item_name: this._holder.id + '_item_name',
			deleted: this._holder.id + '_deleted',
			controls: this._holder.id + '_controls',
			loading: this._holder.id + '_loading',
			error: this._holder.id + '_error'
		};
	}

}

export class CRUDSampleTableRowContents extends KoiSocketConnectable(
	CRUDItemDataConnectorInteractable(
		KoiOperationsInterceptable(
			KoiPanel
		)
	)
) {

	static getTagName(){
		return 'crud-sample-table-row-contents';
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
		this.socket.displayItemProperties(
			this._getItemPropertiesFromConnectorEventDetail(
				this._getConnectorEventDetail()
			)
		);
		this.socket.displayNormalState();
	}

	_handleOperated(event_detail){
		if(this._getItemActionFromOperationData(event_detail.data) == CRUDSampleItemEditDialog.getApplyActionCode()){
			this._attemptChangeItemName(
				this._getItemValueFromOperationData(event_detail.data)
			);
		}else if(this._getItemActionFromOperationData(event_detail.data) == CRUDSampleItemDeleteDialog.getApplyActionCode()){
			this._attemptDeleteItem();
		}
	}

	_constructSocket(){
		return new CRUDSampleTableRowContentsSocket({
			holder: this
		});
	}

}
