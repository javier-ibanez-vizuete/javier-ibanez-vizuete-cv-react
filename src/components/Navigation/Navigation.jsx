import "./Navigation.css";
import { Tabs } from "./Tabs";

export const Navigation = ({ activeTab, setActiveTab }) => {
	return (
		<nav className="navigation">
			{Object.entries(Tabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${activeTab === value ? "active" : ""}`}
						onClick={() => setActiveTab(value)}
					>
						{value}
					</button>
				);
			})}
		</nav>
	);
};
