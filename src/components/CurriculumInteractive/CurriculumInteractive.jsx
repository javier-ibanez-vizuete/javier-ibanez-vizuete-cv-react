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
import { Button } from "../Button/Button.jsx";
import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/localStorage/localStorage.js";

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

const INITIAL_GAME_RESULT_STATES = {
	secretNumber: "blocked",
	secretWord: "blocked",
	moleSmasher: "blocked",
	ticTacToe: "blocked",
};

export const CurriculumInteractive = ({
	cvView,
	switchToMainScreen,
	cvData,
	form,
	error,
	setError,
	onFormSubmit,
	onInputChange,
	onDeleteForm,
	nightMode,
	onToggleNightMode,
}) => {
	const [activeTab, setActiveTab] = useState(() => {
		const activeTabInteractiveFromStorage = getDataFromStorage("active_tab_interactive");
		if (activeTabInteractiveFromStorage) return activeTabInteractiveFromStorage;
		return null;
	});
	const [gameNumber, setGameNumber] = useState(() => {
		const gameNumberFromStorage = getDataFromStorage("game_number");
		if (gameNumberFromStorage) return Number(gameNumberFromStorage);
		return 1;
	});
	const [lives, setLives] = useState(() => {
		const livesFromStorage = getDataFromStorage("lives");
		return livesFromStorage ?? 10;
	});

	const [startGame, setStartGame] = useState(() => {
		const startGameFromStorage = getDataFromStorage("is_game_started");
		if (startGameFromStorage) return startGameFromStorage;
		return false;
	});
	const [winner, setWinner] = useState(() => {
		const winnerFromStorage = getDataFromStorage("winner");
		if (winnerFromStorage) return winnerFromStorage;
		return false;
	});

	const [gameResult, setGameResult] = useState(() => {
		const gameResultFromStorage = getDataFromStorage("game_result");
		return gameResultFromStorage ?? INITIAL_GAME_RESULT_STATES;
	});

	// Primer juego
	const [secretNumber, setSecretNumber] = useState(() => {
		const secretNumberFromStorage = getDataFromStorage("secret_number");
		return secretNumberFromStorage ?? getRandomNumber();
	});

	// Segundo juego
	const [longWord, setLongWord] = useState(() => {
		const longWordFromStorage = getDataFromStorage("long_word");
		if (longWordFromStorage) return longWordFromStorage;
		return getRandomWord();
	});
	const [secretWord, setSecretWord] = useState(() => {
		const secretWordFromStorage = getDataFromStorage("secret_word");
		if (secretWordFromStorage) return secretWordFromStorage;
		return createSecretWord(longWord);
	});

	// Tercer juego
	const [moleHoles, setMoleHoles] = useState(() => {
		const moleHolesFromStorage = getDataFromStorage("mole_holes");
		return moleHolesFromStorage ?? INITIAL_MOLE_STATES;
	});
	const [moles, setMoles] = useState(() => {
		const molesFromStorage = getDataFromStorage("moles");
		return molesFromStorage ?? 0;
	});

	// Cuarto juego
	const [board, setBoard] = useState(() => {
		const boardFromStorage = getDataFromStorage("board");
		return boardFromStorage ?? INITIAL_BOARD;
	});
	const [turn, setTurn] = useState(() => {
		const turnFromStorage = getDataFromStorage("turn");
		if (turnFromStorage) return turnFromStorage;
		return TURNS_TIC_TAC_TOE.X;
	});

	const switchToGames = () => {
		saveDataInStorage("active_tab_interactive", cvInteractiveTabs.GAMES);
		setActiveTab(cvInteractiveTabs.GAMES);
	};

	const handleInteractiveActiveTabs = (value) => {
		setActiveTab(value);
		saveDataInStorage("active_tab_interactive", value);
	};

	const handleGameNumber = () => {
		setGameResult((prevGameResult) => {
			const { secretNumber, secretWord, moleSmasher, ticTacToe } = prevGameResult;
			if (gameNumber === 1 && secretNumber !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, secretNumber: "passed" });
				return { ...prevGameResult, secretNumber: "passed" };
			}

			if (gameNumber === 2 && secretWord !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, secretWord: "passed" });
				return { ...prevGameResult, secretWord: "passed" };
			}
			if (gameNumber === 3 && moleSmasher !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, moleSmasher: "passed" });
				return { ...prevGameResult, moleSmasher: "passed" };
			}
			if (gameNumber === 4 && ticTacToe !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, ticTacToe: "passed" });
				return { ...prevGameResult, ticTacToe: "passed" };
			}
			return prevGameResult;
		});

		if (winner)
			return setTimeout(() => {
				handleGameNumber();
			}, 5000);

		setGameNumber((prev) => {
			saveDataInStorage("game_number", prev + 1);
			return prev + 1;
		});

		saveDataInStorage("lives", 10);
		setLives(10);

		saveDataInStorage("is_game_started", false);
		setStartGame(false);

		saveDataInStorage("winner", false);
		setWinner(false);

		saveDataInStorage("active_tab_interactive", cvInteractiveTabs.CV_INTERACTIVE);
		setActiveTab(cvInteractiveTabs.CV_INTERACTIVE);
	};

	const handleStartGame = () => {
		if (!startGame)
			return setStartGame((prev) => {
				saveDataInStorage("is_game_started", !prev);
				return !prev;
			});
	};

	const decreaseLive = () => {
		setLives((prev) => {
			saveDataInStorage("lives", prev - 1);
			return prev - 1;
		});
		if (lives === 0)
			return setError(() => {
				removeFromStorage("error_text");
				return "";
			});
	};

	const handleRestartGame = () => {
		removeFromStorage("game_number");
		setGameNumber(1);

		removeFromStorage("lives");
		setLives(10);

		setSecretNumber(() => {
			removeFromStorage("secret_number");
			return getRandomNumber();
		});

		removeFromStorage("is_game_started");
		setStartGame(false);

		setLongWord(() => {
			removeFromStorage("long_word");
			return getRandomWord();
		});

		removeFromStorage("mole_holes");
		setMoleHoles(INITIAL_MOLE_STATES);

		removeFromStorage("moles");
		setMoles(0);
	};

	const onCheckingLetter = (letter) => {
		removeFromStorage("error_text");
		setError("");
		const buttonLetter = letter.toLowerCase();
		if (winner) return;

		if (longWord.includes(buttonLetter) && secretWord.includes(buttonLetter))
			return setError(() => {
				saveDataInStorage("error_text", `LA LETRA (${letter.toUpperCase()}) YA EXISTE.`);
				return `LA LETRA (${letter.toUpperCase()}) YA EXISTE.`;
			});

		if (!longWord.includes(buttonLetter)) {
			setError(() => {
				saveDataInStorage("error_text", `LA PALABRA NO CONTIENE LA LETRA (${letter})`);
				return `LA PALABRA NO CONTIENE LA LETRA (${letter})`;
			});
			return setLives((prev) => {
				saveDataInStorage("lives", prev - 1);
				return prev - 1;
			});
		}

		const newSecretWordArray = secretWord.split("");

		longWord.split("").forEach((character, index) => {
			if (character === buttonLetter) return (newSecretWordArray[index] = buttonLetter);
		});

		const newSecretWord = newSecretWordArray.join("");
		saveDataInStorage("secret_word", newSecretWord);
		setSecretWord(newSecretWord);

		if (!newSecretWord.includes("_")) {
			setTimeout(() => {
				handleGameNumber();
			}, 6000);
			return setWinner((prev) => {
				saveDataInStorage("winner", !prev);
				return !prev;
			});
		}
	};

	const handleMoleClick = (index) => {
		if (!moleHoles[index].hasMole && moles < 5) {
			setLives((prev) => {
				saveDataInStorage("lives", prev - 1);
				return prev - 1;
			});
			return;
		}

		setMoles((prev) => {
			saveDataInStorage("moles", prev + 1);
			return prev + 1;
		});

		setMoleHoles((prev) => {
			saveDataInStorage(
				"mole_holes",
				prev.map((hole, indexHole) => (index === indexHole ? { ...hole, isSmashed: true } : hole))
			);
			return prev.map((hole, indexHole) => (index === indexHole ? { ...hole, isSmashed: true } : hole));
		});
		return;
	};

	useEffect(() => {
		if (moles < 5) return;
		setWinner((prev) => {
			saveDataInStorage("winner", !prev);
			return !prev;
		});
		const timeOut = setTimeout(() => {
			handleGameNumber();
			return clearTimeout(timeOut);
		}, 6000);
	}, [moles]);

	useEffect(() => {
		const interval = setInterval(() => {
			setMoleHoles((prev) => {
				const hasMole = prev.some((hole) => hole.hasMole);

				if (hasMole) {
					return INITIAL_MOLE_STATES.map((hole) => ({ ...hole }));
				}
				if (!hasMole) {
					const randomIndex = getRandomIndex(prev.length);
					return prev.map((hole, index) => ({ ...hole, hasMole: index === randomIndex }));
				}
			});
		}, 700);
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
		saveDataInStorage("board", newboard);

		const newTurn = turn === TURNS_TIC_TAC_TOE.X ? TURNS_TIC_TAC_TOE.O : TURNS_TIC_TAC_TOE.X;
		setTurn(newTurn);
		saveDataInStorage("turn", newTurn);

		const newWinner = checkTicTacWinner(newboard);

		if (newWinner) {
			setWinner((prev) => {
				saveDataInStorage("winner", !prev);
				return !prev;
			});
			setTimeout(() => {
				handleGameNumber();
				saveDataInStorage("active_tab_interactive", cvInteractiveTabs.CV_INTERACTIVE);
				setActiveTab(cvInteractiveTabs.CV_INTERACTIVE);
			}, 6000);
		}
		const BoardFull = newboard.every((square) => square !== null);

		if (BoardFull) {
			setLives((prev) => {
				saveDataInStorage("lives", prev - 1);
				return prev - 1;
			});
			setTurn(TURNS_TIC_TAC_TOE.X);
			removeFromStorage("turn");

			removeFromStorage("board");
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
			saveDataInStorage("board", newBoard);

			const newWinner = checkTicTacWinner(newBoard);
			if (newWinner) {
				setBoard(INITIAL_BOARD);
				removeFromStorage("board");

				setTurn(TURNS_TIC_TAC_TOE.X);
				saveDataInStorage("turn", TURNS_TIC_TAC_TOE.X);
				setLives((prev) => {
					saveDataInStorage("lives", prev - 1);
					return prev - 1;
				});
				return;
			}
			setTurn(TURNS_TIC_TAC_TOE.X);
			saveDataInStorage("turn", TURNS_TIC_TAC_TOE.X);
		}, 1000);

		return () => clearTimeout(timeOut);
	}, [turn, board, winner]);

	const handleSurrenderButton = () => {
		if (gameNumber === 1)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, secretNumber: "surrendered" });
				return { ...prev, secretNumber: "surrendered" };
			});
		if (gameNumber === 2)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, secretWord: "surrendered" });
				return { ...prev, secretWord: "surrendered" };
			});
		if (gameNumber === 3)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, moleSmasher: "surrendered" });
				return { ...prev, moleSmasher: "surrendered" };
			});
		if (gameNumber === 4)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, ticTacToe: "surrendered" });
				return { ...prev, ticTacToe: "surrendered" };
			});
		handleGameNumber();
		return;
	};

	if (!activeTab) return <InitialModal switchToGames={switchToGames} switchToMainScreen={switchToMainScreen} />;
	return (
		<div className="curriculum-interactive-container">
			<header>
				<CvInteractiveNavigation
					activeTab={activeTab}
					handleInteractiveActiveTabs={handleInteractiveActiveTabs}
				/>
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
						gameResult={gameResult}
					/>
				)}
			</main>
			<Footer
				cvView={cvView}
				switchToMainScreen={switchToMainScreen}
				nightMode={nightMode}
				onToggleNightMode={onToggleNightMode}
			>
				{activeTab === cvInteractiveTabs.GAMES && gameNumber < 5 && (
					<Button className={"btn primary-btn"} bodyText={"Rendirse"} handleButton={handleSurrenderButton} />
				)}
			</Footer>
		</div>
	);
};
