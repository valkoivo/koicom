/**
 * @module CRUDSampleProvider
 * This is a sample provider for CRUD Panel.
 * It pretends to be loading data, but is actually using a timer 
 * to simulate the behavior of a request to the server.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { CRUDData } from "../crud_data_object.js";
import { KoiState } from "../../../libs/web-components-lib/state.js";
import { KoiProvider } from "../../../libs/web-components-lib/providers/provider.js";
import { CRUDDataElementListOfNames } from "../crud_data_element.js";

const CRUDFakeDataLoadable = Sup => class extends Sup {

	_convertSourceDataToProviderData(data_from_source){
		
	}

	_setOwnDataWhenLoadSuccess(data){
		
	}

	_onLoadSuccess(success_data){
		this._log('_loadDataWhenConnected() - response=success');
		this._setOwnDataWhenLoadSuccess(
			this._convertSourceDataToProviderData(success_data)
		);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	_getFakeSuccessData(){
		
	}

	_startDataLoading(){
		let success_data = this._getFakeSuccessData();
		setTimeout(this._onLoadSuccess.bind(this, success_data), 2000);
	}

	_loadDataWhenConnected(){
		this._startDataLoading();
	}

	_clearOwnData(){

	}

	attemptReload(){
		if(!this.isReady()){
			return;
		}
		this._clearOwnData();
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
		this._startDataLoading();
	}

}

export class CRUDSampleProvider extends CRUDFakeDataLoadable(
	KoiProvider
) {

	static getTagName(){
		return 'crud-sample-provider';
	}

	_convertSourceDataToProviderData(data_from_source){
		return data_from_source;
	}

	_setOwnDataWhenLoadSuccess(data){
		this.data.setItems(data);
	}

	_getFakeSuccessData(){
		return CRUDDataElementListOfNames.getSampleData();
	}

	_clearOwnData(){
		this.data.clearItems();
	}

	_getOwnStateCodeBasedOnOwnData(){
		if(!this.data.hasAllValues()){
			return KoiState.getLoadingCode();
		}
		return super._getOwnStateCodeBasedOnOwnData();
	}

	_onAfterConnected(){
		super._onAfterConnected();
		this._loadDataWhenConnected();
	}

	_constructData(){
		return new CRUDData();
	}

}
