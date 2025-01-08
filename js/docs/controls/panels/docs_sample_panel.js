/**
 * @module DocsSamplePanel
 * Used as a container for other components.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiSingleSocket, KoiSocketTemplateCapable } from "../../../../libs/web-components-lib/socket.js";
import { KoiSocketConnectable } from "../../../../libs/web-components-lib/controls/control.js";
import { KoiPanel } from "../../../../libs/web-components-lib/controls/panels/control_panel.js";

class DocsSamplePanelSocket extends KoiSocketTemplateCapable(KoiSingleSocket) {

	getTemplate(){
		return '<div id="' + this.getID() + '" class="card mb-3" style="padding: 14px;">&nbsp;</div>';
	}

}

export const DocsSamplePanelSocketConnectable = Sup => class extends KoiSocketConnectable(Sup) {

	_constructSocket(){
		return new DocsSamplePanelSocket({
			holder: this
		});
	}

}

export class DocsSamplePanel extends KoiPanel {

	static getTagName(){
		return 'docs-sample-panel';
	}

}

export class DocsTemplatedSamplePanel extends DocsSamplePanelSocketConnectable(
	KoiPanel
) {

	static getTagName(){
		return 'docs-templated-sample-panel';
	}

}
