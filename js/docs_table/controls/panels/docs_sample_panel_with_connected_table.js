/**
 * @module DocsSamplePanelWithConnectedTable
 * A simple panel to give an example in the documentation.
 * The goal is to show how a KoiConnectedTable can change its state based on connector's state.
 * The panel has a table and several buttons that change the state of the table.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiState } from "../../../../libs/web-components-lib/state.js";
import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiChangedEventDispatchable } from "../../../../libs/web-components-lib/event_changed.js";
import { DocsSamplePanelWithButtons } from "../../../../js/docs/controls/panels/docs_sample_panel_with_buttons.js";

import { KoiTable } from "../../../../libs/web-components-lib/controls/tables/control_table.js";
import { KoiConnectedTable } from "../../../../libs/web-components-lib/controls/tables/control_table_connected.js";

import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

const DocsStateChangeable = Sup => class extends Sup {

	attemptSetStateCode(new_code){
		this._attemptSetState(new_code);
	}

	_displayWaiting(){
		super._displayWaiting();
		this.hide();
	}

	_displayError(){
		super._displayError();
		this.hide();
	}

	_updateSocket(){
		super._updateSocket();
		this.show();
	}

}

class DocsStateChangeableConnectedTable extends DocsStateChangeable(
	KoiConnectedTable
) {

	static getTagName(){
		return 'docs-state-changeable-connected-table';
	}

	_convertDataToHeadData(data){
		let head_items = this._getItemsFromConnectorData(data)[0];
		let new_data = [];
		for(let j=0; j<head_items.length; j++){
			new_data[j] = 'sum(' + head_items[j] + ')';
		}
		return new_data;
	}

	_convertDataToBodyData(data){
		let all_items = this._getItemsFromConnectorData(data);
		let new_data = [
			all_items[0],
			[]
		];
		for(let j=0; j<all_items[0].length; j++){
			new_data[1][j] = 0;
		}
		for(let i=1; i < all_items.length; i++){
			for(let j=0; j<all_items[i].length; j++){
				new_data[1][j] += all_items[i][j];
			}
		}
		return new_data;
	}

}

if (customElements.get(DocsStateChangeableConnectedTable.getTagName()) === undefined) {
	customElements.define(DocsStateChangeableConnectedTable.getTagName(), DocsStateChangeableConnectedTable);
}

class DocsChangedEventDispatchableTable extends KoiChangedEventDispatchable(
	DocsStateChangeable(
		KoiTable
	)
) {

	static getTagName(){
		return 'docs-changed-event-dispatchable-table';
	}

}

if (customElements.get(DocsChangedEventDispatchableTable.getTagName()) === undefined) {
	customElements.define(DocsChangedEventDispatchableTable.getTagName(), DocsChangedEventDispatchableTable);
}

class DocsSamplePanelWithConnectedTableSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	static getSetFirstValueActionCode(){
		return 'first_button';
	}

	static getSetSecondValueActionCode(){
		return 'second_button';
	}

	static getSetTableReadyStateActionCode(){
		return 'state_ready';
	}

	static getSetTableLoadingStateActionCode(){
		return 'state_loading';
	}

	static getFirstValue(){
		return [
			['a', 'b', 'c'],
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		];
	}

	static getSecondValue(){
		return [
			['a', 'b', 'c'],
			[10, 20, 30],
			[40, 50, 60]
		];
	}

	getTemplate(){
		return '<div class="row">' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						DocsChangedEventDispatchableTable.getTag({
							element_id: this.getID(), 
							items: DocsSamplePanelWithConnectedTableSocket.getFirstValue(),
							debug_mode: false
						}) +
					'</div>' +
					'<div class="card-footer">' +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn1',
							item_action: DocsSamplePanelWithConnectedTableSocket.getSetFirstValueActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'First value'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn2',
							item_action: DocsSamplePanelWithConnectedTableSocket.getSetSecondValueActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'Second value'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_ready',
							item_action: DocsSamplePanelWithConnectedTableSocket.getSetTableReadyStateActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'State Ready'
						}) +
						KoiIdButton.getTag({
							element_id: this._holder.id + '_btn_loading',
							item_action: DocsSamplePanelWithConnectedTableSocket.getSetTableLoadingStateActionCode(),
							btn_class: 'btn-primary d-block mb-1', 
							btn_enabled: true,
							placeholder: 'State Loading'
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col">' +
				'<div class="card mb-3">' +
					'<div class="card-body">' +
						DocsStateChangeableConnectedTable.getTag({
							element_id: this._holder.id + '_connected_table', 
							provider_id: this.getID()
						}) +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	_setFirstValue(new_text){
		this._item.attemptChangeItems(
			DocsSamplePanelWithConnectedTableSocket.getFirstValue()
		);
	}

	_setSecondValue(new_text){
		this._item.attemptChangeItems(
			DocsSamplePanelWithConnectedTableSocket.getSecondValue()
		);
	}

	_setTableState(new_state){
		this._item.attemptSetStateCode(new_state);
	}

	changeTable(action){
		if(action === DocsSamplePanelWithConnectedTableSocket.getSetFirstValueActionCode()){
			this._setFirstValue();
		}else if(action === DocsSamplePanelWithConnectedTableSocket.getSetSecondValueActionCode()){
			this._setSecondValue();
		}else if(action === DocsSamplePanelWithConnectedTableSocket.getSetTableReadyStateActionCode()){
			this._setTableState(KoiState.getReadyCode());
		}else if(action === DocsSamplePanelWithConnectedTableSocket.getSetTableLoadingStateActionCode()){
			this._setTableState(KoiState.getLoadingCode());
		}
	}

}

export const DocsSamplePanelWithConnectedTableSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_changeTable(action){
		this.socket.changeTable(action);
	}

	_constructSocket(){
		return new DocsSamplePanelWithConnectedTableSocket({
			holder: this
		});
	}

}

export class DocsSamplePanelWithConnectedTable extends DocsSamplePanelWithConnectedTableSocketConnectable(
	DocsSamplePanelWithButtons
) {

	static getTagName(){
		return 'docs-sample-panel-with-connected-table';
	}

	_applyOperationToSocket(operation_data){
		this._changeTable(
			this._getItemActionFromOperationData(operation_data)
		);
	}

}
