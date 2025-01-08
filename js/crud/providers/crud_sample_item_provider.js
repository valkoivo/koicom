/**
 * @module CRUDSampleItemProvider
 * This is a sample provider for CRUD Panel.
 * It pretends to be saving item data, but is actually using a timer 
 * to simulate the behavior of a request to the server.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { CRUDItemData } from "../crud_item_data_object.js";
import { KoiState } from "../../../libs/web-components-lib/state.js";
import { KoiProvider } from "../../../libs/web-components-lib/providers/provider.js";

import { KoiDataElementString, KoiDataElementInteger, KoiDataElementBoolean, KoiJSONable }  from "../../../libs/web-components-lib/data_element.js";

const CRUDItemChangeable = Sup => class extends Sup {

	_query(binded_callback){
		setTimeout(binded_callback, 2000);
	}

	_onChangeItemNameSuccess(item_name){
		this._log('attemptChangeItemName() - response=success');
		this.data.setItemName(item_name);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	attemptChangeItemName(item_name){
		if(!this.isReady()){
			return;
		}
		this._setStateCode(KoiState.getLoadingCode());
		this._onAfterChanged();
		this._query(this._onChangeItemNameSuccess.bind(this, item_name));
	}

	_onDeleteItemSuccess(){
		this._log('attemptDeleteItem() - response=success');
		this.data.setDeleted();
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	attemptDeleteItem(){
		if(!this.isReady()){
			return;
		}
		this._setStateCode(KoiState.getLoadingCode());
		this._onAfterChanged();
		this._query(this._onDeleteItemSuccess.bind(this));
	}

}

export class CRUDSampleItemProvider extends CRUDItemChangeable(KoiProvider) {

	static getTagName(){
		return 'crud-sample-item-provider';
	}

	static getTag({element_id, item_id, item_name, deleted, debug_mode}){
		let tag_name = this.getTagName();
		let _item_id = KoiDataElementInteger.canConvertToAttribute(item_id) ? 
			'item_id="' + KoiDataElementInteger.convertToAttribute(item_id) + '"' : '';
		let _item_name = (KoiJSONable(KoiDataElementString)).canConvertToAttribute(item_name) ? 
			'item_name="' + (KoiJSONable(KoiDataElementString)).convertToAttribute(item_name) + '"' : '';
		let _deleted = KoiDataElementBoolean.canConvertToAttribute(deleted) ? 
			'deleted="' + KoiDataElementBoolean.convertToAttribute(deleted) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + _item_id + 
			' ' + _item_name + 
			' ' + _deleted + 
			' ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_getOwnStateCodeBasedOnOwnData(){
		if(!this.data.hasAllValues()){
			return KoiState.getLoadingCode();
		}
		return super._getOwnStateCodeBasedOnOwnData();
	}

	_constructData(){
		return new CRUDItemData();
	}

}
