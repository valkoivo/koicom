/**
 * @module DocsSamplePanelWithTwoFormFieldStrings
 * A simple panel to give an example in the documentation.
 * The goal is to show how a panel can combine values from
 * two KoiFormFieldString components into one dataset.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiState } from "../../../../libs/web-components-lib/state.js";
import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js";
import { KoiDataCapable } from "../../../../libs/web-components-lib/data.js";
import { KoiSocketTemplateCapable, KoiCompositeSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { DocsSampleStringsData } from "../../../../js/docs/providers/docs_sample_strings_provider.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";
import { KoiOperationsInterceptable } from "../../../../libs/web-components-lib/event_operated.js";

import { KoiFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string.js";
if (customElements.get(KoiFormFieldString.getTagName()) === undefined) {
	customElements.define(KoiFormFieldString.getTagName(), KoiFormFieldString);
}
import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}
import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}

class DocsJSONconvertibleSampleStringsData extends DocsSampleStringsData {

	constructProperties(){
		this._properties = {
			first_string: new KoiDataElementString({
				localized_name: 'first_string',
				allow_empty: true
			}),
			second_string: new KoiDataElementString({
				localized_name: 'second_string',
				allow_empty: true
			})
		};
	}

	getJSON(){
		let ar = {};
		for(let key in this._properties){
			ar[key] = this._getValueOrDefaultValue(key);
		}
		return JSON.stringify(ar);
	}

}

class DocsSamplePanelWithTwoFormFieldStringsSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row">' +
				'<div class="col">' +
					'<div class="card-body">' +
						KoiFormFieldString.getTag({
							element_id: this.getID('first_string'),
							field_name: 'first_string',
							placeholder: 'Input first value',
							element_class: 'd-block mb-2'
						}) +
						KoiFormFieldString.getTag({
							element_id: this.getID('second_string'),
							field_name: 'second_string',
							placeholder: 'Input second value',
							element_class: 'd-block mb-2'
						}) +
						KoiIdButton.getTag({
							element_id: this.getID('button'),
							item_action: DocsSamplePanelWithTwoFormFieldStrings.getSendActionCode(),
							btn_enabled: true,
							placeholder: 'Send',
							btn_class: 'btn-primary d-block'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col">' +
					'<div class="card-body">' +
						'<div id="' + this.getID('server') + '" class="alert alert-secondary" role="alert">' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_getEmptySchemaIds(){
		return {
			'server': this._holder.id + '_server',
			'button': this._holder.id + '_btn',
			'first_string': this._holder.id + '_first_string',
			'second_string': this._holder.id + '_second_string'
		};
	}

	displayLoading(){
		this._items['button'].disable();
		this._items['button'].showHourglass();
		this._items['first_string'].disable();
		this._items['second_string'].disable();
	}

	displayResponse(jsoned_data){
		this._items['server'].innerHTML = '<p>Server value:</p>' + jsoned_data;
	}

	displayReady(){
		this._items['button'].hideHourglass();
		this._items['button'].enable();
		this._items['first_string'].enable();
		this._items['second_string'].enable();
	}

}

const DocsSamplePanelWithTwoFormFieldStringsSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_constructSocket(){
		return new DocsSamplePanelWithTwoFormFieldStringsSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithTwoFormFieldStrings extends DocsSamplePanelWithTwoFormFieldStringsSocketConnectable(
	KoiFormFieldChangesInterceptable(
		KoiDataCapable(
			KoiOperationsInterceptable(
				DocsSamplePanel
			)
		)
	)
) {

	static getSendActionCode(){
		return 'send';
	}

	static getTagName(){
		return 'docs-sample-panel-with-two-form-field-strings';
	}

	_updateOwnDataWhenSocketChanged(event_detail){
		this.data.setValue(
			this._getFormFieldNameFromEvent(event_detail),
			this._getFormFieldValueFromEvent(event_detail)
		);
	}

	_updateStateCodeWhenOperated(event_detail){
		this._setStateCode(
			KoiState.getLoadingCode()
		);
	}

	_displayWaiting(){
		super._displayWaiting();
		this.socket.displayLoading();
	}

	_updateSocket(){
		this.socket.displayReady();
	}

	_displayResponse(){
		this._setStateCode(
			KoiState.getReadyCode()
		);
		this.socket.displayResponse(
			this.data.getJSON()
		);
		this._updateAppearance();
	}

	_sendData(){
		setTimeout(
			this._displayResponse.bind(this), 
			1000
		);
	}

	_handleSomethingChangedWhenOperated(){
		super._handleSomethingChangedWhenOperated();
		this._sendData();
	}

	_constructData(){
		return new DocsJSONconvertibleSampleStringsData();
	}

}
