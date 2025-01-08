/**
 * @module KoiProvider
 * Data Provider Prototype
 * 
 * @version 1.13.0
 * @license MIT License
 * Copyright (c) 2025 Koi
*/

import { KoiChangedEventDispatchable } from "../event_changed.js";
import { KoiDataCapable } from "../data.js";
import { KoiBaseElement } from "../element.js";

export class KoiProvider extends KoiDataCapable(
	KoiChangedEventDispatchable(
		KoiBaseElement
	)
) {

}
