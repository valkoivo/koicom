/**
 * @module KoiTransmitter
 * A provider that loads own data from another provider.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiListData } from "../data_objects.js";
import { KoiSingleConnectorInteractable } from "../connector.js";
import { KoiProvider } from "./provider.js";

export class KoiTransmitter extends KoiSingleConnectorInteractable(KoiProvider) {

	static getTag({element_id, provider_id, debug_mode, element_class}){
		let tag_name = this.getTagName();
		let str_debug_mode = debug_mode ? 'debug_mode="true"' : '';
		let str_element_class = element_class ? 'class="' + element_class + '"' : '';
		return '<' + tag_name + 
			' id="' + element_id + 
			'" provider_id="' + provider_id + 
			'" ' + str_debug_mode + 
			' ' + str_element_class + 
			'></' + tag_name + '>';
	}


	_dispatchChangedEventWhenConnectorDataChanged(){
		this._dispatchChangedEvent();
	}

	_updateOwnDataWhenConnectorDataChanged(event_detail){
		super._updateOwnDataWhenConnectorDataChanged(event_detail);
		this._setOwnDataInitialValueBasedOnConnectorEvent(event_detail);
	}

}
