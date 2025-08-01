import { use, useState } from "react";
import "./App.css";
import { CvSelector } from "./components/CvSelector/CvSelector";
import { AppTabs } from "./components/CvSelector/AppTabs";
import { CurriculumTradicional } from "./components/CurriculumTraditional/CurriculumTradicional";
import { CurriculumInteractive } from "./components/CurriculumInteractive/CurriculumInteractive";
import { CV_DATA } from "./utils/CV_DATA";
import { GridBackground } from "./components/GridBackground/GridBackground";
import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "./helpers/localStorage/localStorage";

const INITIAL_FORM_STATE = {
	contactName: "",
	companyName: "",
	contactReason: "",
	contactDescription: "",
};

export const App = () => {
	const [nightMode, setNightMode] = useState(() => {
		const nightModeFromStorage = getDataFromStorage("night_mode");
		if (nightModeFromStorage) return nightModeFromStorage;
		return false;
	});
	const [cvView, setCvView] = useState(() => {
		const curriculumViewFromStorage = getDataFromStorage("cv_view");
		if (curriculumViewFromStorage) return curriculumViewFromStorage;
		return null;
	});
	const [cvData, setCvData] = useState(CV_DATA); // Utilizo un estado por si quiero agregar funciones para meter datos como correos electronicos de contactantes
	const [form, setForm] = useState(() => {
		const formDataFromStorage = getDataFromStorage("form_data");
		if (formDataFromStorage) return formDataFromStorage;
		return INITIAL_FORM_STATE;
	}); // INITIAL_FORM_STATE
	const [error, setError] = useState(() => {
		const errorTextFromStorage = getDataFromStorage("error_text");
		if (errorTextFromStorage) return errorTextFromStorage;
		return "";
	});

	const onToggleNightMode = () => {
		setNightMode((prev) => {
			saveDataInStorage("night_mode", !prev);
			return !prev;
		});
	};

	const handleCurriculumView = (value) => {
		setCvView(value);
		saveDataInStorage("cv_view", value);
	};

	const onInputChange = (event) => {
		removeFromStorage("error_text");
		setError("");

		const { name, value } = event.target;
		setForm((prev) => {
			saveDataInStorage("form_data", { ...prev, [name]: value });
			return { ...prev, [name]: value };
		});
	};

	const onFormSubmit = () => {
		const { contactName, companyName, contactReason, contactDescription } = form;
		if (!contactName)
			return setError(() => {
				saveDataInStorage("error_text", "Rellene el campo 'Nombre'");
				return "Rellene el campo 'Nombre'";
			});
		if (!companyName)
			return setError(() => {
				saveDataInStorage("error_text", "Rellene el campo 'Nombre de la empresa'");
				return "Rellene el campo 'Nombre de la empresa'";
			});
		if (!contactReason)
			return setError(() => {
				saveDataInStorage("error_text", "Debe seleccionar una 'Razon de contacto'");
				return "Debe seleccionar una 'Razon de contacto'";
			});
		if (!contactDescription)
			return setError(() => {
				saveDataInStorage("error_text", "Rellene el campo Descripcion adicional");
				return "Rellene el campo Descripcion adicional";
			});

		const mailToLink = `mailto: ${cvData.personalInfo.email}?subject=${contactName} from ${companyName} - [${contactReason}]?body=${contactDescription}`;

		const temporalAnchor = document.createElement("a");
		temporalAnchor.style.display = "none";
		temporalAnchor.href = mailToLink;
		document.body.appendChild(temporalAnchor);
		temporalAnchor.click();
		document.body.removeChild(temporalAnchor);

		removeFromStorage("form_data");
		setForm(INITIAL_FORM_STATE);
	};

	const onDeleteForm = () => {
		removeFromStorage("error_text");
		setError("");

		removeFromStorage("form_data");
		setForm(INITIAL_FORM_STATE);
	};

	const switchToMainScreen = () => {
		removeFromStorage("cv_view");
		setCvView(null);
	};

	return (
		<div className={`app-container container ${nightMode ? "night-mode-active" : ""}`}>
			<GridBackground />
			{!cvView && (
				<CvSelector
					handleCurriculumView={handleCurriculumView}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
			{cvView === AppTabs.CV_TRADICIONAL && (
				<CurriculumTradicional
					cvData={cvData}
					form={form}
					error={error}
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					onDeleteForm={onDeleteForm}
					switchToMainScreen={switchToMainScreen}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
			{cvView === AppTabs.CV_INTERACTIVE && (
				<CurriculumInteractive
					switchToMainScreen={switchToMainScreen}
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
