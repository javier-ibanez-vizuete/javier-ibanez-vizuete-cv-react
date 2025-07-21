import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./CurriculumTraditional.css";
import { Tabs } from "../Navigation/Tabs";

export const CurriculumTradicional = () => {
	const [activeTab, setActiveTab] = useState(Tabs.PROFILE);

	return (
		<div className="curriculum-tradicional-container">
			<header>
				<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
				<h2 className="title">Javier Ibáñez Vizuete</h2>
			</header>
			<main>
				{activeTab === Tabs.PROFILE && <h3>PERFIL</h3>}
				{activeTab === Tabs.EXPERIENCE && <h3>EXPERIENCIA</h3>}
				{activeTab === Tabs.EDUCATION && <h3>FORMACIÓN</h3>}
				{activeTab === Tabs.CONTACT && <h3>CONTACTO</h3>}
			</main>
		</div>
	);
};
