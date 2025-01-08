/**
 * @module DocsLeadingConnectorInitializableLabel
 * A simple label to give an example in the documentation.
 * It is initialized with connector's data. It's initialization precedes provider.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiLabelStencil, KoiLabelSocketConnectable } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
import { KoiSingleConnectorInitializable } from "../../../../libs/web-components-lib/connector.js";

const DocsStringDataConnectorInitializable = Sup => class extends KoiSingleConnectorInitializable(Sup) {

	_getValueFromConnectorData(data){
		return data.getValue();
	}

}

export class DocsLeadingConnectorInitializableLabel extends DocsStringDataConnectorInitializable(
	KoiLabelSocketConnectable(
		KoiLabelStencil
	)
) {

	static getTagName(){
		return 'docs-leading-connector-initializable-label';
	}

	static getTag({element_id, provider_id, element_class, debug_mode}){
		let tag_name = this.getTagName();
		let str_element_class = (element_class != undefined) ? 'class="' + element_class + '"' : 'class="mb-3 d-block"';
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		return '<' + tag_name + ' id="' + element_id + 
			'" provider_id="' + provider_id + 
			'" ' + str_element_class + 
			' ' + str_debug_mode +
			'></' + tag_name + '>';
	}

	_getDataToDisplayInSocket(){
		return this._getConnectorDataFromEvent(
			this._getConnectorEventDetail()
		);
	}

	_convertDataToText(data){
		return String(this._getValueFromConnectorData(data));
	}

}
