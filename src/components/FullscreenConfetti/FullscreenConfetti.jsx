import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const INITIAL_WINDOW_SIZE = {
	width: window.innerWidth,
	height: window.innerHeight,
};

export const FullscreenConfetti = () => {
	const [windowSize, setWindowSize] = useState(INITIAL_WINDOW_SIZE);

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return <ReactConfetti width={windowSize.width} height={windowSize.height} />;
};
