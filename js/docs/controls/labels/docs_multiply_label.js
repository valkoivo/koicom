/**
 * @module DocsMultiplyLabel
 * A sample label to display multiplication.
 * Is used as an example in the documentation.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementInteger } from "../../../../libs/web-components-lib/data_element.js";
import { KoiData, KoiDataCapable } from "../../../../libs/web-components-lib/data.js";
import { KoiLabelStencil, KoiLabelSocket, KoiLabelSocketConnectable } from "../../../../libs/web-components-lib/controls/labels/control_label.js";

class KoiColorableLabelSocket extends KoiLabelSocket {

	displayError(){
		super.displayError();
		this._removeClass('text-bg-secondary');
		this._addClass('text-bg-danger');
	}

	displayText(text){
		super.displayText(text);
		this._removeClass('text-bg-danger');
		this._addClass('text-bg-secondary');
	}

}

const KoiColorableLabelSocketConnectable = Sup => class extends KoiLabelSocketConnectable(Sup) {

	_constructSocket(){
		return new KoiColorableLabelSocket({
			holder: this
		});
	}

}

class DocsMultiplyLabelData extends KoiData {

	constructProperties(){
		this._properties = {
			value1: new KoiDataElementInteger({
				localized_name: 'value1',
				type: 'integer',
				default_value: null,
				allow_empty: true
			}),
			value2: new KoiDataElementInteger({
				localized_name: 'value2',
				type: 'integer',
				default_value: null,
				allow_empty: true
			})
		};
	}

	getValue1(){
		return this._getValueOrDefaultValue('value1');
	}

	getValue2(){
		return this._getValueOrDefaultValue('value2');
	}

	getMultiplicationProduct(){
		return this._getValueOrDefaultValue('value1') * this._getValueOrDefaultValue('value2');
	}

}

const KoiMultiplyTwoIntegersDataCapable = Sup => class extends KoiDataCapable(Sup) {

	_constructData(){
		return new DocsMultiplyLabelData();
	}

}

export class DocsMultiplyLabel extends KoiMultiplyTwoIntegersDataCapable(
	KoiColorableLabelSocketConnectable(
		KoiLabelStencil
	)
) {

	static getTagName(){
		return 'docs-multiply-label';
	}

	static getTag({element_id, value1, value2, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : 'class="mb-3 d-block"';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + 
			' id="' + element_id + 
			'" value1="' + value1 + 
			'" value2="' + value2 + 
			'" ' + str_element_class + 
			' ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_getDataToDisplayInSocket(){
		return this.data;
	}

	_generateExpression(data){
		let value1 = data.getValue1();
		let value2 = data.getValue2();
		let product = data.getMultiplicationProduct();
		return String(value1) + ' * ' + String(value2) + ' = ' + String(product);
	}

	_convertDataToText(data){
		return this._generateExpression(data);
	}

}
