/**
 * @module DocsSamplePanelWithFormFieldDate
 * A simple panel to give an example in the documentation.
 * The goal is to show how KoiFormFieldDate can change
 * label's value.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementDate } from "../../../../libs/web-components-lib/data_element.js";
import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";

import { KoiFormFieldDate } from "../../../../libs/web-components-lib/controls/forms/control_form_field_date.js";
if (customElements.get(KoiFormFieldDate.getTagName()) === undefined) {
	customElements.define(KoiFormFieldDate.getTagName(), KoiFormFieldDate);
}
import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}

class DocsSamplePanelWithFormFieldDateSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

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
						KoiFormFieldDate.getTag({
							element_id: this._holder.id + '_input',
							field_name: 'some_value',
							placeholder: 'Input any value here',
							min_value: new Date('2024-01-01'),
							max_value: new Date('2024-01-10'),
							field_value: new Date('2024-01-05')
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

const DocsSamplePanelWithFormFieldDateSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_setLabelText(text){
		this.socket.setLabelText(text);
	}

	_constructSocket(){
		return new DocsSamplePanelWithFormFieldDateSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithFormFieldDate extends DocsSamplePanelWithFormFieldDateSocketConnectable(
	KoiFormFieldChangesInterceptable(
		DocsSamplePanel
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-form-field-date';
	}

	_convertFieldValueIntoText(field_value){
		return KoiDataElementDate.convertToAttribute(field_value);
	}

	_handleSocketChanged(event_detail){
		this._setLabelText(
			this._convertFieldValueIntoText(
				this._getFormFieldValueFromEvent(event_detail)
			)
		);
	}

}
