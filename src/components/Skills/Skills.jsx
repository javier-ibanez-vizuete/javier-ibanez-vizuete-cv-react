import "./Skills.css";

export const Skills = ({ skills }) => {
	if (!skills?.length) return <span className="empty-list-text">Desbloqueando habilidades...</span>;

	return (
		<ul className="skills-list-container">
			{skills.map((skill, index) => (
				<li key={`${skill}-${index}`}>{skill}</li>
			))}
		</ul>
	);
};
