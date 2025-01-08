/**
 * @module DocsConnectedLabel
 * A simple label to give an example in the documentation.
 * It displays connector's data.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiConnectedLabel } from "../../../../libs/web-components-lib/controls/labels/control_label_connected.js";

export class DocsConnectedLabel extends KoiConnectedLabel {

	static getTagName(){
		return 'docs-connected-label';
	}

}
