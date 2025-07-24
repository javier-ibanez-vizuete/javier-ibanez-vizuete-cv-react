import ReactConfetti from "react-confetti";
import { LETTERS } from "../../../../utils/LETTERS";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import { HangmanBody } from "./HangmanBody/HangmanBody";
import "./HangmanGame.css";

export const HangmanGame = ({
	winner,
	gameNumber,
	startGame,
	handleStartGame,
	lives,
	longWord,
	secretWord,
	onCheckingLetter,
	error,
}) => {
	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} lives={lives} />;

	console.log("Palabra secreta", longWord);

	return (
		<div className="hangman-game-container">
			{winner && <ReactConfetti />}
			<h2 className="subtitle">EL AHORCADO</h2>
			<HangmanBody lives={lives} />
			{winner && <p className="winner-text">ENHORABUENA HAS COMPLETADO EL JUEGO</p>}
			<div className="hangman-secretword-container">
				{!winner && <span className="secret-word-box">{secretWord.toUpperCase()}</span>}
				{winner && <span className="secret-word-box">{longWord.toUpperCase()}</span>}
			</div>
			<div className="hangman-keyboard-display">
				{LETTERS.map((letter) => {
					return (
						<button key={letter} onClick={() => onCheckingLetter(letter)}>
							{letter}
						</button>
					);
				})}
			</div>
			{error && <span className="error-text">{error}</span>}
		</div>
	);
};
