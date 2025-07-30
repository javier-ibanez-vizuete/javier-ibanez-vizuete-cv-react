import { useState } from "react";
import "./Education.css";
import { EducationTabs } from "./EducationTabs";
import { EducationNav } from "./EducationNav/EducationNav";
import { EducationList } from "../EducationList/EducationList";
import { Skills } from "../Skills/Skills";
import { DevLanguages } from "../DevLanguages/DevLenguages";
import { LanguagesList } from "../LanguagesList/LanguagesList";

export const Education = ({ cvData, gameResult }) => {
	const [educationTab, setEducationTab] = useState(EducationTabs.EDUCATION);

	const { skills, devLanguages, languages } = cvData;

	return (
		<section className={`education-section ${gameResult?.moleSmasher}`}>
			<h2 className="title">Formación</h2>
			<EducationNav educationTab={educationTab} setEducationTab={setEducationTab} />
			{educationTab === EducationTabs.EDUCATION && <EducationList cvData={cvData} />}
			{educationTab === EducationTabs.SKILLS && <Skills skills={skills} />}
			{educationTab === EducationTabs.DEV_LENGUAGES && <DevLanguages devLanguages={devLanguages} />}
			{educationTab === EducationTabs.LANGUAGES && <LanguagesList languages={languages} />}
		</section>
	);
};
