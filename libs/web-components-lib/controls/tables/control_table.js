/**
 * @module KoiTable
 * The simple Table component that displays it's own data
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementList } from "../../data_element.js";
import { KoiListDataCapable } from "../../data_objects.js";
import { KoiTableStencil, KoiTableSocketConnectable } from "./control_table_connected.js";

export class KoiTable extends KoiListDataCapable(
	KoiTableSocketConnectable(
		KoiTableStencil
	)
) {

	static getTagName(){
		return 'koi-table';
	}

	static getTag({element_id, items, debug_mode}){
		let tag_name = this.getTagName();
		let str_initial_items = KoiDataElementList.canConvertToAttribute(items) ? 
			'items="' + KoiDataElementList.convertToAttribute(items) + '"' : '';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + str_initial_items + 
			' ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_getDataToDisplayInSocket(){
		return this.data;
	}

	_convertDataToHeadData(data){
		return data.getItems()[0];
	}

	_convertDataToBodyData(data){
		return data.getItems();
	}

}
