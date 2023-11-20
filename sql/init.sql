-- CREATE DATABASE-------------------------------------------------------------------------------------------------

CREATE DATABASE DB_CRAFT;

USE DB_CRAFT;


-- CREATE TABLES-------------------------------------------------------------------------------------------------


CREATE TABLE Student (
  -- field
  id             NOT NULL      INT      UNSIGNED AUTO_INCREMENT,
  first_name     NOT NULL      VARCHAR(50)                 ,
  last_name      NOT NULL      VARCHAR(50)                 ,
  middle_initial DEFAULT NULL  CHAR(1)                     ,
  age            NOT NULL      TINYINT  UNSIGNED           ,
  gender         NOT NULL      ENUM(M,F)                   ,
  year_level     NOT NULL      ENUM(1,2,3,4,5)             ,
  nationality    NOT NULL      VARCHAR(50)                 ,
  department     NOT NULL      ENUM(CS,IT,DS,TCM)          ,
  college        NOT NULL      ENUM(CITC)                  ,
  email          NOT NULL      VARCHAR(50)                 ,
  contact_no     DEFAULT NULL  CHAR(10)                    ,
  -- keys
  PRIMARY KEY (id)
);


CREATE TABLE Subject (
  -- field
  id            NOT NULL   INT     UNSIGNED AUTO_INCREMENT  ,
  course_code   NOT NULL   VARCHAR(25)                      ,
  description   NOT NULL   VARCHAR(50)                      ,
  lecture_units NOT NULL   TINYINT UNSIGNED                 ,
  lab_units     NOT NULL   TINYINT UNSIGNED                 ,
  credit_units  NOT NULL   TINYINT UNSIGNED                 ,
  -- keys
  PRIMARY KEY (id)
);


CREATE TABLE Schedule (
  -- field
  id           NOT NULL      INT UNSIGNED AUTO_INCREMENT    ,
  subject_id   NOT NULL      INT UNSIGNED                   ,
  faculty_id   NOT NULL      INT UNSIGNED                   ,
  room_id      DEFAULT NULL  INT UNSIGNED                   ,
  section      NOT NULL      VARCHAR(25)                    ,
  start_time   NOT NULL      TIME                           ,
  end_time     NOT NULL      TIME                           ,
  day          NOT NULL      ENUM(M,T,W,Th,F,S)             ,
  semester     NOT NULL      ENUM(1,2)                      ,
  year         NOT NULL      YEAR                           ,
  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (subject_id) REFERENCES subject (id)
  FOREIGN KEY (faculty_id) REFERENCES faculty (id),
  FOREIGN KEY (room_id)    REFERENCES room    (id),
);


CREATE TABLE Faculty (
  -- field
  id    NOT NULL      INT UNSIGNED AUTO_INCREMENT           ,
  name  DEFAULT NULL  VARCHAR(100)                          ,
  -- keys
  PRIMARY KEY (id)
);


CREATE TABLE Room (
  -- field
  id           NOT NULL      INT     UNSIGNED AUTO_INCREMENT,
  description  NOT NULL      VARCHAR(50)                    ,
  room_no      DEFAULT NULL  VARCHAR(25)                    ,
  floor_no     DEFAULT NULL  TINYINT UNSIGNED               ,
  building_no  NOT NULL      TINYINT UNSIGNED               ,
  -- keys
  PRIMARY KEY (id),
);


CREATE TABLE StudentSchedule (
  -- field
  id           NOT NULL   INT UNSIGNED AUTO_INCREMENT       ,
  student_id   NOT NULL   INT UNSIGNED                      ,
  schedule_id  NOT NULL   INT UNSIGNED                      ,
  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (schedule_id) REFERENCES schedule (id),
  FOREIGN KEY (student_id)  REFERENCES student  (id)
);


-- STORED PROCEDURES-------------------------------------------------------------------------------------------------


-- -- Student Date Frequency Procedure
-- DELIMITER //
--
-- CREATE PROCEDURE GetScheduleFrequency()
-- BEGIN
--    SELECT scheduled_date, COUNT(DISTINCT student_id) as frequency
--    FROM schedule
--    GROUP BY scheduled_date;
-- END //
--
-- DELIMITER ;


-- -- Student Table Procedure
-- DELIMITER $$
-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_student_add_or_edit(
--     IN _id             INT UNSIGNED,
--     IN _first_name     VARCHAR(50),
--     IN _last_name      VARCHAR(50),
--     IN _middle_initial CHAR(1),
--     IN _age            TINYINT UNSIGNED,
--     IN _gender         ENUM("Male", "Female"),
--     IN _year_level     ENUM(1,2,3,4,5),
--     IN _nationality    VARCHAR(50),
--     IN _department     ENUM("CS", "IT", "DS", "TCM"),
--     IN _college        ENUM("CITC") DEFAULT CITC,
--     IN _email          VARCHAR(50),
--     IN _contact_no     CHAR(10)
-- )
-- BEGIN
-- -- Insert new student or update existing one
--     INSERT INTO Student (id, first_name, last_name, middle_initial, age, gender, year_level, nationality, department, college, email, contact_no)
--     VALUES (_id, _first_name, _last_name, _middle_initial, _age, _gender, _year_level, _nationality, _department, _college, _email, _contact_no)
--     ON DUPLICATE KEY UPDATE
--         first_name = VALUES(first_name),
--         last_name = VALUES(last_name),
--         middle_initial = VALUES(middle_initial),
--         age = VALUES(age),
--         gender = VALUES(gender),
--         year_level = VALUES(year_level),
--         nationality = VALUES(nationality),
--         department = VALUES(department),
--         college = VALUES(college),
--         email = VALUES(email),
--         contact_no = VALUES(contact_no);

--     SELECT ROW_COUNT() AS 'affectedRows';
-- END$$
-- DELIMITER ;



-- -- Faculty Table Procedure
-- DELIMITER $$
-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_faculty_add_or_edit(
--     IN _id INT,
--     IN _name VARCHAR(255)
-- )
-- BEGIN
--     INSERT INTO faculty (id, name)
--     VALUES (_id, _name)
--     ON DUPLICATE KEY UPDATE
--         name = VALUES(name);


--     SELECT ROW_COUNT() AS 'affectedRows';
-- END$$

-- DELIMITER ;



-- -- Schedule Table Procedure
-- DELIMITER $$
-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_schedule_add_or_edit(
--     IN _id INT,
--     IN _subject_id INT,
--     IN _faculty_id INT,
--     IN _room_id INT,
--     IN _section VARCHAR(25),
--     IN _start_time time,
--     IN _end_time time,
--     IN _day ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
--     IN _semester ENUM('1','2'),
--     IN _year year(4)
-- )
-- BEGIN
--     INSERT INTO schedule (id, subject_id, faculty_id, room_id, section, start_time, end_time, day, semester, year)
--     VALUES (_id, _subject_id, _faculty_id, _room_id, _section, _start_time, _end_time, _day, _semester, _year)
--     ON DUPLICATE KEY UPDATE
--         subject_id = VALUES(subject_id),
--         faculty_id = VALUES(faculty_id),
--         room_id = VALUES(room_id),
--         section = VALUES(section),
--         start_time = VALUES(start_time),
--         end_time = VALUES(end_time),
--         day = VALUES(day),
--         semester = VALUES(semester),
--         year = VALUES(year);
--     SELECT ROW_COUNT() AS 'affectedRows';
-- END$$


-- -- Building Table PROCEDURE
-- DELIMITER $$
-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_building_add_or_edit(
--     IN _id TINYINT(1),
--     IN _name VARCHAR(255)
-- )
-- BEGIN
--     INSERT INTO building (id, name)
--     VALUES (_id, _name)
--     ON DUPLICATE KEY UPDATE
--       name = VALUES(name);

--     SELECT ROW_COUNT() AS 'affectedRows';
-- END$$

-- DELIMITER ;



-- -- Room Table PROCEDURE


-- DELIMITER $$

-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_room_add_or_edit(
--     IN _id INT,
--     IN _description VARCHAR(255),
--     IN _room_number VARCHAR(25),
--     IN _floor_no TINYINT(1),
--     IN _building_id TINYINT(1)
-- )
-- BEGIN
--     INSERT INTO building (id, description, room_number, floor_no, building_id)
--     VALUES (_id, _description, _room_number, _floor_no, _building_id)
--     ON DUPLICATE KEY UPDATE
--       description = VALUES(description),
--       room_number = VALUES(room_number),
--       floor_no = VALUES(floor_no),
--       building_id = VALUES(building_id);      
--     SELECT ROW_COUNT() AS 'affectedRows';
-- END$$
-- DELIMITER $$

-- -- Subject Table PROCEDURE
-- DELIMITER $$
-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_subject_add_or_edit(
--     IN _id INT,
--     IN _course_code VARCHAR(25),
--     IN _description VARCHAR(255),
--     IN _lecture_units TINYINT(1),
--     IN _lab_units TINYINT(1),
--     IN _credit_units TINYINT(1)
-- )
-- BEGIN
--     INSERT INTO subject (id, course_code, description, lecture_units, lab_units, credit_units)
--     VALUES (_id, _course_code, _description, _lecture_units, _lab_units, _credit_units) 
--     ON DUPLICATE KEY UPDATE
--       course_code = VALUES(course_code),
--       description = VALUES(description),
--       lecture_units = VALUES(lecture_units),
--       lab_units = VALUES(lab_units),
--       credit_units = VALUES(credit_units);


--   SELECT ROW_COUNT() AS 'affectedRows';
-- END$$
-- DELIMITER ;


-- -- Student Schedule Table PROCEDURE
-- DELIMITER $$

-- CREATE DEFINER={{MYSQL_USER}}@{{MYSQL_HOST}} PROCEDURE usp_student_schedule_add_or_edit(
--     IN _id INT,
--     IN _student_id INT,
--     IN _schedule_id INT
-- )
-- BEGIN
--     INSERT INTO student_schedule (id, student_id, schedule_id)
--     VALUES (_id, _student_id, _schedule_id)
--     ON DUPLICATE KEY UPDATE
--       student_id = VALUES(student_id),
--       schedule_id = VALUES(schedule_id);      
--     SELECT ROW_COUNT() AS 'affectedRows';
-- END$$