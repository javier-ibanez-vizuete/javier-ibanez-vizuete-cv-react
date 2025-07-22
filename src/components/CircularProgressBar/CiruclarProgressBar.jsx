import "./CircularProgressBar.css";

export const CircularProgressBar = ({ name, level }) => {
	let percentage;
	switch (level) {
		case "Nativo":
			percentage = 100;
			break;
		case "Avanzado":
			percentage = 75;
			break;
		case "Intermedio":
			percentage = 50;
			break;
		case "Basico":
			percentage = 25;
			break;
		case undefined:
			percentage = 0;
			break;
		default:
			percentage = 50;
			break;
	}

	return (
		<div className="language-circle-container">
			<svg className="circle" viewBox="0 0 36 36">
				<path
					className="bg"
					d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<path
					className="progress"
					strokeDasharray={`${percentage}, 100`}
					d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<text x="18" y="20.35" className="percentage-text">
					{name}
				</text>
			</svg>
			<p className="level-label">{level}</p>
		</div>
	);
};
