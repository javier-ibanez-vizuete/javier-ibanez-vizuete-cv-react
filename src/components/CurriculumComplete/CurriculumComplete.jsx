import { ContactSection } from "../ContactSection/ContactSection";
import { DivisorLine } from "../DivisorLine/DivisorLine";
import { Education } from "../Education/Education";
import { EncriptedContent } from "../EncriptedContent/EncriptedContent";
import { Experiences } from "../Experiences/Experiences";
import { Profile } from "../Profile/Profile";
import "./CurriculumComplete.css";

export const CurriculumComplete = ({ cvData, form, error, onFormSubmit, onInputChange, onDeleteForm, gameResult }) => {
	return (
		<section className="curriculum-complete-section">
			<h2 className="title">Javier Ibáñez Vizuete</h2>

			{gameResult.secretNumber === "blocked" && <EncriptedContent bodyText={"Perfil"} />}
			<Profile cvData={cvData} gameResult={gameResult} />

			{gameResult.secretWord !== "blocked" && <DivisorLine horizontalLine thickness={2} />}

			{gameResult.secretWord === "blocked" && <EncriptedContent bodyText={"Experiencia"} />}
			<Experiences cvData={cvData} gameResult={gameResult} />

			{gameResult.moleSmasher !== "blocked" && <DivisorLine horizontalLine thickness={2} />}

			{gameResult.moleSmasher === "blocked" && <EncriptedContent bodyText={"Formación"} />}
			<Education cvData={cvData} gameResult={gameResult} />

			{gameResult.ticTacToe !== "blocked" && <DivisorLine horizontalLine thickness={2} />}

			{gameResult.ticTacToe === "blocked" && <EncriptedContent bodyText={"Contacto"} />}
			<ContactSection
				cvData={cvData}
				form={form}
				error={error}
				onFormSubmit={onFormSubmit}
				onInputChange={onInputChange}
				onDeleteForm={onDeleteForm}
				gameResult={gameResult}
			/>
		</section>
	);
};
