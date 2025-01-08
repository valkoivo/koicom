/**
 * @module KoiExpansionPanel
 * 
 * A component that manages a set of internal components.
 * Can add internal components inside its own tag.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiCompositeSocket } from "../../socket.js";
import { KoiBaseControl, KoiSocketConnectable } from "../control.js";

export class KoiExpandableCompositeSocket extends KoiCompositeSocket {

	_getTagForNewComponent({element_id}){
		return '<div id="' + element_id + '">' + element_id + '</div>';
	}

	_canExpandSocket({serial_number, key}){
		return !this._has(key);
	}

	_insertComponentToDOMAfterBegin(element_tag){
		this._inputs_holder.insertAdjacentHTML('afterbegin', element_tag);
	}

	_insertComponentToDOM(){
		this._insertComponentToDOMAfterBegin(
			this._getTagForNewComponent(component_params)
		);
	}

	_doSomethingAfterSocketExpansion(component_params){

	}

	_doSomethingWhenNotExpanded(component_params){
		
	}

	_expandSocket(component_params){
		if(!this._canExpandSocket(component_params)){
			this._doSomethingWhenNotExpanded(component_params);
			return;
		}
		this._insertComponentToDOM(component_params);
		this._addAndPrepare(component_params);
		this._doSomethingAfterSocketExpansion(component_params);
	}

	_removeComponentFromDOM(key){
		this._items[key].remove();
	}

	_removeLinksToComponent(key){
		delete this._items[key];
		delete this._ids[key];
	}

	_doSomethingAfterComponentRemoval(key){

	}

	_removeComponent(key){
		if(!this._has(key)){
			return;
		}
		this._removeComponentFromDOM(key);
		this._removeLinksToComponent(key);
		this._doSomethingAfterComponentRemoval(key);
	}

}

class KoiEnumeration {

	getLastKey(){
		let last_index = this._enumeration.length - 1;
		for(let i=last_index; i>=0; i--){
			if(typeof(this._enumeration[i]) === 'undefined'){
				continue;
			}
			return this._enumeration[i];
		}
		return '';
	}

	hasIndex(index){
		return (index in this._enumeration);
	}

	getKey(index){
		return this._enumeration[index];
	}

	setKey(index, key){
		this._enumeration[index] = key;
	}

	getIndexOfPrecedingExistingItem(new_index){
		for(let i=new_index; i>=0; i--){
			if(typeof(this._enumeration[i]) === 'undefined'){
				continue;
			}
			return i;
		}
		return -1;
	}

	generateNewIndex({order}){
		if(!order){
			return this._enumeration.length;
		}
		return parseInt(order);
	}

	_popUndefinedElementsInTail(){
		let last_index = this._enumeration.length - 1;
		for(let i=last_index; i>=0; i--){
			if(typeof(this._enumeration[i]) !== 'undefined'){
				return;
			}
			this._enumeration.pop();
		}
	}

	remove(key){
		var index = this._enumeration.indexOf(key);
		this._enumeration[index] = undefined;
		this._popUndefinedElementsInTail();
	}

	constructor(){
		this._enumeration = [];
	}

}

export const KoiSocketActiveItemCapable = Sup => class extends Sup {

	_setActiveKey(key){
		this._active_key = key;
	}

	_getActiveKey(){
		return this._active_key;
	}

	constructor(params){
		super(params);
		this._active_key = '';
	}

}

export const KoiSocketEnumerable = Sup => class extends Sup {

	_generateNewKey(new_serial_number, component_settings){
		return 'item_' + String(new_serial_number);
	}

	_generateNewID(new_serial_number, component_settings){
		return this._holder.id + '_' + this._generateNewKey(new_serial_number, component_settings);
	}

	_getIndexOfPrecedingExistingItem({serial_number}){
		return this._components_enumeration.getIndexOfPrecedingExistingItem(serial_number);
	}

	_insertNewComponentAfterExisting(element_tag, index_of_preceding_existing_item){
		let key_of_preceding_existing_item = this._components_enumeration.getKey(index_of_preceding_existing_item);
		this._items[key_of_preceding_existing_item].insertAdjacentHTML('afterend', element_tag);
	}

	_insertComponentToDOM(component_params){
		let element_tag = this._getTagForNewComponent(component_params);
		let index_of_preceding_existing_item = this._getIndexOfPrecedingExistingItem(component_params);
		if (index_of_preceding_existing_item < 0) {
			this._insertComponentToDOMAfterBegin(element_tag);
		} else {
			this._insertNewComponentAfterExisting(element_tag, index_of_preceding_existing_item);
		}
	}

	_addAndPrepare(component_params){
		super._addAndPrepare(component_params);
		this._components_enumeration.setKey(component_params['serial_number'], component_params['key']);
	}

	expandSocket(component_settings){
		let serial_number = this._components_enumeration.generateNewIndex(component_settings);
		let key = this._generateNewKey(serial_number, component_settings);
		let element_id = this._generateNewID(serial_number, component_settings);
		this._expandSocket({
			serial_number,
			key,
			element_id,
			...component_settings
		});
	}

	_removeLinksToComponent(key){
		super._removeLinksToComponent(key);
		this._components_enumeration.remove(key);
	}

	_getLastKey(){
		return this._components_enumeration.getLastKey();
	}

	_constructEnumeration(){
		return new KoiEnumeration();
	}

	_collectInputsHolder(params){
		return this._holder;
	}

	constructor(params){
		super(params);
		this._components_enumeration = this._constructEnumeration();
		this._inputs_holder = this._collectInputsHolder(params);
	}

}

export class KoiEnumeratedCompositeSocket extends KoiSocketActiveItemCapable(
	KoiSocketEnumerable(
		KoiExpandableCompositeSocket
	)
) {

	_doSomethingAfterSocketExpansion(component_params){
		super._doSomethingAfterSocketExpansion(component_params);
		this._setActiveKey(component_params['key']);
	}

	_doSomethingWhenNotExpanded(component_params){
		super._doSomethingWhenNotExpanded(component_params);
		this._setActiveKey(component_params['key']);
	}

	_doSomethingAfterComponentRemoval(key){
		super._doSomethingAfterComponentRemoval(key);
		this._setActiveKey(
			this._getLastKey()
		);
	}

}

export const KoiEnumeratedCompositeSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	attemptExpandSocket(component_settings){
		this.socket.expandSocket(component_settings);
	}

	_constructSocket(){
		return new KoiEnumeratedCompositeSocket({
			holder: this
		});
	}

}

export class KoiExpansionPanel extends KoiEnumeratedCompositeSocketConnectable(KoiBaseControl) {

}
