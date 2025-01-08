/**
 * @module KoiOperationData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString } from "./data_element.js";
import { KoiData, KoiDataCapable } from "./data.js";
import { KoiOperationDataConnector } from "./connector_operation.js";
import { KoiSingleConnectorInitializable } from "./connector.js";

export class KoiOperationData extends KoiData {

	getItemId(){
		return this._getValueOrDefaultValue('item_id');
	}

	getAction(){
		return this._getValueOrDefaultValue('item_action');
	}

	getValue(){
		return this._getValueOrDefaultValue('item_value');
	}

	setItemId(new_id){
		return this._properties['item_id'].setValue(new_id);
	}

	setAction(new_action){
		return this._properties['item_action'].setValue(new_action);
	}

	setValue(new_value){
		return this._properties['item_value'].setValue(new_value);
	}

	setDefaultValue(initial_value){
		this._properties['item_value'].setDefaultValue(initial_value);
	}

	clearValue(){
		this._properties['item_value'].clearValue();
	}

	constructProperties(){
		this._properties = {
			item_id: new KoiDataElementString({
				localized_name: 'item_id',
				allow_empty: true,
				default_value: null
			}),
			item_action: new KoiDataElementString({
				localized_name: 'item_action',
				allow_empty: true,
				default_value: null
			}),
			item_value: new KoiDataElementString({
				localized_name: 'item_value',
				allow_empty: true,
				default_value: null
			})
		};
	}

}

export const KoiOperationDataCapable = Sup => class extends KoiDataCapable(Sup) {

	_constructData(){
		return new KoiOperationData();
	}

}

export const KoiOperationDataConnectorInitializable = Sup => class extends KoiSingleConnectorInitializable(Sup) {

	_getValueFromConnectorData(data){
		return data.getValue();
	}

	_constructConnector(){
		return new KoiOperationDataConnector({
			holder: this, 
			id: this._getProviderId()
		});
	}

}
