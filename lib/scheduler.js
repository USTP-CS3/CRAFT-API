class Scheduler {
    constructor(database) {
        this.database = database;
    }

    async displayFrequency() {
        try {
            const scheduleData = await this.database.query('CALL GetScheduleFrequency()');

            if (scheduleData && scheduleData.length > 0) {
                for (const { scheduled_date, frequency } of scheduleData) {
                    console.log(`Date: ${scheduled_date}, Frequency: ${frequency}`);
                }
            } else {
                console.log('No schedule data found.');
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}

module.exports = Scheduler;