import { useState } from "react";
import "./Education.css";
import { EducationTabs } from "./EducationTabs";
import { EducationNav } from "./EducationNav/EducationNav";

export const Education = ({ cvData }) => {
	const [educationTab, setEducationTab] = useState(EducationTabs.EDUCATION);

	return (
		<section className="education-section">
			<h2 className="title">Formación</h2>
			<EducationNav educationTab={educationTab} setEducationTab={setEducationTab} />
			{educationTab === EducationTabs.EDUCATION && <div>Formación Academica</div>}
			{educationTab === EducationTabs.SKILLS && <div>Habilidades Tecnicas</div>}
			{educationTab === EducationTabs.DEV_LENGUAGES && <div>Lenguajes de programacion</div>}
			{educationTab === EducationTabs.LANGUAGES && <div>Idiomas</div>}
		</section>
	);
};
