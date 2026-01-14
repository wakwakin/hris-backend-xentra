1. Personal Information & Document Management (201 Files)
   Flow: The EMPLOYEE table acts as the master record. When a user updates their profile photo or details, it updates the photo_url and personal strings in EMPLOYEE.

201 Files/IDs: Documents like TIN, SSS, and PhilHealth are stored in the EMPLOYEE_DOCUMENT table, linked by emp_id.

Self-Info Update: A change in data (e.g., a new address or phone number) can trigger a WORKFLOW_REQUEST of type "Data Update" if HR approval is required before the master record is overwritten.

2. Onboarding & Recruitment Tracking
   Requirements Checklist: New hires are linked to an ONBOARDING_CHECKLIST (as seen in Version 2). Each item in the checklist can be tracked via the WORKFLOW_STEP table to see who verified the submission.

Monthly Onboarding Report: This is a query on the EMPLOYEE table where date_hired falls within the current month, cross-referenced with SUBSIDIARY and DEPARTMENT to show where the growth is occurring.

3. Personnel, Team, and History Reports (Alpha List)
   Personnel per Team/Project: The system queries PROJECT_ASSIGNMENT to see active links between EMPLOYEE and PROJECT. It filters by type (Primary/Side) to avoid double-counting in headcount.

Transfer/Employment History: Every time an employee moves between projects or levels, a record is inserted into CAREER_EVENT.

Alpha List Generation: Joins EMPLOYEE, PROJECT_ASSIGNMENT, and DEPARTMENT to create a master list of all active staff and their current location.

4. Demographics & GAD Reporting
   Gender & Age Group: The EMPLOYEE table explicitly holds gender and birth_date.

GAD Report: A COUNT grouped by gender across SUBSIDIARY or DEPARTMENT.

Age Group: A calculated field in the query (Current Date - birth_date) categorized into buckets (e.g., 20-25, 26-30).

5. Categorization: Skillset & Status
   Skillset Report: A join between EMPLOYEE and SKILLSET. This allows HR to search for "React Developers" or "Intermediate Project Managers" across the entire group.

Employment Status & Headcount: Queries the employment_status column (OJT, Regular, Probationary).

Headcount Distribution: Grouped by SUBSIDIARY to see how many people are billable vs. internal.

6. Certificates (COE & COS) Requests
   Flow: 1. Employee creates a WORKFLOW_REQUEST (type: "COE"). 2. Data is stored in CERTIFICATE_REQUEST (purpose, type). 3. A WORKFLOW_STEP is generated for HR. 4. Once HR "Approves," the system logs the completion, and the document is issued.

7. Leave Request Application
   Flow:

Employee submits LEAVE_REQUEST.

The system checks SUPERVISION_RELATION to find the Primary-Project supervisor.

A WORKFLOW_STEP is created for that supervisor.

If the supervisor approves, the LEAVE_REQUEST status changes to "Approved."

(Optional) A notification is sent to the Administrative supervisor via the WORKFLOW_STEP log.

8. Monthly Attrition & Birthday List
   Monthly Attrition: The system queries CAREER_EVENT where type = 'Resigned' or EXIT_PROCESS where separation_date is within the month. This is compared against the total headcount at the start of the month.

Birthday List: A simple filter on EMPLOYEE where MONTH(birth_date) = CURRENT_MONTH.

9. Exit Process & Clearance Tracking
   Flow:

EXIT_PROCESS is initialized, creating a WORKFLOW_REQUEST.

Step 1: Project Lead confirms turnover.

Step 2: IT confirms ASSET_ASSIGNMENT items are returned (system checks if returned_date is filled).

Step 3: Finance confirms no outstanding liabilities.

Step 4: HR logs Exit Interview Data into the EXIT_PROCESS table.

Clearance Tracking: The dashboard views the WORKFLOW_STEP table to show a progress bar (e.g., "2 of 4 departments cleared").

10. Trainee to Regular (Absorption)
    Flow:

PERFORMANCE_REVIEW is conducted for an OJT.

REVIEW_METRIC scores are logged.

If recommendation = "Absorb", a CAREER_EVENT is triggered.

The EMPLOYEE table employment_status is updated from "OJT" to "Regular," and the absorption_date is set.
