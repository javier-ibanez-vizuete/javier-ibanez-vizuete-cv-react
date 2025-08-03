import "./CvInteractiveNavigation.css";
import { cvInteractiveTabs } from "./cvInteractiveTabs";

export const CvInteractiveNavigation = ({ activeTab, handleInteractiveActiveTabs }) => {
	return (
		<nav className="navigation">
			{Object.entries(cvInteractiveTabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${activeTab === value ? "active" : ""}`}
						onClick={() => handleInteractiveActiveTabs(value)}
					>
						{value}
					</button>
				);
			})}
		</nav>
	);
};
