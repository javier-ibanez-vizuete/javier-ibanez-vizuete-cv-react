import { useEffect, useState } from "react";
import "./GridBackground.css";

const INITIAL_DIMENSIONS = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const cellSize = 30;

export const GridBackground = () => {
	const [dimensions, setDimensions] = useState(INITIAL_DIMENSIONS);

	useEffect(() => {
		const handleResize = () => {
			const newDimension = {
				width: window.innerWidth,
				height: window.innerHeight,
			};
			setDimensions(newDimension);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const columns = Math.ceil(dimensions.width / cellSize);
	const rows = Math.ceil(dimensions.height / cellSize);
	const totalCells = columns * rows;

	const cells = new Array(totalCells).fill(null).map((_, index) => {
		return <div key={index} className="grid-cell" />;
	});

	return (
		<div
			className="grid-overlay"
			style={{
				gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
				gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
			}}
		>
			{cells}
		</div>
	);
};
