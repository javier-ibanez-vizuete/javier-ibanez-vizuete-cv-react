import { useState } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";

export const CurriculumInteractive = ({ cvView, setCvView }) => {
	const [activeTab, setActiveTab] = useState(null);

	if (!activeTab) return <InitialModal setActiveTab={setActiveTab} setCvView={setCvView} />;
	return (
		<>
			<header>
				<CvInteractiveNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
			</header>
			<main id="main">
				{activeTab === cvInteractiveTabs.GAMES && <h2>JUEGOS</h2>}
				{activeTab === cvInteractiveTabs.CV_INTERACTIVE && <h2>CURRICULUM</h2>}
			</main>
			<Footer cvView={cvView} />
		</>
	);
};
