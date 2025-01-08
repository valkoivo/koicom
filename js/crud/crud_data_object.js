/**
 * @module CRUDData
 * This is a sample data object for the Sample CRUD panel.
 * It can add, delete and update items.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiListData, KoiControlListDataConnectorInteractable } from "../../libs/web-components-lib/data_objects.js";
import { CRUDDataElementListOfNames } from "./crud_data_element.js";

export class CRUDData extends KoiListData {

	clearItems(){
		this._properties['items'].clearValue();
	}

	getItem(item_id){
		return this._properties['items'].getItem(item_id);
	}

	setItemName(item_id, item_name){
		this._properties['items'].setName(item_id, item_name);
	}

	deleteItem(item_id){
		this._properties['items'].delete(item_id);
	}

	addItem(item_name){
		return this._properties['items'].add(item_name);
	}

	constructProperties(){
		this._properties = {
			items: new CRUDDataElementListOfNames({
				localized_name: 'items',
				allow_empty: true,
				default_value: []
			})
		};
	}

}

export const CRUDDataCapable = Sup => class extends KoiDataCapable(Sup) {

	_constructData(){
		return new CRUDData();
	}

}
