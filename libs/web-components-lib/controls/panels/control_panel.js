/**
 * @module KoiPanel
 * Used as a container for other components.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiBaseControl } from "../control.js";

export class KoiPanel extends KoiBaseControl {

	static getTagName(){
		return 'koi-panel';
	}

	static getTag({element_id, debug_mode}){
		let tag_name = this.getTagName();
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" ' + str_debug_mode + 
			'></' + tag_name + '>';
	}

}
