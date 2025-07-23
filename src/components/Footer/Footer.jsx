import { Tabs } from "../Navigation/Tabs";
import "./Footer.css";

export const Footer = ({ setCvView, activeTab, setActiveTab }) => {
	return (
		<footer>
			<button className="btn secondary-btn" onClick={() => setCvView(null)}>
				Elegir Curriculum
			</button>
			{activeTab !== Tabs.CONTACT && (
				<button onClick={() => setActiveTab(Tabs.CONTACT)} className="btn primary-btn">
					Contacto
				</button>
			)}
		</footer>
	);
};
