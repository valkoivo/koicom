/**
 * @module KoiConnectedTable
 * The table component that displays external data as a table
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiCompositeSocket, KoiSocketTemplateCapable } from "../../socket.js";
import { KoiSocketConnectable, KoiBaseControl } from "../control.js";
import { KoiControlListDataConnectorInteractable } from "../../data_objects.js";

export class KoiTableStencil extends KoiSocketConnectable(KoiBaseControl) {

	_getDataToDisplayInSocket(){

	}

	_convertDataToHeadData(data){

	}

	_getDataToDisplayInHead(){
		return this._convertDataToHeadData(
			this._getDataToDisplayInSocket()
		);
	}

	_displayDataInHead(head_data){

	}

	_displayHead(){
		this._displayDataInHead(
			this._getDataToDisplayInHead()
		);
	}

	_displaySocket(){
		this._displayHead();
	}

	_convertDataToBodyData(data){

	}

	_getDataToDisplayInBody(){
		return this._convertDataToBodyData(
			this._getDataToDisplayInSocket()
		);
	}

	_displayDataInBody(body_data){

	}

	_displayBody(){
		this._displayDataInBody(
			this._getDataToDisplayInBody()
		);
	}

	_updateSocket(){
		this._displayBody();
	}

}

export class KoiTableSocket extends KoiSocketTemplateCapable(KoiCompositeSocket) {

	getTemplate(){
		return '<table class="table table-hover">' +
			'<thead id="' + this.getID('head') + '" style="position: sticky; top: 0; z-index: 50;">' +
			'</thead>' +
			'<tbody id="' + this.getID('body') + '">' +
			'</tbody>' +
		'</table>';
	}

	_convertDataToHeadContents(head_data){
		let str_th = '';
		for(let col_i = 0; col_i < head_data.length; col_i++){
			str_th += '<th>' + head_data[col_i] + '</th>';
		}
		return '<tr>' + str_th + '</tr>';
	}

	_convertDataToBodyContents(body_data){
		let str_rows = '';
		for(let row_i = 1; row_i < body_data.length; row_i++){
			str_rows += '<tr>';
			for(let col_i = 0; col_i < body_data[row_i].length; col_i++){
				str_rows += '<td>' + body_data[row_i][col_i] + '</td>';
			}
			str_rows += '</tr>';
		};
		return str_rows;
	}

	_setHeadContents(str){
		this._setInnerHTML('head', str);
	}

	_setBodyContents(str_rows){
		this._setInnerHTML('body', str_rows);
	}

	displayHead(head_data){
		this._setHeadContents(
			this._convertDataToHeadContents(head_data)
		);
	}

	displayBody(body_data){
		this._setBodyContents(
			this._convertDataToBodyContents(body_data)
		);
	}

	_getEmptySchemaIds(){
		return {
			head: this._holder.id + '_head',
			body: this._holder.id + '_body'
		};
	}

}

export const KoiTableSocketConnectable = Sup => class extends Sup {

	_displayDataInHead(head_data){
		this.socket.displayHead(head_data);
	}

	_displayDataInBody(body_data){
		this.socket.displayBody(body_data);
	}

	_constructSocket(){
		return new KoiTableSocket({
			holder: this
		});
	}

}

export class KoiConnectedTable extends KoiControlListDataConnectorInteractable(
	KoiTableSocketConnectable(
		KoiTableStencil
	)
) {

	static getTagName(){
		return 'koi-connected-table';
	}

	static getTag({element_id, provider_id, debug_mode}){
		let tag_name = this.getTagName();
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" provider_id="' + provider_id + 
			'" ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_updateStateCodeWhenConnectorDataChanged(event_detail){
		super._updateStateCodeWhenConnectorDataChanged(event_detail);
		this._state.setChanged();
	}

	_getDataToDisplayInSocket(){
		return this._getConnectorDataFromEvent(
			this._getConnectorEventDetail()
		);
	}

	_convertDataToHeadData(data){
		return this._getItemsFromConnectorData(data)[0];
	}

	_convertDataToBodyData(data){
		return this._getItemsFromConnectorData(data);
	}

}
