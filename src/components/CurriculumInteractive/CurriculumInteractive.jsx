import { useState, useEffect } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";
import { GamesSection } from "./GamesSection/GamesSection.jsx";
import { WORDS_DATA } from "../../utils/WORDS_DATA.js";
import { INITIAL_MOLE_STATES } from "../../utils/INITIAL_MOLE_STATES.js";

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

const getRandomIndex = (arrayLength) => {
	const randomIndex = Math.floor(Math.random() * arrayLength);
	return randomIndex;
};

export const CurriculumInteractive = ({ cvView, setCvView }) => {
	const [activeTab, setActiveTab] = useState(cvInteractiveTabs.GAMES); // VOLVER A PONER A NULL UNA VEZ DESARROLLADOS LOS JUEGOS
	const [gameNumber, setGameNumber] = useState(3);
	const [lives, setLives] = useState(10);
	const [startGame, setStartGame] = useState(false);
	const [error, setError] = useState("");
	const [winner, setWinner] = useState(false);

	// Primer juego
	const [secretNumber, setSecretNumber] = useState(() => getRandomNumber());

	// Segundo juego
	const [longWord, setLongWord] = useState(() => getRandomWord());
	const [secretWord, setSecretWord] = useState(() => createSecretWord(longWord));

	// Tercer juego
	const [moleHoles, setMoleHoles] = useState(INITIAL_MOLE_STATES);
	const [moles, setMoles] = useState(0);

	const handleGameNumber = () => {
		setGameNumber((prev) => prev + 1);
		setLives(10);
		setStartGame(false);
		setWinner(false);
	};

	const handleStartGame = () => {
		if (!startGame) return setStartGame((prev) => !prev);
	};

	const decreaseLive = () => {
		setLives((prev) => prev - 1);
		if (lives === 0) return setError("");
	};

	const handleRestartGame = () => {
		setGameNumber(3); // VOLVER A DEJAR EN 1 CUANDO TERMINE LE DESARROLLO
		setLives(10);
		setSecretNumber(() => getRandomNumber());
		setStartGame(false);
		setLongWord(() => getRandomWord());
		setMoleHoles(INITIAL_MOLE_STATES);
		setMoles(0);
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
			return setWinner((prev) => !prev);
		}
	};

	const handleMoleClick = (index) => {
		if (!moleHoles[index].hasMole && moles < 5) {
			setLives((prev) => prev - 1);
			return;
		}

		setMoles((prev) => prev + 1);

		setMoleHoles((prev) =>
			prev.map((hole, indexHole) => (index === indexHole ? { ...hole, isSmashed: true } : hole))
		);
		return;
	};

	useEffect(() => {
		if (moles < 5) return;
		setWinner((prev) => !prev);
		const timeOut = setTimeout(() => {
			handleGameNumber();
			return clearTimeout(timeOut);
		}, 6000);
	}, [moles]);

	useEffect(() => {
		const interval = setInterval(() => {
			setMoleHoles((prev) => {
				const hasMole = prev.some((hole) => hole.hasMole);

				if (hasMole) return INITIAL_MOLE_STATES.map((hole) => ({ ...hole }));
				if (!hasMole) {
					const randomIndex = getRandomIndex(prev.length);
					return prev.map((hole, index) => ({ ...hole, hasMole: index === randomIndex }));
				}
			});
		}, 600);
		return () => clearInterval(interval);
	}, []);

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
						moles={moles}
						moleHoles={moleHoles}
						handleMoleClick={handleMoleClick}
					/>
				)}
				{activeTab === cvInteractiveTabs.CV_INTERACTIVE && <h2>CURRICULUM</h2>}
			</main>
			<Footer cvView={cvView} setCvView={setCvView} />
		</>
	);
};
