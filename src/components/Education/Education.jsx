import { useState } from "react";
import "./Education.css";
import { EducationTabs } from "./EducationTabs";
import { EducationNav } from "./EducationNav/EducationNav";
import { EducationList } from "../EducationList/EducationList";
import { Skills } from "../Skills/Skills";
import { DevLanguages } from "../DevLanguages/DevLenguages";

export const Education = ({ cvData }) => {
	const [educationTab, setEducationTab] = useState(EducationTabs.EDUCATION);

	const { skills, devLanguages } = cvData;

	return (
		<section className="education-section">
			<h2 className="title">Formación</h2>
			<EducationNav educationTab={educationTab} setEducationTab={setEducationTab} />
			{educationTab === EducationTabs.EDUCATION && <EducationList cvData={cvData} />}
			{/* HE ACABADO CON FORMACION ACADEMICA... HAY QUE EMPEZAR CON HABILIDADES TECNICAS... 
			YA ESTA TODO COMMITEADO Y PUSHEADO */}
			{educationTab === EducationTabs.SKILLS && <Skills skills={skills} />}
			{educationTab === EducationTabs.DEV_LENGUAGES && <DevLanguages devLanguages={devLanguages} />}
			{educationTab === EducationTabs.LANGUAGES && <div>Idiomas</div>}
		</section>
	);
};
