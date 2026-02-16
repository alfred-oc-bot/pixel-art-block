/**
 * Edit component for Pixel Art Block
 */

import { useState, useEffect, useCallback, memo } from '@wordpress/element';
import { 
	InspectorControls, 
	BlockControls,
	useBlockProps 
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	RangeControl, 
	Button, 
	Toolbar,
	ToolbarGroup
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Individual Pixel component (memoized for performance)
 */
const Pixel = memo(function Pixel({ isOn, onClick, row, col }) {
	const pixelStyle = {
		backgroundColor: isOn ? '#000000' : '#FFFFFF',
		border: '1px solid #E0E0E0',
		aspectRatio: '1',
		cursor: 'pointer',
		transition: 'transform 0.1s ease',
		touchAction: 'manipulation',
	};
	
	const handleClick = () => {
		onClick(row, col);
	};
	
	return (
		<button
			className="pixel-art-pixel"
			onClick={handleClick}
			style={pixelStyle}
			onMouseEnter={(e) => {
				e.target.style.transform = 'scale(1.05)';
			}}
			onMouseLeave={(e) => {
				e.target.style.transform = 'scale(1)';
			}}
			onMouseDown={(e) => {
				e.target.style.transform = 'scale(0.95)';
			}}
			onMouseUp={(e) => {
				e.target.style.transform = 'scale(1.05)';
			}}
			aria-label={`Pixel at row ${row + 1}, column ${col + 1}, ${isOn ? 'black' : 'white'}`}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick(row, col);
				}
			}}
		/>
	);
});

/**
 * Pixel Grid component
 */
function PixelGrid({ gridSize, pixels, onPixelToggle }) {
	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
		gap: '1px',
		backgroundColor: '#E0E0E0',
		border: '1px solid #8C8F94',
		padding: '1px',
		maxWidth: '400px',
		margin: '0 auto',
	};
	
	const gridPixels = [];
	
	for (let row = 0; row < gridSize; row++) {
		for (let col = 0; col < gridSize; col++) {
			const index = row * gridSize + col;
			const isOn = pixels[index] === 1;
			
			gridPixels.push(
				<Pixel
					key={`${row}-${col}`}
					row={row}
					col={col}
					isOn={isOn}
					onClick={onPixelToggle}
				/>
			);
		}
	}
	
	return (
		<div className="pixel-art-grid" style={gridStyle}>
			{gridPixels}
		</div>
	);
}

/**
 * Initialize pixels array
 */
function initializePixels(gridSize) {
	return Array(gridSize * gridSize).fill(0);
}

/**
 * Main Edit component
 */
export function edit({ attributes, setAttributes }) {
	const { gridSize, pixels } = attributes;
	const [isInitialized, setIsInitialized] = useState(false);
	
	// Initialize pixels on mount or when grid size changes
	useEffect(() => {
		const expectedLength = gridSize * gridSize;
		
		if (!pixels || pixels.length === 0) {
			// Initialize with empty (white) pixels
			setAttributes({ pixels: initializePixels(gridSize) });
			setIsInitialized(true);
		} else if (pixels.length !== expectedLength) {
			// Grid size changed - reset to avoid index issues
			setAttributes({ pixels: initializePixels(gridSize) });
			setIsInitialized(true);
		} else {
			setIsInitialized(true);
		}
	}, [gridSize]);
	
	// Handle pixel toggle
	const handlePixelToggle = useCallback((row, col) => {
		const index = row * gridSize + col;
		const newPixels = [...pixels];
		newPixels[index] = newPixels[index] === 1 ? 0 : 1;
		setAttributes({ pixels: newPixels });
	}, [gridSize, pixels, setAttributes]);
	
	// Handle grid size change
	const handleGridSizeChange = (newSize) => {
		const clampedSize = Math.max(4, Math.min(64, newSize));
		setAttributes({
			gridSize: clampedSize,
			pixels: initializePixels(clampedSize),
		});
	};
	
	// Handle clear canvas
	const handleClearCanvas = () => {
		setAttributes({ pixels: initializePixels(gridSize) });
	};
	
	const blockProps = useBlockProps({
		className: 'pixel-art-block-container',
	});
	
	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Grid Settings', 'pixel-art-block')} initialOpen={true}>
					<RangeControl
						label={__('Grid Size', 'pixel-art-block')}
						value={gridSize}
						onChange={handleGridSizeChange}
						min={4}
						max={64}
						step={1}
						help={__('Size of the pixel grid (4-64)', 'pixel-art-block')}
					/>
					<Button
						variant="secondary"
						onClick={handleClearCanvas}
						style={{ marginTop: '16px' }}
					>
						{__('Clear Canvas', 'pixel-art-block')}
					</Button>
				</PanelBody>
			</InspectorControls>
			
			<div className="pixel-art-editor">
				{isInitialized && (
					<PixelGrid
						gridSize={gridSize}
						pixels={pixels}
						onPixelToggle={handlePixelToggle}
					/>
				)}
				<p className="pixel-art-info" style={{ 
					textAlign: 'center', 
					marginTop: '16px',
					color: '#8C8F94',
					fontSize: '14px'
				}}>
					{__('Click or tap pixels to toggle between white and black', 'pixel-art-block')}
				</p>
			</div>
		</div>
	);
}
