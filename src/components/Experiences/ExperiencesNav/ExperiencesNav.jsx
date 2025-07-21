import { ExperiencesTabs } from "../ExperiencesTabs";
import "./ExperiencesNav.css";

export const ExperiencesNav = ({ experienceTab, setExperienceTab }) => {
	return (
		<div className="navigation">
			{Object.entries(ExperiencesTabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${experienceTab === value ? "active" : ""}`}
						onClick={() => setExperienceTab(value)}
					>
						{value}
					</button>
				);
			})}
		</div>
	);
};
