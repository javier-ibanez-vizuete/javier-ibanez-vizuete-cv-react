import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./CurriculumTraditional.css";
import { Tabs } from "../Navigation/Tabs";
import { Profile } from "../Profile/Profile";
import { Experiences } from "../Experiences/Experiences";
import { Education } from "../Education/Education";
import { ContactSection } from "../ContactSection/ContactSection";
import { Footer } from "../Footer/Footer";
import { getDataFromStorage, saveDataInStorage } from "../../helpers/localStorage/localStorage";

export const CurriculumTradicional = ({
	cvData,
	form,
	error,
	onFormSubmit,
	onDeleteForm,
	onInputChange,
	switchToMainScreen,
	nightMode,
	onToggleNightMode,
}) => {
	const [activeTab, setActiveTab] = useState(() => {
		const activeTabFromStorage = getDataFromStorage("active_tab");
		if (activeTabFromStorage) return activeTabFromStorage;
		return Tabs.PROFILE;
	});

	const handleActiveTab = (value) => {
		saveDataInStorage("active_tab", value);
		setActiveTab(value);
	};

	const switchToContact = () => {
		saveDataInStorage("active_tab", Tabs.CONTACT);
		setActiveTab(Tabs.CONTACT);
	};

	return (
		<div className="curriculum-tradicional-container">
			<header>
				<Navigation activeTab={activeTab} handleActiveTab={handleActiveTab} />
				<h2 className="title">Javier Ibáñez Vizuete</h2>
			</header>
			<main>
				{activeTab === Tabs.PROFILE && <Profile cvData={cvData} />}
				{activeTab === Tabs.EXPERIENCE && <Experiences cvData={cvData} />}
				{activeTab === Tabs.EDUCATION && <Education cvData={cvData} />}
				{activeTab === Tabs.CONTACT && (
					<ContactSection
						cvData={cvData}
						form={form}
						error={error}
						onFormSubmit={onFormSubmit}
						onInputChange={onInputChange}
						onDeleteForm={onDeleteForm}
					/>
				)}
			</main>
			<Footer
				switchToMainScreen={switchToMainScreen}
				activeTab={activeTab}
				switchToContact={switchToContact}
				nightMode={nightMode}
				onToggleNightMode={onToggleNightMode}
			/>
		</div>
	);
};
