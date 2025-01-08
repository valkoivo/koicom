/**
 * @module DocsMoneyLabel
 * A simple label to give an example in the documentation.
 * This component displays integer value with currency prefix.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementInteger } from "../../../../libs/web-components-lib/data_element.js";
import { KoiLabel, KoiLabelSocket } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
import { KoiStringData } from "../../../../libs/web-components-lib/data_objects.js";

export class DocsMoneyLabelSocket extends KoiLabelSocket {

	_formatText(text){
		return '&#8364; ' + text;
	}

}

export class DocsMoneyLabelData extends KoiStringData {

	constructProperties(){
		this._properties = {
			value: new KoiDataElementInteger({
				localized_name: 'value',
				default_value: null,
				allow_empty: true
			})
		};
	}

}

export class DocsMoneyLabel extends KoiLabel {

	static getTagName(){
		return 'docs-money-label';
	}

	_constructData(){
		return new DocsMoneyLabelData();
	}

	_constructSocket(){
		return new DocsMoneyLabelSocket({
			holder: this
		});
	}

}
