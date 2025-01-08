/**
 * @module CRUDSampleTableContents
 * 
 * A composite component for the CRUD panel, designed to display a list 
 * of records as table rows. It connects to a data provider that 
 * supplies the records for display. When the provider's data changes, 
 * the component clears the existing rows and generates a new set. 
 * Each row consists of a provider containing the data for that 
 * specific row and a component that renders the row visually.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiExpansionPanel, KoiEnumeratedCompositeSocket } from "../../../../libs/web-components-lib/controls/panels/control_expansion_panel.js";
import { KoiControlListDataConnectorInteractable } from "../../../../libs/web-components-lib/data_objects.js";

import { CRUDSampleItemProvider } from "../../../../js/crud/providers/crud_sample_item_provider.js";
if (customElements.get(CRUDSampleItemProvider.getTagName()) === undefined) {
	customElements.define(CRUDSampleItemProvider.getTagName(), CRUDSampleItemProvider);
}
import { CRUDSampleTableRowContents } from "../../../../js/crud/controls/panels/crud_sample_table_row_contents.js";
if (customElements.get(CRUDSampleTableRowContents.getTagName()) === undefined) {
	customElements.define(CRUDSampleTableRowContents.getTagName(), CRUDSampleTableRowContents);
}

class CRUDSampleTableContentsSocket extends KoiEnumeratedCompositeSocket {

	expandSocketWithArray(body_data){
		for(let row_i = 1; row_i < body_data.length; row_i++){
			this.expandSocket({
				item_id: body_data[row_i][0],
				item_name: body_data[row_i][1],
				deleted: body_data[row_i][2]
			});
		}
	}

	removeAllComponents(){
		for(let key in this._ids){
			this._removeComponent(key);
		}
	}

	_getTagForNewComponent({element_id, item_id, item_name, deleted}){
		let provider_id = element_id + '_provider';
		let contents_id = element_id + '_contents';
		return '<div class="row" id="' + element_id + '">' +
			CRUDSampleItemProvider.getTag({
				element_id: provider_id,
				item_id,
				item_name,
				deleted,
				element_class: 'd-none'
			}) + 
			CRUDSampleTableRowContents.getTag({
				element_id: contents_id,
				provider_id: provider_id,
				element_class: ''
			}) +
		'</div>';
	}

}

export class CRUDSampleTableContents extends KoiControlListDataConnectorInteractable(
	KoiExpansionPanel
) {

	static getTagName(){
		return 'crud-sample-table-contents';
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

	_getArrayToDisplayInSocket(){
		return this._getItemsFromConnectorData(
			this._getConnectorDataFromEvent(
				this._getConnectorEventDetail()
			)
		);
	}

	_updateSocket(){
		super._updateSocket();
		this.socket.removeAllComponents();
		this.socket.expandSocketWithArray(
			this._getArrayToDisplayInSocket()
		);
	}

	_constructSocket(){
		return new CRUDSampleTableContentsSocket({
			holder: this
		});
	}

}
