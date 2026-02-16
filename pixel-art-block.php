<?php
/**
 * Plugin Name: Pixel Art Block
 * Plugin URI:  https://github.com/alfred-oc-bot/pixel-art-block
 * Description: Create pixel art with an interactive grid of toggleable pixels in the block editor.
 * Version:     1.0.0
 * Author:      Your Name
 * Author URI:  https://github.com/alfred-oc-bot
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pixel-art-block
 * Domain Path: /languages
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the block on server-side to render it with dynamic PHP
 * instead of relying on JavaScript to render the saved content.
 */
function pixel_art_block_register() {
    // Register the block assets (handled by WordPress automatically)
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );

    wp_register_script(
        'pixel-art-block-editor',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_register_style(
        'pixel-art-block-editor-style',
        plugins_url( 'build/index.css', __FILE__ ),
        array(),
        $asset_file['version']
    );

    wp_register_style(
        'pixel-art-block-style',
        plugins_url( 'build/style-index.css', __FILE__ ),
        array(),
        $asset_file['version']
    );

    // Register the block
    register_block_type( 'pixel-art-block/pixel-art', array(
        'editor_script' => 'pixel-art-block-editor',
        'editor_style'  => 'pixel-art-block-editor-style',
        'style'         => 'pixel-art-block-style',
    ) );
}
add_action( 'init', 'pixel_art_block_register' );

/**
 * Load plugin translations
 */
function pixel_art_block_load_textdomain() {
    load_plugin_textdomain(
        'pixel-art-block',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'plugins_loaded', 'pixel_art_block_load_textdomain' );
