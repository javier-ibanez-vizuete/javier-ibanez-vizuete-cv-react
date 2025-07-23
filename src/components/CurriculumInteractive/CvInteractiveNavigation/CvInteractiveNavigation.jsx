import "./CvInteractiveNavigation.css";
import { cvInteractiveTabs } from "./cvInteractiveTabs";

export const CvInteractiveNavigation = ({ activeTab, setActiveTab }) => {
	return (
		<nav className="navigation">
			{Object.entries(cvInteractiveTabs).map(([property, value]) => {
				return <button
					key={property}
					className={`tab ${activeTab === value ? "active" : ""}`}
					onClick={() => setActiveTab(value)}
				>
					{value}
				</button>;
			})}
		</nav>
	);
};
