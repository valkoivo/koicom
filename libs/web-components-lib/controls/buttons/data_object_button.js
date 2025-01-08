/**
 * @module KoiButtonData
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiBinary, KoiDataElementString } from "../../data_element.js";
import { KoiOperationData, KoiOperationDataCapable } from "../../data_object_operation.js";

export class KoiButtonData extends KoiOperationData {

}

export const KoiButtonDataCapable = Sup => class extends KoiOperationDataCapable(Sup) {

	_constructData(){
		return new KoiButtonData();
	}

}

export class KoiSwitchData extends KoiOperationData {

	setActionOptions({primary_action, secondary_action}){
		this._properties['item_action'].setPrimaryOptionFromAttributeValue(primary_action);
		this._properties['item_action'].setSecondaryOptionFromAttributeValue(secondary_action);
	}

	isActionPrimary(){
		return this._properties['item_action'].isPrimaryOptionSet();
	}

	selectPrimaryAction(){
		this._properties['item_action'].setPrimaryOptionAsValue();
	}

	selectSecondaryAction(){
		this._properties['item_action'].setSecondaryOptionAsValue();
	}

	constructProperties(){
		this._properties = {
			item_id: new KoiDataElementString({
				localized_name: 'item_id',
				allow_empty: true,
				default_value: null
			}),
			item_action: new (KoiBinary(KoiDataElementString))({
				localized_name: 'item_action',
				default_value: '',
				allow_empty: true,
				primary_option: '',
				secondary_option: ''
			}),
			item_value: new KoiDataElementString({
				localized_name: 'item_value',
				allow_empty: true,
				default_value: null
			})
		};
	}

}

export const KoiSwitchDataCapable = Sup => class extends KoiOperationDataCapable(Sup) {

	_selectPrimaryAction(){
		this.data.selectPrimaryAction();
	}

	_selectSecondaryAction(){
		this.data.selectSecondaryAction();
	}

	_isOwnDataActionPrimary() {
		return this.data.isActionPrimary();
	}

	_prepareDefaultDataValuesFromAttributes(){
		super._prepareDefaultDataValuesFromAttributes();
		this.data.setActionOptions({
			primary_action: this.getAttribute('primary_action'),
			secondary_action: this.getAttribute('secondary_action')
		});
	}

	_constructData(){
		return new KoiSwitchData();
	}

}
