import { useState } from "react";
import "./App.css";
import { CvSelector } from "./components/CvSelector/CvSelector";
import { AppTabs } from "./components/CvSelector/AppTabs";
import { CurriculumTradicional } from "./components/CurriculumTraditional/CurriculumTradicional";
import { CurriculumInteractive } from "./components/CurriculumInteractive/CurriculumInteractive";

export const App = () => {
	const [cvView, setCvView] = useState(null);

	return (
		<div className="app-container container">
			{!cvView && <CvSelector setCvView={setCvView} />}
			{cvView === AppTabs.CV_TRADICIONAL && <CurriculumTradicional />}
			{cvView === AppTabs.CV_INTERACTIVE && <CurriculumInteractive />}
		</div>
	);
};
