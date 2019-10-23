/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	IconButton,
} from '@wordpress/components';
import {
	LEFT,
	RIGHT,
	UP,
	DOWN,
	BACKSPACE,
	ENTER,
} from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import {
	URLInput,
} from '../';

const LinkControlInputSearch = ( { value, onChange, onSelect, renderSuggestions, fetchSuggestions, onReset, onKeyDown = noop, onKeyPress = noop } ) => {
	return (
		<form>
			<URLInput
				className="block-editor-link-control__search-input"
				value={ value }
				onChange={ onChange }
				onKeyDown={ ( event, suggestion ) => {
					if ( event.keyCode === ENTER ) {
						onSelect( suggestion )( event );
					}
					onKeyDown( event, suggestion );
				} }
				onKeyPress={ onKeyPress }
				placeholder={ __( 'Search or type url' ) }
				renderSuggestions={ renderSuggestions }
				fetchLinkSuggestions={ fetchSuggestions }
				handleURLSuggestions={ true }
			/>

			<IconButton
				disabled={ ! value.length }
				type="reset"
				label={ __( 'Reset' ) }
				icon="no-alt"
				className="block-editor-link-control__search-reset"
				onClick={ onReset }
			/>

		</form>
	);
};

export default LinkControlInputSearch;
