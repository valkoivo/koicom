/**
 * @module KoiLabel
 * A label is a graphical control element which displays values.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiStringDataCapable } from "../../data_objects.js";
import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../socket.js";
import { KoiSocketConnectable, KoiBaseControl } from "../control.js";

export class KoiLabelStencil extends KoiSocketConnectable(KoiBaseControl) {

	_displayWaitingMessage(){

	}

	_displayWaiting(){
		super._displayWaiting();
		this._displayWaitingMessage();
	}

	_displayErrorMessage(){

	}

	_displayError(){
		super._displayError();
		this._displayErrorMessage();
	}

	_updateTextInSocket(text){

	}

	_getDataToDisplayInSocket(){
		
	}

	_convertDataToText(data){

	}

	_getTextToDisplayInSocket(){
		return this._convertDataToText(
			this._getDataToDisplayInSocket()
		);
	}

	_updateSocket(){
		this._updateTextInSocket(
			this._getTextToDisplayInSocket()
		);
	}

}

export class KoiLabelSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		return '<span id="' + this.getID() + '" class="badge text-bg-secondary"></span>';
	}

	displayWaiting(){
		this._setInnerHTML('Loading...');
	}

	displayError(){
		this._setInnerHTML('Something went wrong');
	}

	_formatText(text){
		return text;
	}

	displayText(text){
		this._setInnerHTML(
			this._formatText(
				text
			)
		);
	}

}

export const KoiLabelSocketConnectable = Sup => class extends Sup {

	_displayWaitingMessage(){
		this.socket.displayWaiting();
	}

	_displayErrorMessage(){
		this.socket.displayError();
	}

	_updateTextInSocket(text){
		this.socket.displayText(text);
	}

	_constructSocket(){
		return new KoiLabelSocket({
			holder: this
		});
	}

}

export class KoiLabel extends KoiStringDataCapable(
	KoiLabelSocketConnectable(
		KoiLabelStencil
	)
) {

	static getTagName(){
		return 'koi-label';
	}

	static getTag({element_id, value, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : 'class="mb-3 d-block"';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + 
			' id="' + element_id + 
			'" value="' + value + 
			'" ' + str_element_class +
			' ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_getDataToDisplayInSocket(){
		return this.data;
	}

	_convertDataToText(data){
		return String(data.getValue());
	}

}
