import { Task } from 'gantt-task-react';

export function initSchedule() {
	const currentDate = new Date();
	const subject: Task[] = [
		{
			start: new Date(2023, 1, 1, 10, 30),
			end: new Date(2023, 1, 1, 12, 30),
			name: 'Some Subject',
			id: 'Subject Sample',
			progress: 0,
			type: 'task',
			hideChildren: false,
			styles: {
				progressColor: '#ffbb54',
				progressSelectedColor: '#ff9e0d',
			},
		},
	];
	return subject;
}

export const getTime = (date: Date) => {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${hours}:${minutes}`;
};

export const getWeekDay = (date: Date) => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return days[date.getDay()];
};
