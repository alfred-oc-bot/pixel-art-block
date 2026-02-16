/**
 * Save component for Pixel Art Block
 */

import { useBlockProps } from '@wordpress/block-editor';

export function save({ attributes }) {
	const { gridSize, pixels } = attributes;
	const blockProps = useBlockProps.save({
		className: 'pixel-art-block-container',
	});
	
	// Ensure pixels is a valid array
	const pixelData = Array.isArray(pixels) && pixels.length === gridSize * gridSize 
		? pixels 
		: Array(gridSize * gridSize).fill(0);
	
	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
		gap: '1px',
		backgroundColor: '#E0E0E0',
		border: '1px solid #8C8F94',
		padding: '1px',
		maxWidth: '600px',
		margin: '0 auto',
	};
	
	const pixelElements = [];
	
	for (let row = 0; row < gridSize; row++) {
		for (let col = 0; col < gridSize; col++) {
			const index = row * gridSize + col;
			const isOn = pixelData[index] === 1;
			
			pixelElements.push(
				<div
					key={`${row}-${col}`}
					className="pixel-art-pixel"
					style={{
						backgroundColor: isOn ? '#000000' : '#FFFFFF',
						aspectRatio: '1',
					}}
				/>
			);
		}
	}
	
	return (
		<div {...blockProps}>
			<div className="pixel-art-grid" style={gridStyle}>
				{pixelElements}
			</div>
		</div>
	);
}
