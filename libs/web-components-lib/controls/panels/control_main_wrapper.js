/**
 * @module KoiMainWrapper
 * Used as part of the page layout and can contain 
 * the main content of the page.
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiOperationsInterceptable } from "../../event_operated.js";
import { KoiBaseControl } from "../control.js";

export class KoiMainWrapperStencil extends KoiOperationsInterceptable(KoiBaseControl) {

	_isToggleSideBarEvent(event_detail){

	}

	_toggleSideBar(){

	}

	_attemptToggleSideBar(event_detail){
		if(this._isToggleSideBarEvent(event_detail)){
			this._toggleSideBar();
		}
	}

	_closeSidebarOnSmallScreen(){
		if(this.classList.contains('sidebar-collapse')){
			this.classList.remove('sidebar-collapse');
		}
	}

	_isSwitchContentEvent(event_detail){

	}

	_switchContent(event_detail){
		
	}

	_attemptSwitchContent(event_detail){
		if(this._isSwitchContentEvent(event_detail)){
			this._switchContent(event_detail);
		}
	}

	_handleOperated(event_detail){
		super._handleOperated(event_detail);
		this._attemptToggleSideBar(event_detail);
		this._attemptSwitchContent(event_detail);
	}

}

export class KoiMainWrapper extends KoiMainWrapperStencil {

	static getTag({element_id, contents}){
		let tag_name = this.getTagName();
		return '<' + tag_name + ' id="' + element_id + '" class="wrapper">' + 
			contents + 
		'</' + tag_name + '>';
	}

	_toggleSideBar(event_detail){
		this.classList.toggle('sidebar-collapse');
	}

}
