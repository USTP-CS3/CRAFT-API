class Scheduler {
    static #patternOfSchedule = /(^(S|M|T|W|Th|F)*(\s\d\d?:\d\d\s(AM|PM)))\s-(\s\d\d?:\d\d\s(AM|PM))/g;
    static #patternOfWeekday = /^(S|M|Th|T|W|F)*/g;
    static #patternOfTime = /\d\d?:\d\d\s(AM|PM)/g;


    /**
     * Parses the schedule string and returns schedule details.
     * @param {string} scheduleString - The input schedule string.
     * @returns {Object} An object containing schedule details.
     */

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

    /**
     * Parses student data from the provided array.
     * @param {string[]} data - An array containing student data.
     * @returns {Object} An object containing parsed student data.
     */

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

    /**
     * Parses schedule data from the provided array.
     * @param {string[]} data - An array containing schedule data.
     * @returns {Object[]} An array containing parsed schedule data.
     */

    static parseScheduleData(data) {
        // Check if data is an array and has a length property
        if (!Array.isArray(data) || !data.length) {
            // Handle the error or return an appropriate value
            console.error('Invalid data format');
            return [];
        }

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

    /**
     * Parses schedule frequency from provided data
     * @param {string[]} data - An array containing schedule frequency information.
     * @returns {Object[]} It contains subject frequency at certain dates.
     */


    static getSubjectFrequencyAtDates(subjectData, datesToCheck) {
        const frequencyMap = {};

        for (const subject of subjectData) {
            for (const scheduleEntry of subject.schedule) {
                const { weekday } = scheduleEntry;

                // Check if the weekday is in the datesToCheck array
                if (datesToCheck.includes(weekday)) {
                    frequencyMap[subject.subject] = (frequencyMap[subject.subject] || 0) + 1;
                }
            }
        }

        return frequencyMap;
    }

    /**
     * Checks the availability of a population on specific dates.
     * @param {Object[]} subjectData - An array containing subject data.
     * @param {string[]} datesToCheck - An array of dates to check availability.
     * @returns {Object} An object containing availability information for each date.
     */
    static checkAvailabilityWithSchedule(subjectData, datesToCheck) {
        const availabilityWithSchedule = {};
    
        for (const date of datesToCheck) {
            availabilityWithSchedule[date] = {
                availabilityCount: 0,
                schedules: [],
            };
        }
    
        for (const subject of subjectData) {
            for (const scheduleEntry of subject.schedule) {
                const { weekday } = scheduleEntry;
    
                // Check if the weekday is in the datesToCheck array
                if (datesToCheck.includes(weekday)) {
                    availabilityWithSchedule[weekday].availabilityCount += 1;
                    availabilityWithSchedule[weekday].schedules.push({
                        subject: subject.subject,
                        instructor: scheduleEntry.instructor,
                        timeStart: scheduleEntry.timeStart,
                        timeEnd: scheduleEntry.timeEnd,
                        room: scheduleEntry.room,
                    });
                }
            }
        }
    
        return availabilityWithSchedule;
    }
}

export default Scheduler;