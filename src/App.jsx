import { useState } from "react";
import "./App.css";
import { CvSelector } from "./components/CvSelector/CvSelector";
import { AppTabs } from "./components/CvSelector/AppTabs";
import { CurriculumTradicional } from "./components/CurriculumTraditional/CurriculumTradicional";
import { CurriculumInteractive } from "./components/CurriculumInteractive/CurriculumInteractive";
import { CV_DATA } from "./utils/CV_DATA";

export const App = () => {
	const [cvView, setCvView] = useState(null);
	const [cvData, setCvData] = useState(CV_DATA);

	return (
		<div className="app-container container">
			{!cvView && <CvSelector setCvView={setCvView} />}
			{cvView === AppTabs.CV_TRADICIONAL && <CurriculumTradicional cvData={cvData} />}
			{cvView === AppTabs.CV_INTERACTIVE && <CurriculumInteractive />}
		</div>
	);
};
