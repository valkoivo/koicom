/**
 * @module DocsConnectedLabel
 * A simple label to give an example in the documentation.
 * It dispatches changed event.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { DocsSampleLabel } from "../../../../js/docs/controls/labels/docs_sample_label.js";
import { KoiChangedEventDispatchable } from "../../../../libs/web-components-lib/event_changed.js";

export class DocsChangedEventDispatchableSampleLabel extends KoiChangedEventDispatchable(
	DocsSampleLabel
) {

	static getTagName(){
		return 'docs-changed-event-dispatchable-sample-label';
	}

}
