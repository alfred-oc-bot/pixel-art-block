/**
 * Pixel Art Block
 * 
 * A Gutenberg block for creating pixel art with an interactive grid.
 */

import { registerBlockType } from '@wordpress/blocks';
import { edit } from './src/edit';
import { save } from './src/save';
import './src/styles/editor.scss';
import './src/styles/style.scss';

registerBlockType('pixel-art-block/pixel-art', {
	edit,
	save,
});
