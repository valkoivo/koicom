/**
 * @module DocsSamplePanelWithTransmitter
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiTransmitter can accumulate changed data.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { KoiFormFieldChangesInterceptable } from "../../../../libs/web-components-lib/controls/forms/event_form_field_change.js";

import { DocsSampleTransmitter } from "../../../../js/docs/providers/docs_sample_transmitter.js";
if (customElements.get(DocsSampleTransmitter.getTagName()) === undefined) {
	customElements.define(DocsSampleTransmitter.getTagName(), DocsSampleTransmitter);
}
import { DocsConnectedLabel } from "../../../../js/docs/controls/labels/docs_label_connected.js";
if (customElements.get(DocsConnectedLabel.getTagName()) === undefined) {
	customElements.define(DocsConnectedLabel.getTagName(), DocsConnectedLabel);
}
import { DocsSampleProvider } from "../../../../js/docs/providers/docs_sample_provider.js";
if (customElements.get(DocsSampleProvider.getTagName()) === undefined) {
	customElements.define(DocsSampleProvider.getTagName(), DocsSampleProvider);
}
import { KoiConnectedFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string_connected.js";
if (customElements.get(KoiConnectedFormFieldString.getTagName()) === undefined) {
	customElements.define(KoiConnectedFormFieldString.getTagName(), KoiConnectedFormFieldString);
}

class DocsSamplePanelWithTransmitterSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		let provider_id = this._holder.id + '_provider';
		return '<div class="row">' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						'Provider:' +
						DocsSampleProvider.getTag({
							element_id: provider_id,
							value: 'initial value'
						}) +
						DocsConnectedLabel.getTag({
							element_id: this._holder.id + '_label1',
							provider_id
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						'Editor:' +
						KoiConnectedFormFieldString.getTag({
							element_id: this._holder.id + '_input',
							field_name: 'value',
							provider_id,
							placeholder: 'This value is obtained from the KoiProvider',
							debug_mode: false
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						'Transmitter:' +
						DocsSampleTransmitter.getTag({
							element_id: this.getID(),
							provider_id
						}) +
						DocsConnectedLabel.getTag({
							element_id: this._holder.id + '_label2',
							provider_id: this.getID()
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	updateTransmitter(value){
		this._item.attemptChangeValue(value);
	}

}

export const DocsSamplePanelWithTransmitterSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_updateTransmitter(value){
		this.socket.updateTransmitter(value);
	}

	_constructSocket(){
		return new DocsSamplePanelWithTransmitterSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithTransmitter extends DocsSamplePanelWithTransmitterSocketConnectable(
	KoiFormFieldChangesInterceptable(
		DocsSamplePanel
	)
) {

	static getTagName(){
		return 'docs-sample-panel-with-transmitter';
	}

	_handleSocketChanged(event_detail){
		this._updateTransmitter(
			this._getFormFieldValueFromEvent(event_detail)
		);
	}

}
