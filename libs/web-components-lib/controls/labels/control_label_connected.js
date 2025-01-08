/**
 * @module KoiConnectedLabel
 * A simple label to give an example in the documentation.
 * It displays connector's data.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiLabelStencil, KoiLabelSocketConnectable } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
import { KoiControlStringDataConnectorInteractable } from "../../../../libs/web-components-lib/data_objects.js";

export class KoiConnectedLabelStencil extends KoiLabelSocketConnectable(
	KoiControlStringDataConnectorInteractable(
		KoiLabelStencil
	)
) {

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

	_updateStateCodeWhenConnectorDataChanged(event_detail){
		super._updateStateCodeWhenConnectorDataChanged(event_detail);
		this._state.setChanged();
	}

	_convertDataToText(data){
		return String(this._getValueFromConnectorData(data));
	}

	_getDataToDisplayInSocket(){
		return this._getConnectorDataFromEvent(
			this._getConnectorEventDetail()
		);
	}

}

export class KoiConnectedLabel extends KoiConnectedLabelStencil {

	static getTagName(){
		return 'koi-connected-label';
	}

}
