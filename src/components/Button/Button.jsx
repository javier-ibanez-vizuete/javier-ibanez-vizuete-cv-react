import "./Button.css";

export const Button = ({ className, bodyText, handleButton }) => {
	return (
		<button className={className} onClick={handleButton}>
			{bodyText ? bodyText : "Click"}
		</button>
	);
};
