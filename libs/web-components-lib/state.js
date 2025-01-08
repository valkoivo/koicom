/**
 * @module KoiState
 * A simple state object
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

export class KoiState {

	static getInitializingCode(){
		return 'initializing';
	}

	static getLoadingCode(){
		return 'loading';
	}

	static getReadyCode(){
		return 'ready';
	}

	static getBadConnectionCode(){
		return 'badconnection';
	}

	static getErrorCode(){
		return 'error';
	}

	static getForbiddenCode(){
		return 'forbidden';
	}

	static getWorstCode(first_code, second_code){
		if([first_code, second_code].includes(KoiState.getForbiddenCode())){
			return KoiState.getForbiddenCode();
		}else if([first_code, second_code].includes(KoiState.getErrorCode())){
			return KoiState.getErrorCode();
		}else if([first_code, second_code].includes(KoiState.getBadConnectionCode())){
			return KoiState.getBadConnectionCode();
		}else if([first_code, second_code].includes(KoiState.getLoadingCode())){
			return KoiState.getLoadingCode();
		}
		return KoiState.getReadyCode();
	}

	getCode(){
		return this._code;
	}

	getError(){
		return this._error;
	}

	setError(new_error){
		this._error = new_error;
	}

	setCode(new_state_code, new_error){
		this._previous_code = this._code;
		this._code = new_state_code;
		this._error = new_error;
		this._changed = (this._previous_code !== this._code);
	}

	setChanged(){
		this._changed = true;
	}

	setNotChanged(){
		this._changed = false;
	}

	setLoading(){
		this.setCode(KoiState.getLoadingCode());
	}

	restoreCode(){
		this.setCode(this._previous_code);
		this._changed = false;
	}

	isChanged(){
		return this._changed;
	}

	isLoading(){
		return (this._code == KoiState.getLoadingCode());
	}

	isReady(){
		return (this._code == KoiState.getReadyCode());
	}

	isConnected(){
		return (this._code != KoiState.getBadConnectionCode());
	}

	isAllowed(){
		return (this._code != KoiState.getForbiddenCode());
	}

	isError(){
		return (this._code == KoiState.getErrorCode());
	}

	isAbnormal(){
		if(this.isLoading()){
			return true;
		}
		if(!this.isAllowed()){
			return true;
		}
		if(this.isError()){
			return true;
		}
		if(!this.isConnected()){
			return true;
		}
		return false;
	}

	isEqualTo(state_code){
		return this._code == state_code;
	}

	constructor(initial_state_code, initial_error = false){
		this._code = initial_state_code;
		this._error = initial_error;
		this._previous_code = initial_state_code;
		this._changed = false;
	}

}

export const KoiStateCapable = Sup => class extends Sup {

	getStateCode(){
		return this._state.getCode();
	}

	isStateAbnormal(){
		return this._state.isAbnormal();
	}

	isReady(){
		return this._state.isReady();
	}

	_setStateCode(new_state_code, new_error = false){
		if(this._state.isEqualTo(new_state_code)){
			return;
		}
		this._state.setCode(new_state_code, new_error);
	}

	isSomethingChanged(){
		return super.isSomethingChanged() || this._state.isChanged();
	}

	_setNothingChanged(){
		super._setNothingChanged();
		this._state.setNotChanged();
	}

	_updateStateCodeWhenConnected(){
		this._setStateCode(
			this._determineStateCode()
		);
	}

	_attemptSetState(new_state_code, new_error = false){
		this._log('attemptSetState() - state=' + new_state_code);
		this._setStateCode(new_state_code, new_error);
		this._onAfterChanged();
	}

	_constructState(){
		return new KoiState(KoiState.getInitializingCode());
	}

	_onConstructed() {
		super._onConstructed();
		this._state = this._constructState();
	}

}
