import { LETTERS } from "../../../../utils/LETTERS";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import { HangmanBody } from "./HangmanBody/HangmanBody";
import "./HangmanGame.css";
import { FullscreenConfetti } from "../../../FullscreenConfetti/FullscreenConfetti";

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

	return (
		<div className="hangman-game-container">
			{winner && <FullscreenConfetti />}
			<h2 className="subtitle">EL AHORCADO</h2>
			<HangmanBody lives={lives} />
			{winner && <p className="winner-text">ENHORABUENA HAS COMPLETADO EL JUEGO</p>}
			{winner && <p className="winner-text">NUEVA SECCION DESBLOQUEADA: EXPERIENCIA</p>}
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
