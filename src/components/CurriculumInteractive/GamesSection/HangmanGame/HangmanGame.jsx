import { GameExplanation } from "../GameExplanation/GameExplanation";
import { HangmanBody } from "./HangmanBody/HangmanBody";
import "./HangmanGame.css";

export const HangmanGame = ({ gameNumber, startGame, handleStartGame, lives }) => {
	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} lives={lives} />;
	console.log("Estoy pasando por aqui");

	return (
		<div className="hangman-game-container">
			<h2>EL AHORCADO</h2>
			<HangmanBody lives={lives} />
			<div className="hangman-secretword-container">
				<span>PALABRA SECRETA</span>
				<span>PALABRA COMPLETA</span>
			</div>
			<div className="hangman-keyboard-display">CONTENEDOR TECLADO VIRTUAL</div>
		</div>
	);
};
