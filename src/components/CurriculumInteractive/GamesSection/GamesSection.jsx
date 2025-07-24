import "./GamesSection.css";
import { HangmanGame } from "./HangmanGame/HangmanGame";
import { RestartGameModal } from "./RestartGameModal/RestartGameModal";
import { SecretNumberGame } from "./SecretNumberGame/SecretNumberGame";

export const GamesSection = ({
	gameNumber,
	startGame,
	lives,
	handleGameNumber,
	handleStartGame,
	handleRestartGame,
	decreaseLive,
	secretNumber,
	error,
	setError,
}) => {
	if (lives === 0) return <RestartGameModal handleRestartGame={handleRestartGame} />;

	return (
		<section className="games-section">
			{gameNumber !== 5 && <span className="game-number-display">{`Juego ${gameNumber}/4`}</span>}
			{gameNumber !== 5 && <span className="game-number-display">{`Vidas ${lives}/10`}</span>}
			{gameNumber === 1 && (
				<SecretNumberGame
					gameNumber={gameNumber}
					startGame={startGame}
					lives={lives}
					handleGameNumber={handleGameNumber}
					handleStartGame={handleStartGame}
					decreaseLive={decreaseLive}
					secretNumber={secretNumber}
					error={error}
					setError={setError}
				/>
			)}
			{gameNumber === 2 && (
				<HangmanGame gameNumber={gameNumber} startGame={startGame} handleStartGame={handleStartGame} lives={lives} />
			)}
			{gameNumber === 3 && <div>Juego Numero 3</div>}
			{gameNumber === 4 && <div>Juego Numero 4</div>}
		</section>
	);
};
