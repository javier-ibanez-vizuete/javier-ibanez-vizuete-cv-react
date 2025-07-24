import { useState } from "react";
import "./SecretNumberGame.css";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import ReactConfetti from "react-confetti";

export const SecretNumberGame = ({
	gameNumber,
	startGame,
	lives,
	handleGameNumber,
	handleStartGame,
	decreaseLive,
	secretNumber,
	error,
	setError,
}) => {
	const [inputNumber, setInputNumber] = useState("");
	const [isWinner, setIsWinner] = useState(false);

	const handleInputChange = (event) => {
		if (!event.target.value) {
			setInputNumber("");
			return;
		}

		setError("");
		setInputNumber(Number(event.target.value));
	};

	console.log("Numero secreto", secretNumber);

	const checkWinner = (event) => {
		event.preventDefault();
		if (!inputNumber && inputNumber !== 0) return setError("Debes introducir un numero");

		if (inputNumber < secretNumber) {
			setError("Mas Alto");
			decreaseLive();
			setInputNumber("");
			return;
		}

		if (inputNumber > secretNumber) {
			setError("Mas bajo");
			decreaseLive();
			setInputNumber("");
			return;
		}

		if (inputNumber === secretNumber) {
			console.log("Entrando en el if input === secretNumber");
			setIsWinner((prev) => !prev);
			setInputNumber("");
			setTimeout(() => {
				handleGameNumber();
			}, 6000);
		}
	};

	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} lives={lives} />;

	return (
		<div className="secret-number-game-container">
			<h2 className="subtitle">Numero Secreto</h2>
			{isWinner && <h2 className="secret-number-box">{secretNumber}</h2>}
			{isWinner && <ReactConfetti />}
			{isWinner && <p className="accept-text accept-secret-number">ENHORABUENA PASAS AL SIGUIENTE JUEGO</p>}
			{!isWinner && <h2 className="secret-number-box">?</h2>}
			<form action="#" onSubmit={checkWinner} className="secret-number-form">
				<input
					type="number"
					value={inputNumber}
					onChange={handleInputChange}
					placeholder="Introduce un numero del 1 al 100"
				/>
				<button type="submit" className="btn primary-btn">
					Comprobar
				</button>
			</form>
			{error && <span className="error-text error-secret-number">{error}</span>}
		</div>
	);
};
