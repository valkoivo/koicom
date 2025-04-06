/**
 * @module DocsIdLinkForHeader
 * A button that sends a command to hide or show the left sidebar 
 * in the documentation interface.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiButtonNativeLinkSocket, KoiIdLink } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";

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

	_getHamburgerTemplate(){
		return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">' +
			'<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>' +
		'</svg>';
	}

	_constructSocket(){
		return new KoiButtonNativeLinkSocket({
			holder: this,
			link_class: this.getAttribute('btn_class'),
			link_text: this.innerHTML + this._getHamburgerTemplate()
		});
	}

}
