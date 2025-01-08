/**
 * @module DocsSamplePanelWithFormFieldInteger
 * A simple panel to give an example in the documentation.
 * The goal is to show how KoiFormFieldInteger can change
 * label's value.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";

import { KoiFormFieldInteger } from "../../../../libs/web-components-lib/controls/forms/control_form_field_integer.js";
if (customElements.get(KoiFormFieldInteger.getTagName()) === undefined) {
	customElements.define(KoiFormFieldInteger.getTagName(), KoiFormFieldInteger);
}
import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}

class DocsSamplePanelWithFormFieldIntegerSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

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
						KoiFormFieldInteger.getTag({
							element_id: this._holder.id + '_input',
							field_name: 'some_value',
							placeholder: 'Input any value here',
							min_value: 5,
							max_value: 10,
							field_value: 6
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

const DocsSamplePanelWithFormFieldIntegerSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_setLabelText(text){
		this.socket.setLabelText(text);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldIntegerSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldInteger extends DocsSamplePanelWithFormFieldIntegerSocketConnectable(
	KoiFormFieldChangesInterceptable(
		DocsSamplePanel
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-integer';
	}

	_handleSocketChanged(event_detail){
		this._setLabelText(
			this._getFormFieldValueFromEvent(event_detail)
		);
	}

}
