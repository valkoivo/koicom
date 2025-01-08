/**
 * @module CRUDItemDataConnector
 * A connector for a provider that operates on data of type CRUDItemData.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiSingleConnector } from "./../../libs/web-components-lib/connector.js";

export class CRUDItemDataConnector extends KoiSingleConnector {

	attemptChangeItemName(new_name){
		this._item.attemptChangeItemName(new_name);
	}

	attemptDeleteItem(){
		this._item.attemptDeleteItem();
	}

	_getEventDetails(){
		if(!this.canProvideData()){
			return undefined;
		}
		return super._getEventDetails();
	}

}
