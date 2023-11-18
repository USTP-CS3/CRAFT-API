# CRAFT-API
Student Scheduler &amp; Profiling System

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/efc210dc-7a39-45a6-9644-2c40d0037f77)

### Rationale

In the ever-changing world of education, we're introducing a Collaborative Resource and Feedback Tool (CRAFT API), a student profiling system designed to simplify student life and contribute to community development. Think of it as your friendly, approachable guide, always ready to assist and serve.

Here's how CRAFT API works: 
1. Entity send students a registration and survey form.
2. Students complete it by submitting their certificate of registration and responses.
3. Their essential information and schedules, all neatly stored in a central database.
4. Retrieve useful information from the analysis of the data.

What makes this system even more remarkable is its dual benefit. It helps department (and inter-department) allocate resources effectively to those in need and provides students with tailored opportunities that align with their academic path. Beyond that, it plays a crucial role in community development, creating a stronger, more connected campus environment.

As CRAFT API continues to demonstrate stability and effectiveness within our department, we eagerly anticipate the opportunity to expand its reach across the campus.


<hr>

### Objective

**Scheduling**
> Provides information about a certain population's availability levels. It provides insight into whether a specific date is appropriate for the target audience.

**Profiling**
> The focal entity can select predefined questions to the target population and a survey form will be distributed to the students and collected to a database for analysis. The benefit of this rather than a regular survey can detect changes or patterns over time that could serve as an opening to potential research areas and development.

<hr>


### Project Design

**Class::Extractor - extracts and caches the content of _google form responses_ and _pdf_ files**

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/a53955ef-afc9-4c90-9ff4-89a9bd444144)

**Class::Surveyor - generates predefined surveys aligned with profiling design**

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/180e87a8-88aa-4270-a7a1-81c4019b32bf)

**Class::Scheduler - generates schedule frequency analysis report**

**Class::Profiler  - generates analysis report of student responses**

**Class::Reporter  - wrapper for the client-side**

![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/96b282d6-9ee4-426b-81f4-9037a6cdaae8)

<hr>

### Project Phases
> Phase 1.1: Extractor
> 
> Phase 1.2: Scheduler

**Database Design**
![image](https://github.com/USTP-CSCORE/CRAFT-API/assets/26486389/099ac883-cb2e-4074-ae3f-d53e774e6a7e)

> Phase 1.3: Reporter
> 
> Phase 1.4: Testing           (CS)
> 
> Phase 1.5: Testing           (CITC)
> 
> Phase 2.1: Profiler
> 
> Phase 2.2: Surveyor
> 
> Phase 2.3: Reporter
> 
> Phase 2.4: Testing           (CS)
> 
> Phase 2.5: Testing           (CITC)
> 
> Phase 3: Inter-Organizations (USG)
> 
> Phase 4: Inter-Department    (OSA)
> 
> Phase 5: System-Wide         (USTP)
> 
> Phase 6: External
