# Pixel Art Block

A WordPress Gutenberg block that renders an interactive square grid of pixels. Users can click/tap pixels to toggle them between white and black, enabling creation of pixel art directly in the WordPress block editor.

## Features

- Interactive pixel grid (configurable size from 4×4 to 64×64)
- Default 16×16 grid
- Click or tap to toggle pixels (white ↔ black)
- Mobile-friendly with touch-friendly tap targets (minimum 44px)
- State saved to block attributes
- Responsive design

## Try It Live

[![Try in WordPress Playground](https://playground.wordpress.net/badge.svg)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/alfred-oc-bot/pixel-art-block/main/.blueprint.json)

The Pixel Art Block requires building the plugin first. See Installation instructions below.

## Requirements

- WordPress 6.0 or higher
- Node.js 18 or higher
- npm 9 or higher

## Installation

### Option 1: As a Theme/Plugin (Development)

1. Navigate to your WordPress project's `wp-content` folder
2. Create a new folder: `mu-plugins` (if it doesn't exist) or use an existing plugin
3. Copy the `pixel-art-block` folder here

### Option 2: Build for Production

1. Navigate to the block directory:
   ```bash
   cd /path/to/pixel-art-block/code
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the block:
   ```bash
   npm run build
   ```

4. The built files will be in the `build/` folder

5. Enqueue the block in your WordPress theme or plugin:
   ```php
   wp_enqueue_script('pixel-art-block-editor', plugins_url('build/index.js', __FILE__), array('wp-blocks', 'wp-element', 'wp-editor'));
   wp_enqueue_style('pixel-art-block-editor', plugins_url('build/index.css', __FILE__), array('wp-edit-blocks'));
   wp_enqueue_style('pixel-art-block', plugins_url('build/style-index.css', __FILE__));
   ```

## Development

### Start Development Server

```bash
cd /path/to/pixel-art-block/code
npm install
npm start
```

This will start the development server and watch for changes.

### Build for Production

```bash
npm run build
```

## Usage

1. In the WordPress Block Editor, click "Add Block" (+)
2. Search for "Pixel Art"
3. Click to add the block
4. Use the Inspector controls (sidebar) to:
   - Adjust grid size (4-64)
   - Clear the canvas
5. Click or tap pixels in the grid to toggle them between white and black

## Block Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| gridSize | number | 16 | Size of the grid (N×N) |
| pixels | array | [] | Flat array of 0s (white) and 1s (black) |

## File Structure

```
pixel-art-block/
├── block.json          # Block registration metadata
├── index.js            # Block registration entry point
├── package.json        # npm package configuration
├── src/
│   ├── index.js        # Block configuration
│   ├── edit.js         # Editor component
│   ├── save.js         # Frontend save component
│   ├── components/
│   │   └── PixelGrid.js    # Reusable grid component
│   └── styles/
│       ├── editor.scss     # Editor styles
│       └── style.scss      # Frontend styles
└── build/              # Compiled files (generated)
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

GPL-2.0-or-later

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
