import "./EducationItem.css";

export const EducationItem = ({ educationItem }) => {
	return (
		<article className="education-item">
			<h3>{educationItem.degree}</h3>
			<h4>{educationItem.institution}</h4>
			<p>{educationItem?.period}</p>
		</article>
	);
};
