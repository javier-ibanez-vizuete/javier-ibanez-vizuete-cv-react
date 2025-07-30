import "./FloatingText.css";

export const FloatingText = ({ gameResult }) => {
	const text = gameResult === "passed" ? "COMPLETADO" : "RENDIDO";

	const className = `floating-text result-${gameResult ? gameResult : ""}`;

	return <h2 className={className}>{text}</h2>;
};
