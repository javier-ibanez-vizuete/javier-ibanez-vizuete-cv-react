import { useState } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";
import { GamesSection } from "./GamesSection/GamesSection.jsx";
import { WORDS_DATA } from "../../utils/WORDS_DATA.js";
import { LETTERS } from "../../utils/LETTERS.js";

const getRandomNumber = () => {
	const randomNumber = Math.round(Math.random() * 100);
	return randomNumber;
};

const getRandomWord = () => {
	const maxlength = WORDS_DATA.length;
	const randomNumber = Math.round(Math.random() * (maxlength + 1));
	const word = WORDS_DATA[randomNumber];
	return word;
};

const createSecretWord = (oldWord) => {
	const lastIndex = oldWord.length - 1;
	const firstLetter = oldWord[0].toLowerCase();
	const lastLetter = oldWord[lastIndex].toLowerCase();
	const minusWord = oldWord.toLowerCase();

	console.log(typeof firstLetter);
	console.log(typeof lastLetter);
	console.log(minusWord);

	const secretWord = minusWord.split("").map((letter) => {
		if (!letter.includes(firstLetter) && !letter.includes(lastLetter)) {
			return "_";
		}
		return letter;
	});
	return secretWord;
};

export const CurriculumInteractive = ({ cvView, setCvView }) => {
	const [activeTab, setActiveTab] = useState(cvInteractiveTabs.GAMES); // VOLVER A PONER A NULL UNA VEZ DESARROLLADOS LOS JUEGOS
	const [gameNumber, setGameNumber] = useState(2);
	const [lives, setLives] = useState(10);
	const [startGame, setStartGame] = useState(false);
	const [error, setError] = useState("");

	// Primer juego
	const [secretNumber, setSecretNumber] = useState(() => getRandomNumber());
	// Segundo juego
	const [longWord, setLongWord] = useState(() => getRandomWord());
	const [secretWord, setSecretWord] = useState(() => createSecretWord(longWord));

	const handleGameNumber = () => {
		setGameNumber((prev) => prev + 1);
		setLives(10);
		setStartGame(false);
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
		setStartGame(false);
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
