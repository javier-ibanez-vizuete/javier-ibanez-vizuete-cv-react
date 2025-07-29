import { ContactSection } from "../ContactSection/ContactSection";
import { Education } from "../Education/Education";
import { Experiences } from "../Experiences/Experiences";
import { Profile } from "../Profile/Profile";
import "./CurriculumComplete.css";

export const CurriculumComplete = ({ cvData, form, error, onFormSubmit, onInputChange, onDeleteForm, gameResult }) => {
	return (
		<section className="curriculum-complete-section">
            <h2 className="title">Javier Ibáñez Vizuete</h2>
            
			<Profile cvData={cvData} gameResult={gameResult} />

			<Experiences cvData={cvData} />

			<Education cvData={cvData} />

			<ContactSection
				cvData={cvData}
				form={form}
				error={error}
				onFormSubmit={onFormSubmit}
				onInputChange={onInputChange}
				onDeleteForm={onDeleteForm}
			/>
		</section>
	);
};
