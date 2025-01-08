/**
 * @module KoiMainSidebar
 * A simple panel that can contain 
 * other components whose purpose is to display left menu items.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiBaseControl } from "../control.js";

export class KoiMainSidebar extends KoiBaseControl {

	static getTagName(){
		return 'koi-main-sidebar';
	}

	static getTag({element_id, contents}){
		let tag_name = this.getTagName();
		return '<' + tag_name + ' id="' + element_id + '" class="main-sidebar">' + 
			contents + 
		'</' + tag_name + '>';
	}

}
