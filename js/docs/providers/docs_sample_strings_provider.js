/**
 * @module DocsSampleStringsProvider
 * This is a sample provider with two string values.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../../libs/web-components-lib/data_element.js";
import { KoiData } from "../../../libs/web-components-lib/data.js";
import { KoiControlConnectorInteractable } from "../../../libs/web-components-lib/controls/control.js";
import { KoiSingleConnector } from "../../../libs/web-components-lib/connector.js";
import { KoiProvider } from "../../../libs/web-components-lib/providers/provider.js";

export class DocsSampleStringsData extends KoiData {

	getFirstValue(){
		return this._getValueOrDefaultValue('first_string');
	}

	getSecondValue(){
		return this._getValueOrDefaultValue('second_string');
	}

	setValue(key, value){
		this._properties[key].setValue(value);
	}

	constructProperties(){
		this._properties = {
			first_string: new KoiDataElementString({
				localized_name: 'first_string',
				allow_empty: false,
				default_value: 'First value'
			}),
			second_string: new KoiDataElementString({
				localized_name: 'second_string',
				allow_empty: true,
				default_value: 'Second value'
			})
		};
	}

}

export class DocsSampleStringsProvider extends KoiProvider {

	static getTagName(){
		return 'docs-sample-strings-provider';
	}

	attemptSetStateCode(new_code){
		this._attemptSetState(new_code);
	}

	_constructData(){
		return new DocsSampleStringsData();
	}

}

export const DocsSampleStringsDataConnectorInteractable = Sup => class extends KoiControlConnectorInteractable(Sup) {

	_constructConnector(){
		return new KoiSingleConnector({
			holder: this, 
			id: this._getProviderId()
		});
	}

}
