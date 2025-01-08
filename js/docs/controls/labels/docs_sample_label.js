/**
 * @module DocsSampleLabel
 * A simple label to give an example in the documentation.
 * This component does nothing more than the basic KoiLabel.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiLabel } from "../../../../libs/web-components-lib/controls/labels/control_label.js";

export class DocsSampleLabel extends KoiLabel {

	static getTagName(){
		return 'docs-sample-label';
	}

	attemptSetStateCode(new_code){
		this._attemptSetState(new_code);
	}

}
