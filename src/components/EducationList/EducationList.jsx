import { EducationItem } from "./EducationItem/EducationItem";
import "./EducationList.css";

export const EducationList = ({ cvData }) => {
	const { education } = cvData;
	return (
		<>
			{education.map((educationItem) => {
				return <EducationItem key={educationItem.degree} educationItem={educationItem} />;
			})}
		</>
	);
};
