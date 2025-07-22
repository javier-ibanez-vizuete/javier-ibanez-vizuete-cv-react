import { EducationTabs } from "../EducationTabs";
import "./EducationNav.css";

export const EducationNav = ({ educationTab, setEducationTab }) => {
	return (
		<div className="navigation">
			{Object.entries(EducationTabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${educationTab === value ? "active" : ""}`}
						onClick={() => setEducationTab(value)}
					>
						{value}
					</button>
				);
			})}
		</div>
	);
};
