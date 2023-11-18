class Profiler {

    /** EXAMPLE 1
     * Generates an analysis report of student responses.
     * @param {Object} studentData - Object containing student data.
     * @returns {Object} Analysis report.
     */
    static generateAnalysisReport(studentData) {
        const analysisReport = {
            studentCount: Object.keys(studentData).length,
            averageAge: calculateAverageAge(studentData),
        };

        return analysisReport;
    }

    /** EXAMPLE 2
     * Calculates the average age of students.
     * @param {Object} studentData - Object containing student data.
     * @returns {number} Average age.
     */
    static calculateAverageAge(studentData) {
        const totalAge = Object.values(studentData).reduce((sum, student) => sum + student.age, 0);
        return totalAge / Object.keys(studentData).length;
    }
}

export default Profiler;
