// import { GanttOriginal, Subject, ViewMode, TaskType } from 'react-gantt-chart';
import { useCallback, useState } from 'react';
import { Card, Title, Text, CardSection } from '@mantine/core';
import style from '../../styles/Dashboard.module.css';
import {
	Gantt,
	Task as Subject,
	EventOption,
	StylingOption,
	ViewMode,
	DisplayOption,
} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { ViewSwitcher } from '../ViewSwitcher';
import { initSchedule, getTime, getWeekDay } from './ChartHelper';

const ClassScheduleGantt = () => {
	const [schedules, setSchedules] = useState<Subject[]>(initSchedule());
	const [view, setView] = useState<ViewMode>(ViewMode.Hour);
	const [isChecked, setIsChecked] = useState(true);

	let columnWidth = 65;
	if (view === ViewMode.Month) {
		columnWidth = 300;
	} else if (view === ViewMode.Week) {
		columnWidth = 250;
	} else if (view === ViewMode.Day) {
		columnWidth = 200;
	} else if (view === ViewMode.HalfDay) {
		columnWidth = 150;
	} else if (view === ViewMode.QuarterDay) {
		columnWidth = 100;
	} else if (view === ViewMode.Hour) {
		columnWidth = 75;
	}

	const handleScheduleChange = useCallback(
		(schedule: Subject, children: Subject[]) => {
			setSchedules((prevSchedule) => {
				return prevSchedule.map((sched) => {
					if (sched.id == schedule.id) {
						return { ...sched, start: schedule.start, end: schedule.end };
					}
					return sched;
				});
			});
			return true;
		},
		[]
	);

	const handleTaskDelete = (schedule: Subject) => {
		const conf = window.confirm('Are you sure about ' + schedule.name + ' ?');
		if (conf) {
			setSchedules(schedules.filter((t) => t.id !== schedule.id));
		}
		return conf;
	};

	const handleDoubleClick = (schedule: Subject) => {
		alert('On Double Click event Id:' + schedule.id);
	};

	const handleSelect = (schedule: Subject, isSelected: boolean) => {
		console.log(
			schedule.name + ' has ' + (isSelected ? 'selected' : 'unselected')
		);
	};

	return (
		<div>
			<Card
				shadow='sm'
				padding='lg'
				radius='md'
				withBorder
				className={style.cardWrapper}
			>
				<ViewSwitcher
					onViewModeChange={(viewMode) => setView(viewMode)}
					onViewListChange={setIsChecked}
					isChecked={isChecked}
				/>

				<Card.Section className={style.responseCard}>
					<Gantt
						tasks={schedules}
						viewMode={view}
						onDateChange={handleScheduleChange}
						handleWidth={10}
						TooltipContent={(task) => (
							<div className={style.ToolTipContent}>
								<div>{task.task.name}</div>
								<div>
									{getWeekDay(task.task.start)}{' '}
									{getTime(task.task.start)} - {getTime(task.task.end)}
								</div>
							</div>
						)}
						onDelete={handleTaskDelete}
						onDoubleClick={handleDoubleClick}
						onSelect={handleSelect}
						listCellWidth={isChecked ? '155px' : ''}
						columnWidth={columnWidth}
						// TaskListHeader={(props) => {
						// 	return (
						// 		<div className={style.taskListHeader}>
						// 			<div>Subject</div>
						// 			<div>Schedule</div>
						// 		</div>
						// 	);
						// }}
						// TaskListTable={(props) => {
						// 	return (
						// 		<div className={style.taskListTable}>
						// 			{props.tasks.map((subject) => {
						// 				return (
						// 					<div
						// 						key={subject.id}
						// 						className={style.taskListTableRow}
						// 					>
						// 						<div>{subject.name}</div>
						// 						<div>
						// 							{getWeekDay(subject.start)}{' '}
						// 							{getTime(subject.start)} -{' '}
						// 							{getTime(subject.end)}
						// 						</div>
						// 					</div>
						// 				);
						// 			})}
						// 		</div>
						// 	);
						// }}
					/>
				</Card.Section>
			</Card>
		</div>
	);
};

export default ClassScheduleGantt;
