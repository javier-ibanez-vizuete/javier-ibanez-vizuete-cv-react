import { CircularProgressBar } from "../CircularProgressBar/CiruclarProgressBar";
import { EducationItem } from "./EducationItem/EducationItem";
import "./EducationList.css";

export const EducationList = ({ cvData }) => {
	const { education, technologies } = cvData;
	return (
		<>
			{education.map((educationItem) => {
				return <EducationItem key={educationItem.degree} educationItem={educationItem} />;
			})}
			<div className="education-list-tecnologies-container">
				<h3 className="subtitle">Tecnologias</h3>
				<div>
					{technologies.map((technology) => {
						const { name, level } = technology;
						return <CircularProgressBar key={`${name}-${level}`} name={name} level={level} />;
					})}
				</div>
			</div>
		</>
	);
};
