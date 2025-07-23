import { useEffect, useState } from "react";
import "./DinamicText.css";
import { cvInteractiveTabs } from "../CurriculumInteractive/CvInteractiveNavigation/cvInteractiveTabs";

export const DinamicText = ({ text, speed, setActiveTab, setCvView }) => {
	const [currentText, setCurrentText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText((prev) => prev + text.charAt(index));
				setIndex(index + 1);
			}, speed);

			return () => clearTimeout(timeout);
		}
	}, [index, text, speed]);

	return (
		<>
			<p>{currentText}</p>
			{index === text.length && (
				<button className="btn primary-btn" onClick={() => setActiveTab(cvInteractiveTabs.GAMES)}>
					Aceptar
				</button>
			)}
			{index === text.length && (
				<button className="btn secondary-btn" onClick={() => setCvView(null)}>
					volver
				</button>
			)}
		</>
	);
};
