/**
 * @module KoiCompositeSocket
 * Prototype of array of links to webcomponents
 * Used because existing HTMLCollection and NodeList are not suitable.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

export class KoiEmptySocket {

	static getEmptySchema(holder){
		return {
			holder
		};
	}

	prepare(){
		
	}

	constructor({holder}){
		this._holder = holder;
	}

}

export class KoiSingleSocket extends KoiEmptySocket {

	static getEmptySchema(holder){
		return {
			holder,
			id: holder.id + '_nested'
		};
	}

	getID(){
		return this._id;
	}

	_setID(element_id){
		this._id = element_id;
	}

	isLinked(){
		return (this._item !== null) && (typeof(this._item.isSomethingChanged) === 'function');
	}

	_collectLinks(){
		this._item = this._id ? document.getElementById(this._id) : null;
	}

	prepare(){
		this._collectLinks();
	}

	_addAndPrepare(element_id){
		this._setID(element_id);
		this._prepare();
	}

	_setInnerHTML(str){
		this._item.innerHTML = str;
	}

	_addClass(class_name){
		this._item.classList.add(class_name);
	}

	_removeClass(class_name){
		this._item.classList.remove(class_name);
	}

	_show(){
		if (typeof(this._item.show) === 'function') {
			this._item.show();
		} else {
			this._item.classList.remove('d-none');
		}
	}

	_hide(){
		if (typeof(this._item.hide) === 'function') {
			this._item.hide();
		} else {
			this._item.classList.add('d-none');
		}
	}

	_getEmptySchemaIds(){
		return this._holder.id + '_nested';
	}

	constructor({holder, id}){
		super({holder});
		this._id = id ? id : this._getEmptySchemaIds();
		this._item = null;
	}

}

export class KoiCompositeSocket extends KoiEmptySocket{

	static getEmptySchema(holder){
		return {
			holder,
			ids: {}
		};
	}

	_has(key){
		if(!this._items.hasOwnProperty(key) || !this._items[key]){
			return false;
		}
		return true;
	}

	_getIDs(){
		return this._ids;
	}

	_getID(key){
		if(!this._ids.hasOwnProperty(key)){
			throw new Error('Component does not have ' + key);
		}
		return this._ids[key];
	}

	getID(key){
		return this._getID(key);
	}

	_setID(key, element_id){
		this._ids[key] = element_id;
	}

	isLinked(){
		for(let key in this._ids){
			if(!this._items[key] || (typeof(this._items[key].isSomethingChanged) !== 'function')){
				return false;
			}
		}
		return true;
	}

	_getCount(){
		return Object.keys(this._ids).length;
	}

	_collectLink(key){
		this._items[key] = document.getElementById(this._ids[key]);
	}

	_collectLinks(){
		for(let key in this._ids){
			this._collectLink(key);
		}
	}

	prepare(){
		this._collectLinks();
	}

	_addAndPrepare({key, element_id}){
		this._setID(key, element_id);
		this._collectLink(key);
	}

	_setInnerHTML(key, str){
		this._items[key].innerHTML = str;
	}

	_show(key){
		if(!this._has(key)){
			return;
		}
		if (typeof(this._items[key].show) === 'function') {
			this._items[key].show();
		} else {
			this._items[key].classList.remove('d-none');
		}
	}

	_hide(key){
		if(!this._has(key)){
			return;
		}
		if (typeof(this._items[key].hide) === 'function') {
			this._items[key].hide();
		} else {
			this._items[key].classList.add('d-none');
		}
	}

	_getEmptySchemaIds(){
		return {};
	}

	constructor({holder}){
		super({holder});
		this._ids = this._getEmptySchemaIds();
		this._items = {};
	}

}

export const KoiSocketTemplateCapable = Sup => class extends Sup {

	getTemplate(){
		throw new Error('No template is specified for ' + this._holder.id);
	}

	_displayTemplate(){
		this._holder.innerHTML = this.getTemplate();
	}

	prepare(){
		this._displayTemplate();
		super.prepare();
	}

}
