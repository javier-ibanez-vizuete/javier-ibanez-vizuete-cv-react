import "./DivisorLine.css";

export const DivisorLine = ({ horizontalLine, verticalLine, thickness }) => {
	const style = {};

	if (verticalLine && typeof thickness === "number") style.width = `${thickness}px`;
	if (horizontalLine && typeof thickness === "number") style.height = `${thickness}px`;

	return (
		<div
			className={`divisor-line ${horizontalLine ? "horizontal-line" : ""} ${verticalLine ? "vertical-line" : ""}`}
			style={style}
		></div>
	);
};
