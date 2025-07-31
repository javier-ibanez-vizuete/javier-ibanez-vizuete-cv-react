import { use, useState } from "react";
import "./App.css";
import { CvSelector } from "./components/CvSelector/CvSelector";
import { AppTabs } from "./components/CvSelector/AppTabs";
import { CurriculumTradicional } from "./components/CurriculumTraditional/CurriculumTradicional";
import { CurriculumInteractive } from "./components/CurriculumInteractive/CurriculumInteractive";
import { CV_DATA } from "./utils/CV_DATA";
import { GridBackground } from "./components/GridBackground/GridBackground";

const INITIAL_FORM_STATE = {
	contactName: "",
	companyName: "",
	contactReason: "",
	contactDescription: "",
};

export const App = () => {
	const [nightMode, setNightMode] = useState(false);
	const [cvView, setCvView] = useState(null);
	const [cvData, setCvData] = useState(CV_DATA);
	const [form, setForm] = useState(INITIAL_FORM_STATE);
	const [error, setError] = useState("");

	const onToggleNightMode = () => {
		setNightMode((prev) => !prev);
	};

	const onInputChange = (event) => {
		setError("");
		const { name, value } = event.target;

		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const onFormSubmit = () => {
		const { contactName, companyName, contactReason, contactDescription } = form;
		if (!contactName) return setError("Rellene el campo 'Nombre'");
		if (!companyName) return setError("Rellene el campo 'Nombre de la empresa'");
		if (!contactReason) return setError("Debe seleccionar una 'Razon de contacto'");
		if (!contactDescription) return setError("Rellene el campo Descripcion adicional");

		const mailToLink = `mailto: ${cvData.personalInfo.email}?subject=${contactName} from ${companyName} - [${contactReason}]?body=${contactDescription}`;

		const temporalAnchor = document.createElement("a");
		temporalAnchor.style.display = "none";
		temporalAnchor.href = mailToLink;
		document.body.appendChild(temporalAnchor);
		temporalAnchor.click();
		document.body.removeChild(temporalAnchor);

		setForm(INITIAL_FORM_STATE);
	};

	const onDeleteForm = () => {
		setError("");
		setForm(INITIAL_FORM_STATE);
	};

	return (
		<div className={`app-container container ${nightMode ? "night-mode-active" : ""}`}>
			<GridBackground />
			{!cvView && (
				<CvSelector setCvView={setCvView} nightMode={nightMode} onToggleNightMode={onToggleNightMode} />
			)}
			{cvView === AppTabs.CV_TRADICIONAL && (
				<CurriculumTradicional
					cvData={cvData}
					form={form}
					error={error}
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					onDeleteForm={onDeleteForm}
					setCvView={setCvView}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
			{cvView === AppTabs.CV_INTERACTIVE && (
				<CurriculumInteractive
					setCvView={setCvView}
					cvView={cvView}
					cvData={cvData}
					form={form}
					error={error}
					setError={setError}
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					onDeleteForm={onDeleteForm}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
		</div>
	);
};
