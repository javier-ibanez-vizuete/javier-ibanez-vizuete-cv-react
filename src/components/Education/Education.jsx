import { useState } from "react";
import "./Education.css";
import { EducationTabs } from "./EducationTabs";
import { EducationNav } from "./EducationNav/EducationNav";
import { EducationList } from "../EducationList/EducationList";
import { Skills } from "../Skills/Skills";

export const Education = ({ cvData }) => {
	const [educationTab, setEducationTab] = useState(EducationTabs.EDUCATION);

	const { skills } = cvData;

	return (
		<section className="education-section">
			<h2 className="title">Formación</h2>
			<EducationNav educationTab={educationTab} setEducationTab={setEducationTab} />
			{educationTab === EducationTabs.EDUCATION && <EducationList cvData={cvData} />}
			{/* HE ACABADO CON FORMACION ACADEMICA... HAY QUE EMPEZAR CON HABILIDADES TECNICAS... 
			YA ESTA TODO COMMITEADO Y PUSHEADO */}
			{educationTab === EducationTabs.SKILLS && <Skills skills={skills} />}
			{educationTab === EducationTabs.DEV_LENGUAGES && <div>Lenguajes de programacion</div>}
			{educationTab === EducationTabs.LANGUAGES && <div>Idiomas</div>}
		</section>
	);
};
