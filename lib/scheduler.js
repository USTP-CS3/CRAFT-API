class Scheduler {
    static #patternOfSchedule = /(^(S|M|T|W|Th|F)*(\s\d\d?:\d\d\s(AM|PM)))\s-(\s\d\d?:\d\d\s(AM|PM))/g;
    static #patternOfWeekday = /^(S|M|Th|T|W|F)*/g;
    static #patternOfTime = /\d\d?:\d\d\s(AM|PM)/g;

    static parseSchedule(scheduleString) {
        const schedule = scheduleString.match(this.#patternOfSchedule)[0];
        const room = scheduleString.replace(schedule, '').trim();
        const mixedDays = schedule.match(this.#patternOfWeekday)[0];
        const timeStart = schedule.match(this.#patternOfTime)[0];
        const timeEnd = schedule.match(this.#patternOfTime)[1];
        const weekdays = [];

        for (let j = 0; j < mixedDays.length; j++) {
            if (mixedDays[j] == 'T' && mixedDays[j + 1] == 'h') {
                weekdays.push('Th');
                j++;
                continue;
            }
            weekdays.push(mixedDays[j]);
        }

        return { room, weekdays, timeStart, timeEnd };
    }

    static parseStudentData(data) {
        return {
            document_title: data[0].replaceAll(' ', ''),
            campus: data[1],
            registration_no: data[15],
            id: data[16],
            name: data[17],
            gender: data[18],
            age: data[19],
            college: data[20],
            department: data[21],
            major: data[22],
            year_level: data[23],
            curriculum: data[24],
            academic_year: data[25],
            scholarship: data[26],
            nationality: data[30],
            contact: data[31],
        };
    }

    static parseScheduleData(data) {
        const subjects = [];

        for (let i = 39; i < data.length; i += 8) {
            const isLastSubject = data[i] === 'Total Unit(s)';
            if (isLastSubject) {
                break;
            }

            const isScheduleOfPreviousSubject = data[i].match(this.#patternOfSchedule);

            if (isScheduleOfPreviousSubject) {
                const previousSubject = subjects.at(-1);
                const { room, weekdays, timeStart, timeEnd } = this.parseSchedule(data[i]);

                weekdays.forEach((weekday) => {
                    previousSubject.schedule.push({
                        instructor: data[i + 1],
                        weekday,
                        timeStart,
                        timeEnd,
                        room,
                    });
                });

                i -= 6; // proceed to the next iteration
            } else {
                const subject = {
                    subject: data[i + 1],
                    lecture: data[i + 2],
                    laboratory: data[i + 3],
                    credit: data[i + 4],
                    code: data[i + 6],
                    section: data[i + 7],
                    schedule: [],
                };

                const { room, weekdays, timeStart, timeEnd } = this.parseSchedule(data[i + 5]);

                weekdays.forEach((weekday) => {
                    subject.schedule.push({
                        instructor: data[i],
                        weekday,
                        timeStart,
                        timeEnd,
                        room,
                    });
                });

                subjects.push(subject);
            }
        }

        return subjects;
    }
}

export default Scheduler;