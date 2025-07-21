import { useState } from "react";
import "./Experiences.css";
import { ExperiencesTabs } from "./ExperiencesTabs";
import { ExperiencesNav } from "./ExperiencesNav/ExperiencesNav";
import { Experience } from "../Experience/Experience";

export const Experiences = ({ cvData }) => {
	const { experiences } = cvData;
	const [experienceTab, setExperienceTab] = useState(ExperiencesTabs.DEVELOP);

	return (
		<section className="experience-section">
			<h2 className="title">Experiencia</h2>
			<ExperiencesNav experienceTab={experienceTab} setExperienceTab={setExperienceTab} />
			{experiences
				.filter(({ position }) => position === experienceTab)
				.map((experience) => {
					return <Experience key={experience.company} experience={experience} />;
				})}
		</section>
	);
};
