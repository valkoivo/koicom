/**
 * @module DocsExpansionPanel
 * A simple expansion panel to give an example in the documentation.
 * This component adds two labels inside itself during initialization.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiExpansionPanel, KoiEnumeratedCompositeSocket } from "../../../../libs/web-components-lib/controls/panels/control_expansion_panel.js";

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";
if (customElements.get(KoiLabel.getTagName()) === undefined) {
	customElements.define(KoiLabel.getTagName(), KoiLabel);
}

export class DocsExpansionPanelSocket extends KoiEnumeratedCompositeSocket {

	_getTagForNewComponent(component_params){
		return KoiLabel.getTag(component_params);
	}

}

export class DocsExpansionPanel extends KoiExpansionPanel {

	static getTagName(){
		return 'docs-expansion-panel';
	}

	_displaySocket(){
		this.attemptExpandSocket({
			value: 'First Label',
			element_class: 'd-block mb-3'
		});
		this.attemptExpandSocket({
			value: 'Second Label',
			element_class: 'd-block'
		});
	}

	_constructSocket(){
		return new DocsExpansionPanelSocket({
			holder: this
		});
	}

}
