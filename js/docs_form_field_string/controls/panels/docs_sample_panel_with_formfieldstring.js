/**
 * @module DocsSamplePanelWithFormFieldString
 * A simple panel to give an example in the documentation.
 * The goal is to show how KoiFormFieldString can change
 * label's value.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js"
import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { KoiFormFieldData } from "../../../../libs/web-components-lib/controls/forms/data_object_form_field.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { KoiFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}

export class DocsNotAllowedToBeEmptyFormFieldData extends KoiFormFieldData {

	constructProperties(){
		this._properties = {
			field_name: new KoiDataElementString({
				localized_name: 'field_name',
				default_value: '',
				allow_empty: true
			}),
			field_value: new KoiDataElementString({
				localized_name: 'field_value',
				default_value: '',
				allow_empty: false
			})
		};
	}

}

export class DocsNotAllowedToBeEmptyFormFieldString extends KoiFormFieldString {

	static getTagName(){
		return 'docs-not-empty-form-field-string';
	}

	_constructData(){
		return new DocsNotAllowedToBeEmptyFormFieldData();
	}

}

if (customElements.get(DocsNotAllowedToBeEmptyFormFieldString.getTagName()) === undefined) {
	customElements.define(DocsNotAllowedToBeEmptyFormFieldString.getTagName(), DocsNotAllowedToBeEmptyFormFieldString);
}

class DocsSamplePanelWithFormFieldStringSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col">' +
					'<div class="card-body d-grid gap-3">' +
						KoiLabel.getTag({
							element_id: this.getID(), 
							value: 'Default value', 
							element_class: 'd-block'
						}) +
						DocsNotAllowedToBeEmptyFormFieldString.getTag({
							element_id: this._holder.id + '_input',
							field_name: 'some_value',
							placeholder: 'Input any value here'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	setLabelText(new_text){
		this._item.attemptChangeValue(new_text);
	}

}

const DocsSamplePanelWithFormFieldStringSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_setLabelText(text){
		this.socket.setLabelText(text);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldStringSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldString extends DocsSamplePanelWithFormFieldStringSocketConnectable(
	KoiFormFieldChangesInterceptable(
		DocsSamplePanel
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-string';
	}

	_handleSocketChanged(event_detail){
		this._setLabelText(
			this._getFormFieldValueFromEvent(event_detail)
		);
	}

}
