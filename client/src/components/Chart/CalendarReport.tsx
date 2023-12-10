import { Bar } from 'react-chartjs-2';
import { BarController, BarElement, Chart } from 'chart.js/auto';
import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import styles from '../../styles/Dashboard.module.css';

Chart.register(BarController, BarElement);

interface CalendarScheduleReportProps {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			borderColor: string[];
			backgroundColor: string[];
		}[];
	};
}

const config = {
	type: 'bar',
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: 'Frequence of Schedules Per Day of the Week',
		},
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};
const CalendarScheduleReport: React.FC<CalendarScheduleReportProps> = ({
	data,
}) => {
	return (
		<div>
			<Card
				shadow='sm'
				padding='lg='
				radius='md'
				withBorder
				className={styles.cardWrapper}
			>
				<Card.Section className={styles.responseCard}>
					<Title order={2}>Calendar Report</Title>
					<Bar data={data} options={config} />
				</Card.Section>
			</Card>
		</div>
	);
};

export default CalendarScheduleReport;
