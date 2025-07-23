import { AppTabs } from "../CvSelector/AppTabs";
import { Tabs } from "../Navigation/Tabs";
import "./Footer.css";

export const Footer = ({ cvView, setCvView, activeTab, setActiveTab }) => {
	return (
		<footer>
			<button className="btn secondary-btn" onClick={() => setCvView(null)}>
				Elegir Curriculum
			</button>
			{activeTab !== Tabs.CONTACT && cvView !== AppTabs.CV_INTERACTIVE && (
				<button onClick={() => setActiveTab(Tabs.CONTACT)} className="btn primary-btn">
					Contacto
				</button>
			)}
		</footer>
	);
};
