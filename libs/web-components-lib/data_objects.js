/**
 * @module KoiStringData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDataElementString, KoiDataElementDate, KoiDataElementInteger, KoiDataElementList, KoiJSONable }  from './data_element.js';
import { KoiData, KoiDataCapable }  from "./data.js";
import { KoiSingleConnector } from "./../../libs/web-components-lib/connector.js";
import { KoiControlConnectorInteractable } from "./../../libs/web-components-lib/controls/control.js";

export const KoiDataValueChangeable = Sup => class extends Sup {

	getValue(){
		return this._getValueOrDefaultValue('value');
	}

	getValueAsHTML(){
		return this._properties['value'].getValueAsHTML();
	}

	setValue(new_value){
		this._properties['value'].setValue(new_value);
	}

}

export class KoiStringData extends KoiDataValueChangeable(KoiData) {

	constructProperties(){
		this._properties = {
			value: new KoiDataElementString({
				localized_name: 'value',
				default_value: null,
				allow_empty: true
			})
		};
	}

}

export const KoiStringDataCapable = Sup => class extends KoiDataCapable(Sup) {

	attemptChangeValue(new_value){
		this._log('attemptChangeValue() - ' + new_value);
		this.data.setValue(new_value);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	_constructData(){
		return new KoiStringData();
	}

}

export const KoiControlStringDataConnectorInteractable = Sup => class extends KoiControlConnectorInteractable(Sup) {

	_getValueFromConnectorData(data){
		return data.getValue();
	}

}

export class KoiIntegerData extends KoiDataValueChangeable(KoiData) {

	constructProperties(){
		this._properties = {
			value: new KoiDataElementInteger({
				localized_name: 'value',
				default_value: null,
				allow_empty: true
			})
		};
	}

}

export const KoiIntegerDataCapable = Sup => class extends KoiDataCapable(Sup) {

	attemptChangeValue(new_value){
		this._log('attemptChangeValue() - ' + new_value);
		this.data.setValue(new_value);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	_constructData(){
		return new KoiIntegerData();
	}

}

export class KoiDateData extends KoiDataValueChangeable(KoiData) {

	constructProperties(){
		this._properties = {
			value: new KoiDataElementDate({
				localized_name: 'value',
				default_value: null,
				allow_empty: true
			})
		};
	}

}

export const KoiDateDataCapable = Sup => class extends KoiDataCapable(Sup) {

	attemptChangeValue(new_value){
		this._log('attemptChangeValue() - ' + new_value);
		this.data.setValue(new_value);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	_constructData(){
		return new KoiDateData();
	}

}

export class KoiListData extends KoiData {

	setItems(new_data){
		this._properties['items'].setValue(new_data);
	}

	getItems(){
		return this._getValueOrDefaultValue('items');
	}

	getItemsAsHTML(){
		return this._properties['items'].getValueAsHTML();
	}

	constructProperties(){
		this._properties = {
			items: new (KoiJSONable(KoiDataElementList))({
				localized_name: 'items',
				default_value: [],
				allow_empty: true
			})
		};
	}

}

export const KoiListDataCapable = Sup => class extends KoiDataCapable(Sup) {

	attemptChangeItems(new_data){
		this._log('attemptChangeItems() - ' + new_data);
		this.data.setItems(new_data);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	_constructData(){
		return new KoiListData();
	}

}

export const KoiControlListDataConnectorInteractable = Sup => class extends KoiControlConnectorInteractable(Sup) {

	_getItemsFromConnectorData(data){
		return data.getItems();
	}

}
