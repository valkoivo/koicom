/**
 * @module DocsRequiredValueLabel
 * A simple label to give an example in the documentation.
 * This component displays error when data has no value.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js";
import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
import { KoiStringData } from "../../../../libs/web-components-lib/data_objects.js";

export class DocsRequiredValueLabelData extends KoiStringData {

	validate(){
		this._properties['value'].validateValueAndMarkValidity();
	}

	constructProperties(){
		this._properties = {
			value: new KoiDataElementString({
				localized_name: 'value',
				default_value: null,
				allow_empty: false
			})
		};
	}

}

export class DocsRequiredValueLabel extends KoiLabel {

	static getTagName(){
		return 'docs-required-value-label';
	}

	_constructData(){
		return new DocsRequiredValueLabelData();
	}

	_updateOwnDataWhenConnected(){
		super._updateOwnDataWhenConnected();
		this.data.validate();
	}

}
