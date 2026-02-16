/**
 * PixelGrid Component
 * 
 * A reusable grid component for displaying pixels.
 */

import { memo } from '@wordpress/element';

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
 * PixelGrid Component
 * 
 * @param {Object} props - Component props
 * @param {number} props.gridSize - Size of the grid (N x N)
 * @param {Array<number>} props.pixels - Array of pixel states (0 = white, 1 = black)
 * @param {Function} props.onPixelToggle - Callback when a pixel is clicked
 */
export function PixelGrid({ gridSize, pixels, onPixelToggle }) {
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
