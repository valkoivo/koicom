/**
 * @module DocsSampleProvider
 * This is a sample provider with a string value.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiStringData } from "../../../libs/web-components-lib/data_objects.js";
import { KoiProvider } from "../../../libs/web-components-lib/providers/provider.js";

export class DocsSampleProvider extends KoiProvider {

	static getTagName(){
		return 'docs-sample-provider';
	}

	static getTag({element_id, value, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		let str_value = value ? 'value="' + value + '"' : '';
		return '<' + tag_name + 
			' id="' + element_id + 
			'" ' + str_value + 
			' ' + str_debug_mode + 
			' ' + str_element_class + 
			'></' + tag_name + '>';
	}

	_constructData(){
		return new KoiStringData();
	}

}
