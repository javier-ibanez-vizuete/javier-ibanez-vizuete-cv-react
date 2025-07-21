import "./Experience.css";

export const Experience = ({ experience }) => {

	return <div className="experience-container">
        <h4 className="subtitle">{experience.company}</h4>
        <p>{experience.period}</p>
        <p>{experience.location}</p>
        <div className="experience-responsabilities-container">
            <h4 className="subtitle">Funciones</h4>
            <ul>
                {experience.responsabilities.map((responsability) => {
                    return (<li key={responsability}>
                        {responsability}
                    </li>)
                })}
            </ul>
        </div>
    </div>;
};
