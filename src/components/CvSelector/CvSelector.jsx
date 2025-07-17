import "./CvSelector.css";
import { AppTabs } from "./AppTabs.js";

export const CvSelector = ({ setCvView }) => {
	return (
		<section className="cv-selector-modal">
			<h1 className="title">Bienvenido al Curriculum de Javier Ibáñez Vizuete</h1>
			<div className="cv-selector-btns-container">
				{Object.entries(AppTabs).map(([property, value]) => {
					return (
						<button
							key={property}
							className={`cv-selector-btn ${
								value === AppTabs.CV_TRADICIONAL ? "tradicional" : "interactive"
							}`}
							onClick={() => setCvView(value)}
						>
							{value}
						</button>
					);
				})}
			</div>
		</section>
	);
};
