import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./CurriculumTraditional.css";
import { Tabs } from "../Navigation/Tabs";
import { Profile } from "../Profile/Profile";
import { CV_DATA } from "../../utils/CV_DATA";

export const CurriculumTradicional = () => {
	const [activeTab, setActiveTab] = useState(Tabs.PROFILE);
	const [cvData, setCvData] = useState(CV_DATA);

	return (
		<div className="curriculum-tradicional-container">
			<header>
				<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
				<h2 className="title">Javier Ibáñez Vizuete</h2>
			</header>
			<main>
				{activeTab === Tabs.PROFILE && <Profile cvData={cvData} />}
				{activeTab === Tabs.EXPERIENCE && <h3>EXPERIENCIA</h3>}
				{activeTab === Tabs.EDUCATION && <h3>FORMACIÓN</h3>}
				{activeTab === Tabs.CONTACT && <h3>CONTACTO</h3>}
			</main>
		</div>
	);
};
