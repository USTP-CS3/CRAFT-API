# CRAFT-API
Student Scheduler &amp; Profiling System

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/efc210dc-7a39-45a6-9644-2c40d0037f77)


## Rationale

In the ever-changing world of education, we're introducing a **Collaborative Resource and Feedback Tool**, a student profiling system designed to simplify student life and contribute to community development.

Here's how CRAFT API works: 
1. Entity send students a registration and survey form.
2. Students complete it by submitting their certificate of registration and responses.
3. Their essential information and schedules, all neatly stored in a central database.
4. Retrieve useful information from the analysis of the data.

What makes this system even more remarkable is its dual benefit. It helps inter-departments-organizations allocate resources effectively to those in need and provides students with tailored opportunities that align with their academic path. Beyond that, it plays a crucial role in community development, creating a stronger, more connected campus environment.



## Objective

**Scheduler**

> Provides information about a certain population's availability levels. It provides insight into whether a specific date is appropriate for the target audience.


**Profiling**

> The focal entity can select predefined questions to the target population and a survey form will be distributed to the students and collected to a database for analysis. The benefit of this rather than a regular survey can detect changes or patterns over time that could serve as an opening to potential research areas and development.



## Getting Started
1. Clone this repository `git clone https://github.com/USTP-CS3/CRAFT-API.git`
1. Install packages with `pnpm install`
2. Open `db/database.js` then configure the connection.
3. Run `pnpm sync` to synchronize models to the database.
4. Run `pnpm start` to execute main.js


## Dependencies
- **Winston**   - used for creating formatted logs

- **Chalk**     - used with winston to color logs

- **Sequelize** - an object-relational mapping library

- **MySQL2**    - mysql client for node.js

- **Pdf2Json**  - used to extract text in pdf files.


## Directories

- **db**    - database related files

- **model** - object-relation mapping

- **util**  - executable scripts

- **lib**   - development modules

- **misc**  - miscellaneous files

- **log**   - winston generated logs


## Structure
```
[db]
    ├── database.js
    ├── [model]
        ├── Faculty.js
        ├── Room.js
        ├── Schedule.js
        ├── Student.js
        └── Subject.js
    └── [util]
        └── setup.js
[lib]
    ├── logger.js
    ├── extractor.js
    ├── scheduler.js
    ├── surveyor.js
    ├── profiler.js
    └── reporter.js
[misc]
    ├── *.json
    ├── *.csv
    └── *.pdf
[log]
    └── *.log
main.js
package.json
README.md
```


## Modules

**Extractor - extracts and caches the content of _form responses_ and _pdf_ files**

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/a53955ef-afc9-4c90-9ff4-89a9bd444144)

**Surveyor - generates predefined surveys aligned with profiling design**

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/180e87a8-88aa-4270-a7a1-81c4019b32bf)

**Reporter, Scheduler, & Profiler - generates analysis report for the client**

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/96b282d6-9ee4-426b-81f4-9037a6cdaae8)



## Stages

`Phase 1.1: Extractor`

`Phase 1.2: Scheduler`

- Entity Relationship Diagram

![Screenshot 2023-11-21 105813](https://github.com/USTP-CS3/CRAFT-API/assets/26486389/b6847bbb-389e-42a4-a86e-44f263164536)

`Phase 1.3: Reporter`

`Phase 1.4: Testing           (CS)`

`Phase 1.5: Testing           (CITC)`

`Phase 2.1: Profiler`

`Phase 2.2: Surveyor`

`Phase 2.3: Reporter`

`Phase 2.4: Testing           (CS)`

`Phase 2.5: Testing           (CITC)`

`Phase 3: Inter-Organizations (USG)`

`Phase 4: Inter-Department    (OSA)`

`Phase 5: System-Wide         (USTP)`

`Phase 6: External`
