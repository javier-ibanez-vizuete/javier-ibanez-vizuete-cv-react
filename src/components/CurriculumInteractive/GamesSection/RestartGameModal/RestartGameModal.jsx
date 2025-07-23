import "./RestartGameModal.css";
import ReactRain from 'react-rain-animation'
import 'react-rain-animation/lib/style.css'

export const RestartGameModal = ({ handleRestartGame }) => {
	return (
		<div className="restart-game-modal">
			<ReactRain numDrops={120}/>
			<h2>Te has quedado sin vidas</h2>
			<p>¿Quieres volver a intentarlo?</p>
			<button className="btn secondary-btn" onClick={handleRestartGame}>
				Reintentar
			</button>
		</div>
	);
};
