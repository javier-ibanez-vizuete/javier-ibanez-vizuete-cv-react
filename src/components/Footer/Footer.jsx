import { AppTabs } from "../CvSelector/AppTabs";
import { Tabs } from "../Navigation/Tabs";
import { NightMode } from "../NightMode/NightMode";
import "./Footer.css";

export const Footer = ({ children, cvView, setCvView, activeTab, setActiveTab, nightMode, onToggleNightMode }) => {
	return (
		<footer>
			<button className="btn secondary-btn" onClick={() => setCvView(null)}>
				Cambiar Curriculum
			</button>
			{activeTab !== Tabs.CONTACT && cvView !== AppTabs.CV_INTERACTIVE && (
				<button onClick={() => setActiveTab(Tabs.CONTACT)} className="btn primary-btn">
					Contacto
				</button>
			)}
			{children}
			<NightMode
				nightMode={nightMode}
				bodyText={nightMode ? "🌞" : "🌑"}
				onToggleNightMode={onToggleNightMode}
				className={"night-mode-btn"}
			/>
		</footer>
	);
};
