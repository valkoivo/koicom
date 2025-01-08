/**
 * @module DocsSamplePanelWithButtons
 * A panel that can contain buttons.
 * Provides a method to respond to clicks.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { DocsSamplePanel } from "../../../../js/docs/controls/panels/docs_sample_panel.js";
import { KoiOperationsInterceptable } from "../../../../libs/web-components-lib/event_operated.js";

export class DocsSamplePanelWithButtons extends KoiOperationsInterceptable(
	DocsSamplePanel
) {

	_applyOperationToSocket(operation_data){

	}

	_handleOperated(event_detail){
		super._handleOperated(event_detail);
		this._applyOperationToSocket(
			this._getOperationDataFromEvent(event_detail)
		);
	}

}
