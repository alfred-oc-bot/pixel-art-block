/**
 * Block definition for Pixel Art Block
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export const blockConfig = {
	apiVersion: 3,
	name: 'pixel-art-block/pixel-art',
	version: '1.0.0',
	title: __('Pixel Art', 'pixel-art-block'),
	category: 'media',
	description: __('Create pixel art with an interactive grid of toggleable pixels', 'pixel-art-block'),
	keywords: [
		__('pixel', 'pixel-art-block'),
		__('art', 'pixel-art-block'),
		__('grid', 'pixel-art-block'),
	],
	textdomain: 'pixel-art-block',
	supports: {
		html: false,
		align: ['wide', 'full'],
	},
	attributes: {
		gridSize: {
			type: 'number',
			default: 16,
		},
		pixels: {
			type: 'array',
			default: [],
		},
	},
};
