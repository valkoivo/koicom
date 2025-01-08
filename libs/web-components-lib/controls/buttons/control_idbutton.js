/**
 * @module KoiIdButton
 * A button that sends values of it's attributes item_id and item_action
 * in a koi-operated event.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../socket.js";
import { KoiButtonStencil } from "./control_button_stencil.js";
import { KoiButtonDataCapable } from "./data_object_button.js";

export class KoiButtonNativeLinkSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		let str_link_class = this._link_class ? ' class="' + this._link_class + '" ' : '';
		return '<a ' + str_link_class + 
			' href="javascript:void(0);" id="' + this.getID() + 
			'">' + this._link_text + '</a>';
	}

	constructor({holder, id, link_class, link_text}){
		super({holder, id});
		this._link_class = link_class;
		this._link_text = link_text;
	}

}

export const KoiButtonNativeLinkSocketConnectable = Sup => class extends Sup {

	_constructSocket(){
		return new KoiButtonNativeLinkSocket({
			holder: this,
			link_class: this.getAttribute('btn_class'),
			link_text: this.innerHTML
		});
	}

}

export class KoiIdLink extends KoiButtonNativeLinkSocketConnectable(
	KoiButtonDataCapable(
		KoiButtonStencil
	)
) {

	static getTagName(){
		return 'koi-idlink';
	}

	static getTag({element_id, item_id, item_action, item_value, btn_class, placeholder, debug_mode}){
		let tag_name = this.getTagName();
		let _item_id = item_id? 'item_id="' + item_id + '"' : '';
		let _item_action = item_action? 'item_action="' + item_action + '"' : '';
		let _item_value = item_value? 'item_value="' + item_value + '"' : '';
		let _btn_class = btn_class? 'btn_class="' + btn_class + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + _item_id + 
			' ' + _item_action + 
			' ' + _item_value + 
			' ' + _btn_class + 
			' ' + str_debug_mode + 
			'>' + placeholder + '</' + tag_name + '>';
	}

	_getInterceptableOperateEventCode(){
		return 'click';
	}

}

export class KoiButtonNativeButtonSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	_getSpinnerTemplate(){
		return '<span id="' + this._spinner_id + 
			'" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" style="margin-right: 0.75rem;"></span>';
	}

	getTemplate(){
		let str_button_class = this._btn_class ? ' class="btn ' + this._btn_class + '" ' : ' class="btn btn-primary" ';
		let str_btn_type = this._btn_type ? ' type="' + this._btn_type + '" ' : ' type="button" ';
		let str_btn_enabled = this._btn_enabled ? '' : ' disabled="disabled" ';
		return '<button id="' + this.getID() + 
			'" ' + str_button_class + 
			str_btn_type + 
			str_btn_enabled + ' >' +
			this._getSpinnerTemplate() +
			this._btn_text +
		'</button>';
	}

	disable(){
		this._item.setAttribute('disabled', 'disabled');
	}

	enable(){
		this._item.removeAttribute('disabled');
	}

	showHourglass(){
		this._spinner.classList.remove("d-none");
	}

	hideHourglass(){
		this._spinner.classList.add("d-none");
	}

	_prepareSpinner(){
		this._spinner = document.getElementById(this._spinner_id);
	}

	prepare(){
		super.prepare();
		this._prepareSpinner();
	}

	constructor({holder, id, btn_class, btn_type, btn_enabled, btn_text}){
		super({holder, id});
		this._btn_class = btn_class;
		this._btn_type = btn_type;
		this._btn_enabled = btn_enabled;
		this._btn_text = btn_text;
		this._spinner_id = this._holder.id + '_spinner';
	}

}

export const KoiButtonNativeButtonSocketConnectable = Sup => class extends Sup {

	disable(){
		this.socket.disable();
	}

	enable(){
		this.socket.enable();
	}

	showHourglass(){
		this.socket.showHourglass();
	}

	hideHourglass(){
		this.socket.hideHourglass();
	}

	_constructSocket(){
		return new KoiButtonNativeButtonSocket({
			holder: this,
			btn_class: this.getAttribute('btn_class'), 
			btn_type: this.getAttribute('btn_type'), 
			btn_enabled: this.hasAttribute('btn_enabled'), 
			btn_text: this.innerHTML
		});
	}

}

export class KoiIdButton extends KoiButtonNativeButtonSocketConnectable(
	KoiButtonDataCapable(
		KoiButtonStencil
	)
) {

	static getTagName(){
		return 'koi-idbutton';
	}

	static getTag({element_id, item_id, item_action, item_value, css_class, btn_class, btn_type, btn_enabled, placeholder, debug_mode}){
		let tag_name = this.getTagName();
		let _item_id = item_id? 'item_id="' + item_id + '"' : '';
		let _item_action = item_action? 'item_action="' + item_action + '"' : '';
		let _item_value = item_value? 'item_value="' + item_value + '"' : '';
		let _css_class = css_class? 'class="' + css_class + '"' : '';
		let _btn_class = btn_class? 'btn_class="' + btn_class + '"' : '';
		let _btn_type = btn_type? 'btn_type="' + btn_type + '"' : '';
		let _btn_enabled = btn_enabled? 'btn_enabled="true"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + _item_id + 
			' ' + _item_action + 
			' ' + _item_value + 
			' ' + _css_class + 
			' ' + _btn_class + 
			' ' + _btn_type + 
			' ' + _btn_enabled + 
			' ' + str_debug_mode + 
			'>' + placeholder + '</' + tag_name + '>';
	}

	_getInterceptableOperateEventCode(){
		return 'click';
	}

}
