/**
 * @module CRUDSamplePanel
 * 
 * A basic component for the CRUD panel. This component is designed 
 * to demonstrate an approach to constructing CRUD panels. 
 * It combines a provider that delivers a list of records and 
 * simulates server interaction with a panel for displaying those records.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiPanel } from "../../../../libs/web-components-lib/controls/panels/control_panel.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";

import { CRUDSampleProvider } from "../../providers/crud_sample_provider.js";
if (customElements.get(CRUDSampleProvider.getTagName()) === undefined) {
	customElements.define(CRUDSampleProvider.getTagName(), CRUDSampleProvider);
}
import { CRUDSampleHeaderedFrame } from "../../controls/panels/crud_sample_headered_frame.js";
if (customElements.get(CRUDSampleHeaderedFrame.getTagName()) === undefined) {
	customElements.define(CRUDSampleHeaderedFrame.getTagName(), CRUDSampleHeaderedFrame);
}

class CRUDSamplePanelSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		return CRUDSampleProvider.getTag({
			element_id: this.getID()
		}) +
		CRUDSampleHeaderedFrame.getTag({
			element_id: this._holder.id + '_table', 
			provider_id: this.getID(),
			element_class: 'mb-0'
		});
	}

}

export const CRUDSamplePanelSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_constructSocket(){
		return new CRUDSamplePanelSocket({
			holder: this
		});
	}

}

export class CRUDSamplePanel extends CRUDSamplePanelSocketConnectable(
	KoiPanel
) {

	static getTagName(){
		return 'crud-sample-panel';
	}

}
