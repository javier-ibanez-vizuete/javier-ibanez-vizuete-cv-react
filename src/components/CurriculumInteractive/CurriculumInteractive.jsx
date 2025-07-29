import { useState, useEffect } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";
import { GamesSection } from "./GamesSection/GamesSection.jsx";
import { WORDS_DATA } from "../../utils/WORDS_DATA.js";
import { INITIAL_MOLE_STATES } from "../../utils/INITIAL_MOLE_STATES.js";
import { INITIAL_BOARD, TURNS_TIC_TAC_TOE, WINNER_COMBOS } from "../../utils/TIC_TAC_TOE_INITIAL_STATS.js";
import { CurriculumComplete } from "../CurriculumComplete/CurriculumComplete.jsx";

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

export const CurriculumInteractive = ({
	cvView,
	setCvView,
	cvData,
	form,
	error,
	setError,
	onFormSubmit,
	onInputChange,
	onDeleteForm,
}) => {
	const [activeTab, setActiveTab] = useState(null);
	const [gameNumber, setGameNumber] = useState(1);
	const [lives, setLives] = useState(10);
	const [startGame, setStartGame] = useState(false);
	const [winner, setWinner] = useState(false);

	// Primer juego
	const [secretNumber, setSecretNumber] = useState(() => getRandomNumber());

	// Segundo juego
	const [longWord, setLongWord] = useState(() => getRandomWord());
	const [secretWord, setSecretWord] = useState(() => createSecretWord(longWord));

	// Tercer juego
	const [moleHoles, setMoleHoles] = useState(INITIAL_MOLE_STATES);
	const [moles, setMoles] = useState(0);

	// Cuarto juego
	const [board, setBoard] = useState(INITIAL_BOARD);
	const [turn, setTurn] = useState(TURNS_TIC_TAC_TOE.X);

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
		setGameNumber(1);
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

	const checkTicTacWinner = (boardToCheck) => {
		for (const combo of WINNER_COMBOS) {
			const [squareA, squareB, squareC] = combo;
			if (
				boardToCheck[squareA] &&
				boardToCheck[squareA] === boardToCheck[squareB] &&
				boardToCheck[squareA] === boardToCheck[squareC]
			) {
				return boardToCheck[squareA];
			}
		}
		return null;
	};

	const handleTicTacWinner = (index) => {
		if (turn === TURNS_TIC_TAC_TOE.O) return;
		if (board[index] || winner) return;

		const newboard = [...board];
		newboard[index] = turn;
		setBoard(newboard);

		const newTurn = turn === TURNS_TIC_TAC_TOE.X ? TURNS_TIC_TAC_TOE.O : TURNS_TIC_TAC_TOE.X;
		setTurn(newTurn);

		const newWinner = checkTicTacWinner(newboard);

		if (newWinner) {
			setWinner((prev) => !prev);
			setTimeout(() => {
				handleGameNumber();
				setActiveTab(cvInteractiveTabs.CV_INTERACTIVE);
			}, 6000);
		}
		const BoardFull = newboard.every((square) => square !== null);

		if (BoardFull) {
			setLives((prev) => prev - 1);
			setTurn(TURNS_TIC_TAC_TOE.X);
			setBoard(INITIAL_BOARD);
			return;
		}
	};

	useEffect(() => {
		if (turn !== TURNS_TIC_TAC_TOE.O || winner) return;

		const emptyPosition = board
			.map((holes, index) => (holes === null ? index : null))
			.filter((value) => value !== null);

		if (emptyPosition.length === 0) return;

		const randomIndex = Math.floor(Math.random() * emptyPosition.length);
		const randomEmptyPosition = emptyPosition[randomIndex];

		const timeOut = setTimeout(() => {
			const newBoard = [...board];
			newBoard[randomEmptyPosition] = TURNS_TIC_TAC_TOE.O;
			setBoard(newBoard);

			const newWinner = checkTicTacWinner(newBoard);
			if (newWinner) {
				setBoard(INITIAL_BOARD);
				setTurn(TURNS_TIC_TAC_TOE.X);
				setLives((prev) => prev - 1);
				return;
			}
			setTurn(TURNS_TIC_TAC_TOE.X);
		}, 1000);

		return () => clearTimeout(timeOut);
	}, [turn, board, winner]);

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
						board={board}
						turn={turn}
						handleTicTacWinner={handleTicTacWinner}
					/>
				)}
				{activeTab === cvInteractiveTabs.CV_INTERACTIVE && (
					<CurriculumComplete
						cvData={cvData}
						form={form}
						error={error}
						onFormSubmit={onFormSubmit}
						onInputChange={onInputChange}
						onDeleteForm={onDeleteForm}
					/>
				)}
			</main>
			<Footer cvView={cvView} setCvView={setCvView} />
		</>
	);
};
