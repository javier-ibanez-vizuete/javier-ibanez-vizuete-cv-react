import "./CvSelector.css";
import { AppTabs } from "./AppTabs.js";
import { NightMode } from "../NightMode/NightMode.jsx";

export const CvSelector = ({ setCvView, nightMode, onToggleNightMode }) => {
	return (
		<section className="cv-selector-modal">
			<NightMode
				bodyText={nightMode ? "🌞" : "🌑"}
				className={"night-mode-btn"}
				onToggleNightMode={onToggleNightMode}
			/>
			<h1 className="title">Bienvenido al Curriculum de Javier Ibáñez Vizuete</h1>
			<p className="subtitle">¿Que Curriculum quiere visualizar?</p>
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
