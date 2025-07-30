import { TURNS_TIC_TAC_TOE } from "../../../../utils/TIC_TAC_TOE_INITIAL_STATS";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import { Square } from "./Square/Square";
import "./TicTacToeGame.css";
import { FullscreenConfetti } from "../../../FullscreenConfetti/FullscreenConfetti";

export const TicTacToeGame = ({ startGame, gameNumber, handleStartGame, board, turn, handleTicTacWinner, winner }) => {
	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} />;
	return (
		<div className="tic-tac-toe-game-container">
			<h2 className="subtitle">TRES EN RAYA</h2>
			<div className="tic-tac-toe-turn-container">
				<Square isSelected={turn === TURNS_TIC_TAC_TOE.X}>{TURNS_TIC_TAC_TOE.X}</Square>
				<Square isSelected={turn === TURNS_TIC_TAC_TOE.O}>{TURNS_TIC_TAC_TOE.O}</Square>
			</div>

			<div className="tic-tac-toe-board-container">
				{board.map((_, index) => {
					return (
						<Square key={index} index={index} handleTicTacWinner={handleTicTacWinner}>
							{board[index]}
						</Square>
					);
				})}
			</div>
			{winner && <FullscreenConfetti />}
			{winner && <span className="winner-text">ENHORABUENA HAS COMPLETADO EL JUEGO</span>}
			{winner && <span className="winner-text">NUEVA SECCION DESBLOQUEADA: CONTACTO</span>}
		</div>
	);
};
