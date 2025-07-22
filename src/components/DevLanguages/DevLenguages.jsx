import { CircularProgressBar } from "../CircularProgressBar/CiruclarProgressBar";
import "./DevLanguages.css";

export const DevLanguages = ({ devLanguages }) => {
	if (!devLanguages.length) return <span className="empty-list-text">Desarrollo en curso</span>;

	return (
		<div className="dev-language-container">
			{devLanguages.map((languages) => {
				const { name, level } = languages;

				return <CircularProgressBar name={name} level={level} key={`${name}-${level}`} />;
			})}
		</div>
	);
};
