import "./GamesSection.css";
import { HangmanGame } from "./HangmanGame/HangmanGame";
import { MoleSmasherGame } from "./MoleSmasherGame/MoleSmasherGame";
import { RestartGameModal } from "./RestartGameModal/RestartGameModal";
import { SecretNumberGame } from "./SecretNumberGame/SecretNumberGame";
import { TicTacToeGame } from "./TicTacToeGame/TicTacToeGame";

export const GamesSection = ({
	winner,
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
	longWord,
	secretWord,
	onCheckingLetter,
	moles,
	moleHoles,
	handleMoleClick,
	board,
	turn,
	handleTicTacWinner,
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
				<HangmanGame
					winner={winner}
					gameNumber={gameNumber}
					startGame={startGame}
					handleStartGame={handleStartGame}
					lives={lives}
					longWord={longWord}
					secretWord={secretWord}
					onCheckingLetter={onCheckingLetter}
					error={error}
				/>
			)}
			{gameNumber === 3 && (
				<MoleSmasherGame
					startGame={startGame}
					gameNumber={gameNumber}
					handleStartGame={handleStartGame}
					lives={lives}
					moles={moles}
					moleHoles={moleHoles}
					winner={winner}
					handleMoleClick={handleMoleClick}
				/>
			)}
			{gameNumber === 4 && (
				<TicTacToeGame
					startGame={startGame}
					gameNumber={gameNumber}
					handleStartGame={handleStartGame}
					board={board}
					turn={turn}
					handleTicTacWinner={handleTicTacWinner}
					winner={winner}
				/>
			)}
		</section>
	);
};
