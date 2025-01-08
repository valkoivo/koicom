/**
 * @module KoiOperationDataConnector
 * Prototype of a link to KoiOperationData provider.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiSingleConnector } from "./connector.js";

export class KoiOperationDataConnector extends KoiSingleConnector {

	_getEventDetails(){
		if(!this.canProvideData()){
			return undefined;
		}
		return this._item.getOperationEventDetails();
	}

}
