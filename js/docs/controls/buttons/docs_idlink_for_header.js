/**
 * @module DocsIdLinkForHeader
 * A button that sends a command to hide or show the left sidebar 
 * in the documentation interface.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiIdLink } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";

export class DocsIdLinkForHeader extends KoiIdLink {

	static getToggleSidebarActionCode(){
		return 'toggle_sidebar';
	}

	static getTagName(){
		return 'docs-idlink-for-header';
	}

	_updateOwnDataWhenConnected(){
		super._updateOwnDataWhenConnected();
		this.data.setAction(
			DocsIdLinkForHeader.getToggleSidebarActionCode()
		);
	}

}
