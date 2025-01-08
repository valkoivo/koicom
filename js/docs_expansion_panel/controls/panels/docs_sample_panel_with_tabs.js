/**
 * @module DocsSamplePanelWithTabs
 * A panel with an expansion panel to give an example in the documentation.
 * This component adds text panels when a button is clicked.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiExpansionPanel, KoiEnumeratedCompositeSocket } from "../../../../libs/web-components-lib/controls/panels/control_expansion_panel.js";
import { KoiSocketTemplateCapable, KoiSingleSocket } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

class DocsTabsSocket extends KoiEnumeratedCompositeSocket {

	_generateNewKey(new_serial_number, {tab_code}){
		return 'item_' + tab_code;
	}

	_hideActiveTab(){
		this._hide(this._getActiveKey());
	}

	_showActiveTab(){
		this._show(this._getActiveKey());
	}

	showTab(tab_code, contents){
		this._hideActiveTab();
		this.expandSocket({
			tab_code,
			contents
		});
		this._showActiveTab();
	}

	_getTagForNewComponent({element_id, contents}){
		return '<div id="' + element_id + '">' + contents + '</div>';
	}

}

class DocsTabs extends KoiExpansionPanel {

	static getTagName(){
		return 'docs-tabs';
	}

	showTab(tab_code, contents){
		this.socket.showTab(tab_code, contents);
	}

	_constructSocket(){
		return new DocsTabsSocket({
			holder: this
		});
	}

}

if (customElements.get(DocsTabs.getTagName()) === undefined) {
	customElements.define(DocsTabs.getTagName(), DocsTabs);
}

class DocsSamplePanelWithTabsSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getShowTabActionCode(){
		return 'show_tab';
	}

	getTemplate(){
		return '<div class="card mb-3">' +
			'<div class="row g-0">' +
				'<div class="col-4">' +
					'<div class="card-body">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_show_1',
							item_id: 'first_tab',
							item_action: DocsSamplePanelWithTabsSocket.getShowTabActionCode(),
							btn_enabled: true,
							placeholder: 'First',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_show_2',
							item_id: 'second_tab',
							item_action: DocsSamplePanelWithTabsSocket.getShowTabActionCode(),
							btn_enabled: true,
							placeholder: 'Second',
							btn_class: 'btn-primary d-block mb-1'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_show_3',
							item_id: 'third_tab',
							item_action: DocsSamplePanelWithTabsSocket.getShowTabActionCode(),
							btn_enabled: true,
							placeholder: 'Third',
							btn_class: 'btn-primary d-block mb-1'
						}) +
					'</div>' +
				'</div>' +
				'<div class="col-8">' +
					'<div class="card-body">' +
						DocsTabs.getTag({
							element_id: this.getID()
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	switchToTab(tab_code, contents){
		this._item.showTab(tab_code, contents);
	}

	isShowTabActionCode(action){
		return action === DocsSamplePanelWithTabsSocket.getShowTabActionCode();
	}

}

const DocsSamplePanelWithTabsSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_isShowTabActionCode(action){
		return this.socket.isShowTabActionCode(action);
	}

	_switchToTab(tab_code, contents){
		this.socket.switchToTab(tab_code, contents);
	}

}

export class DocsSamplePanelWithTabs extends DocsSamplePanelWithTabsSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-tabs';
	}

	_getContentForTabCode(tab_code){
		let contents_list = {
			'first_tab': 'This is the content of the first tab.',
			'second_tab': 'This is the content of the second tab.',
			'third_tab': 'This is the content of the third tab.'
		}
		return contents_list[tab_code];
	}

	_applyOperationToSocket(operation_data){
		let action = this._getItemActionFromOperationData(operation_data);
		if(!this._isShowTabActionCode(action)){
			return;
		}
		let tab_code = this._getItemIdFromOperationData(operation_data);
		this._switchToTab(
			tab_code,
			this._getContentForTabCode(tab_code)
		);
	}

	_onBeforeConnected(){
		super._onBeforeConnected();
	}

	_constructSocket(){
		return new DocsSamplePanelWithTabsSocket({
			holder: this
		});
	}

}
