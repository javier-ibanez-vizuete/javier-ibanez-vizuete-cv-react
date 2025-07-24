import { useState } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";
import { GamesSection } from "./GamesSection/GamesSection.jsx";
import { WORDS_DATA } from "../../utils/WORDS_DATA.js";

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

const createSecretWord = (oldWord = WORDS_DATA[0]) => {
	const lastIndex = oldWord.length - 1;
	const firstLetter = oldWord[0].toLowerCase();
	const lastLetter = oldWord[lastIndex].toLowerCase();
	const minusWord = oldWord.toLowerCase();

	const secretWord = minusWord
		.split("")
		.map((letter) => {
			if (!letter.includes(firstLetter) && !letter.includes(lastLetter)) {
				return "_";
			}
			return letter;
		})
		.join("");
	return secretWord;
};

export const CurriculumInteractive = ({ cvView, setCvView }) => {
	const [activeTab, setActiveTab] = useState(cvInteractiveTabs.GAMES); // VOLVER A PONER A NULL UNA VEZ DESARROLLADOS LOS JUEGOS
	const [gameNumber, setGameNumber] = useState(2);
	const [lives, setLives] = useState(10);
	const [startGame, setStartGame] = useState(false);
	const [error, setError] = useState("");
	const [winner, setwinner] = useState(false);

	// Primer juego
	const [secretNumber, setSecretNumber] = useState(() => getRandomNumber());

	// Segundo juego
	const [longWord, setLongWord] = useState(() => getRandomWord());
	const [secretWord, setSecretWord] = useState(() => createSecretWord(longWord));

	const handleGameNumber = () => {
		setGameNumber((prev) => prev + 1);
		setLives(10);
		setStartGame(false);
		setwinner(false);
	};

	const handleStartGame = () => {
		if (!startGame) return setStartGame((prev) => !prev);
	};

	const decreaseLive = () => {
		setLives((prev) => prev - 1);
		if (lives === 0) return setError("");
	};

	const handleRestartGame = () => {
		setGameNumber(2); // VOLVER A DEJAR EN 1 CUANDO TERMINE LE DESARROLLO
		setLives(10);
		setSecretNumber(() => getRandomNumber());
		setStartGame(false);
		setLongWord(() => getRandomWord());
	};

	const onCheckingLetter = (letter) => {
		setError("");
		const buttonLetter = letter.toLowerCase();
		if (winner) return;

		if (longWord.includes(buttonLetter) && secretWord.includes(buttonLetter))
			return setError(`LA LETRA (${letter.toUpperCase()}) YA EXISTE.`);

		if (!longWord.includes(buttonLetter)) {
			setError(`LA PALABRA NO CONTIENE LA LETRA (${letter})`);
			return setLives((prev) => prev - 1);
		}

		const newSecretWordArray = secretWord.split("");

		longWord.split("").forEach((character, index) => {
			if (character === buttonLetter) return (newSecretWordArray[index] = buttonLetter);
		});

		const newSecretWord = newSecretWordArray.join("");
		setSecretWord(newSecretWord);

		if (!newSecretWord.includes("_")) {
			setTimeout(() => {
				handleGameNumber();
			}, 6000);
			return setwinner((prev) => !prev);
		}
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
						winner={winner}
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
						longWord={longWord}
						secretWord={secretWord}
						onCheckingLetter={onCheckingLetter}
					/>
				)}
				{activeTab === cvInteractiveTabs.CV_INTERACTIVE && <h2>CURRICULUM</h2>}
			</main>
			<Footer cvView={cvView} setCvView={setCvView} />
		</>
	);
};
