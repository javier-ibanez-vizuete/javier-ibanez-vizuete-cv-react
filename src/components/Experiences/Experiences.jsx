import { useState } from "react";
import "./Experiences.css";
import { ExperiencesTabs } from "./ExperiencesTabs";
import { ExperiencesNav } from "./ExperiencesNav/ExperiencesNav";
import { Experience } from "../Experience/Experience";

export const Experiences = ({ cvData, gameResult }) => {
	const { experiences } = cvData;
	const [experienceTab, setExperienceTab] = useState(ExperiencesTabs.DEVELOP);

	return (
		<section className={`experience-section ${gameResult?.secretWord}`}>
			<h2 className="title">Experiencia</h2>
			<ExperiencesNav experienceTab={experienceTab} setExperienceTab={setExperienceTab} />
			<div className="experiences-container">
				{experiences
					.filter(({ position }) => position === experienceTab)
					.map((experience) => {
						return <Experience key={experience.company} experience={experience} />;
					})}
			</div>
		</section>
	);
};
