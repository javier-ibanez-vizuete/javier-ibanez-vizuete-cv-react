import { CircularProgressBar } from "../CircularProgressBar/CiruclarProgressBar";
import "./LanguagesList.css";

export const LanguagesList = ({ languages }) => {
	if (!languages.length) return <span className="empty-list-text">Aprendiendo a Caminar...</span>;

	return (
		<ul className="languages-list-container">
			{languages.map((language) => {
				const { name, level } = language;

				return <CircularProgressBar key={`${name}-${level}`} name={name} level={level} />;
			})}
		</ul>
	);
};
