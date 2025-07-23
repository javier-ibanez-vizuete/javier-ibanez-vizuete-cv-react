import { useState } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";
import { GamesSection } from "./GamesSection/GamesSection.jsx";

const getRandomNumber = () => {
	const randomNumber = Math.round(Math.random() * 100);
	return randomNumber;
};

export const CurriculumInteractive = ({ cvView, setCvView }) => {
	const [activeTab, setActiveTab] = useState(null);
	const [gameNumber, setGameNumber] = useState(1);
	const [lives, setLives] = useState(10);
	const [startGame, setStartGame] = useState(false);
	const [error, setError] = useState("");

	const [secretNumber, setSecretNumber] = useState(() => getRandomNumber());

	const handleGameNumber = (event) => {
		event.preventDefault();

		setGameNumber((prev) => prev + 1);
		setLives(10);
	};

	const handleStartGame = () => {
		if (!startGame) return setStartGame((prev) => !prev);
	};

	const decreaseLive = () => {
		setLives((prev) => prev - 1);
		if (lives === 0) return setError("");
	};

	const handleRestartGame = () => {
		setGameNumber(1);
		setLives(10);
		setSecretNumber(() => getRandomNumber());
	};

	if (!activeTab) return <InitialModal setActiveTab={setActiveTab} setCvView={setCvView} />;
	return (
		<>
			<header>
				<CvInteractiveNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
			</header>
			<main id="main">
				{activeTab === cvInteractiveTabs.GAMES && (
					<GamesSection
						gameNumber={gameNumber}
						startGame={startGame}
						lives={lives}
						handleGameNumber={handleGameNumber}
						handleStartGame={handleStartGame}
						handleRestartGame={handleRestartGame}
						decreaseLive={decreaseLive}
						secretNumber={secretNumber}
						error={error}
						setError={setError}
					/>
				)}
				{activeTab === cvInteractiveTabs.CV_INTERACTIVE && <h2>CURRICULUM</h2>}
			</main>
			<Footer cvView={cvView} setCvView={setCvView} />
		</>
	);
};
