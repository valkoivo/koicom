/**
 * @module DocsMainWrapper
 * Used as part of the page layout and can contain 
 * the main content of the page.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiMainWrapper } from "../../../../libs/web-components-lib/controls/panels/control_main_wrapper.js";
import { DocsIdLinkForHeader } from "../buttons/docs_idlink_for_header.js";

export class DocsMainWrapper extends KoiMainWrapper {

	static getTagName(){
		return 'docs-main-wrapper';
	}

	_isToggleSideBarEvent(event_detail){
		return event_detail.hasOwnProperty('data') && 
			(typeof(event_detail.data.getAction) == 'function') &&
			(event_detail.data.getAction() === DocsIdLinkForHeader.getToggleSidebarActionCode());
	}

	_isSwitchContentEvent(event_detail){
		return false;
	}

}
