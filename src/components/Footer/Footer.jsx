import { removeFromStorage } from "../../helpers/localStorage/localStorage";
import { AppTabs } from "../CvSelector/AppTabs";
import { Tabs } from "../Navigation/Tabs";
import { NightMode } from "../NightMode/NightMode";
import "./Footer.css";

export const Footer = ({
	children,
	cvView,
	switchToMainScreen,
	activeTab,
	switchToContact,
	nightMode,
	onToggleNightMode,
}) => {
	return (
		<footer>
			<button className="btn secondary-btn" onClick={switchToMainScreen}>
				Cambiar Curriculum
			</button>
			{activeTab !== Tabs.CONTACT && cvView !== AppTabs.CV_INTERACTIVE && (
				<button onClick={() => switchToContact(Tabs.CONTACT)} className="btn primary-btn">
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
