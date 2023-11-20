-- left for debugging purpose

DELIMITER //

CREATE PROCEDURE GetScheduleFrequency()
BEGIN
    SELECT scheduled_date, COUNT(DISTINCT student_id) as frequency
    FROM schedule
    GROUP BY scheduled_date;
END //

DELIMITER ;
