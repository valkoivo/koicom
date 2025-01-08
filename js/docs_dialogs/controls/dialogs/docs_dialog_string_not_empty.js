/**
 * @module DocsSamplePanelWithDialogStringNotEmpty
 * A simple panel to give an example in the documentation.
 * The goal is to show how KoiDialogString can react to
 * a form field's emptyvalue.
 * 
 * @version 1.0.0
 * @license MIT License
 * Copyright (c) 2025 Koi
 */

import { KoiDialogString, KoiDialogStringSocket } from "../../../../libs/web-components-lib/controls/dialogs/control_dialog_string.js"
import { KoiOperationDataConnectorInitializableFormFieldString } from "../../../../libs/web-components-lib/controls/forms/control_form_field_string_connected.js"
import { KoiOperationData } from "../../../../libs/web-components-lib/data_object_operation.js"
import { KoiDataElementString } from "../../../../libs/web-components-lib/data_element.js";

import { DocsNotAllowedToBeEmptyFormFieldData } from "../../../docs_form_field_string/controls/panels/docs_sample_panel_with_formfieldstring.js";

import { KoiIdButton } from "../../../../libs/web-components-lib/controls/buttons/control_idbutton.js";
if (customElements.get(KoiIdButton.getTagName()) === undefined) {
	customElements.define(KoiIdButton.getTagName(), KoiIdButton);
}

export class DocsOperationDataConnectorInitializableNotAllowedToBeEmptyFormFieldString extends KoiOperationDataConnectorInitializableFormFieldString {

	static getTagName(){
		return 'docs-operation-data-connector-initializable-not-empty-form-field-string';
	}

	_constructData(){
		return new DocsNotAllowedToBeEmptyFormFieldData();
	}

}

if (customElements.get(DocsOperationDataConnectorInitializableNotAllowedToBeEmptyFormFieldString.getTagName()) === undefined) {
	customElements.define(DocsOperationDataConnectorInitializableNotAllowedToBeEmptyFormFieldString.getTagName(), DocsOperationDataConnectorInitializableNotAllowedToBeEmptyFormFieldString);
}

export class DocsNotAllowedToBeEmptyOperationData extends KoiOperationData {

	constructProperties(){
		this._properties = {
			item_id: new KoiDataElementString({
				localized_name: 'item_id',
				allow_empty: true,
				default_value: null
			}),
			item_action: new KoiDataElementString({
				localized_name: 'item_action',
				allow_empty: true,
				default_value: null
			}),
			item_value: new KoiDataElementString({
				localized_name: 'item_value',
				allow_empty: false,
				default_value: ''
			})
		};
	}

	getItemValueDefined(){
		return this._properties['item_value'].getDefined();
	}

}

class DocsNotAllowedToBeEmptyDialogStringSocket extends KoiDialogStringSocket {

	_getApplyButtonTemplate(){
		return KoiIdButton.getTag({
			element_id: this.getID('first_button'),
			item_action: KoiDialogString.getApplyActionCode(),
			btn_class: 'btn-primary me-1', 
			btn_enabled: false,
			placeholder: this._apply_caption
		});
	}

	displayInitialState(item_value){
		this._setInnerHTML(
			'input_board',
			DocsOperationDataConnectorInitializableNotAllowedToBeEmptyFormFieldString.getTag({
				element_id: this._holder.id + '_form_field',
				parent_id: this._holder.id,
				placeholder: this._message
			})
		);
	}

	disableButton(){
		this._items['first_button'].disable();
	}

	enableButton(){
		this._items['first_button'].enable();
	}

}

export class DocsNotAllowedToBeEmptyDialogString extends KoiDialogString {

	static getTagName(){
		return 'docs-not-allowed-to-be-empty-dialog-string';
	}

	_constructSocket(){
		return new DocsNotAllowedToBeEmptyDialogStringSocket({
			holder: this,
			apply_caption: this.getAttribute('apply_caption'),
			cancel_caption: this.getAttribute('cancel_caption'),
			message: this.getAttribute('message')
		});
	}

	_constructData(){
		return new DocsNotAllowedToBeEmptyOperationData();
	}

	_displayError(){
		super._displayError();
		this.socket.disableButton();
	}

	_updateSocket(){
		super._updateSocket();
		if(this.data.getItemValueDefined()){
			this.socket.enableButton();
		}
	}

}
