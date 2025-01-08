/**
 * @module KoiDataElement
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

class KoiDataElement {

	static canConvertToAttribute(value){
		return (value !== null) && (value != undefined) && (value !== false);
	}

	static convertToAttribute(value){
		return String(value);
	}

	_isSignificant(value){
		return (value !== null) && (value != undefined) && (value !== false);
	}

	_getTypified(value){
		if(!this._isSignificant(value)){
			return null;
		}
		return value;
	}

	_getHTML(value){
		return value;
	}

	_isFilled(value){
		return this._isSignificant(value);
	}

	getChanged(){
		return this._changed;
	}

	setChanged(changed){
		this._changed = changed;
	}

	_setDefined(defined){
		this._defined = defined;
	}

	getDefined(){
		return this._defined;
	}

	getType(){
		return 'object';
	}

	getLocalizedName(){
		return this._localized_name;
	}

	setLocalizedName(localized_name){
		this._localized_name = localized_name;
	}

	_getEmptyValue(){
		return null;
	}

	getRawValue(){
		return this._value;
	}

	_setRawValue(value){
		this._value = value;
	}

	_clearRawValue(){
		this._value = this._getEmptyValue();
	}

	getErrorCode(){
		if(this._valid){
			return null;
		}
		return this._error_code;
	}

	_setErrorCode(error_code){
		this._error_code = error_code;
	}

	_isEqualTo(new_value){
		return this._value === new_value;
	}

	_applyType(value){
		if(!value){
			return this._getEmptyValue();
		}
		return value;
	}

	setValue(new_value){
		if(this._defined && this._isEqualTo(new_value)){
			return;
		}
		this._setDefined(this._isSignificant(new_value));
		this.setChanged(true);
		this._setRawValue(this._applyType(new_value));
		this.validateValueAndMarkValidity();
	}

	clearValue(){
		this._setDefined(false);
		this.setChanged(true);
		this._clearRawValue();
		this.validateValueAndMarkValidity();
	}

	setDefaultValue(new_value){
		this._default_value = new_value;
	}

	setDefaultValueFromAttributeValue(attribute_value){
		if(!this._isSignificant(attribute_value)){
			return;
		}
		this.setDefaultValue(
			this.applyTypeToAttributeValue(attribute_value)
		);
	}

	_getValueOrDefaultValue(){
		if(this._defined){
			return this.getRawValue();
		}
		return this._default_value;
	}

	getValueOrDefaultValue(){
		return this._getValueOrDefaultValue();
	}

	getValueOrDefaultValueTypified(){
		return this._getTypified(this._getValueOrDefaultValue());
	}

	getValueAsHTML(){
		let value = this._getValueOrDefaultValue();
		if(!this._isSignificant(value)){
			return '';
		}
		return this._getHTML(value);
	}

	hasValue(){
		return this._isFilled(this._getValueOrDefaultValue());
	}

	getErrorCodeBasedOnState(){
		if(!this.hasValue() && !this._allow_empty){
			return 'validation_not_filled';
		}
		return '';
	}

	validateValueAndMarkValidity(){
		let error_code = this.getErrorCodeBasedOnState();
		this._setErrorCode(error_code);
		if(error_code){
			this._valid = false;
			return;
		}
		this._valid = true;
	}

	constructor({localized_name, allow_empty, default_value}){
		this._changed = false;
		this._defined = false;
		this._valid = true;
		this._error_code = null;
		this._localized_name = localized_name;
		this._allow_empty = allow_empty;
		this._default_value = default_value;
		this._value = this._getEmptyValue();
	}

}

export class KoiDataElementDate extends KoiDataElement {

	static canConvertToAttribute(value){
		return (value !== null) && 
			(value != undefined) && 
			(value !== '') && 
			(value !== true) && 
			(value !== false);
	}

	static convertToAttribute(value){
		return value.toISOString().substring(0, 10);
	}

	getType(){
		return 'date';
	}

	_isSignificant(value){
		return (value !== null) && 
			(value != undefined) && 
			(value !== '') && 
			(value !== true) && 
			(value !== false);
	}

	getMin(){
		return this._min;
	}

	getMax(){
		return this._max;
	}

	getMinAsHTML(){
		if(!this.getMin()){
			return '';
		}
		return this.getMin().toISOString().substring(0, 10);
	}

	getMaxAsHTML(){
		if(!this.getMax()){
			return '';
		}
		return this.getMax().toISOString().substring(0, 10);
	}

	setMin(min){
		let tmp_min = this.applyTypeToAttributeValue(min);
		if(this._default_value < tmp_min){
			this._default_value = tmp_min;
		}
		this._min = tmp_min;
	}

	setMax(max){
		let tmp_max = this.applyTypeToAttributeValue(max);
		if(this._default_value > tmp_max){
			this._default_value = tmp_max;
		}
		this._max = tmp_max;
	}

	applyTypeToAttributeValue(attribute_value){
		return new Date(attribute_value);
	}

	limitValueByMinMax(value){
		if((this._min !== null) && (this._min > value)){
			return this._min;
		}
		if((this._max !== null) && (this._max < value)){
			return this._max;
		}
		return value;
	}

	getValueOrDefaultValueMinMaxed(){
		return this.limitValueByMinMax(
			this._getValueOrDefaultValue()
		);
	}

	getErrorCodeBasedOnState(){
		let error_code = super.getErrorCodeBasedOnState();
		if(error_code){
			return error_code;
		}
		let raw_value = this.getRawValue();
		if(raw_value && (this._min !== null) && (this._min > raw_value)){
			return 'validation_out_of_borders';
		}
		if(raw_value && (this._max !== null) && (this._max < raw_value)){
			return 'validation_out_of_borders';
		}
		return '';
	}

	_getHTML(value){
		return value.toISOString().substring(0, 10);
	}

	_applyType(value){
		if(!value){
			return null;
		}
		return new Date(value);
	}

	constructor({localized_name, allow_empty, default_value, min, max}){
		super({localized_name, allow_empty, default_value});
		this._min = min;
		this._max = max;
	}

}

export class KoiDataElementNumeric extends KoiDataElement {

	_isSignificant(value){
		return (value !== null) && 
			(value != undefined) && 
			(value !== '') && 
			(value !== true) && 
			(value !== false);
	}

	getMin(){
		return this._min;
	}

	getMax(){
		return this._max;
	}

	getMinAsHTML(){
		return this.getMin();
	}

	getMaxAsHTML(){
		return this.getMax();
	}

	setMin(min){
		let tmp_min = this.applyTypeToAttributeValue(min);
		if(this._default_value < tmp_min){
			this._default_value = tmp_min;
		}
		this._min = tmp_min;
	}

	setMax(max){
		let tmp_max = this.applyTypeToAttributeValue(max);
		if(this._default_value > tmp_max){
			this._default_value = tmp_max;
		}
		this._max = tmp_max;
	}

	limitValueByMinMax(value){
		if((this._min !== null) && (this._min > value)){
			return this._min;
		}
		if((this._max !== null) && (this._max < value)){
			return this._max;
		}
		return value;
	}

	getValueOrDefaultValueMinMaxed(){
		return this.limitValueByMinMax(
			this._getValueOrDefaultValue()
		);
	}

	getErrorCodeBasedOnState(){
		let error_code = super.getErrorCodeBasedOnState();
		let raw_value = this.getRawValue();
		if(this._defined && isNaN(raw_value)){
			return 'validation_not_numeric';
		}
		if(error_code){
			return error_code;
		}
		if(raw_value && (this._min !== null) && (this._min > raw_value)){
			return 'validation_out_of_borders';
		}
		if(raw_value && (this._max !== null) && (this._max < raw_value)){
			return 'validation_out_of_borders';
		}
		return '';
	}

	constructor({localized_name, allow_empty, default_value, min, max}){
		super({localized_name, allow_empty, default_value});
		this._min = min;
		this._max = max;
	}

}

export class KoiDataElementList extends KoiDataElement {

	static convertToAttribute(value){
		return encodeURIComponent(JSON.stringify(value));
	}

	getType(){
		return 'list';
	}

	_applyType(value){
		if(!value){
			return this._getEmptyValue();
		}
		return value;
	}

	applyTypeToAttributeValue(attribute_value){
		if(attribute_value === ''){
			return [];
		}
		return attribute_value.split(',').map(element => {
			let tmp = element.trim();
			let tmp_int = parseInt(tmp);
			if(tmp == tmp_int){
				return tmp_int;
			}
			return tmp;
		});
	}

	_getEmptyValue(){
		return [];
	}

	_isSignificant(value){
		return (value !== null) && (value != undefined);
	}

	_isFilled(value){
		return this._isSignificant(value) && (value.length > 0);
	}

	getItemAtIndex(index){
		return this._getValueOrDefaultValue()[index];
	}

	getItemsCount(){
		return this._getValueOrDefaultValue().length;
	}

	_getHTML(value){
		return value.join(', ');
	}

}

export class KoiDataElementListOfIntegers extends KoiDataElementList {

	getType(){
		return 'list_of_integers';
	}

	_getEmptyValue(){
		return [];
	}

	_applyType(value){
		if(!value || !value.length){
			return this._getEmptyValue();
		}
		return value.map(element => {
			let tmp_int = parseInt(element);
			if(element == tmp_int){
				return tmp_int;
			}
			return element;
		});
	}

}

export class KoiDataElementInteger extends KoiDataElementNumeric {

	getType(){
		return 'integer';
	}

	_applyType(value){
		if ((value == null) || (!value && (value !== 0))) {
			return null;
		}
		let converted_value = parseInt(value);
		if(isNaN(converted_value)){
			return value;
		}
		return converted_value;
	}

	applyTypeToAttributeValue(attribute_value){
		return parseInt(attribute_value);
	}

	_getEmptyValue(){
		return 0;
	}

	getErrorCodeBasedOnState(){
		let error_code = super.getErrorCodeBasedOnState();
		let raw_value = this.getRawValue();
		if(this._defined && isNaN(parseInt(raw_value))){
			return 'value_has_to_be_integer';
		}
		if(error_code){
			return error_code;
		}
		return '';
	}

}

export class KoiDataElementFloat extends KoiDataElementNumeric {

	getType(){
		return 'float';
	}

	_applyType(value){
		if ((value == null) || (!value && (value !== 0))) {
			return null;
		}
		let converted_value = parseFloat(value);
		if(isNaN(converted_value)){
			return value;
		}
		return converted_value;
	}

	applyTypeToAttributeValue(attribute_value){
		return parseFloat(attribute_value);
	}

	_getEmptyValue(){
		return 0;
	}

	getErrorCodeBasedOnState(){
		let error_code = super.getErrorCodeBasedOnState();
		let raw_value = this.getRawValue();
		if(this._defined && isNaN(parseFloat(raw_value))){
			return 'value_has_to_be_float';
		}
		if(error_code){
			return error_code;
		}
		return '';
	}

}

export class KoiDataElementString extends KoiDataElement {

	getType(){
		return 'string';
	}

	_applyType(value){
		if ((value === null) || (value == undefined)) {
			return null;
		}
		if(value === false){
			return '';
		}
		return String(value);
	}

	applyTypeToAttributeValue(attribute_value){
		return attribute_value;
	}

	_getEmptyValue(){
		return '';
	}

	_isSignificant(value){
		return (value !== null) && (value != undefined);
	}

	getErrorCodeBasedOnState(){
		let error_code = super.getErrorCodeBasedOnState();
		if(error_code){
			return error_code;
		}
		if(!this._allow_empty && !this.getRawValue()){
			return 'validation_empty_string';
		}
		return '';
	}

}

export class KoiDataElementObject extends KoiDataElement {

	getType(){
		return 'object';
	}

	_applyType(value){
		if ((value === null) || (!value && (value !== 0))) {
			return null;
		}
		return value;
	}

	applyTypeToAttributeValue(attribute_value){
		return attribute_value;
	}

	getItemAtKey(key){
		return this._getValueOrDefaultValue()[key];
	}

}

export class KoiDataElementBoolean extends KoiDataElement {

	static canConvertToAttribute(value){
		return (value !== null) && (value != undefined);
	}

	getType(){
		return 'boolean';
	}

	_applyType(value){
		if (value === null) {
			return null;
		}
		return Boolean(value);
	}

	applyTypeToAttributeValue(attribute_value){
		return attribute_value === 'true';
	}

	_getEmptyValue(){
		return false;
	}

	_isSignificant(value){
		return (value !== null) && (value != undefined);
	}

	_getTypified(value){
		return value;
	}

}

export const KoiJSONable = Sup => class extends Sup {

	static convertToAttribute(value){
		return encodeURIComponent(JSON.stringify(value));
	}

	getType(){
		return 'jsonable_' + super.getType();
	}

	applyTypeToAttributeValue(attribute_value){
		if(attribute_value === ''){
			return attribute_value;
		}
		return JSON.parse(decodeURIComponent(attribute_value));
	}

}

export const KoiOptionable = Sup => class extends Sup {

	static canConvertOptionsToAttribute(value){
		return (value !== null) && (value != undefined) && (value !== false);
	}

	static convertOptionsToAttribute(value){
		return encodeURIComponent(JSON.stringify(value));
	}

	getType(){
		return 'optionable_' + super.getType();
	}

	_isSelected(option){
		return this.getValueOrDefaultValue().includes(option);
	}

	_getIndex(option){
		return this.getValueOrDefaultValue().indexOf(option);
	}

	setOptions(options){
		this._options = options;
	}

	getOptions(){
		return this._options;
	}

	constructor({localized_name, allow_empty, default_value, options}){
		super({localized_name, allow_empty, default_value});
		this._options = options;
	}

}

export const KoiBinary = Sup => class extends KoiOptionable(Sup) {

	getType(){
		return 'binary_' + super.getType();
	}

	isPrimaryOptionSet(){
		return this.getValueOrDefaultValue() === this.getPrimaryOption();
	}

	getPrimaryOption(){
		return this._options.primary_option;
	}

	getSecondaryOption(){
		return this._options.secondary_option;
	}

	setPrimaryOptionAsValue(){
		this.setValue(this._options.primary_option);
	}

	setSecondaryOptionAsValue(){
		this.setValue(this._options.secondary_option);
	}

	setPrimaryOptionFromAttributeValue(primary_option){
		this._options.primary_option = this.applyTypeToAttributeValue(primary_option);
	}

	setSecondaryOptionFromAttributeValue(secondary_option){
		this._options.secondary_option = this.applyTypeToAttributeValue(secondary_option);
	}

	constructor({localized_name, allow_empty, default_value, primary_option, secondary_option}){
		super({
			localized_name, 
			allow_empty, 
			default_value,
			options: {
				primary_option,
				secondary_option
			}
		});
	}

}

export const KoiCategorical = Sup => class extends KoiOptionable(Sup) {

	getType(){
		return 'categorical_' + super.getType();
	}

	selectOption(option){
		if(this._isSelected(option)){
			return;
		}
		let current_set_of_options = this.getValueOrDefaultValue();
		let new_set_of_options = current_set_of_options.slice(0);
		new_set_of_options.push(option);
		this.setValue(new_set_of_options);
	}

	deselectOption(option){
		if(!this._isSelected(option)){
			return;
		}
		let current_set_of_options = this.getValueOrDefaultValue();
		let new_set_of_options = current_set_of_options.slice(0);
		new_set_of_options.splice(this._getIndex(option), 1);
		this.setValue(new_set_of_options);
	}

}
