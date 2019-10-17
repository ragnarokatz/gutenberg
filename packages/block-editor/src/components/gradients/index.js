/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

export function __experimentalGetGradientClass( gradientSlug ) {
	if ( ! gradientSlug ) {
		return undefined;
	}
	return `has-${ gradientSlug }-gradient-background`;
}

function getGradientValueBySlug( gradients, slug ) {
	const gradient = find( gradients, [ 'slug', slug ] );
	return gradient && gradient.gradient;
}

function getGradientSlugByValue( gradients, value ) {
	const gradient = find( gradients, [ 'gradient', value ] );
	return gradient && gradient.slug;
}

export function __experimentalUseGradient( attributes, setAttributes ) {
	const gradients = useSelect( ( select ) => (
		select( 'core/block-editor' ).getSettings().gradients
	) );
	const setGradient = useCallback(
		( newGradientValue ) => {
			const slug = getGradientSlugByValue( gradients, newGradientValue );
			if ( slug ) {
				setAttributes( {
					gradient: slug,
					customGradient: undefined,
				} );
				return;
			}
			setAttributes( {
				gradient: undefined,
				customGradient: newGradientValue,
			} );
		},
		[ gradients, setAttributes ]
	);
	const { gradient, customGradient } = attributes;
	const gradientClass = __experimentalGetGradientClass( gradient );
	let gradientValue;
	if ( gradient ) {
		gradientValue = getGradientValueBySlug( gradients, gradient );
	} else {
		gradientValue = customGradient;
	}
	return { gradientClass, gradientValue, setGradient };
}
