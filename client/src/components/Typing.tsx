import React, { useState, useEffect, useRef } from 'react';
import { Code } from '@mantine/core';
import '../styles/Typing.css';

interface TypingProps {
	textData: string;
	onAnimationComplete?: () => void;
}

const Typing: React.FC<TypingProps> = ({ textData, onAnimationComplete }) => {
	const [animatedJson, setAnimatedJson] = useState<string[]>([]);
	const containerRef = useRef(null);

	useEffect(() => {
		const lines = textData.split('\n');
		let index = 0;
		const container = containerRef.current;

		const intervalId = setInterval(() => {
			setAnimatedJson((prevLines) => {
				const nextLine = lines[index];
				index += 1;
				return [...prevLines, nextLine];
			});

			if (container) {
				(container as HTMLElement).scrollTop = (container as HTMLElement).scrollHeight; // Scroll to the bottom
			}

			if (index === lines.length) {
				clearInterval(intervalId);
				if (onAnimationComplete) {
					onAnimationComplete();
				}
			}
		}, 12); // Set the interval to a minimum value (around 4 milliseconds)

		return () => clearInterval(intervalId);
	}, [textData, onAnimationComplete]);

	return (
		<Code block ref={containerRef} className='json-typing-animation'>
			{animatedJson.map((line, idx) => (
				<div key={idx}>{line}</div>
			))}
		</Code>
	);
};

export { Typing };
