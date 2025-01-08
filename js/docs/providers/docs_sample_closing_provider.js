/**
 * @module DocsSampleClosingProvider
 * This is a sample provider with a string value.
 * It is initialized after everything else.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { DocsSampleProvider } from "../../../js/docs/providers/docs_sample_provider.js";

export class DocsSampleClosingProvider extends DocsSampleProvider {

	static getTagName(){
		return 'docs-sample-closing-provider';
	}

}
