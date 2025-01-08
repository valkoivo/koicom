/**
 * @module KoiWheelAndKeyEventsInterceptable
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

export const KoiNativeNumericSocketWheelAndKeyEventsSubscribeable = Sup => class extends Sup {

	subscribeToKeydownEvent(callback){
		this._item.addEventListener('keydown', callback);
	}

	unsubscribeFromKeydownEvent(callback){
		this._item.removeEventListener('keydown', callback);
	}

	subscribeToWheelEvent(callback){
		this._item.addEventListener('wheel', callback);
	}

	unsubscribeFromWheelEvent(callback){
		this._item.removeEventListener('wheel', callback);
	}

}

export const KoiWheelAndKeyEventsInterceptable = Sup => class extends Sup {

	_attemptApplyNativeInputKeydown(event) {
		
	}

	_attemptApplyNativeInputWheel(event) {
		
	}

	_subscribeToWheelEvent(){
		this._attemptApplyNativeInputWheelBinded = this._attemptApplyNativeInputWheel.bind(this);
		this.socket.subscribeToWheelEvent(this._attemptApplyNativeInputWheelBinded);
	}

	_unsubscribeFromWheelEvent(){
		this.socket.unsubscribeFromWheelEvent(this._attemptApplyNativeInputWheelBinded);
	}

	_subscribeToKeydownEvent(){
		this._attemptApplyNativeInputKeydownBinded = this._attemptApplyNativeInputKeydown.bind(this);
		this.socket.subscribeToKeydownEvent(this._attemptApplyNativeInputKeydownBinded);
	}

	_unsubscribeFromKeydownEvent(){
		this.socket.unsubscribeFromKeydownEvent(this._attemptApplyNativeInputKeydownBinded);
	}

	_subscribeToEvents() {
		super._subscribeToEvents();
		this._subscribeToKeydownEvent();
		this._subscribeToWheelEvent();
	}

	_unsubscribeFromEvents() {
		super._unsubscribeFromEvents();
		this._unsubscribeFromWheelEvent();
		this._unsubscribeFromKeydownEvent();
	}

}

export const KoiNumericInputWheelAndKeyEventsInterceptable = Sup => class extends KoiWheelAndKeyEventsInterceptable(Sup) {

	getPatternForKeysAllowedToPress(){
		// This has to return something like this: /^[0-9-]$/i;
	}

	_increaseInputValueWhenKeydownPressed(old_value){

	}

	_decreaseInputValueWhenKeydownPressed(old_value){

	}

	_attemptApplyNativeInputKeydown(event) {
		let starting_value = this.data.getFieldValue();
		if(!isNaN(starting_value) && (event.shiftKey === true)){
			if(event.key === 'ArrowUp'){
				event.preventDefault();
				this._increaseInputValueWhenKeydownPressed(starting_value);
				return;
			}else if(event.key === 'ArrowDown'){
				event.preventDefault();
				this._decreaseInputValueWhenKeydownPressed(starting_value);
				return;
			}
		}
		// Allow default browser's actions when Ctrl is held
		if(event.ctrlKey){
			return;
		}
		// Allow default browser's actions when arrows, enter, delete and backspace are pressed
		if(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Delete', 'Backspace', 'Tab'].includes(event.key)){
			return;
		}
		// Forbid everything except numbers and "-" (minus)
		const is_number = this.getPatternForKeysAllowedToPress().test(event.key);
		if(!is_number){
			event.preventDefault();
			return;
		}
		return;
	}

	_attemptApplyNativeInputWheel(event) {
		// In general, input type="number" responds perfectly to the mouse wheel, 
		// but if it is used in conjunction with bootstrap, then the component stops 
		// responding. The event seems to be intercepted by the window, not the input. 
		// Therefore, we need to replace the event, and then everything will work fine.
		event = event || window.event;
		return;
	}

}
