/**
 * @module KoiDialogString
 * A simple dialog component with a question, string input and two buttons.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiDialogQuestionSocket, KoiDialogQuestion } from "./control_dialog_question.js";
import { KoiDataElementString } from "../../data_element.js"
import { KoiOperationDataCapable } from "../../data_object_operation.js";
import { KoiFormFieldChangesInterceptable } from "../forms/event_form_field_change.js";
import { KoiOperationEventDispatchable } from "../../event_operated.js";

import { KoiOperationDataConnectorInitializableFormFieldString } from "../forms/control_form_field_string_connected.js";
if (customElements.get(KoiOperationDataConnectorInitializableFormFieldString.getTagName()) === undefined) {
	customElements.define(KoiOperationDataConnectorInitializableFormFieldString.getTagName(), KoiOperationDataConnectorInitializableFormFieldString);
}

export class KoiDialogStringSocket extends KoiDialogQuestionSocket {

	_getMessageTemplate(){
		return '<div id="' + this.getID('input_board') + '"></div>';
	}

	displayInitialState(){
		this._setInnerHTML(
			'input_board',
			KoiOperationDataConnectorInitializableFormFieldString.getTag({
				element_id: this._holder.id + '_form_field',
				provider_id: this._holder.id,
				placeholder: this._message
			})
		);
	}

}

export class KoiDialogString extends KoiOperationDataCapable(
	KoiFormFieldChangesInterceptable(
		KoiOperationEventDispatchable(
			KoiDialogQuestion
		)
	)
) {

	static getTagName(){
		return 'koi-dialog-string';
	}

	static getTag({element_id, item_id, item_value, message, apply_caption, cancel_caption, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let _item_id = item_id? 'item_id="' + item_id + '"' : '';
		let _item_value = KoiDataElementString.canConvertToAttribute(item_value) ? 
			'item_value="' + KoiDataElementString.convertToAttribute(item_value) + '"' : '';
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + _item_id + 
			' ' + _item_value + 
			' ' + str_element_class + 
			' message="' + message + 
			'" apply_caption="' + apply_caption + 
			'" cancel_caption="' + cancel_caption + 
			'" ' + str_debug_mode + 
			'></' + tag_name + '>';
	}

	_updateOwnDataWhenSocketChanged(event_detail){
		this.data.setValue(
			event_detail.data.getFieldValue()
		);
	}

	_stopPropagationWhenOperated(event){
		event.stopPropagation();
	}

	_updateOwnDataWhenOperated(event_detail){
		this.data.setAction(
			event_detail.data.getAction()
		);
	}

	_dispatchEventsWhenChangedAfterOperated(){
		this._dispatchOperationEvent();
	}

	_displayInitialSocketState(){
		this.socket.displayInitialState();
	}

	_displaySocket() {
		super._displaySocket();
		this._displayInitialSocketState();
	}

	_constructSocket(){
		return new KoiDialogStringSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

}
