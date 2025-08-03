import { TURNS_TIC_TAC_TOE } from "../../../../../utils/TIC_TAC_TOE_INITIAL_STATS";
import "./Square.css";

export const Square = ({ children, index, handleTicTacWinner, isSelected }) => {
	const className = `square-tic-tac ${isSelected ? "is-selected" : ""} ${children !== null ? "full-square" : ""}`;

	return (
		<div onClick={() => handleTicTacWinner(index)} className={className}>
			<span>{children}</span>
		</div>
	);
};
