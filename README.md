# CRAFT-API

Student Scheduler &amp; Profiling System

## Development Environment

1. Use `Visual Studio Code`
2. Install the following extensions:
   -  prettier: code formatter (set indent to 3)
   -  helium: nice icons for folders
   -  rest client: debug requests
   -  make hidden: hide non dev files

## Getting Started: Client React.js

1. Clone this repository `git clone https://github.com/USTP-CS3/CRAFT-API.git`
2. Change directory to `cd client`
3. Install packages with `pnpm install`
4. Run `pnpm dev` to start react-vite development server.
5. Open `http://localhost:3000`

## Getting Started: Server Express.js

1. Clone this repository `git clone https://github.com/USTP-CS3/CRAFT-API.git`
2. Install packages with `pnpm install`
3. Run `pnpm sync` to create collections to the database
4. Run `pnpm dev` to start express-nodemon development server.
5. Change directory to `cd server`

![image](https://github.com/USTP-CS3/CRAFT-API/assets/26486389/d4cc4728-e0e2-4ff7-b458-a371c7701f9d)


## Rationale

**Collaborative Resource and Feedback Tool**, a student feeback and profiling system.

It helps inter-departments-organizations allocate resources effectively to those in need and provides students with tailored opportunities that align with their academic path also plays a crucial role in community development.

Here's how CRAFT API works:

1. Entity send students a registration and survey form.
2. Students complete it by submitting their certificate of registration and responses.
3. Their essential information and schedules, all neatly stored in a central database.
4. Retrieve useful information from the analysis of the data.

**Scheduler**

> Provides information about a certain population's availability levels. It provides insight into whether a specific date is appropriate for the target audience.

**Profiling**

> The focal entity can select predefined questions to the target population and a survey form will be distributed to the students and collected to a database for analysis. The benefit of this rather than a regular survey can detect changes or patterns over time that could serve as an opening to potential research areas and development.
