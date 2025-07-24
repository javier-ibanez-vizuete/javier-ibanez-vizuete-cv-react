import "./GameExplanation.css";

export const GameExplanation = ({ gameNumber, handleStartGame, lives }) => {
	if (gameNumber === 1)
		return (
			<div className="game-explanation-container">
				<h2>NUMERO SECRETO</h2>
				<p>En este Juego debes adivinar el número secreto (Entre 0 y 100) con un maximo de {lives} intentos</p>
				<p>
					Aparecera <span className="error-text">(Mas alto)</span> Si tu numero es inferior
				</p>
				<p>
					Aparecera <span className="error-text">(Mas bajo)</span> si tu numero es superior
				</p>
				<button onClick={handleStartGame} className="btn primary-btn">
					Comenzar
				</button>
			</div>
		);
	if (gameNumber === 2)
		return (
			<div className="game-explanation-container">
				<h2>EL AHORCADO</h2>
				<p>En este Juego deberas adivinar las letras que faltan en la palabra</p>
				<p>Si fallas Pierdes una vida ({`${lives} - 1`})</p>
				<p>Si pierdes todas las vidas Pierdes el Juego</p>
				<button onClick={handleStartGame} className="btn primary-btn">
					Comenzar
				</button>
			</div>
		);
};
