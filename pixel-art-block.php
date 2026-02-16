<?php
/**
 * Plugin Name: Pixel Art Block
 * Plugin URI:  https://github.com/alfred-oc-bot/pixel-art-block
 * Description: Create pixel art with an interactive grid of toggleable pixels in the block editor.
 * Version:     1.0.0
 * Author:      alfred-oc-bot
 * Author URI:  https://github.com/alfred-oc-bot
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pixel-art-block
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the block
 */
function pixel_art_block_register() {
    // Register with basic dependencies - build files optional
    wp_register_script(
        'pixel-art-block-editor',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        '1.0.0'
    );

    wp_register_style(
        'pixel-art-block-editor-style',
        plugins_url( 'build/index.css', __FILE__ ),
        array(),
        '1.0.0'
    );

    wp_register_style(
        'pixel-art-block-style',
        plugins_url( 'build/style-index.css', __FILE__ ),
        array(),
        '1.0.0'
    );

    // Register the block
    register_block_type( 'pixel-art-block/pixel-art', array(
        'editor_script' => 'pixel-art-block-editor',
        'editor_style'  => 'pixel-art-block-editor-style',
        'style'         => 'pixel-art-block-style',
    ) );
}
add_action( 'init', 'pixel_art_block_register' );
