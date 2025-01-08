/**
 * @module DocsSampleTable
 * A simple table to give an example in the documentation.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiTable } from "../../../../libs/web-components-lib/controls/tables/control_table.js";
import { KoiConnectedTable } from "../../../../libs/web-components-lib/controls/tables/control_table_connected.js";

export class DocsSampleTable extends KoiConnectedTable {

	static getTagName(){
		return 'docs-sample-table';
	}

}

export class DocsSampleSimpleTable extends KoiConnectedTable {

	static getTagName(){
		return 'docs-sample-simple-table';
	}

}
