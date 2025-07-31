import { Button } from "../Button/Button";
import "./NightMode.css";

export const NightMode = ({ nightMode, bodyText, className, onToggleNightMode }) => {
	return (
		<div className={`night-mode ${nightMode ? "active" : ""}`}>
			<Button bodyText={bodyText} handleButton={onToggleNightMode} className={className} />
		</div>
	);
};
