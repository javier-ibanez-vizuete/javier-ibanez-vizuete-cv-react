import "./EncriptedContent.css";

export const EncriptedContent = ({ bodyText }) => {
	return (
		<div className="encripted-content">
			<span>{bodyText}</span>
			<span>(No disponible)</span>
		</div>
	);
};
