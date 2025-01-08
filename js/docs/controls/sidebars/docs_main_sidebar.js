/**
 * @module DocsMainSidebar
 * A simple panel that can contain 
 * other components whose purpose is to display left menu items.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiMainSidebar } from "../../../../libs/web-components-lib/controls/sidebars/control_main_sidebar.js";

export class DocsMainSidebar extends KoiMainSidebar {

	static getTagName(){
		return 'docs-main-sidebar';
	}

}
