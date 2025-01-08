/**
 * @module CRUDDataElementListOfNames
 * This is a sample data element for the Sample CRUD panel.
 * It can add, delete and update values in the array.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementList } from "../../libs/web-components-lib/data_element.js";

export class CRUDDataElementListOfNames extends KoiDataElementList {

	static getHeader(){
		return ['id', 'name', 'deleted'];
	}

	static getSampleData(){
		return [
			['id', 'name', 'deleted'],
			[0, 'Alex Johnson', false],
			[1, 'Taylor Smith', false],
			[2, 'Jordan Lee', false],
			[3, 'Casey Morgan', false],
			[4, 'Riley Brooks', false]
		];
	}

	static getInitialNextFreeId(){
		return 9;
	}

	_getItemIdForNewRecord(){
		let greatest_id = -1;
		for(let i=1; i<this._value.length; i++){
			if(this._value[i][0] > greatest_id){
				greatest_id = this._value[i][0];
			}
		}
		return greatest_id + 1;
	}

	_getIndexForItemId(item_id){
		for(let i=1; i<this._value.length; i++){
			if(this._value[i][0] == item_id){
				return i;
			}
		}
		return -1;
	}

	_add(item_name){
		let item_id = this._getItemIdForNewRecord();
		this._value.push([item_id, item_name, false]);
		return item_id;
	}

	add(item_name){
		this._setDefined(true);
		this.setChanged(true);
		let item_id = this._add(item_name);
		this.validateValueAndMarkValidity();
		return item_id;
	}

	_delete(item_id){
		this._value[this._getIndexForItemId(item_id)][2] = true;
	}

	delete(item_id){
		this._setDefined(true);
		this.setChanged(true);
		this._delete(item_id);
		this.validateValueAndMarkValidity();
	}

	isDeleted(item_id){
		return this._value[this._getIndexForItemId(item_id)][2];
	}

	_setName(item_id, item_name){
		this._value[this._getIndexForItemId(item_id)][1] = item_name;
	}

	setName(item_id, item_name){
		this._setDefined(true);
		this.setChanged(true);
		this._setName(item_id, item_name);
		this.validateValueAndMarkValidity();
	}

	getName(item_id){
		return this._value[this._getIndexForItemId(item_id)][1];
	}

	getItem(item_id){
		return this._value[this._getIndexForItemId(item_id)];
	}

}
