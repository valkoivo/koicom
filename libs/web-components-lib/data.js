/**
 * @module KoiData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiState }  from './state.js';

export class KoiData {

	hasAnyValue(){
		for(let key in this._properties){
			if(this._properties[key].hasValue()){
				return true;
			}
		}
		return false;
	}

	hasAllValues(){
		for(let key in this._properties){
			if(!this._properties[key].hasValue()){
				return false;
			}
		}
		return true;
	}

	setDefaultValuesFromAttributes(element_attributes){
		for(const attr of element_attributes){
			if(this._properties.hasOwnProperty(attr.name)){
				this._properties[attr.name].setDefaultValueFromAttributeValue(attr.value);
			}
		}
	}

	_getValueOrDefaultValue(key){
		return this._properties[key].getValueOrDefaultValue();
	}

	hasErrors(){
		for (let key in this._properties) {
			if(this._properties[key].getErrorCode()){
				return true;
			}
		}
		return false;
	}

	getChangedAny(){
		for(let key in this._properties){
			if(this._properties[key].getChanged()){
				return true;
			}
		}
		return false;
	}

	setChangedAll(bool_changed){
		for (let key in this._properties) {
			this._properties[key].setChanged(bool_changed);
		}
	}

	constructProperties(){
		throw new Error('Data properties are not constructed');
	}

	constructor(){
		this.constructProperties();
	}

}

export const KoiDataCapable = Sup => class extends Sup {

	isSomethingChanged(){
		return super.isSomethingChanged() || this.data.getChangedAny();
	}

	_setNothingChanged(){
		super._setNothingChanged();
		this.data.setChangedAll(false);
	}

	_getOwnStateCodeBasedOnOwnData(){
		if(this.data.hasErrors()){
			return KoiState.getErrorCode();
		}
		return KoiState.getReadyCode();
	}

	_determineStateCode(){
		return KoiState.getWorstCode(
			super._determineStateCode(), 
			this._getOwnStateCodeBasedOnOwnData()
		);
	}

	_updateStateCodeWhenChanged(){
		this._setStateCode(
			this._determineStateCode()
		);
	}

	_updateOwnDataWhenChanged(){
		
	}

	_updateSomethingWhenChanged(){
		this._updateOwnDataWhenChanged();
		this._updateStateCodeWhenChanged();
	}

	_constructData(){
		throw new Error('Data object is not constructed for ' + this.id);
	}

	_onConstructed() {
		super._onConstructed();
		this.data = this._constructData();
	}

	_prepareDefaultDataValuesFromAttributes(){
		this.data.setDefaultValuesFromAttributes(this.attributes);
	}

	_onBeforeConnected(){
		super._onBeforeConnected();
		this._prepareDefaultDataValuesFromAttributes();
	}

}
