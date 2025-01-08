/**
 * @module KoiDialogQuestion
 * A simple dialog component with a question and two buttons.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiCompositeSocket, KoiSocketTemplateCapable } from "../../socket.js";
import { KoiSocketConnectable, KoiBaseControl } from "../control.js";
import { KoiOperationsInterceptable } from "../../../../libs/web-components-lib/event_operated.js";

import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

export class KoiDialogQuestionSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	_getMessageTemplate(){
		return '<div id="' + this.getID('input_board') + '">' +
			this._message +
		'</div>';
	}

	_getApplyButtonTemplate(){
		return KoiIdButton.getTag({
			element_id: this.getID('first_button'),
			item_action: this._holder.constructor.getApplyActionCode(),
			btn_class: 'btn-primary me-1', 
			btn_enabled: true,
			placeholder: this._apply_caption
		});
	}

	_getCancelButtonTemplate(){
		return KoiIdButton.getTag({
			element_id: this.getID('second_button'),
			item_action: this._holder.constructor.getCancelActionCode(),
			btn_enabled: true,
			placeholder: this._cancel_caption
		});
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="card-body">' +
				this._getMessageTemplate() +
			'</div>' +
			'<div class="card-footer">' +
				this._getApplyButtonTemplate() +
				this._getCancelButtonTemplate() +
			'</div>' +
		'</div>';
	}

	_getEmptySchemaIds(){
		return {
			'input_board': this._holder.id + '_input_board',
			'first_button': this._holder.id + '_btn1',
			'second_button': this._holder.id + '_btn2'
		};
	}

	constructor({holder, id, message, apply_caption, cancel_caption}){
		super({holder, id});
		this._message = message ? message : '';
		this._apply_caption = apply_caption ? apply_caption : 'Apply';
		this._cancel_caption = cancel_caption ? cancel_caption : 'Cancel';
	}

}

export const KoiDialogQuestionSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_constructSocket(){
		return new KoiDialogQuestionSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}

export class KoiDialogQuestion extends KoiDialogQuestionSocketConnectable(
	KoiOperationsInterceptable(
		KoiBaseControl
	)
) {

	static getApplyActionCode(){
		return 'apply';
	}

	static getCancelActionCode(){
		return 'cancel';
	}

	static getTagName(){
		return 'koi-dialog-question';
	}

	static getTag({element_id, message, apply_caption, cancel_caption, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + str_element_class + 
			' message="' + message + 
			'" apply_caption="' + apply_caption + 
			'" cancel_caption="' + cancel_caption + 
			'" ' + str_debug_mode + 
			'></' + tag_name + '>';
	}

	_stopPropagationWhenOperated(event){
		// Don't stop propagation
	}

}
