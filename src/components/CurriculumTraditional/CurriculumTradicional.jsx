import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./CurriculumTraditional.css";
import { Tabs } from "../Navigation/Tabs";
import { Profile } from "../Profile/Profile";
import { Experiences } from "../Experiences/Experiences";
import { Education } from "../Education/Education";

export const CurriculumTradicional = ({ cvData }) => {
	const [activeTab, setActiveTab] = useState(Tabs.PROFILE);

	return (
		<div className="curriculum-tradicional-container">
			<header>
				<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
				<h2 className="title">Javier Ibáñez Vizuete</h2>
			</header>
			<main>
				{activeTab === Tabs.PROFILE && <Profile cvData={cvData} />}
				{activeTab === Tabs.EXPERIENCE && <Experiences cvData={cvData} />}
				{activeTab === Tabs.EDUCATION && <Education cvData={cvData} />}
				{activeTab === Tabs.CONTACT && <h3>CONTACTO</h3>}
			</main>
		</div>
	);
};
