// import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Card, Title, Text } from '@mantine/core';
import styles from '../../styles/Dashboard.module.css';

// Register the necessary components for Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

// TypeScript interface for props, adjust based on your data structure
interface ResponseFrequencyChartProps {
	data: {
		labels: string[]; // Assuming labels are strings (e.g., '1 AM', '2 AM', ...)
		datasets: {
			label: string;
			data: number[]; // Array of response frequencies
			backgroundColor: string;
			borderColor: string;
			borderWidth: number;
		}[];
	};
}

const config = {
	type: 'line',
	responsive: true,
	plugins: {
		legend: {
			position: 'bottom' as const,
			align: 'end' as const,
		},
		title: {
			display: true,
			text: 'Frequency of Responses Per Hour Interval',
		},
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

export const ResponseFrequencyChart: React.FC<ResponseFrequencyChartProps> = ({
	data,
}) => {
	return (
		<div className={styles.cardWrapper}>
			<Card
				shadow='sm'
				padding='lg='
				radius='md'
				withBorder
				className={styles.responseCard}
			>
				<Card.Section>
					<Title order={2}>Response Report</Title>
					<Line data={data} options={config} />
				</Card.Section>
			</Card>
		</div>
	);
};
