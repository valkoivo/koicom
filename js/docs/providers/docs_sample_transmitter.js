/**
 * @module DocsSampleTransmitter
 * This is a sample provider with a string value.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiStringData } from "../../../libs/web-components-lib/data_objects.js";
import { KoiTransmitter } from "../../../libs/web-components-lib/providers/transmitter.js";

export class DocsSampleTransmitter extends KoiTransmitter {

	static getTagName(){
		return 'docs-sample-transmitter';
	}

	_setOwnDataInitialValueBasedOnConnectorData(connector_data){
		this.data.setValue(
			connector_data.getValue()
		);
	}

	attemptChangeValue(new_value){
		this._log('attemptChangeValue() - ' + new_value);
		this.data.setValue(new_value);
		this._updateSomethingWhenChanged();
		this._onAfterChanged();
	}

	_constructData(){
		return new KoiStringData();
	}

}
