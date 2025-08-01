import { DinamicText } from "../../DinamicText/DinamicText";
import "./InitialModal.css";

const text = `Bienvenido al curriculum interactivo de Javier Ibáñez Vizuete.
                Para desbloquear todo su contenido tendrás que completar 4 sencillos juegos.
                ¿Preparado?`;

export const InitialModal = ({ switchToGames, switchToMainScreen }) => {
	return (
		<div className="initial-modal">
			<DinamicText text={text} speed={60} switchToGames={switchToGames} switchToMainScreen={switchToMainScreen} />
		</div>
	);
};
