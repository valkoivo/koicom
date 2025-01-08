/**
 * @module CRUDItemData
 * This is a sample item data object for the Sample CRUD panel.
 * It represents a single item in CRUDData.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString, KoiDataElementInteger, KoiDataElementBoolean, KoiJSONable }  from "../../libs/web-components-lib/data_element.js";
import { KoiData }  from "../../libs/web-components-lib/data.js";
import { CRUDItemDataConnector }  from "../crud/crud_connector_item.js";
import { KoiControlConnectorInteractable } from "./../../libs/web-components-lib/controls/control.js";

export class CRUDItemData extends KoiData {

	setItemId(new_id){
		this._properties['item_id'].setValue(new_id);
	}

	getItemName(){
		return this._getValueOrDefaultValue('item_name');
	}

	setItemName(new_name){
		this._properties['item_name'].setValue(new_name);
	}

	setDeleted(deleted = true){
		this._properties['deleted'].setValue(deleted);
	}

	getItemProperties(){
		return {
			item_id: this._getValueOrDefaultValue('item_id'),
			item_name: this._getValueOrDefaultValue('item_name'),
			deleted: this._getValueOrDefaultValue('deleted')
		};
	}

	constructProperties(){
		this._properties = {
			item_id: new KoiDataElementInteger({
				localized_name: 'item_id',
				default_value: null,
				allow_empty: true
			}),
			item_name: new (KoiJSONable(KoiDataElementString))({
				localized_name: 'item_name',
				default_value: null,
				allow_empty: true
			}),
			deleted: new KoiDataElementBoolean({
				localized_name: 'deleted',
				default_value: null,
				allow_empty: true
			})
		};
	}

}

export const CRUDItemDataConnectorInteractable = Sup => class extends KoiControlConnectorInteractable(Sup) {

	_getItemPropertiesFromConnectorEventDetail(event_detail){
		return event_detail.data.getItemProperties();
	}

	_attemptChangeItemName(new_name){
		this._connector.attemptChangeItemName(new_name);
	}

	_attemptDeleteItem(){
		this._connector.attemptDeleteItem();
	}

	_constructConnector(){
		return new CRUDItemDataConnector({
			holder: this, 
			id: this._getProviderId()
		});
	}

}
